---
title: Certification Guidelines
description: "Learn more about what we look for in a certified TaxJar integration."
---

## Requirements

When we initially discuss integrations with partners, they will occasionally ask what we're looking for. Most of the time we point them to our [integration guides](https://developers.taxjar.com/integrations/), but there's definitely more to a certified integration. Our competitors are very specific in what they're looking for functionality-wise, but we want to give equal importance to support and documentation for a great customer experience.

Requirements are broken up into 4 areas:

### End-to-End Sales Tax Automation

Both calculations and transaction push will be required. For a great TaxJar experience, a merchant has to be able to calculate sales tax and remit it later using AutoFile.

- Sales tax calculations
- Sales tax reporting via order / refund push
- Easy merchant onboarding and authentication
- Easy configuration panel
 - Enable / disable calculations
 - Enable / disable reporting
 - Nexus sync or management
 - Client-side logging for support
- Product taxability and exemption support
- Transaction backfill via API or CSV export

We also want to ensure certified integrations only make API calculations when absolutely necessary to save merchants money:

- API call conservation
 - Only make calculations when a merchant has nexus; send in all transactions
 - Cache API calls until order details change

Certified integrations should leverage their TaxJar partnership effectively and include the necessary code to track API usage across one or more API tokens. Referral links should be set up properly to track commissions. Later, the `plugin` param will be used for transactions shown in the TaxJar app to differentiate them from other API transactions:

- Partner tracking and analytics
 - Private `plugin` and `store_url` API params
 - Referral links

Lastly, a certified integration should follow all API, branding, testing, and UX guidelines mentioned in the integration guides. It should also pass all [testing scenarios](https://developers.taxjar.com/integrations/testing/) for calculations and reporting.

### User-Friendly Documentation

Well-written documentation is a requirement for certification. It needs to concisely cover the following areas:

- Getting started
- Configuring the integration
- Configuring products for exemptions
- Screenshots and/or video

Examples would include our [Magento](https://www.taxjar.com/guides/integrations/magento2/) and [WooCommerce](https://docs.woocommerce.com/document/taxjar/) documentation.

### Commitment to Support

We have the right to revoke certified integrations that aren't diligently maintained or supported by a partner. New integrations must provide timely customer support and address issues within a reasonable timeframe.

- Responsive support for integration-specific issues
- Ongoing maintenance and bug fixes
- Provide a designated contact to TaxJar
- Commitment to building the integration and addressing all requirements
- Maintaining the integration and periodically allocating resources to make improvements

### Integration Announcement and Promotion

We request that all integrations must be fully certified before promoting the integration or starting any marketing activities.

- Commitment not to announce or publish communications mentioning a certified integration, until the review process is complete
- Work with TaxJar marketing team on timing for publishing and promotion of the integration
