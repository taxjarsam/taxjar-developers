---
title: "Salesforce Commerce Cloud Sales Tax Guide"
description: "In-depth guide on how to use TaxJar's Salesforce Commerce Cloud (B2C Commerce) integration."
layout: guide
plus: true
priority: 0.7
guide_name: Salesforce Commerce Cloud
reference: {
  "Platform": "SFCC",
  "Storefronts": "SFRA & Site Genesis",
  "Extension": "<a href='https://www.salesforce.com/products/commerce-cloud/partner-marketplace/partners/taxjar/'>Salesforce Marketplace</a>",
  "Last Updated": "April 10, 2020"
}
toc: {
  "How to Connect Your Salesforce Commerce Cloud Store": "#section-how-to-connect-your-salesforce-commerce-cloud-store",
  "Sales Tax Calculations": "#section-sales-tax-calculations",
  "Sales Tax Reporting": "#section-sales-tax-reporting"
}
---

This guide will take you step by step through how to integrate TaxJar with your Salesforce account. You’ll learn how to configure your Salesforce B2B Commerce site to collect sales tax, handle product and customer exemptions, view detailed sales tax reporting and more.

Sales tax is complex, with regulations changing constantly. For a primer on the basics of sales tax, including [nexus](https://www.taxjar.com/resources/sales-tax/nexus), [registration](https://www.taxjar.com/resources/sales-tax/registration), filing, reporting, calculations and more, please visit [Sales Tax Fundamentals](https://www.taxjar.com/resources/sales-tax). Also, be sure to take a look at our [Resource Center](https://www.taxjar.com/resources/), with articles, webinars and videos for beginners and experts alike.

Please note that TaxJar for Salesforce Commerce Cloud requires a [TaxJar Professional or Premium](https://www.taxjar.com/how-it-works/) subscription. To sign up, or to upgrade your existing account, please [contact](https://www.taxjar.com/contact/) our sales team.

## How to Connect Your Salesforce Commerce Cloud Store

After downloading the integration, upload the cartridges into your B2C Commerce instance. The **int_taxjar_sfra** cartridge is required for SFRA storefronts, the **int_taxjar_sg** cartridge is required for Site Genesis, and the **int_taxjar** cartridge is required for both types of storefronts.

### Add Cartridges to Cartridge Path

After uploading the cartridges, the next step is to update the cartridge path for any storefront that will be utilizing the integration. This can be done by navigating to **Administration > Sites > Manage Sites** and then selecting the applicable site. If the site is using SFRA add `int_taxjar_sfra:int_taxjar:` to the beginning of the cartridge path. For Site Genesis, append `:int_taxjar_sg:int_taxjar` to the end of the cartridge path.

<img src="/images/guides/integrations/sfcc/sfra-cartridge-path.png" alt="Commerce Cloud TaxJar Custom Preferences"/>

### Alter Storefront Code (Site Genesis Only)

For Site Genesis storefronts, a single line of code in the **app_storefront_core** cartridge must be changed. The file is located at `app_storefront_core/cartridge/scripts/cart/calculate.js`. In that file alter the following line:

`calculateTax( basket );`

To the following:

`if (!require('*/cartridge/scripts/taxJarSGJC').calculateTax(basket)) calculateTax(basket);`

### Import Site Metadata

After updating the cartridge path, metadata must be imported into Business Manager to allow configuration of the integration. This metadata is included in the integration. First, compress the `metadata/taxjar_metadata` directory into a .zip file. In Business Manager, go to **Administration > Site Development > Site Import & Export**. Next you will need to upload the zip file. Then select the uploaded file and import it.

### Site Customer Preferences

To configure the TaxJar custom preferences for a site, navigate to **Merchant Tools > Site Preferences > Customer Preferences** and select the **TaxJar** preferences. You will need to fill out the available fields with information for your business. We use this information as the address your merchandise is shipping from in order to provide accurate tax calculations. Once you are ready to enable the TaxJar integration, it is done on this page as well.

<img src="/images/guides/integrations/sfcc/commerce-cloud-taxjar-custom-preferences.png" alt="Commerce Cloud TaxJar Custom Preferences"/>

### Service Configuration

We use an HTTP Service in order to connect with the TaxJar API and provide real time tax calculations. In order to configure this service navigate to **Admininstration > Operations > Services** and open the **Credentials** tab. Select the **taxjar.api.token** credential and the update the password field with your TaxJar API Token (which can be found in [the TaxJar App](https://app.taxjar.com/account#api-access)).

<img src="/images/guides/integrations/sfcc/commerce-cloud-service-credential.png" alt="Commerce Cloud TaxJar Custom Preferences"/>

## Sales Tax Calculations

Our integration provides real time sales tax calculations in your Commerce Cloud site. We do this based on locations where your business has [nexus](https://blog.taxjar.com/sales-tax-nexus-definition/). Nexus locations are configured in the TaxJar app and are synced to your B2C Commerce instance. Every time your customer gets to the cart or checkout pages, if you have nexus for that order, we send all the necessary data to TaxJar, calculate the most accurate rates, and then apply those to the cart.

### Configuring Default Rates in Business Manager

When you don't have nexus for an order, or in case anything goes wrong with the tax calculation, we fall back to the default Commerce Cloud tax calculations. This allows you to continue to use any already-configured tax jurisdictions and rates in Commerce Cloud for areas that TaxJar does not yet support. Because of this there is some basic configuration of rates and jurisdictions inside of Business Manager that must be done to ensure the integration works properly.

For any area that you are using TaxJar to calculate tax, you will need to setup the tax rates so that the default rate for those areas will be 0%. For example, if I am configuring the integration for a storefront that is only using TaxJar for U.S. tax calculations, I would want to delete every U.S. jurisdiction inside of Commerce Cloud, with the exemption of one top-level jurisdiction that covers the entire U.S. I would then set the rate for this top-level jurisdiction to be 0.

This can be done by navigating to **Merchant Tools > Ordering > Taxation** and opening the **Tax Jurisdictions** tab. Select all the rates for individual states in the U.S. and delete them. Then open the **Tax Rates** tab, enter 0 for the U.S. jurisdiction and apply the changes.

<img src="/images/guides/integrations/sfcc/configure-default-tax-rates.png" alt="Commerce Cloud Tax Rate Configuration"/>

### Product Exemptions

TaxJar supports hundreds of [product exemption categories](https://developers.taxjar.com/api/reference/#get-list-tax-categories). These can be setup as normal in Business Manager using the TaxJar category code as the ID of the tax class. To setup a tax class navigate to **Merchant Tools > Ordering > Taxation** and open the **Tax Classes** tab. Then add a new tax class using the TaxJar category code as the ID. After setting a product to use this tax class, TaxJar will automatically apply the correct rates for the product category.

### Customer Exemptions

Customers can be set as tax exempt inside of Business Manager. Navigate to **Merchant Tools > Customers > Customers** and select the customer you would like to exempt. Then under the **TaxJar Tax Exemptions** section you can set the exemption type and exempt states for the customer. If an exemption type is set, but no exemption states are selected, it will default to being exempt in all states.

## Sales Tax Reporting

In addition to providing real time tax calculations, TaxJar also gives you detailed reports and can automatically file your returns.

### Platform Limitations

In order for TaxJar to accurately report and file your returns, we must have accurate order and refund data synced to TaxJar. The standard way that Commerce Cloud is configured is to take the order and authorize payment in Commerce Cloud and then send the order data to an ERP or OMS for further processing. Most often, these systems do not sync all the data TaxJar requires back to Commerce Cloud. Due to this limitation, in most cases it is better to sync transaction data directly from the OMS/ERP into TaxJar.

### Configuring TaxJar Job

If you have decided to sync transaction data directly from Commerce Cloud into TaxJar, this can be done using a custom job included in the integration. This job is imported with the rest of the metadata. In order to use this job you will need to add the `int_taxjar` cartridge to the Business Manager cartridge path. This can be done by going to **Administration > Sites > Manage Sites** and then clicking on the **Manage the business manager site** link. Then simply append `:int_taxjar` to the end of the cartridge path.

To enable the custom job, navigate to **Administration > Operations > Jobs** and select the **TaxJar Transaction Sync** job. Open the **Job Steps** tab and then under scope, configure the job for the sites you would like to sync transaction data from. When you are ready for the job to run, open the **Schedule and History** tab, configure the recurring schedule you would like the job to run on, and enable the job. Each time the job runs, it will query for all the orders that have been updated since the last run, determine if they need to be synced to TaxJar and then sync them.

If you have additional questions on how to integrate TaxJar and Salesforce Commerce Cloud, please [contact](https://www.taxjar.com/contact/) our support team.
