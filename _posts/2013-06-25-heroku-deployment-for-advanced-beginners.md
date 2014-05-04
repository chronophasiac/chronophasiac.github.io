---
title: Heroku Deployment for Advanced Beginners
author: infotrope
layout: post
permalink: /2013/06/25/heroku-deployment-for-advanced-beginners/
categories:
  - Ruby on Rails
---
You've deployed a couple Rails apps to Heroku. You know all about `heroku create` and `git push heroku master`. What's next?

*So much*

*   **Must-have addons.** Most any Heroku deployed app should have [New Relic][1]. Its free, gives you highly useful stats, and actually makes your site *faster*. On the free tier, Heroku will spin down your server if there's no traffic. In this sleeping state, when you visit the site you may experience a notable lag as Heroku loads the app from disk. New Relic will periodically ping your site, keeping it from sleeping and becoming laggy.
    
        heroku addons:add newrelic:standard
        
    
    [PG Backups][2] is another free addon for those of us using Heroku Postgres. It will automatically back up snapshots of your database to S3, let you [download snapshots][3], and a bunch more useful things. Did I mention it's free?
    
        heroku addons:add pgbackups
        

*   **Separate staging and production deployments.** When we deploy our apps, we want a way to make sure they are behaving the way we expect in the production environment, without inconveniencing other users. We need a "staging" server where we can test out fresh code before it is exposed to the world at large.  
    Heroku has an [excellent guide][4] on this, but *make sure staging is the default Heroku app*. If your staging environment is called `staging`, issue this command:
    
        git config heroku.remote staging
        
    
    With this set, any Heroku commands will apply to staging unless you append them with `--app Myapp`. This is great for when we issue potentially destructive commands. If our staging environment gets hosed, its not a big deal.

*   **Mirror the production database to staging.** One way to increase the value of our staging environments is to use data that is as close as possible to the production app. If you're using PG Backups, Heroku has a [handy guide][5] for copying databases between apps. The magic happens here:
    
        heroku pgbackups:restore HEROKU_POSTGRESQL_TURQUOISE -a target-app \
        `heroku pgbackups:url -a source-app`
        
    
    We must be careful that we sanitize any sensitive data. If users are storing confidential or personal information, write a rake task to edit or delete that sensitive data before it hits your (insecure) staging environment.

*   **Use environment variables.** By default, Rails has a gaping security hole. The `app/initializers/secret_token.rb` file contains, by default, a long random string that is used to encrypt the session cookie. You've probably checked this file into version control at least once. If that's the case, anyone with access to your repo can impersonate other users and possibly gain admin access to the site!  
    Here's a [quick fix][6]. In your `secret_token.rb`:
    
        MyApp::Application.config.secret_token = if Rails.env.development? or Rails.env.test?
          ('x' * 30) # meets minimum requirement of 30 chars long
        else
          ENV['SECRET_TOKEN']
        end
        
    
    This sets your secret token to the value of an environment variable in production only. We can set that [environment variable][7] like so:
    
        heroku config:set SECRET_TOKEN=somelongrandomstringoflettersandnumbers
        
    
    We should also store any API passwords or tokens in environment variables. That said, it can be easy to lose track of all the environment variables associated with a deployment. We can pull them from the server and store them in a `.env` file, like so:
    
        heroku plugins:install git://github.com/ddollar/heroku-config.git
        heroku config:pull --overwrite --interactive
        
    
    Just be sure to add any sensitive `.env` file to `.gitignore`!

*   **Procfiles.** Heroku [recommends][8] deploying with the Unicorn server. Problem is, debugging utilities like [Pry][9] and [better_errors][10] don't play nice with Unicorn's threaded architecture. To get around this, and also to avoid Unicorn's slow startup, we can use different production and development servers.  
    I use [Thin][11] for development. If you're using Heroku's `foreman`, you may be familiar with the [Procfile][12]. A Procfile with unicorn might look like this:
    
        web: bundle exec unicorn -p $PORT -c ./config/unicorn.rb
        
    
    We can write a new `Procfile.dev`, with this line to start Thin:
    
        web: bundle exec thin start
        
    
    When we're developing, we can now invoke the development server with `foreman start -f Procfile.dev`. When we deploy to Heroku, it will read our un-suffixed `Procfile` and correctly use Unicorn.

*   **Use Hirefire for background processing.** Running jobs in Heroku can get expensive in a hurry. A single worker will run you over $30 a month. [Hirefire][13] will cut by up to two thirds, by dynamically adding and removing workers from your app. You can set a minimum and maximum, so there's no danger of sticker shock.  
    The only downside is that it polls your app about once a minute to determine how many worker dynos it needs to add. If you have jobs waiting to be processed, they may not get run until the next polling cycle. Small price to pay, IMO.

[1]: https://devcenter.heroku.com/articles/newrelic
[2]: https://devcenter.heroku.com/articles/pgbackups#provisioning-the-add-on
[3]: https://devcenter.heroku.com/articles/heroku-postgres-import-export
[4]: https://devcenter.heroku.com/articles/multiple-environments
[5]: https://devcenter.heroku.com/articles/migrate-heroku-postgres-with-pgbackups
[6]: http://daniel.fone.net.nz/blog/2013/05/20/a-better-way-to-manage-the-rails-secret-token/
[7]: https://devcenter.heroku.com/articles/config-vars
[8]: https://devcenter.heroku.com/articles/rails-unicorn
[9]: https://github.com/pry/pry
[10]: https://github.com/charliesome/better_errors
[11]: http://code.macournoyer.com/thin/
[12]: https://devcenter.heroku.com/articles/procfile
[13]: http://hirefire.io/
