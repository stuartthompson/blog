---
title: Setting up a CloudFront Distribution for an S3 Static Website
date: 2021-04-06
---
Today I configured a CloudFront Distribution to expose my notes statn, which is
hosted as a static website stored in an S3 bucket. This allows viewers to read
the static content via the distribution without having access to the underlying
S3 bucket. The distribution provides faster, cached access, and decouples the
viewer from the actual content location.
---

The process was fairly simple, once I got my head around how the pieces fit
together.

I created this note to document the process of permitting CloudFront to access
the S3 bucket while restricting other access:
[Note: Configuring a CloudFront OAI for S3 Access](
https://notes.statn.dev/hosting/aws/cloudfront/origin-access-identity.html)

## Automatically appending index.html

I verified that the site was available via CloudFront but not available via S3
directly:

Accessing via S3:\
(screenshot of denied access here)

Accessing via CloudFront:\
(screenshot of cloudfront endpoint)

Accessing via the A record:\
(screenshot of notes.statn.dev)

