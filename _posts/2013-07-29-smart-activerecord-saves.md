---
title: Smart ActiveRecord Saves
layout: post
comments: true
tags:
  - Ruby on Rails
excerpt: <p>We can leverage ActiveRecord's intelligence to minimize database requests.</p>
---
Imagine you have the following models in a Rails app:

```ruby
class Car
  has_many :wheels
end

class Wheel
  belongs_to :car
end
```

You could instantiate and save a new car with wheels like so:

```ruby
car = Car.create
4.times { car.wheels.create }
```

What if we want to save the car and its wheels to the database as a single [transaction][1]? This might be important if we never want a car to be saved to the database without wheels. Makes sense, right? Here's how we could do that:

```ruby
car = Car.new
4.times { car.wheels.build }
car.save
```

The `build` method instantiates and associates new `wheel` objects, but does not persist them to the database. ActiveRecord is smart about deferring persistence in this way. When you call `save` on the parent object, `car`, ActiveRecord will also call `save` on the child objects. A handy pattern to use with closely coupled objects!

[1]: http://en.wikipedia.org/wiki/Database_transaction
