---
title: On Top of Spaghetti, All Covered With Cheese
tags:
  - Programming
---
> I say we take off and nuke the entire site from orbit. It's the only way to be sure.
>
> <cite><a href="http://www.imdb.com/title/tt0090605/?ref_=sr_2">Ellen Ripley</a></cite>

You thought implementing the code would be relatively easy. You thought you could bang it out in an hour and be done. You thought you'd make it home on time today. You were wrong.

And now, you've got a big heaping plate of spaghetti code in front of you. That is, your code is massively interdependent and there is no clear way forward to testing small, understandable parts of the code. How did you get in this mess? What would prevent it from happening again? And how the heck are you going to fix all this barely intelligible code?
<span id="more"></span>

The temptation to rework spaghetti code is strong. It is a perfect example of the [sunk cost fallacy][1], where we "throw good money after bad" and dig ourselves deeper into holes of time debt. The more time we invest in bad code, the more we may feel obligated to "make it right".

<div style="float:left" about='http://farm2.static.flickr.com/1243/824608884_c02e6978bd_m.jpg'>
  <a href='http://www.flickr.com/photos/jshj/824608884/' target='_blank'><img xmlns:dct='http://purl.org/dc/terms/' href='http://purl.org/dc/dcmitype/StillImage' rel='dct:type' src='http://farm2.static.flickr.com/1243/824608884_c02e6978bd_m.jpg' alt='Spaghetti and Meatballs (explore) by jshj, on Flickr' title='Spaghetti and Meatballs (explore) by jshj, on Flickr' border='0' /></a><br /><a rel='license' href='http://creativecommons.org/licenses/by/2.0/' target='_blank'><img src='http://i.creativecommons.org/l/by/2.0/80x15.png' alt='Creative Commons Attribution 2.0 Generic License' title='Creative Commons Attribution 2.0 Generic License' border='0' align='left' /></a>&nbsp;&nbsp;by&nbsp;<a href='http://www.flickr.com/people/jshj/' target='_blank'>&nbsp;</a><a xmlns:cc='http://creativecommons.org/ns#' rel='cc:attributionURL' property='cc:attributionName' href='http://www.flickr.com/people/jshj/' target='_blank'>jshj</a><a href='http://www.imagecodr.org/' target='_blank'>&nbsp;</a>
</div>

As a developer in training, this situation happens more than I care to admit. I find the most reliable way forward is to just nuke it all. Comment out the spaghetti if you must. The key is to take *all* the spaghetti out of the equation. This may mean losing hours of blood, sweat, and tears. This may mean a total rewrite. It will not be pleasant, at first.

Resisting the urge to work with your existing bad code is even more difficult when you are in an [exhausted state][2]. As I mentioned in the post, one strategy here is to step away and regain your mental energy. Come back with a fresh mind, and a clean text editor window. Approach the problem without the weight of your bad code on your shoulders.

One of the keys to avoiding spaghetti code is to write the least amount of testable code before you start getting feedback. [Test driven development][3] takes this to the extreme by guiding us towards writing no code at all before testing. Not everyone follows TDD, and even the most stringent TDD acolyte may find themselves writing code before tests in ad-hoc situations. So, what is the least amount of testable code, and how do we notice when code is growing past our capacity to understand it?

Since I'm still honing this reflex, I'm forced to be a bit vague here. Developers sometimes call it the "code smell". Some features of a bad code smell:

*   Too much logic, too little API: this might mean you've strung together a bunch of "ifs". It might mean you've got lots of lines that depend on previous code, all in the same function. This is a great opportunity to break your code into smaller, testable functions. It also gives you a chance to examine what data you expect to be passed between logical sub-units. Maybe you don't need to pass the entire object you're working on. Perhaps you can pass a member?

*   You've been writing code for more than 30 minutes without running the code or testing: Pretty self-explanatory. [Pomodoros][4] provides structured breaks and might help you catch yourself in this trap

As the [saying][5] goes: <cite>fail early, fail often</cite>. Failing tests and negative compiler feedback keep us tied to our code. Without that bond, we become lost.

[1]: http://lesswrong.com/lw/at/sunk_cost_fallacy/
[2]: http://www.unlimited-code-works.com/2013/05/06/unexhaustion/
[3]: http://en.wikipedia.org/wiki/Test-driven_development
[4]: http://en.wikipedia.org/wiki/Pomodoro_Technique
[5]: http://www.codinghorror.com/blog/2006/05/fail-early-fail-often.html
