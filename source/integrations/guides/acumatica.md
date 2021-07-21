---
title: "Acumatica Sales Tax Integration Guide"
description: "In-depth guide on how to use TaxJar's Acumatica integration."
layout: guide
plus: true
priority: 0.7
guide_name: Acumatica
reference: {
  "Platform": "Acumatica",
  "Versions": "2019R1+",
  "Extension": "<a href='https://www.acumatica.com/acumatica-marketplace/taxjar-sales-tax-automation/'>Acumatica Marketplace</a>",
  "Last Updated": "August 19, 2020"
}
toc: {
  "How to Connect TaxJar with Acumatica": "#section-how-to-connect-taxjar-with-acumatica",
  "Basic Configuration": "#section-basic-configuration",
  "Exemptions": "#section-exemptions",
  "Updating the Integration": "#section-updating-the-integration",
  "Frequently Asked Questions": "#section-frequently-asked-questions",
  "Integration Changelog": "#section-integration-changelog"
}
extra: "<div class='text-center'><a href='https://www.acumatica.com/acumatica-marketplace/taxjar-sales-tax-automation/' target='_blank'><img src='/images/guides/integrations/acumatica/acumatica_certified_application_retina.png' width='160'></a></div>"
---

This guide will take you step by step through how to integrate TaxJar with your Acumatica account. You’ll learn about calculations, invoicing syncs, reporting, filing, product and customer exemptions and more.

Sales tax is complex, with regulations changing constantly. For a primer on the basics of sales tax, including [nexus](https://www.taxjar.com/resources/sales-tax/nexus), [registration](https://www.taxjar.com/resources/sales-tax/registration), filing, reporting, calculations and more, please visit [Sales Tax Fundamentals](https://www.taxjar.com/resources/sales-tax). Also, be sure to take a look at our [Resource Center](https://www.taxjar.com/resources/), with articles, webinars and videos for beginners and experts alike.

Please note that TaxJar for Acumatica requires a [TaxJar Professional or Premium](https://www.taxjar.com/how-it-works/) subscription. To sign up, or to upgrade your existing account, please [contact](https://www.taxjar.com/contact/) our sales team.

## How to Connect TaxJar with Acumatica
TaxJar for Acumatica utilizes the External Tax Calculation feature in Acumatica. Tax will be calculated when documents, such as Sales Orders or Invoices, are saved. The following conditions are required for tax to be calculated:

1. [Add nexus states](https://www.taxjar.com/guides/sales-tax-guide-for-onboarding/#add-your-nexus-states)
1. [Enable External Tax Calculation](#section-enable-external-tax-calculation)
1. [Install the Customization Project](#section-install-the-customization-project)
1. [Configure the Tax Provider](#section-configure-the-tax-provider)
1. [Add a Vendor Profile for TaxJar](#section-create-the-vendor-profile)
1. [Create a TaxJar Tax Zone](#section-create-the-tax-zone)
1. [Set the Tax Zone to **TaxJar**](#section-assign-the-tax-zone)

<hr />

## Basic Configuration

### Enable External Tax Calculation

Acumatica requires the External Tax Calculation Integration feature to be enabled to support external tax calculation. This will have to be enabled by an administrator if it is not already enabled.

To enable this feature, go to **System Management → Licensing → Enable/Disable Features** page.

On this page, click **Modify** and check the **Third Party Integrations → External Tax Calculation Integration** box. Click **Enable** to save your changes.

<figure class="u-text--center">
  <img src="/images/guides/integrations/acumatica/enable-feature.png" alt="Enable External Tax Calculation"/>
  <figcaption class="u-text--shrink-1">External Tax Calculation must be enabled in Acumatica.</figcaption>
</figure>

### Install the Customization Project

Import the Customization Project on the Customization Project screen (**SM204505**) by clicking **Import** and selecting the file to upload.

<figure class="u-text--center">
  <img src="/images/guides/integrations/acumatica/import-customization.png" alt="Import the Customization"/>
  <figcaption class="u-text--shrink-1">Import the Customization Project.</figcaption>
</figure>

Open the Customization Project and click **Publish → Publish Current Project**.

<figure class="u-text--center">
  <img src="/images/guides/integrations/acumatica/publish-customization.png" alt="Publish the Customization"/>
  <figcaption class="u-text--shrink-1">Publish the Customization Project.</figcaption>
</figure>

### Configure the Tax Provider

The TaxJar integration must be added as a Tax Provider.

1. Go to the **Tax Providers** screen (**TX102000**).
1. Click the **Add New Record** button.
1. Set the Provider ID to **TAXJAR**.
1. Set the **Plug-in Type** to **TaxJar.Acumatica.SmartCalcsTaxProvider**.
1. Enter your API Token in the **API Token** field.
1. Check the **Active** checkbox.
1. Click **Company Code Mappings**.
1. Enter any value for each branch in your Acumatica environment.
1. Save the Tax Provider.

<div class="alert alert-info" role="alert">
You can find your API Token in the TaxJar application on the <a href='https://app.taxjar.com/account#api-access'>TaxJar API</a> screen.
</div>

<figure class="u-text--center">
  <img src="/images/guides/integrations/acumatica/tax-provider.png" alt="Configure the Tax Provider"/>
  <figcaption class="u-text--shrink-1">Configure the Tax Provider with your API Token.</figcaption>
</figure>

<figure class="u-text--center">
  <img src="/images/guides/integrations/acumatica/company-code-mapping.png" alt="Use any value for the Company Code Mapping"/>
  <figcaption class="u-text--shrink-1">Use any value for the Company Code Mapping.</figcaption>
</figure>

### Create the Vendor Profile

Create a Vendor Profile for TaxJar and set the Tax Agency Settings.

1. Add a new record on the **Vendors** screen (**AP303000**).
1. Set the **Vendor ID** to **TAXJAR**.
1. Set the **Vendor Name** to **TaxJar Tax Agency**.
1. Set **Vendor Class** to **General & Administrative**.
1. Check the box **Vendor is Tax Agency**.
1. Fill out the **Default Tax Accounts** on the **Tax Agency Settings** tab.
1. Save the Vendor Profile.

<figure class="u-text--center">
  <img src="/images/guides/integrations/acumatica/new-vendor.png" alt="Create the Vendor"/>
  <figcaption class="u-text--shrink-1">Create a new Vendor for the Tax Agency.</figcaption>
</figure>

### Create the Tax Zone

Setting a tax zone on an order triggers tax calculation. This does not affect transactions being imported into TaxJar. The following steps detail creating a Tax Zone:

1. Add a new record on the **Tax Zones** screen (**TX206000**).
1. Set the **Tax Zone ID** to **TAXJAR**.
1. Check the box **External Tax Provider**.
1. Set the **Provider ID** to **TAXJAR**.
1. Set the **Tax Agency ID** to **TAXJAR**.
1. Save the Tax Zone.

<figure class="u-text--center">
  <img src="/images/guides/integrations/acumatica/tax-zone.png" alt="Create the Tax Zone"/>
  <figcaption class="u-text--shrink-1">Create a single Tax Zone for TaxJar.</figcaption>
</figure>

### Assign the Tax Zone

Tax Zones are set on the customer or order level. Assign customers the TaxJar tax zone under **Delivery Settings** on the **Customers** screen (**AR303000**).

<figure class="u-text--center">
  <img src="/images/guides/integrations/acumatica/set-tax-zone.png" alt="Set the Tax Zone for a Customer"/>
  <figcaption class="u-text--shrink-1">Set the Tax Zone for a Customer</figcaption>
</figure>

### Enable Sales Tax Reporting

Ensure the Customization Project has been installed. To enable Sales Tax Reporting, visit the [Linked Accounts](https://app.taxjar.com/account#linked-accounts) page in the TaxJar app to connect to Acumatica.

<hr />

## Exemptions

### Customer Exemptions

Mark customers as exempt by selecting an Entity Usage Type for the customer, location, or the order. **Government** and **Wholesale** exemptions are currently supported. The remainder of the Entity Usage Types are classified as **Other**.

Leave the Entity Usage Type as **Default** for non-exempt customers.


<div class="alert alert-info" role="alert">
<strong>Acumatica 2019 R1 and Acumatica 2019 R2:</strong> The Entity Usage Type should be empty for non-exempt customers.
</div>

<figure class="u-text--center">
  <img src="/images/guides/integrations/acumatica/exemptions.png" alt="Exempt Customer"/>
  <figcaption class="u-text--shrink-1">Use the Entity Usage Type dropdown to mark a customer as exempt.</figcaption>
</figure>

### Product Exemptions

Product exemptions are managed by using a Product Tax Code (PTC). This section covers how to create an attribute and assign PTCs to your Stock Items and Non Stock Items.

{:.u-text--weight-bold}
#### Identify Product Tax Codes

Review the [categories currently supported](https://developers.taxjar.com/api/reference/#categories) by the TaxJar API. Identify any categories relevant to your products. If there is [no category for your specific product](https://support.taxjar.com/article/362-taxjarapi-product-categories), leave the PTC blank and the product will be treated as fully taxable.

<figure class="u-text--center">
  <img src="/images/guides/integrations/acumatica/list-tax-categories.png" alt="TaxJar Tax Categories"/>
  <figcaption class="u-text--shrink-1">Find the appropriate tax category for your product.</figcaption>
</figure>

{:.u-text--weight-bold}
#### Create the PTC Attribute

1. Add a new record on the **Attributes** screen (**CS205000**).
1. Set the **Attribute ID** to **PTC**.
1. Set the **Description** to **Product Tax Code**.
1. Set the **Control Type** to **Text**.
1. Save the Attribute.

<figure class="u-text--center">
  <img src="/images/guides/integrations/acumatica/new-attribute.png" alt="Create the PTC Attribute"/>
  <figcaption class="u-text--shrink-1">Create the PTC Attribute</figcaption>
</figure>

{:.u-text--weight-bold}
#### Assign the Attribute to Item Classes

1. Go to the **Item Classes** screen (**IN201000**).
1. Select the Item Class in the **Item Class Tree**.
1. View the **Attributes** tab.
1. Add the Attribute ID **PTC**.
1. Repeat steps 2 - 4 for each item class with exempt products.
1. Save the Item Classes.

<figure class="u-text--center">
  <img src="/images/guides/integrations/acumatica/item-classes.png" alt="Assign Attribute to Item Class"/>
  <figcaption class="u-text--shrink-1">Assign the PTC Attribute to relevant Item Classes.</figcaption>
</figure>

{:.u-text--weight-bold}
#### Assign PTCs to Inventory Items

Assignment of PTCs is the same for Stock Items and Non Stock Items.

1. Go to the **Stock Items** screen (**IN2025PL**) or the **Non-Stock Items** screen (**IN2020PL**).
1. Select the Inventory Item.
1. View the **Attributes** tab.
1. Set the **Value** of the **Product Tax Code** attribute.

<figure class="u-text--center">
  <img src="/images/guides/integrations/acumatica/assign-ptc.png" alt="Assign PTCs to Inventory Items"/>
  <figcaption class="u-text--shrink-1">Assign PTCs to Inventory Items.</figcaption>
</figure>

<hr />

## Updating the Integration
Updating to the latest version of the integration will ensure you have the latest features and bug fixes.

Follow the below steps to upgrade:

1. Go to the **Customization Projects** screen.
1. Click **Import** > **Choose File**, select the new file, and then click **Upload**.
1. Uncheck the Customization Project for the old version of the integration.
1. Click **Publish** to unpublish the Customization Project and wait for the operation to complete.
1. Check the Customization Project for the new version of the integration.
1. Click **Publish** and wait for the operation to complete.

<hr />

## Frequently Asked Questions

### Taxes Calculated based on the Warehouse

Taxes will be calculated using the warehouse location for the destination address when the **Ship Via** field is not selected. This is considered **Will Call** since the customer would be picking up the order from the warehouse.

Ensure the **Ship Via** field is selected if the order is being shipped.

<figure class="u-text--center">
  <img src="/images/guides/integrations/acumatica/shipping-settings.png" alt="Set the Ship Via"/>
  <figcaption class="u-text--shrink-1">Set the Ship Via under Shipping Settings</figcaption>
</figure>

### Tax Rates are Incorrect

Ensure you are using our production environment. Additionally, use our [sales tax calculator]((https://www.taxjar.com/sales-tax-calculator/)) to verify the rate. If you continue to see an incorrect tax rate, please reach out to our [support team](https://www.taxjar.com/contact/).

### Do you support Marketplace transactions?

Yes. Use a separate tax zone for Marketplace transactions in order to bypass tax calculation. These transactions will still be imported into your TaxJar account. When creating this Tax Zone, leave the External Tax Provider option unchecked.

Use the following Tax Zones for Marketplace Transactions. These transactions will be recognized by TaxJar as marketplace exempt transactions.

| Marketplace                                 | Tax Zone ID |
| ------------------------------------------- | ----------- |
| [Amazon](https://www.amazon.com/)           | AMAZON      |
| [eBay](https://www.ebay.com/)               | EBAY        |
| [Etsy](https://www.etsy.com/)               | ETSY        |
| [Walmart](https://marketplace.walmart.com/) | WALMART     |
| Other                                       | MKTPLACE    |

### Do I have to recalculate tax on orders when I import them into Acumatica?

If the storefront is calculating taxes with TaxJar, these transactions can be assigned a separate tax zone to bypass recalculating tax. Leave the External Tax Provider option unchecked. These transactions will still be imported into your TaxJar account.

### No Transactions in the TaxJar App

The following troubleshooting steps may be helpful:

1. Ensure your account has been [linked](https://app.taxjar.com/account#linked-accounts).
1. Transactions are imported nightly. Transactions from the current day may not be available until the next day.
1. Still having issues? Contact our [customer support](https://www.taxjar.com/contact/) team.

<hr />

## Integration Changelog

Curious to see what's changed with our integration lately? Read on to learn more!

### v1.0.4 - 2020-07-29
- Certified for Acumatica 2020R1.
- Fixed an issue where the taxable amount was not being calculated correctly on certain orders.
- Added support for propagating taxes from an imported Sales Order for certain edge cases.

### v1.0.1 - 2020-07-15
- Updated exemption mapping to support Acumatica 2020R1
- Updated logging to support Acumatica 2020R1

### v1.0.0 - 2020-06-26
- Initial release.

If you have additional questions or need help integrating your Acumatica and TaxJar accounts, please [contact](https://www.taxjar.com/contact/) our support team.
