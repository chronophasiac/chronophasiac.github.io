---
title: When (not) to Nest Resources in Rails
layout: post
tags:
  - Ruby on Rails
---
In Rails, nested resources allow us to generate [RESTful][1] routes for heirarchical resources. If we were designing a blog, there might be a `posts` and a `comments` resource. We might have this in our `routes.rb`:

```ruby
resources :posts do
  resources :comments
end
```

Rails will then generate paths like this: `posts/1/comments/1`. This is all great and useful stuff, but what about something like users and dashboards? We might be tempted to nest the `dashboards` resource under `users`, because dashboards are so closely related to users. There is an important question we must ask ourselves before we implement this scheme, and that is: "Do I expect this resource to be publicly available?". In the case of dashboards, do we intend for users to publicly share their dashboards? In most cases, probably not.

We would prefer to keep our paths as simple as possible. If we do not intend for users to share their dashboards, then there is no good reason to nest. A novice developer might nest under a user resource and use the params of the URL to determine the currently logged in user. However, this presents a security problem, as anyone could pose as any user simply by modifying the URL. Authentication gems like [Devise][2] provide us with helper methods that return the logged in user, which we should be using exclusively if they're available.

[1]: http://en.wikipedia.org/wiki/Representational_state_transfer
[2]: https://github.com/plataformatec/devise
