---
title: Subtle Rails Backend Gotchas
layout: post
comments: true
tags:
  - Ruby on Rails
---
*   **Presence validation in the model without a schema constraint.**  
    [Presence][1] is one of the most common ActiveRecord validations. In our Rails models, the syntax looks like this:

    ```ruby
    validates_presence_of :attribute
    ```
    
    or this:
    
    ```ruby
    validates :attribute, presence: true
    ```
    
    It simply checks that the attribute is not nil or blank (whitespace). Having presence validated is great, because it frees us from having to nil check any methods that consume our validated attributes.
    
    But what if a future contributor removes that presence validation? Any business logic we've written that depends on our validated attributes might now explode. We can avert a potential disaster by adding `null: false` to the migration, on any attribute that has presence validated:
    
    {% gist 5743942 %}
    
    `Null: false` will cause a database error to be raised if nil is saved on that attribute. This simple step protects the integrity of our data by enforcing our intention on two independent levels of the Rails stack.

*   **Booleans without default values.**  
    A boolean should virtually always have a default value. There are (very) occasional situations where our business logic will depend upon a boolean representing three states: unset, set `false`, and set `true`. In the vast majority of applications, however, you won't need to be sensitive to the unset case. To implement the typical situation of a `false` default value, we would add `default: false` in our migrations:

    {% gist 5711363 %}
    
*   **Incompletely tested migrations.**  
    Here's is an easy one to forget. You've just written a migration, and you're about to `rake db:migrate` to effect the change to the database. But wait! How do you know that your migration will play nice if someone has to roll back (i.e., revert) your changes?
    
    Roll it back, then migrate it right back up!
    
    ```ruby
    rake db:migrate
    rake db:rollback
    rake db:migrate
    ```
    
    If we don't see any errors in the console, we then check our schema.rb and make sure everything looks right. Taking this extra step ensures that any migration we write will behave itself if it needs to be rolled back.</ul>

[1]: http://guides.rubyonrails.org/active_record_validations.html#presence
