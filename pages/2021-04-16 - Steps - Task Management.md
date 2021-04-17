---
title: Steps - Task Management System
date: 2021-04-16
---
I started work today on a task management system. I don't particularly need a
new task management system. I have several options I'm quite happy with. It
just sounds fun to write one.
---

I've used many task management systems over the years. Many have met my needs.
I find the problem of task management systems quite interesting and I've long
been curious to write my own. Today I decided to start work on Steps, loosely
backronym'd as Stu Thompson's Epic Priority System. Mostly I just picked a name
that had something to do with task management and sounded cool to me.

## System Design

Rather than just wading into the coding, I'm going to start by writing out some
design notes and architecture documentation. I'd like to get a feel for how the
pieces fit together before I start writing any code.

I'm going to start by creating some documentation at a new [Steps Doc Site](
https://docs.statn.dev/steps). I haven't created the statn docs site yet but
now that I've learned about how to [set up static S3/Cloudfront sites](
https://blog.statn.dev/2021-04-06%20-%20CloudFront%20Distribution%20for%20an%20S3%20static%20website.html)
it shouldn't be that hard to do.

My plan for now is to start working on the content and then create the docs
site once I have my initial thoughts written down.

## Client & Server

I'm planning to build both a client and server component. The client is used to
create and update tasks while the server will provide task storage and
synchronization services. Initial thoughts are to have the server be the source
of truth and use a [test and set](https://en.wikipedia.org/wiki/Test-and-set)
system to prevent different clients from overwriting each other. More to come
as I flesh that out over the coming weeks.

