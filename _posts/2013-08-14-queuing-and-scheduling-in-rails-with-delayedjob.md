---
title: Queuing and Scheduling in Rails with Delayed::Job
author: infotrope
layout: post
permalink: /2013/08/14/queuing-and-scheduling-in-rails-with-delayedjob/
categories:
  - Ruby on Rails
---
Rails has several popular options for queuing or scheduling tasks. When I was looking at the alternatives for my app [TimeVault][1] I was faced with something of a difficult choice. Two of the most popular libraries, [Resque][2] and [Sidekiq][3], require Redis. At the time, I didn't want to mess around with an additional component to deploy, so I used [Delayed::Job][4] instead.

Delayed::Job (DJ) supports [multiple backends][5]. Most importantly for our purposes, it has solid support for ActiveRecord. There are performance reasons for choosing Redis over ActiveRecord, but for a small learning app these are typically safe to ignore.

TimeVault allows users to set [Pomodoro][6] timers and receive alerts when they are complete. Each timer has one or more Intervals with a start and stop time. When a timer starts, an Interval is created, which then creates an `IntervalWorker`:

    def create_interval_worker
      Delayed::Job.enqueue(IntervalWorker.new(id), run_at: when_to_run)
      save
    end
    

DJ supplies an `enqueue` class method. Here, I'm passing in a new `IntervalWorker` and using the `run_at` option to delay instantiation of the worker until the interval expires. DJ expects enqueued objects to have a `perform` method that will be called on execution. Here, the `IntervalWorker` calls `complete!` on the interval that created it.



`complete!` ends the interval by setting its `end` attribute to the current time. Note how the service object, `IntervalWorker`, is quite simple. All the actual logic is built into the model, `Interval`. This is an example of [separation of concerns][7]. Modifying the `Interval` is not a concern of the `IntervalWorker`.

I highly recommend the [Delayed::Job RailsCast][8] to get started with DJ. Good luck!

[1]: http://www.gotimevault.com/
[2]: https://github.com/resque/resque
[3]: https://github.com/mperham/sidekiq
[4]: https://github.com/collectiveidea/delayed_job
[5]: https://github.com/collectiveidea/delayed_job/wiki/backends
[6]: http://en.wikipedia.org/wiki/Pomodoro_Technique
[7]: http://en.wikipedia.org/wiki/Separation_of_concerns
[8]: http://railscasts.com/episodes/171-delayed-job
