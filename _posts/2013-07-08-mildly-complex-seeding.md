---
title: Mildly Complex Rails Seeding with YAML
layout: post
tags:
  - Ruby on Rails
---
It's crunch time here at [Launch Academy][1]. Our projects have to be up and running with databases that will, you know, actually *show off* the functionality that we've worked 10 weeks to achieve. This means seeding, and depending on the complexity of our models and associations, seeding can go from a simple one-line script to, well, something like this:

{% gist 5954150 %}

This is the seeder for my project: [Memworks][2]. A major part of the app is lessons, each of which has assignments and challenges. There's a lot of content, and my first approach was to just shove it all in big Ruby objects and `require` the relevant source files. I decided to shift to a [YAML][3] approach when the Ruby hashes became so large as to become unwieldy.

Since YAML supports arrays, we can leverage this to indicate associations in our models. Memworks lessons are YAML files with a structure like this:

```yaml
title: "some title"
summary: "some summary"

assignments:
-
  title: "first assignment"
-
  title: "second assignment"
```

My script iterates through these YAML arrays and associates the assignments with their parent lesson. This is extremely handy with multiply nested hierarchies like mine, because YAML files are easily read and easily edited. Also, there's great support for [multiline strings][4]. Multiline strings in YAML are smart about their indent level, so unlike Ruby, you don't have to de-indent your big blocks of text.

Happy seeding!

[1]: http://www.launchacademy.com/
[2]: http://www.memworks.com/
[3]: http://www.yaml.org/
[4]: http://michael.f1337.us/2010/03/30/482836205/
