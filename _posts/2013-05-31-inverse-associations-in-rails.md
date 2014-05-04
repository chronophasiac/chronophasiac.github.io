---
title: Inverse Associations in Rails
author: infotrope
layout: post
permalink: /2013/05/31/inverse-associations-in-rails/
categories:
  - Ruby on Rails
---
Consider the following association:



Now, imagine you did:

{% highlight ruby %}
    CrazyCatLady.first.cats.first
{% endhighlight %}

OK, this will query the database for the first CrazyCatLady, then query again for all cats associated with that record. Fair enough. But what if we do this:

{% highlight ruby %}
    CrazyCatLady.first.cats.first.crazy_cat_lady
{% endhighlight %}

Aside from being a bit silly, this does everything the first statement does, then queries the database a third time to find the CrazyCatLady associated with the first cat. But Rails already has this information! *Why* is it querying the database again?

Rails is a bit dumb about the inverse of an association. You have to specify that an inverse relationship exists, like so:



With this done, when we issue:

{% highlight ruby %}
    CrazyCatLady.first.cats.first.crazy_cat_lady
{% endhighlight %}

We see that Rails won't query the database a third time. We've told Rails that it already knows about the cat's `crazy_cat_lady`.

So, aside from this contrived example, how are inverse associations useful? Database queries are a precious resource in a web app. Reading and writing to disk are among the most time-intensive activities a server will perform. Too much of these activities, and a queue will start to grow. This results in slow page loads and possibly lost revenue.

Best practice in many Rails shops is to define `inverse_of` on every relationship. There's really no downside, and plenty of potential benefits.
