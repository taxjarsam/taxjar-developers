---
title: Address Validation APIs and Plugins
description: Guide to the best free and paid address validation APIs, services, and plugins on the market.
author: jake_johnson
date: 2017-01-20 12:00 UTC
category: SmartCalcs
tags: address-validation
published: true
---

Here at TaxJar, customers occasionally ask us if we support address validation through our SmartCalcs API or cart integrations such as WooCommerce or Magento. In order to provide the most affordable and fastest sales tax calculations, we opted to keep this out of our API in favor of lighter validation around states and zip codes. This way you have the opportunity to save money and take advantage of free or low-cost address validation APIs already on the market, usually provided by shipping services such as Shippo and carriers like UPS.

In this guide I’ll show you where to find these address verification APIs for your eCommerce website or app. I’ll also cover several plugins / extensions for handling address verification on popular eCommerce platforms.

END_SUMMARY

## Address Validation APIs

### Shippo

[Shippo](https://goshippo.com) provides a simple shipping API for printing labels and tracking packages with a Stripe-like developer experience. If you only need to verify addresses in the United States, Shippo provides free validation directly through the USPS database before generating a shipping label. Addresses are marked residential or commercial.

Pricing: **Free**<br>
Countries: US, Australia<br>
API Clients: Ruby, Python, Node, C#, PHP<br>
Documentation: [https://goshippo.com/docs/address-validation](https://goshippo.com/docs/address-validation)

### EasyPost

Similar to Shippo, [EasyPost](https://www.easypost.com) makes it easy to programmatically generate shipping labels and track packages across 60+ carriers. For US addresses, EasyPost provides free domestic address verification using their proprietary API. If you sign up for their shipping API, you’ll get full access with international coverage. EasyPost can validate US addresses to the unit level and mark them as residential or commercial.

Pricing: **Free** (US Only)<br>
Countries: US, International<br>
API Clients: Ruby, Python, Java, Node, C#, PHP<br>
Documentation: [https://www.easypost.com/docs/api/curl#addresses](https://www.easypost.com/docs/api/curl#addresses)

### Lob

Unlike the first two services I’ve mentioned, [Lob](https://lob.com) provides an API for sending physical mail such as postcards, letters, and checks. Their address verification API is free for all US addresses and $0.15 per international verification. Lob also has a [tutorial on how to verify addresses](https://lob.com/blog/verify-shipping-addresses-in-python-for-free/) using their Python client.

Pricing: **Free** (US Only), $0.15 / per international call<br>
Countries: US, International<br>
API Clients: Ruby, Python, Java, Node, PHP<br>
Documentation: [https://lob.com/verification/address](https://lob.com/verification/address)

### UPS Developer APIs

Carriers such as [UPS](https://www.ups.com/upsdeveloperkit) also provide address validation. UPS leverages the USPS database for valid addresses in the US and Puerto Rico. After signing up for a UPS account and requesting an API token, you can download the documentation along with code samples. I linked to several third-party UPS clients on GitHub below.

Pricing: **Free**<br>
Countries: US<br>
API Clients (Third Party): [Ruby](https://github.com/robhurring/address-validator), [Node](https://github.com/uh-sem-blee/node-shipping-ups), [PHP](https://github.com/gabrielbull/php-ups-api)<br>
Documentation: [https://www.ups.com/upsdeveloperkit/downloadresource?loc=en_US](https://www.ups.com/upsdeveloperkit/downloadresource?loc=en_US)

### SmartyStreets

Since [SmartyStreets](https://smartystreets.com) isn’t 100% free for US addresses, I decided to mention them last. However, it’s the best address validation API on the market and deserves a shoutout. If you’re looking for a CASS-Certified and highly performant solution then SmartyStreets is your best bet. They provide much more than just USPS data and cool features like autocompletion — [take a look for yourself](https://smartystreets.com/features).

Pricing: **250 Lookups Free** / Month<br>
Countries: US, International (Truly Everywhere)<br>
API Clients: Python, Java, C#, Go, iOS, Android<br>
Documentation: [https://smartystreets.com/docs](https://smartystreets.com/docs)

## Address Validation Plugins & Extensions

If you’re using a popular eCommerce platform like WooCommerce or Magento, you shouldn’t have to write a single line of code to validate addresses in your checkout. Here’s what I usually I recommend to merchants:

### ShipperHQ

The team at [ShipperHQ](https://shipperhq.com/) provide a fantastic all-in-one service for all things related to shipping. Address validation is deeply integrated into their plugins and extensions beyond checkout — validation also occurs in customer address books and customers can override the validation results if incorrect. ShipperHQ is a great solution if you’re looking for accurate shipping rates among a variety of carriers and also happen to be looking for address verification.

Pricing: $50+ / Month<br>
Platforms: Magento, Magento 2, Bigcommerce, Shopify WooCommerce, Zoey<br>
Website: [https://shipperhq.com/](https://shipperhq.com/)

### IWD UPS/USPS Address Validation (Magento)

This extension from [IWD](https://www.iwdagency.com) connects directly to UPS / USPS for address validation using your own UPS / USPS accounts. It’s a $99 one-time purchase, so it’s worthwhile if you’re only looking for address validation. It’s also compatible with multiple one page checkout extensions for Magento.

Pricing: $99 (Magento), $249 (Magento 2)<br>
Platforms: Magento, Magento 2<br>
Website: [https://www.iwdagency.com/extensions/magento-ups-usps-address-validation-extension.html](https://www.iwdagency.com/extensions/magento-ups-usps-address-validation-extension.html)

### SkyVerge Postcode / Address Validation (WooCommerce)

This plugin for WooCommerce validates addresses using an API provider of your choice, including:

- Addressy
- SmartyStreets (US)
- PCA Predict (UK)
- PostcodeSoftware.net (UK)
- Crafty Clicks (UK)
- Postcode.nl (NL)

Pricing: $49 (1 Site), $79 (5 Sites) + Address Validation API Costs<br>
Platforms: WooCommerce<br>
Website: [https://woocommerce.com/products/postcodeaddress-validation/](https://woocommerce.com/products/postcodeaddress-validation/)

## Wrapping Up

That covers most of the address validation APIs and plugins I'm aware of. If you find anything else interesting, leave it in the comments!