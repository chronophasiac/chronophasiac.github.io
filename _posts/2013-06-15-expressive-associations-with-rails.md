---
title: Expressive Associations with Rails
layout: post
comments: true
tags:
  - Ruby on Rails
---
Suppose we have a suspiciously simple Rails blogging app with the following models:

{% gist 5786823 %}

{% gist 5786829 %}

This done, we could issue:

```ruby
new_user = User.create
new_post = user.posts.create
```

Then, when we call `new_post.user`, we are returned `new_user`. Great! Well&#8230;actually this is OK, but the association could be more explicit about the relationship between Users and Posts. Rails associations allow us to define custom names, like so:

{% gist 5786858 %}

{% gist 5786861 %}

We'll also update our database schema, changing the foreign key in `posts` from `user_id` to `author_id`. Then we'll `rake db:rollback db:migrate`. Now, when we perform the same setup:

```ruby
new_user = User.create
new_post = user.posts.create
```

We can call `new_post.author` and be returned `new_user`. The change is relatively minor, but our code is now easier to comprehend. A new contributor can read the statement `new_post.author` and immediately grasp the intention behind our implementation. Clear, expressive code is easier to read, easier to communicate, and easier to maintain. Awesome!
