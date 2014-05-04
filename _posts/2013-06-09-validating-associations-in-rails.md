---
title: Validating Associations in Rails
author: infotrope
layout: post
permalink: /2013/06/09/validating-associations-in-rails/
categories:
  - Ruby on Rails
---
Validating our Rails associations can be a balancing act. Insufficient validation can lead to garbage in the database. Overzealous validation can lead to needless complexity. Here are a few lessons I've learned:

*   **Validate presence\_of where there is a belongs\_to**. Consider the crazy cat lady:
    
    
    
    Should a `cat` exist independently of a `crazy cat lady`? Philosophical ramifications aside, we'll say no. Since we only really care about tracking crazy cat ladies, the cats are only important inasmuch as they relate to their ladies. The `belongs_to` is a guide that we probably want to validate `presence_of`, like so:
    
    
    
    Why aren't we also validating `presence_of` the foreign key (`crazy_cat_lady_id`)? We'll see in a moment.

*   **Use not null constraints for foreign keys**. Since we're validating presence of the `crazy_cat_lady` on a `cat`, we should also make sure that a foreign key is present on the `cat` database entry. In this case, the foreign key is just the primary key (the `id`) of a `crazy_cat_lady` that is stored with a `cat`, to let Rails know where the association is stored.  
    We *could* do this in the `Cat` model:
    
        validates_presence_of :crazy_cat_lady_id
        
    
    But this is going to make our development more difficult later on. Let's say we want to create a new `crazy_cat_lady` and give her a `cat` all in one database transaction, like so:
    
        new_lady = CrazyCatLady.new
        new_cat = new_lady.cats.new
        new_cat.save!
        
    
    This would raise an error! Since we're validating presence of the `crazy_cat_lady` foreign key in the model, and the `crazy_cat_lady` hasn't yet been saved (which would generate the `id`), the validation fails. Instead of validating presence of the foreign key in the model, let's add a database constraint:
    
    
    
    Notice the `null: false` in our migration. This enforces our intent to prohibit null values for the foreign key on the database layer of the Rails stack. A nil foreign key will now pass model validation, but it will raise an exception if it is saved to the DB. Effecting this change, when we again issue:
    
        new_lady = CrazyCatLady.new
        new_cat = new_lady.cats.new
        new_cat.save!
        
    
    It works! Rails has done something a bit clever here, saving the `new_lady` to the database automatically, before saving the `new_cat`. Once the `new_lady` is saved and has a primary key, it uses that for the `new_cat`&#8216;s foreign key. Neat!

*   **Optionally, use foreign key constraints**. This is a bit more advanced. SQL databases like [PostgreSQL][1] and [MySQL][2] allow you to specify foreign key constraints. The database will make sure that any foreign key with this constraint matches to a corresponding primary key in the table you specify. Doing this helps to maintain [referential integrity][3]; it makes it less likely that our database will have foreign keys pointing to wrong entries, or worse, non-existant entries.
    
    I use [Foreigner][4], a gem that nicely simplifies the process. After including it in our gemfile and running `bundle install`, we could add the following line to our `Cat` migration:
    
        t.foreign_key :crazy_cat_ladies
        
    
    Here, we're just specifying the name of the table that holds the primary key of our association. Now, when we run the migration, Foreigner will instruct our database to apply the corresponding foreign key constraints. That's all there is to it!

[1]: http://www.postgresql.org/
[2]: http://www.mysql.com/
[3]: http://en.wikipedia.org/wiki/Referential_integrity
[4]: https://github.com/matthuhiggins/foreigner
