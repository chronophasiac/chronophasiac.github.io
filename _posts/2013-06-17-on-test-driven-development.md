---
title: On Test-driven Development
layout: post
tags:
  - Programming
---
Here at [Launch Academy][1], test-driven development is a way of life. Every app we write, no matter how small, is expected to have excellent test coverage from the start. Further, we're expected to practice [outside in development][2]. Our cycle goes like this:

*   Compose user story (the narrative we expect to drive a feature)
*   Draft acceptance criteria (what needs to happen for that narrative to work)
*   Code a failing acceptance test (a script based on an acceptance criteria which emulate user input and watches for a desired output)
*   Write a failing unit test (a program that tests a component required to meet the acceptance criteria)
*   Implement (actual programming. Yay!)

During implementation, our goal is to get our failing unit test to pass. After it is passing, we refactor the unit test and our implementation. Once complete, we can take one step up the chain and write another failing unit test. We bounce back and forth between unit testing and implementation until all the pieces are in place to implement our failing acceptance test. After passing the acceptance test and refactoring, we can proceed to the next acceptance criteria and proceed *back* down the chain. Only after we've iterated through all the acceptance criteria, can we consider the user story (and the feature) implemented.

That's a lot of structure, and it takes **serious** discipline to follow the procedure without skipping steps. The payoff for all that extra initial work is huge. Our tests *document* our code. They prevent us from *reverting*, from writing new code that breaks existing code. And, the tests help us *understand* our code. They isolate points in the application where our mental model of the program diverges from reality.

And that, I believe, is the most valuable function of test-driven development. Our code has no bugs. The machine will only ever execute what we tell it to. It is our brains that need debugging.

[1]: http://www.launchacademy.com/
[2]: http://en.wikipedia.org/wiki/Outside%E2%80%93in_software_development
