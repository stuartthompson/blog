---
title: Requesting and Validating SSL Certificates in AWS
date: 2022-05-26
---
Setting up a hosted zone using AWS Route 53 for statn.dev.
---

# Requesting a Certificate
Request a certificate by visiting: [Request certificate](https://us-east-1.console.aws.amazon.com/acm/home?region=us-east-1#/certificates/request).

Note that certificates *must* be created in us-east-1 if they are to be used by CloudFront distributions. This is an AWS restriction.

Click the View Certificate button to view the certificate and begin the validation process.

![Certificate Requested](https://resources.statn.dev/images/blog/2022-05-26-AWS-Certificate-Reissue/2022-05-26%20-%20AWS%20Certificate%20-%20Requested.png)

## Certificate Validation
Once the certificate has been requested it must be validated before being ready for use.

Click "Create Records in Route 53" to open a wizard that will create the records automatically.

![Create Records in Route 53](https://resources.statn.dev/images/blog/2022-05-26-AWS-Certificate-Reissue/2022-05-26%20-%20AWS%20Certificate%20-%20Create%20Records%20in%20Route%2053.png)

Click Create Records to have the CNAME records created in Route 53 automatically.

![Create Records](https://resources.statn.dev/images/blog/2022-05-26-AWS-Certificate-Reissue/2022-05-26%20-%20AWS%20Route%2053%20-%20Create%20Records.png)

Verify that the CNAME records are registered on the domain.

![Route 53 - Create CNAME Records](https://resources.statn.dev/images/blog/2022-05-26-AWS-Certificate-Reissue/2022-05-26%20-%20AWS%20Route%2053%20-%20CNAME%20Records.png)

## Verify the Certificate
The certificate should now show as Issued and be eligible for renewal.

![Certificate Renewable](https://resources.statn.dev/images/blog/2022-05-26-AWS-Certificate-Reissue/2022-05-26%20-%20AWS%20Certificate%20-%20Renewal%20Eligible.png)

## Update Cloudfront Distributions
Once the certificate is validated, navigate to the list of Cloudfront distributions.

![CloudFront - List of Distributions](https://resources.statn.dev/images/blog/2022-05-26-AWS-Certificate-Reissue/2022-05-26%20-%20AWS%20CloudFront%20-%20List%20of%20Distributions.png)

Select a distribution to from the list. This opens the details page for that distribution.

![CloudFront - Edit Distribution](https://resources.statn.dev/images/blog/2022-05-26-AWS-Certificate-Reissue/2022-05-26%20-%20AWS%20CloudFront%20-%20Edit%20Distribution.png)

From the details page click the Edit button in the Settings section.

![CloudFront - Update Distribution Certificate](https://resources.statn.dev/images/blog/2022-05-26-AWS-Certificate-Reissue/2022-05-26%20-%20AWS%20CloudFront%20-%20Update%20Distribution%20Certificate.png)

Update the certificate under "Custom SSL Certificate - optional".
