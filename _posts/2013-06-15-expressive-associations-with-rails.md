---
title: Expressive Associations with Rails
layout: post
comments: true
tags:
  - Ruby on Rails
---
Suppose we have a suspiciously simple Rails blogging app with the following models:

```ruby
class User < ActiveRecord::Base
  has_many  :posts,
            inverse_of: :user

  attr_accessible :name, :email
end
```

```ruby
class Post < ActiveRecord::Base
  belongs_to  :user,
              inverse_of: :posts

  attr_accessible :body, :title
end
```

This done, we could issue:

```ruby
new_user = User.create
new_post = user.posts.create
```

Then, when we call `new_post.user`, we are returned `new_user`. Great! Well&#8230;actually this is OK, but the association could be more explicit about the relationship between Users and Posts. Rails associations allow us to define custom names, like so:

```ruby
class User < ActiveRecord::Base
  has_many  :posts,
            foreign_key: 'author_id',
            inverse_of: :author

  attr_accessible :name, :email
end
```

```ruby
class Post < ActiveRecord::Base
  belongs_to  :author,
              class_name: 'User',
              foreign_key: 'author_id',
              inverse_of: :posts

  attr_accessible :body, :title
end
```

We'll also update our database schema, changing the foreign key in `posts` from `user_id` to `author_id`. Then we'll `rake db:rollback db:migrate`. Now, when we perform the same setup:

```ruby
new_user = User.create
new_post = user.posts.create
```

We can call `new_post.author` and be returned `new_user`. The change is relatively minor, but our code is now easier to comprehend. A new contributor can read the statement `new_post.author` and immediately grasp the intention behind our implementation. Clear, expressive code is easier to read, easier to communicate, and easier to maintain. Awesome!
