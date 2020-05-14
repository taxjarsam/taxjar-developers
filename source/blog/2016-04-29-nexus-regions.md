---
title: Nexus Regions
description: Learn more about our new nexus regions endpoint to use TaxJar as the source of truth for all things nexus.
author: jake_johnson
date: 2016-04-29 00:11 UTC
category: API
tags: vat, api
published: true
---

*Here’s some important advice I always give to developers unfamiliar with the intricacies of sales tax:*

**You only have to collect sales tax in states where you have [nexus](https://developers.taxjar.com/api/guides/#handling-nexus) if you're based in the United States.** When calculating sales tax using one of our endpoints, first compare the customer’s shipping state with your nexus states. Skip the call if it's not in one of your nexus states. This ensures you only calculate sales tax when necessary and comes with the added benefit of saving money. Our new [Magento integration](https://www.taxjar.com/guides/integrations/magento/#how-smartcalcs-works) does this out of the box and even caches API responses until the order or checkout details change.

END_SUMMARY

So now you’re comparing states to save on API calls. However, you’d rather not hard-code those nexus states when determining whether or not to calculate sales tax at checkout.

With our new [nexus regions endpoint](https://developers.taxjar.com/api/reference/#nexus), you can use TaxJar as the source of truth and pull your nexus states down periodically to sync with your app. If an accountant or someone else on your team adds a new state in TaxJar, things should continue to hum along with minimal effort. This is also a useful way to list nexus regions in a custom interface such as a plugin configuration or reporting view.

To get up and going, make a GET request to `https://api.taxjar.com/v2/nexus/regions` with your API token:

```shell
curl https://api.taxjar.com/v2/nexus/regions \
  -H "Authorization: Bearer 9e0cd62a22f451701f29c3bde214"
```

From there, you’ll quickly get a response back with an array of nexus regions for your TaxJar account:

```json
{
  "regions": [
    {
      "country_code": "US",
      "country": "United States",
      "region_code": "CA",
      "region": "California"
    },
    {
      "country_code": "US",
      "country": "United States",
      "region_code": "NY",
      "region": "New York"
    },
    {
      "country_code": "US",
      "country": "United States",
      "region_code": "WA",
      "region": "Washington"
    }
  ]
}
```

Have some feedback for this endpoint? Looking for different attributes or more ways to manage this data? We'd love to hear from you. [Get in touch!](https://www.taxjar.com/contact/)
