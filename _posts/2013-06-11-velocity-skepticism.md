---
title: Velocity Skepticism
author: infotrope
layout: post
permalink: /2013/06/11/velocity-skepticism/
categories:
  - Development
---
[Velocity][1], in the [Agile][2] sense of the word, is a measurement of the number of user stories completed in a period of time. I'm very new to the concept, but I'm immediately skeptical for the following reasons:

*   Technical debt is nowhere represented in the velocity model. In fact, optimizing for short-term velocity will tend to *accumulate* technical debt. The incentive here is toward shortsighted implementations that will satisfy the acceptance criteria, with less care taken to accommodate future requirements.

*   Because velocity can be so misleading, it is often abstracted away from stakeholders. The measurement also tends to be too technical to be exposed to corporate officers. Given that velocity will tend to be used internally within a development group, why not express more of the complexity and uncertainty of the development process?

<div style="float:right; padding-left:15px" about='http://farm4.static.flickr.com/3261/2686928821_228c1bdb1c_m.jpg'>
  <a href='http://www.flickr.com/photos/art-sarah/2686928821/' target='_blank'><img xmlns:dct='http://purl.org/dc/terms/' href='http://purl.org/dc/dcmitype/StillImage' rel='dct:type' src='http://farm4.static.flickr.com/3261/2686928821_228c1bdb1c_m.jpg' alt='F-15 climbing hard by ArtBrom, on Flickr' title='F-15 climbing hard by ArtBrom, on Flickr' border='0' /></a><br /><a rel='license' href='http://creativecommons.org/licenses/by-sa/2.0/' target='_blank'><img src='http://i.creativecommons.org/l/by-sa/2.0/80x15.png' alt='Creative Commons Attribution-Share Alike 2.0 Generic License' title='Creative Commons Attribution-Share Alike 2.0 Generic License' border='0' align='left' /></a>&nbsp;&nbsp;by&nbsp;<a href='http://www.flickr.com/people/art-sarah/' target='_blank'>&nbsp;</a><a xmlns:cc='http://creativecommons.org/ns#' rel='cc:attributionURL' property='cc:attributionName' href='http://www.flickr.com/people/art-sarah/' target='_blank'>ArtBrom</a><a href='http://www.imagecodr.org/' target='_blank'>&nbsp;</a>
</div>

I'm reminded of airspeed and altitude. Aircraft can trade airspeed for altitude, and vice versa. Technical debt is a bit like altitude. Technical debt can be taken on to increase velocity, just as aircraft can dive to gain airspeed. When velocity is reduced due to refactoring and debugging, is is analogous to an aircraft "bleeding speed" by climbing. The optimal condition is low technical debt and high velocity, just as an aircraft at cruising altitude and airspeed is at its most efficient. A project high in technical debt and low in velocity is in trouble, like an aircraft flying low and slow is at risk of stalling and crashing.

The metaphor is imperfect, but I still think a compound measurement or multiple independent measurements would be strictly superior to the current notion of velocity.

[1]: http://guide.agilealliance.org/guide/velocity.html
[2]: http://agilemanifesto.org/
