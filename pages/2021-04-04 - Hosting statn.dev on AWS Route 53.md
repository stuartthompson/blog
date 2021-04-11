---
title: Hosting statn.dev on AWS Route 53
date: 2021-04-04
---
Setting up a hosted zone using AWS Route 53 for statn.dev.
---

Today I set up a hosted zone for statn.dev on AWS using Route 53. I registered
the domain through Google Domains but wanted to learn more about using Route
53 for hosting.

## Registering Name Servers and Disabling Google's DNSSEC

The first step in Route 53 was to set up a hosted zone (AWS name for a hosted
domain) by providing the statn.dev domain name I'd previously registered with
Google. Easy.

Next I learned about moving to Route 53 was that in order to set up name
servers in Google Domains I had to disable DNSSEC. I hadn't heard the term
before but quickly learned that DNSSEC provides security against DNS poisoning
attacks. I'm no hosting expert, but I've read a couple of blog posts on DNS
poisoning. While I doubt my blog or notes sites will the target of a
coordinated attack, it seems sensible to use the technology and is a good
opportunity to learn about how to set it up.

Disabling DNSSEC on Google Domains was as easy as clicking a button. No problem
there. First step down. Woohoo!

Next came the name servers. I've done that before a few times over the years
with different hosts so this again was a simple step of just copying the urls
for the different name servers from Route 53 into the Google Domains dashboard.

### 48-Hour Wait Period

Google Domains advised me of a 48-hour wait period for DNSSEC to be disabled.
No problem there. I'm not in any hurry to get this finished. I'm assuming that
is the time taken to propogate the DNS information to other caches around the
world.

## Enabling Route 53 DNSSEC

Now that I had the name servers registered with Google Domains, the Google side
would know which name servers to use for statn.dev. They would tell all of the
other devices and machines in the world how to resolve statn.dev. Cool!

However, I wasn't done yet. I'd disabled DNSSEC on the Google side, but I
wanted to learn how to enable it within Route 53. I read up at a very high
level about what DNSSEC does and learned that it establishes a chain of trust
between the registrar (Google Domains) and the host (AWS Route 53). This
prevents bad actors from poisoning the DNS resolution process in between.

### DS Records

In order to enable DNSSEC I had to provide Google Domains with a DS record.
This identifies the public part of a two-part key managed by AWS Route 53. It
is this key that is used to establish the chain of trust.

In order to create a DS record in Google I first had to create a key within
Route 53. Fortunately, the instructions on the AWS site are good. At the time
of writing, those instructions are available [here](
https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-configuring-dnssec-enable-signing.html?icmpid=docs_console_unmapped).

I created a KSK (Key Signing Key) via the Route 53 dashboard and then followed
the instructions to specify the public part of the key as a DS record in
Google Domains.

### The Wait

For now, I have to wait to see if my efforts have worked. Everything shows as
green on both the Google Domains and the AWS Route 53 dashboards, so I believe
that I followed the process correctly. I'll wait the 48 hours for the original
Google DNSSEC to be disabled, the new name server changes to be propagated, and
the new Route 53 DNSSEC keys to be accepted as part of the newly established
chain of trust via the DS record in Google Domains.

I can test that the hosted zone is working by hosting a static home site at
statn.dev. I've got more work to do there yet as I need to register an SSL
certificate for the domain and put up some content to host. However, once that
is all finished (hopefully this week) then I'll have a host to test.

For testing that DNSSEC is working I'll have to go do some learning. I've not
tested that technology before so I'll need to go learn first. Hopefully there
are some tools out there to verify that everything is being secured.
