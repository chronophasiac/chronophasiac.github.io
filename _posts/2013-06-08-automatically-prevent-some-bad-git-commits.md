---
title: Automatically Prevent (Some) Bad Git Commits
tags:
  - Tools
---
Some bad Git commits you can't prevent. I'm talking about the ugly, last-minute implementations that pass the test suite but will give you nightmares for days. Or commits with nasty bugs that will only reveal themselves days later on a corner case.

Some bad commits, though, you absolutely can prevent. And there's a way to automatically prevent them, every time you invoke `git commit`: [Git hooks][1].
<span id="more"></span>

<div style="float:right; padding:10px" about='http://farm7.static.flickr.com/6003/5983674326_98267a75dd_m.jpg'>
  <a href='http://www.flickr.com/photos/nomadic_lass/5983674326/' target='_blank'><img xmlns:dct='http://purl.org/dc/terms/' href='http://purl.org/dc/dcmitype/StillImage' rel='dct:type' src='http://farm7.static.flickr.com/6003/5983674326_98267a75dd_m.jpg' alt='Hooked by Nomadic Lass, on Flickr' title='Hooked by Nomadic Lass, on Flickr' border='0' /></a><br /><a rel='license' href='http://creativecommons.org/licenses/by-sa/2.0/' target='_blank'><img src='http://i.creativecommons.org/l/by-sa/2.0/80x15.png' alt='Creative Commons Attribution-Share Alike 2.0 Generic License' title='Creative Commons Attribution-Share Alike 2.0 Generic License' border='0' align='left' /></a>&nbsp;&nbsp;by&nbsp;<a href='http://www.flickr.com/people/nomadic_lass/' target='_blank'>&nbsp;</a><a xmlns:cc='http://creativecommons.org/ns#' rel='cc:attributionURL' property='cc:attributionName' href='http://www.flickr.com/people/nomadic_lass/' target='_blank'>Nomadic Lass</a><a href='http://www.imagecodr.org/' target='_blank'>&nbsp;</a>
</div>

Git hooks come in two main varieties, client-side and server-side. I'll only be referring to the client-side hooks here. Basically, a Git hook is a script that is run at any one of several points in the Git workflow. The hook we'll be examining here is the "pre-commit" hook that fires off just after you execute `git commit`. It runs before you're asked for a commit message or even given the default message.

Bob Gilmore has an <a href="https://github.com/bobgilmore/githooks" rel="nofollow">excellent collection</a> of these pre-commit hooks. You clone the repo in your home directory, then run `setup.sh` followed by the path to the Git repo you'd like to install the hooks into. Once that's done, every time you commit in that repo, Bob's script will check every committed file for:

*   Pry calls: (`binding.pry`)
*   Stray Git merge conflict markers: (`>>>>`,`<<<<`,`====`)
*   Strings like `PRIVATE KEY` that might mean you've accidentally committed your private SSH key. Oops.
*   Various other logging and debugging calls that you usually don't want in production code.

I've <a href="https://github.com/mikeraimondi/githooks" rel="nofollow">forked the project</a> to add a couple of nasty little buggers that I certainly have never, ever committed, no sir:

*   [Launchy][2] `save_and_open_page` calls
*   [Ruby debugger][3] calls

If any of these warning signs are detected in the code that's about to be committed, the script will throw up a warning with the file name(s) and abort the commit. For example:

```bash
  Error: git pre-commit hook forbids committing lines with "debugger" to spec/features/test_spec.rb
  --------------
  To commit anyway, use --no-verify
```

Then, you can either remove the offending code or run `git commit --no-verify` to bypass the checks. Pretty great, huh?

[My githooks fork][4]

[Bob Gilmore's original githooks][5]

[1]: http://git-scm.com/book/en/Customizing-Git-Git-Hooks
[2]: http://rubygems.org/gems/launchy
[3]: https://github.com/cldwalker/debugger
[4]: https://github.com/mikeraimondi/githooks
[5]: https://github.com/bobgilmore/githooks
