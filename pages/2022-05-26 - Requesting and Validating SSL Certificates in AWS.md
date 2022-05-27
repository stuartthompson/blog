---
title: Refreshing an Expired SSL Certificate in AWS
date: 2022-05-26
---
Today I had to refresh the SSL certificate for the statn.dev domain. It had expired because one year passed since it was issued and I'd foolishly removed the CNAME records that would be used to automatically refresh it.
---

# The System is Down
This morning I went to look for a note in my notebook and received an error that the certificate could not be validated for statn.dev. It didn't take long to realize what had happened. I set up the site about a year ago and clearly the SSL certificate had expired.

However, I was a little surprised that the certificate had not been automatically refreshed as I thought that was something that AWS Certificate Manager and Route 53 would take care of.

## Finding the Problem
I logged into the AWS console and found the issue fairly quickly. The certificate was indeed expired. It was also listed as ineligible for automatic renewal. After searching for a few minutes I found that the automatic renewal only works if the CNAME records used to validate ownership of the domain are present.

I remember creating the CNAME records when I first requested the certificate. I must have deleted them after the certificate was validated. I hadn't realized when I was cleaning up those records that I was also removing the mechanism for reissuing the certificate.

## Fixing the Problem
I decided that it wouldn't be bad to get a refresher on how to issue the certificate, since learning about AWS resources was one of the primary reasons I created the site in the first place. 

## Requesting a Certificate
Request a certificate in the [AWS Certificate Manager](https://us-east-1.console.aws.amazon.com/acm/home?region=us-east-1#/certificates/request).

Note that certificates *must* be created in us-east-1 if they are to be used by CloudFront distributions. This is an AWS restriction. I remember making this mistake the first time and it's not immediately clear why the certificate isn't available in the Cloudfront distribution editor later on.

Fill out the details for the certificate, including any additional names required. Note that this will work for a wildcard name. I register the *.statn.dev name so that I can use subdomains for different distributions.

Click to request the certificate and a banner will display at the top of the page confirming that the certificate request has been created. Then click the View Certificate button to view the certificate and begin the validation process.

![Certificate Requested](https://resources.statn.dev/images/blog/2022-05-26-AWS-Certificate-Reissue/2022-05-26%20-%20AWS%20Certificate%20-%20Requested.png)

## Certificate Validation
Once the certificate has been requested it must be validated before being ready for use. I used the Domain Validation option, which involves creating a few CNAME records to prove that you own the domain. If the domain is registered in Route 53 then there is an automatic creation process that makes it very simple.

Click the "Create Records in Route 53" to open the wizard that will create the records automatically.

![Create Records in Route 53](https://resources.statn.dev/images/blog/2022-05-26-AWS-Certificate-Reissue/2022-05-26%20-%20AWS%20Certificate%20-%20Create%20Records%20in%20Route%2053.png)

Click the Create Records button to have the CNAME records created in Route 53 automatically.

![Create Records](https://resources.statn.dev/images/blog/2022-05-26-AWS-Certificate-Reissue/2022-05-26%20-%20AWS%20Route%2053%20-%20Create%20Records.png)

Next I verified that the CNAME records are registered on the domain.

![Route 53 - Create CNAME Records](https://resources.statn.dev/images/blog/2022-05-26-AWS-Certificate-Reissue/2022-05-26%20-%20AWS%20Route%2053%20-%20CNAME%20Records.png)

These are the records I cleaned up the first time. I'm going to leave them there this time around.

## Verify the Certificate
Returning to the Route 53 dashboard, I verified that the certificate was issued and is eligible for renewal.

![Certificate Renewable](https://resources.statn.dev/images/blog/2022-05-26-AWS-Certificate-Reissue/2022-05-26%20-%20AWS%20Certificate%20-%20Renewal%20Eligible.png)

## Update Cloudfront Distributions
Once the certificate is validated, navigate to the list of Cloudfront distributions.

![CloudFront - List of Distributions](https://resources.statn.dev/images/blog/2022-05-26-AWS-Certificate-Reissue/2022-05-26%20-%20AWS%20CloudFront%20-%20List%20of%20Distributions.png)

Select a distribution to from the list. This opens the details page for that distribution.

![CloudFront - Edit Distribution](https://resources.statn.dev/images/blog/2022-05-26-AWS-Certificate-Reissue/2022-05-26%20-%20AWS%20CloudFront%20-%20Edit%20Distribution.png)

From the details page click the Edit button in the Settings section.

![CloudFront - Update Distribution Certificate](https://resources.statn.dev/images/blog/2022-05-26-AWS-Certificate-Reissue/2022-05-26%20-%20AWS%20CloudFront%20-%20Update%20Distribution%20Certificate.png)

Update the certificate under "Custom SSL Certificate - optional" and then save the changes.

It can take a couple of minutes for everything to update, but once the everything was showing green I was able to validate that the site was back up and running. I've left the CNAME records alone this time. The only cleanup I did was to remove the old (expired) certificate.

Hopefully this helps someone else (probably future me) who runs into a similar issue or has questions about how to set up their own Cloudfront distributed domain with an SSL certificate. AWS makes it pretty easy to do.