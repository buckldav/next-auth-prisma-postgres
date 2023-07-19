---
title: DNS
date: "2023-05-30T16:04:44.000Z"
author: David Buckley and TR
summary: Tips for troubleshooting DNS.
---

## DNS Troubleshooting

Verify DNS configuration: Ensure that the DNS records for your domain are correctly configured. Check if the MX (Mail Exchange) records are set up correctly, pointing to the correct mail server or service.

Check DNS propagation: DNS changes can take some time to propagate across the internet. Use a DNS propagation tool or website to check if the DNS changes have propagated fully. If not, wait for propagation to complete before further troubleshooting.

Test DNS resolution: Verify if your DNS is resolving correctly. Open a command prompt or terminal and use the "nslookup" or "dig" command to query the MX records for your domain. Ensure that the correct mail server or service IP address is returned.

Check for blacklisting: If your email is not reaching its destination, it's possible that your IP address or domain is blacklisted. Use online blacklisting services or tools to check if your IP address or domain is listed on any blacklists. If it is, follow the instructions provided by the respective blacklist to delist yourself.

Reverse DNS (rDNS) setup: Ensure that your mail server has a valid reverse DNS (PTR) record configured. The reverse DNS record should resolve to the IP address of your mail server. Some email servers perform reverse DNS checks, and a missing or mismatched reverse DNS record can cause delivery issues.

SPF (Sender Policy Framework): Verify that your domain has an SPF record configured. SPF helps validate that the server sending email on behalf of your domain is authorized to do so. Use SPF checking tools to verify if the SPF record is set up correctly.

DKIM (DomainKeys Identified Mail): Check if DKIM is properly configured for your domain. DKIM adds a digital signature to your outgoing emails, allowing the recipient server to verify the email's authenticity. Use DKIM checking tools to ensure that your DKIM record is set up correctly.

DMARC (Domain-based Message Authentication, Reporting, and Conformance): Implementing DMARC provides additional email authentication and reporting capabilities. Ensure that your DMARC record is correctly set up, including policies for handling failed authentication results.

Firewall and network configuration: Check if your firewall or network configuration is blocking outbound email traffic on the necessary ports (such as port 25 for SMTP). Ensure that your mail server can establish outgoing connections to the required destinations.

Test email delivery: Send test emails to different email providers (e.g., Gmail, Yahoo, etc.) and verify if they are delivered successfully. If there are specific recipients who are not receiving your emails, try sending to alternative email addresses to identify if it's an issue with the recipient's email system.

By following these steps, you can troubleshoot email issues related to DNS and work towards resolving any problems that may be affecting the delivery or reception of your emails.

### Resources

- [https://mxtoolbox.com/](https://mxtoolbox.com/): Troubleshoot email-related records (MX, SPF, etc.). Generate SPF records.
- [DNS Explained (YouTube)](https://www.youtube.com/watch?v=72snZctFFtA)
