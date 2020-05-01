---
title: Summarized Sales Tax Rates & VAT Validation
description: Learn more about our new endpoints to calculate sales tax during downtime and validating VAT identification numbers.
author: jake_johnson
date: 2016-03-10 00:11 UTC
category: API
tags: vat, api
published: true
---

In the event that one of your APIs suddenly goes down or becomes too slow, it’s always good to have a contingency plan. At TaxJar, we’re helping you better prepare for those moments with a new endpoint called [/v2/summary_rates](https://developers.taxjar.com/api/reference/#summarized-rates). This endpoint allows you to periodically back up a collection of rates in your own database as a fallback. You make the call, we return a JSON array of summarized rates by state/region.

A summarized rate includes a minimum and average sales tax rate. Minimum rates are state-only tax rates, while average rates take the mean of state and local sales tax across all postal codes. These two rates can be used to collect sales tax as accurately as possible given the situation. Summarized rates are updated on a monthly basis among all of our supported jurisdictions.

END_SUMMARY

Our [API clients](https://github.com/taxjar) now support this functionality out of the box. Here’s how it’s done with our Ruby client:

```ruby
require "taxjar"
client = Taxjar::Client.new(api_key: "9e0cd62a22f451701f29c3bde214")

summarized_rates = client.summary_rates
```

It’s very similar with PHP using the `summaryRates` method:

```php
<?php
$taxjar = TaxJar\Client::withApiKey("9e0cd62a22f451701f29c3bde214");

$summarized_rates = $taxjar->summaryRates();
```

For additional peace of mind, feel free to review our [sales tax API uptime and performance](https://status.taxjar.com/).

Another utility endpoint we’ve recently added validates VAT identification numbers against [VIES](http://ec.europa.eu/taxation_customs/vies/). When VIES is available, we’ll reach out to their service and return the business name and address. When it isn’t, [which happens often](http://ec.europa.eu/taxation_customs/vies/help.html), we fall back to a regex validation. We built a tiny Ruby gem to handle this functionality called [vat_check](https://github.com/taxjar/vat_check). Here’s how it’s done with our JavaScript API client:

```javascript
var taxjar = require("taxjar")("9e0cd62a22f451701f29c3bde214");

taxjar.validate({
  vat: 'FR40303265045'
}).then(function(res) {
  res.validation; // Validation object
});
```

From there, `res` will include a JSON object similar to the following:

```json
{
  "validation": {
    "valid": true,
    "exists": true,
    "vies_available": true,
    "vies_response": {
      "country_code": "FR",
      "vat_number": "40303265045",
      "request_date": "2016-02-10",
      "valid": true,
      "name": "SA SODIMAS",
      "address": "11 RUE AMPERE\n26600 PONT DE L ISERE"
    }
  }
}
```

To check if the VAT identification number is valid (via VIES or regex), simply check the top-level `valid` key:

```javascript
if (res.validation.valid === true) {
  console.log('VAT number is valid');
}
```

That’s it! You can find more info in our [API documentation](https://developers.taxjar.com/api/reference/?shell#get-validate-a-vat-number).

We’re constantly making improvements to our sales tax API and your feedback goes a long way. Reach out and [contact us](mailto:support@taxjar.com) if there’s anything we can help you with!
