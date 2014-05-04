---
title: Render Collections Easily With Rails
author: infotrope
layout: post
permalink: /2013/07/26/render-collections-easily-with-rails/
categories:
  - Ruby on Rails
---
A typical Rails [CRUD][1] app will have an index. The index will list a collection of resources, like blog posts. In our `index.html.erb` view, we might do this:

    <% @posts.each do |post| %>
      <%= post.title %>
    <% end %>
    

This will list out the titles for each of our blog posts. However, there is a more elegant way which leverages Rails' defaults. If we instead do this:

    <%= render @posts %>
    

Rails will look for a partial in the `app/views/posts` directory with a name equal to the model name. If the model name is `Post`, Rails would look for a file named `_post.html.erb`. We might write it like this:

    <%= post.title %>
    

By default, Rails provides us with a local variable with the same name as the partial. For more information, check out [the documentation][2].

[1]: http://en.wikipedia.org/wiki/Create,_read,_update_and_delete
[2]: http://guides.rubyonrails.org/layouts_and_rendering.html#rendering-collections
