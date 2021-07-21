---
title: The WSL romance might be over
date: 2021-07-21
---
I've been using WSL for over a year now as part of my primary development
environment setup. I bounce between WSL development on Windows and working on
my Ubuntu laptop. At the start, all was going well. Things have changed.
---

# WSL and the Well-Walked Paths

Regardless of where you fall on the technology idelology scale, most have to 
admit that the [Windows Subsytem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) is a really impressive technological feat. The
operating system is filled with so many core assumptions about how software
will behave that emulating even a small portion of its core functionality is
unfathomably difficult. I have utter respect for the teams at Microsoft that
built this and continue to support and extend its features.

That said, as a user, I think I've reached my last straw. I've been developing
using WSL for over a year now. It is a core part of my development workflow,
and I split my time between Ubuntu via WSL2 on my Windows desktop machine and using Ubuntu directly on my Linux development laptop. There were always little
gaps and niggles, but for the most part I was able to move between the two
environments relatively seemlessly and without too many glaring issues.

## The GUI Problem

Over time my use cases have developed and the complexity of the software tasks
I'm performing have matured. There are an increasing number of issues that I've
begun to encounter for which WSL2 does not yet have a good solution. Most of
these are related to the same issue, that WSL is really just a terminal-level
environment. There is not yet support for GUIs or a concept of displays.

This hasn't been a huge problem thus far. I definitely missed using i3 when
working on my Windows machine. I've become rather enamored of my workflow on
my Linux laptop with that window manager and a couple of other tools that
require an actual display to function. Those weren't the breaking point. A
window manager is just that, something to tile and manage different render
surfaces for different applications. I can work in a terminal and with WSL
integrations with tools like [VSCode](https://code.visualstudio.com/) just fine.

Where the real cracks started to emerge was in developing software requiring
dependencies that either use or require the presence of an actual display. The
first time I encountered this was in developing a VSCode extension. It wouldn't
seem at first as though GUI capabilities were needed. VSCode runs on the Windows
host directly and uses a remote connection feature to connect back to the WSL
Ubuntu environment. Except when you want to run automated tests. The VSCode
runtime in that case can't be launched from WSL due to the way the integration
works. It relies upon automation libraries that assert a display is present.
There are other dependency problems, too. Libraries that would use displays
aren't always available on WSL2, so dependency chains begin to fail even for
use cases that wouldn't ever actually need the display.

It's for these reasons that I've repurposed a second laptop as an Ubuntu
machine at home that I can connect to my main display, keyboard, and mouse.
This way I can keep working at my desk on my big monitor and use the new laptop
as though I were working in WSL in Windows (albeit with a KM switch and monitor
input switch). I can keep my Linux laptop mobile and avoid wiring it into my
desk. Apart from having to click a switch on my monitor, and press a button on
my KM switch unit, it will be almost as seamless and convenient as the WSL
solution was. I'll miss the Windows File Explorer integration, but that's a
very minor use case and not something that will seriously impede progress.

So, for now, I must bid adieu to WSL. I have high hopes for WSLg when it is
more stable and generally available, but for now I need to get back to a focus
on development vs. spending my time working out kinks in the development
environment cycle. It's a time consuming process. I've easily spent a hundred
hours in the last two months trying to get WSL to work for more advanced cases.
That's enough for now. I want to get back to actually writing code.