---
title: "BigCommerce Sales Tax Integration Guide"
description: "In-depth guide on how to use TaxJar's BigCommerce sales tax integration."
layout: guide
plus: true
priority: 0.7
guide_name: BigCommerce
reference: {
  "Platform": "BigCommerce",
  "Versions": "x",
  "Extension": "<a href='https://www.bigcommerce.com/apps/taxjar/'>BigCommerce.com</a>",
  "Last Updated": "February 17, 2021"
}
toc: {
  "How to Connect Your BigCommerce Store": "#section-how-to-connect-your-bigcommerce-store",
  "Calculate how much sales tax you've collected": "#section-calculate-how-much-sales-tax-you-have-collected"
}
---

This guide will take you step by step through how to integrate TaxJar into your BigCommerce account. You’ll learn how to configure BigCommerce to automate sales tax calculations as well as what you need to do when it comes time to file.

Sales tax is complex, with regulations changing constantly. For a primer on the basics of sales tax, including [nexus](https://www.taxjar.com/resources/sales-tax/nexus), [registration](https://www.taxjar.com/resources/sales-tax/registration), filing, reporting, calculations and more, please visit [Sales Tax Fundamentals](https://www.taxjar.com/resources/sales-tax). Also, be sure to take a look at our [Resource Center](https://www.taxjar.com/resources/), with articles, webinars and videos for beginners and experts alike.

You'll learn how TaxJar provides calculations and syncs invoices, cash sales, and credit memos for reporting / filing. Along the way, we'll configure your NetSuite account to collect sales tax where you have nexus, handle product / customer exemptions, and much more. For a primer on everything sales tax, read our [Sales Tax 101 guides](https://www.taxjar.com/learn-sales-tax/) before getting started.

Please note that TaxJar for BigCommerce requires a [TaxJar Professional or Premium](https://www.taxjar.com/how-it-works/) subscription. To sign up, or to upgrade your existing account, please contact our sales team.

## How to Connect Your BigCommerce Store

To set up the TaxJar integration with BigCommerce store, log in, go to **Store Setup > Tax**, then select **Add Tax Service**.

<!-- (BigC Screenshot goes here) -->

Then click **install** next to TaxJar and simply **Confirm** TaxJar access. You may then need to log in to your TaxJar account.

(BigC Screenshot goes here)

To allow TaxJar to power real-time sales tax calculations for your BigCommerce store, go to **Store Setup > Tax**, then select **Enable** next to TaxJar. A [TaxJar Professional](https://www.taxjar.com/pricing/) account will be required for real-time sales calculations on most stores.

<!-- (BigC Screenshot goes here) -->

Not only can you configure BigCommerce to collect sales tax from buyers in multiple states, you can also configure your sales tax collection however you want, including:

  * Control over which address the tax is based from (shipping, billing, or store location)
  * Ability to create custom tax classes allowing you to have specific tax rates for groups of products
  * Product, customer, and wholesale exemption management
  * Setting up [fallback or manual tax rates](https://support.taxjar.com/article/979-setting-up-tax-rates-in-bigcommerce) for when the sales tax API is inaccessible (which is very rare — TaxJar’s API has a 99.99% uptime and is 16 times faster than our closest competitor.)

Find out more about setting up sales tax in BigCommerce at the [BigCommerce tax settings support page](https://support.bigcommerce.com/articles/Public/tax-settings#Step1).

## Calculate How Much Sales Tax You Have Collected

Now that you’ve configured your sales tax settings in BigCommerce and collected sales tax from customers, it’s time to figure out how much you’ve collected in order to prepare a sales tax return.

Often, states want to know how much sales tax you collected from buyers in each city, county, or special taxing district. With the BigCommerce and TaxJar integration, TaxJar creates sales tax reports on tax collected, and configures it in the format that states want to see.

If you sell on more channels than just BigCommerce, such as eBay, Amazon, Etsy, or Walmart, [integrated sales tax reporting](https://www.taxjar.com/sales-tax-integrations/) can be especially helpful, so you can see sales tax collected in one dashboard rather than tediously running reports one by one by one.

<!-- (BigC Screenshot goes here) -->

## Current Limitations

  * **Shipping to Multiple Addresses**. Shipping to multiple addresses as part of a single transaction is currently not supported with TaxJar's BigCommerce integration.

If you have additional questions about how to integrate BigCommerce and TaxJar, please [contact](mailto:support@taxjar.com) our customer support team.
