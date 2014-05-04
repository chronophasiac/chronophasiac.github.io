---
title: Getting Started with Backbone.js on Rails
author: infotrope
layout: post
permalink: /2013/07/06/getting-started-with-backbone-js-on-rails/
categories:
  - JavaScript
  - Ruby on Rails
---
Going from near-zero experience with front-end MVC frameworks to a functional Backbone app has been something of a rough ride. I thought I'd share some lessons I've learned along the way. Keep in mind that I'm still learning, so much of this will be wrong. Corrections are welcome.

*   **Setup** It is relatively easy to [download][1] and manually install Backbone by copying the relevant files to your `javascripts` directory. I chose to use the [backbone-on-rails][2] gem instead, for reasons I'll describe in a moment. This is not to be confused with [backbone-rails][3] which I avoided because it vendors an older version of Backbone.
    
    Using the gem hooks up Backbone to the [asset pipeline][4], which should improve page load times in production. It also provides us with a nice generator. After adding `backbone-on-rails` to the Gemfile, we can execute the following:
    
        bundle install
        rails g backbone:install
        rails g backbone:scaffold MODEL
        
    
    Passing in the name of the model, the generator will construct a directory structure and boilerplate files under `app/assets/javascripts`.

*   **We put an MVC in your MVC** The generated directories have a familiar structure, coming from Rails. Models is fairly self-explanatory. Views in Backbone are a little different and a fair bit more complex than in Rails. They tend to hold much more logic than a Rails view should. Further, they delegate presentation to a *template*. Backbone-on-Rails sets us up with a [JST][5] template for each view.
    
    Confusingly, JavaScript templates are much more like a traditional Rails view than Backbone views. You'll find the generated template in `app/assets/templates`, since JavaScript templates are not themselves JavaScript files. The final two directories are routers and collections, which I'll go over next.

*   **Collections and routers** Backbone collections have no direct analogue in the Rails world. They are, basically, arrays of Backbone models. Since a major function of Backbone is syncing remote objects with the front end, collections are an important tool for keeping our objects organized.
    
    The generator has also given us a router. Routers in Backbone are similar to Rails controllers. Unlike a Rails controller, there's very little magic to make our lives easier. These two lines are critical to understanding how a router works:
    
        view = new App.Views.ModelAction(collection: @someCollection, model: @someModel)
        $('.container').html(view.render().el)
        
    
    The first line is instantiating a new view, and passing in a collection and model. Note that `collection` and `model` are special keywords. They will be made available to the view directly, whereas passing in arbitrary key-value pairs can and will result in hair-pulling.
    
    The second line is calling jQuery to update the DOM, replacing the contents of the `.container` element with the return value from `view.render()`. What that will be depends upon how we write the `render` function in the view. Typically, the render function will invoke the template, which will then be inserted into the DOM.

Phew! This just scratches the surface of Backbone.js. If you'd like to learn more, there are two excellent (and paywalled, unfortunately) RailsCasts: [#323][6] and [#325][7] that were incredibly helpful to me. Good luck!

[1]: http://backbonejs.org/
[2]: https://github.com/meleyal/backbone-on-rails
[3]: https://github.com/codebrew/backbone-rails
[4]: http://guides.rubyonrails.org/asset_pipeline.html
[5]: https://code.google.com/p/trimpath/wiki/JavaScriptTemplates
[6]: http://railscasts.com/episodes/323-backbone-on-rails-part-1
[7]: http://railscasts.com/episodes/325-backbone-on-rails-part-2
