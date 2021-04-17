---
title: CloudFront Distribution for an S3 Static Website
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

## Hosting a Static Website in S3

I covered the process for hosting a static website in S3 [here](
).

## Restricting Access to CloudFront Only

I created [this note](
https://notes.statn.dev/hosting/aws/cloudfront/origin-access-identity.html)
to document the process of permitting CloudFront to access the S3 bucket while
restricting other access.


