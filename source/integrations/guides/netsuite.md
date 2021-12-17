---
title: "NetSuite Sales Tax Integration Guide"
description: "In-depth guide on how to use TaxJar's NetSuite integration with SuiteTax."
layout: guide
plus: true
priority: 0.7
guide_name: NetSuite
reference: {
  "Platform": "NetSuite",
  "Versions": "2018.2+",
  "Extension": "<a href='http://suiteapp.com/TaxJar-Sales-Tax-Automation-for-NetSuite'>SuiteApp.com</a>",
  "Last Updated": "October 4, 2021"
}
toc: {
  "Getting Started with SuiteTax": "#section-getting-started-with-suitetax",
  "Getting Started with Legacy Tax": "#section-getting-started-with-legacy-tax",
  "Common Configuration": "#section-common-configuration",
  "Sales Tax Calculations": "#section-sales-tax-calculations",
  "Sales Tax Reporting": "#section-sales-tax-reporting",
  "Current Limitations": "#section-current-limitations",
  "Integration Changelog": "#section-integration-changelog"
}
extra: "<div class='text-center'><a href='http://www.netsuite.com/portal/developers/built-for-netsuite.shtml' target='_blank'><img src='/images/guides/integrations/netsuite/bfn-badge-2021.jpg' width='210' height='111'></a></div>"
---

This guide will take you step by step how to integrate TaxJar with your NetSuite account. You’ll learn how to configure NetSuite for calculations, invoices, cash sales, credit memos, reporting, filing and more.

Sales tax is complex, with regulations changing constantly. For a primer on the basics of sales tax, including [nexus](https://www.taxjar.com/resources/sales-tax/nexus), [registration](https://www.taxjar.com/resources/sales-tax/registration), filing, reporting, calculations and more, please visit [Sales Tax Fundamentals](https://www.taxjar.com/resources/sales-tax). Also, be sure to take a look at our [Resource Center](https://www.taxjar.com/resources/), with articles, webinars and videos for beginners and experts alike.

Please note that TaxJar for NetSuite requires a [TaxJar Professional or Premium](https://www.taxjar.com/how-it-works/) subscription. To sign up, or to upgrade your existing account, please [contact](https://www.taxjar.com/contact/) our sales team.

## Getting Started with SuiteTax

### Enabling the SuiteTax Feature

**To use TaxJar's integration with [SuiteTax](https://system.netsuite.com/app/help/helpcenter.nl?fid=preface_1496364245.html), you'll need to enable the SuiteTax feature in your NetSuite account.** Keep in mind that SuiteTax currently has [known limitations](https://system.netsuite.com/app/help/helpcenter.nl?fid=section_4683973968.html). Please review these limitations before continuing. If you have any questions, [contact us](mailto:support@taxjar.com) before continuing this guide.

Behind the scenes, SuiteTax allows TaxJar to provide rooftop-accurate calculations down to the jurisdiction-level directly inside NetSuite. SuiteTax lets you use different tax calculation engines for nexuses and override tax details on transactions.

**The SuiteTax feature must be shared to your NetSuite account before it can be enabled.** Contact your NetSuite account manager and submit a SuiteTax enablement request with the help of NetSuite Customer Support. Your SuiteTax enablement request will be reviewed by the SuiteTax approval team. If your request has been approved, the SuiteTax feature will be shared to your NetSuite account.

<div class="alert alert-info" role="alert">For existing NetSuite accounts where migration of legacy records to SuiteTax is required, a sandbox account must be available for testing before you begin working with SuiteTax.</div>

Only administrators can enable the SuiteTax feature. To enable the SuiteTax feature, go to **Setup > Company > Enable Features**. Check the **SuiteTax** box on the **Tax** subtab, and click **Save**.

### Installing the TaxJar bundle

Once the SuiteTax feature has been enabled in your account, you can install the TaxJar Sales Tax Automation integration in your NetSuite account via SuiteBundler under **Customization > SuiteBundler > Search & Install Bundles**. Search for "taxjar" and install the TaxJar SuiteBundle.

### Enable SuiteTax Plugin

Once the TaxJar SuiteBundle is installed, you'll first want to enable TaxJar as a tax calculation plugin for SuiteTax. Go to **Customization > Plug-ins > Manage Plug-ins**. Under Tax Calculation implementations, select the checkbox next to "TaxJar" and click **Save**:

<img src="/images/guides/integrations/netsuite/taxjar-plugin-implementation.png" alt="TaxJar Tax Calculation Plugin Implementation for SuiteTax"/>

### Configuring TaxJar

Go to **TaxJar > Setup > Configuration** to connect your TaxJar account. Copy and paste your TaxJar API token in the field below:

<img src="/images/guides/integrations/netsuite/taxjar-api-token.png" alt="TaxJar API Token"/>

Next you'll want to configure your tax settings. Enable calculations and/or reporting depending on the TaxJar features you want to use. Set a default sales tax payable and use tax receivable account for calculations:

<img src="/images/guides/integrations/netsuite/taxjar-configuration.png" alt="TaxJar Configuration"/>

As TaxJar only provides sales tax calculations at this time (not use tax calculations), the payables sales tax account will be used to record the amount of sales tax you collect as a liability. If you'd like to use a different payables account for each nexus, you'll need to edit the generated tax types under **Setup > Accounting > Tax Types** after performing initial calculations.

For [sales tax reporting](#section-sales-tax-reporting) we support accrual or cash basis accounting methods. For accrual basis accounting, **open** invoices and credit memos will be synced to TaxJar. If you prefer syncing **paid in full** invoices and **fully applied** credit memos, choose **Cash Basis** accounting:

<img src="/images/guides/integrations/netsuite/taxjar-configuration-accounting-method.png" alt="TaxJar Configuration Accounting Method"/>

Finally, you'll be asked to review your NetSuite nexuses and tax registrations prior to using the TaxJar integration:

<img src="/images/guides/integrations/netsuite/taxjar-configuration-summary.png" alt="TaxJar Configuration Summary"/>

### Configuring Nexuses for TaxJar

In order to calculate sales tax through SuiteTax, we'll need to properly configure your NetSuite account to use TaxJar as the sales tax engine. Go to the **TaxJar** dropdown in your menu bar and select **Nexuses** from the **Setup** menu:

<img src="/images/guides/integrations/netsuite/taxjar-setup-nexuses-dropdown.png" alt="TaxJar Nexus Dropdown"/>

On the Nexuses page, set up all of the countries and regions where you need to collect sales tax. If you have been using Legacy Tax, you may already have existing nexuses:

<img src="/images/guides/integrations/netsuite/nexuses.png" alt="NetSuite Nexuses"/>

Make sure each subnexus in which you have a physical presence has a valid nexus address:

<img src="/images/guides/integrations/netsuite/nexus-edit.png" alt="Edit NetSuite Nexus"/>

When making sales tax calculations, these nexuses are passed to TaxJar through our API to determine where you have nexus. **These nexuses are not synced to your TaxJar account, so you will have to maintain nexuses separately in both NetSuite and TaxJar.**

### Configuring Tax Registrations for TaxJar

After you've set up your nexuses, you'll want to assign them to tax registrations under your business subsidiaries. Go to the **TaxJar** dropdown in your menu bar and select **Tax Registrations / Codes** from the **Setup** menu:

<img src="/images/guides/integrations/netsuite/taxjar-tax-registrations-dropdown.png" alt="TaxJar Subsidiaries Dropdown"/>

Click the **Tax Registrations** tab.  If you are a NetSuite OneWorld customer, select the Subsidiary that you'd like to edit then click the **Tax Registrations** tab:

<img src="/images/guides/integrations/netsuite/suitetax-tax-registrations.png" alt="SuiteTax Tax Registrations"/>

When adding a new nexus, make sure you choose **TaxJar** when selecting the tax engine for sales tax calculations.

## Getting Started with Legacy Tax

Configuring the TaxJar integration in environments where SuiteTax is not available, involves installing and configuring the TaxJar bundle, setting up nexuses, and creating tax codes which will be assigned to your customers for tax calculations.

<div class="alert alert-warning" role="alert">Before installing our bundle, please ensure the <b>Advanced Taxes</b> feature is enabled under <b>Setup > Company > Enable Features</b> inside the <b>Tax</b> tab.</div>

### Installing the bundle

You can install the TaxJar Sales Tax Automation integration in your NetSuite account via SuiteBundler under **Customization > SuiteBundler > Search & Install Bundles**. Search for "taxjar" and install the TaxJar SuiteBundle.

### Configuring TaxJar

Go to **TaxJar > Setup > Configuration** to connect your TaxJar account. Copy and paste your TaxJar API token in the field below:

<img src="/images/guides/integrations/netsuite/taxjar-api-token-legacy.png" alt="TaxJar API Token"/>

Next you'll want to configure your tax settings. Enable calculations and/or reporting depending on the TaxJar features you want to use.

<img src="/images/guides/integrations/netsuite/taxjar-configuration-legacy.png" alt="TaxJar Configuration"/>

For [sales tax reporting](#section-sales-tax-reporting) we support accrual or cash basis accounting methods. For accrual basis accounting, **open** invoices and credit memos will be synced to TaxJar. If you prefer syncing **paid in full** invoices and **fully applied** credit memos, choose **Cash Basis** accounting:

<img src="/images/guides/integrations/netsuite/taxjar-configuration-accounting-method.png" alt="TaxJar Configuration Accounting Method"/>

Finally, you'll be asked to review your NetSuite nexuses, setup tax codes, and assign those tax codes to your customers prior to using the TaxJar integration:

<img src="/images/guides/integrations/netsuite/taxjar-configuration-summary-legacy.png" alt="TaxJar Configuration Summary"/>

### Configuring Nexuses for TaxJar

In order to calculate sales tax, you will need to properly configure your NetSuite account to use TaxJar as the sales tax provider. Go to the **TaxJar** dropdown in your menu bar and select **Nexuses** from the **Setup** menu:

<img src="/images/guides/integrations/netsuite/taxjar-setup-nexuses-dropdown.png" alt="TaxJar Nexus Dropdown"/>

On the Nexuses page, set up all of the countries and regions where you need to collect sales tax. If you have been using Legacy Tax in NetSuite, you may already have existing nexuses:

<img src="/images/guides/integrations/netsuite/nexuses.png" alt="NetSuite Nexuses"/>

Make sure each subnexus in which you have a physical presence has a valid nexus address:

<img src="/images/guides/integrations/netsuite/nexus-edit-legacy.png" alt="Edit NetSuite Nexus"/>

When making sales tax calculations, these nexuses are passed to TaxJar through our API to determine where you have nexus. **These nexuses are not synced to your TaxJar account, so you will have to maintain nexuses separately in both NetSuite and TaxJar.**

If you have NetSuite OneWorld, add the nexuses to each of your subsidiaries where applicable under **Setup > Company > Subsidiaries**:

<img src="/images/guides/integrations/netsuite/subsidiary-nexus-legacy.png" alt="Nexuses Assigned to a Subsidiary"/>

### Create a tax agency

NetSuite will post the collected tax to a tax agency.  Tax agencies are standard vendor records with a category of **Tax agency**.  To create a tax agency for use with the TaxJar integration, navigate to **Lists > Relationships > Vendors > New**.

* Enter the following values
    * **Company Name:** TaxJar
    * **Category:** Tax agency
* For NetSuite OneWorld:
    * **Primary Subsidiary:**  Select the primary subsidiary for this vendor
* Click the **Save** button

<img src="/images/guides/integrations/netsuite/tax-agency.png" alt="TaxJar Tax Agency" />

### Create a tax code for US customers

Tax codes must be set up with the right tax control accounts and tax types so that NetSuite can correctly post the taxes to your general ledger.  To create a new tax code, navigate to **TaxJar > Setup > Tax Registrations/Codes** and click the **New Tax Code** button then click on **United States**.

<img src="/images/guides/integrations/netsuite/taxjar-tax-registrations-dropdown.png" alt="TaxJar Subsidiaries Dropdown"/>

* Enter the following values
    * **Tax Name:** TaxJar
    * **Display Name/Code:** Sales Tax
    * **Rate:** 0.0%
    * **Tax Agency:** TaxJar
    * **Tax Account:** Select the payables account where sales tax should accrue. If there is no tax control account, create a new one by navigating to **Setup > Accounting > Tax Control Accounts > New**.
* For NetSuite OneWorld
    * **Subsidiaries:** Choose one subsidiary per tax code.  If you wish to calculate tax for multiple subsidiaries, create one tax code for each subsidiary.
* Click the **Save** button

<img src="/images/guides/integrations/netsuite/tax-code.png" alt="TaxJar Tax Code" />

### Review your NetSuite tax settings

TaxJar requires the following settings to be checked under **Setup > Accounting > Set Up Taxes** for our Legacy Tax integration:

<img src="/images/guides/integrations/netsuite/legacy-tax-settings.png" alt="NetSuite Legacy Tax Settings"/>

First, set the default tax code to "TaxJar". Next, check the following checkboxes:

* Enable tax lookup on sales transactions
* Customers default to taxable
* Per-line taxes on transactions
* Respect discount item tax preference

Click the **Save** button to finish saving your native tax settings in NetSuite.

### Assign the TaxJar tax item to one customer

Tax codes need to be assigned to all of your customer records in the **Tax Item** field.  To update the tax item for a single customer, navigate to **Lists > Relationships > Customers**.

* Find the customer you'd like to update and click **Edit**.
* Click on the **Financial** tab.
* Ensure that the **Taxable** box is checked.
* In the **Tax Item** field, select the TaxJar tax code (tax group for Canadian customers) created earlier.
* Click the **Save** button

<img src="/images/guides/integrations/netsuite/customer-tax-item.png" alt="Customer Tax item" />

### Assign the TaxJar tax item to multiple customers

You can use the bulk update features in NetSuite to add tax items to some or all of your customer records at once.  To do this with the **Mass Update** feature, navigate to **Lists > Mass Update > Mass Updates**

* Expand **General Updates**
* Click on **Customer**
* On the **Criteria** tab, enter the appropriate filters to identify which customers should be updated.
* Click on the **Mass Update Fields** tab
* Check the **Apply** box next to each of the following fields and enter these values:
    * **Taxable:** Checked
    * **Tax Item:** TaxJar
* Click the **Preview** button
* On the **Mass Update Preview Results** screen, click the **Perform Update** button.

The update will run in the background.

### Set a default tax code for newly created customers

You can set a default tax code to be assigned to every new customer that gets created.  In OneWorld environments you can set a different default tax code for each subsidiary.

* In a NetSuite OneWorld environment, navigate to **Setup > Company > Subsidiaries** and click **Edit** next to a subsidiary record.
* In a NetSuite Standard environment, navigate to **Setup > Company > Company Information**.
* In the **TaxJar Default Tax Code** field, select the tax code or tax group that you created for this subsidiary.
* Click the **Save** button.

Each new customer created in this subsidiary will automatically have the selected Tax Code assigned to it.

### The TaxJar Legacy Tax Custom Role

A new custom role called **TaxJar Legacy Tax** is included in the TaxJar bundle for NetSuite.  This role is used to ensure that our custom scripts have the minimum permissions needed to accurately calculate tax without requiring you to give your users access to records they might not otherwise have access to. In addition to permissions on TaxJar-specific records, this custom role has been given the following permissions:

* **Edit** level access to the following transaction types:  *Estimates, Opportunities, Sales Orders, Invoices, Cash Sales, Credit Memos, Cash Refunds, Return Authorizations, and Credit Memos*.
* **List > Tax Items > View** in order to access Nexus record information.
* **List > Subsidiary > View** to read address information on subsidiary records.
* **List > Locations > View** to read address information on location records.
* **List > Items > View** to read TaxJar Category information on item records.
* **List > Customers > View** to read tax codes and the exemption status of customer records.
* **List > Contacts > View** was required to read exemption status on customer records.

<div class="alert alert-danger" role="alert">The <strong>TaxJar Legacy Tax</strong> role should not be modified in any way as this may impact TaxJar's ability to calculate tax in your environment.</div>

### Creating Tax Codes for Canadian customers

For Canadian customers, create separate tax codes for PST and GST/HST.  To create a new tax code, navigate to **TaxJar > Setup > Tax Registrations / Codes** and click the **New Tax Code** button the click on **Canada**.

* Enter the following values
    * **Tax Name:** TaxJar-PST
    * **Display Name:** PST
    * **Rate:** 0.0%
    * **Tax Type:** PST
    * **Tax Agency:** TaxJar
    * **Purchase Tax Account:** Select the account for purchase tax liability.  If there is no tax control account, create a new one by navigating to **Setup > Accounting > Tax Control Accounts > New**
    * **Sales Tax Account:** Select the account for sales tax payables.  If there is no tax control account, create a new one by navigating to **Setup > Accounting > Tax Control Accounts > New**
* For NetSuite OneWorld
    * **Subsidiaries:** Choose one subsidiary per tax code.  If you wish to calculate tax for multiple subsidiaries, create one tax code for each subsidiary.
* Click the **Save** button

<div class="alert alert-info" role="alert">Repeat this process substituting GST/HST for PST.</div>

### Creating a Tax Group for Canadian customers

Creating a Tax Group allows you to use multiple tax codes on a single transaction.  For Canadian customers, create a Tax Group that combines the PST and GST/HST tax codes that you created in the previous step. To create a new tax group, navigate to **Setup > Accounting > Tax Groups > New**.  Click on **Canada**.

* Enter the following values
    * **Tax Code:** TaxJar - Canada
    * **Subsidiaries (OneWorld only):** Choose the subsidiary that was selected when you created the individual tax codes for Canada.
    * **GST/HST:** TaxJar-GST/HST
    * **PST:** TaxJar-PST
* Click the **Save** button

<img src="/images/guides/integrations/netsuite/tax-group.png" alt="TaxJar Tax Group" />

## Legacy Tax SuiteCommerce/SuiteCommerce Advanced Cart Tax

In order to enable SuiteCommerce or SuiteCommerce Advanced cart calculations, please follow the steps below:

First, please navigate to **TaxJar > Setup > Configuration**.

* Check off the **Enable SuiteCommerce Cart Calculations** checkbox under the **Configure Tax Settings** step.
* Click the "Next" button.
* Click the "Save" button.

<img src="/images/guides/integrations/netsuite/taxjar-enable-cart-calculations.png" alt="Enable TaxJar SuiteCommerce Cart Calculations"/>

In order to enable scriptable cart for each applicable website:

* Navigate to **Commerce > Websites > Website List**.
* Click "Edit" next to the site in which to activate the TaxJar script.
* On the **Setup** tab in the **Preferences** section, check off the "Scriptable Cart and Checkout" checkbox.
* Click the "Save" button.

In order to ensure no custom item column fields are exposed (otherwise TaxJar custom category field will be exposed to users):

* Navigate to **Commerce > Websites > Configuration**.
* Select the web store (this step will need to be followed for each web store).
* Under the **Shopping Catalog** tab, select the **Item Options** sub-tab, and check off the "Show Only Items Listed In: Item Options and Custom Transaction Column Fields" checkbox.
* Click the "Save" button.

## Common Configuration

### Product Exemptions & Taxability

To assign a specific item in NetSuite to a TaxJar product category for exemptions, simply edit the item and click the **TaxJar** tab. Select a TaxJar category and save the item:

<img src="/images/guides/integrations/netsuite/taxjar-product-exemptions.png" alt="TaxJar Product Exemptions"/>

For assigning items in bulk to a given TaxJar category, use the [mass update](https://system.netsuite.com/app/help/helpcenter.nl?fid=section_N666653.html) feature under **Lists > Mass Update > Mass Updates** and select an item type under **General Updates**.


You can review all of your categorized items under **TaxJar > Reports > Exempt Items**.

### Customer Exemptions & Taxability

To exempt a specific customer in Netsuite for calculations and reporting, edit the customer and click the **TaxJar** tab. Check the **TaxJar Exempt** checkbox and select an exemption type from the dropdown:

<img src="/images/guides/integrations/netsuite/taxjar-customer-exemptions2.png" alt="TaxJar Customer Exemptions"/>

If a customer provides an exemption certificate that's valid only for certain states, you can select those states in the **TaxJar Exemption States** field.  If this field is blank, TaxJar will assume they are exempt everywhere.  If there are states selected in this box, TaxJar will assume they are exempt only in those states and will calculate sales tax on orders for other states.

If you decide to perform a [mass update](https://system.netsuite.com/app/help/helpcenter.nl?fid=section_N666653.html) on your customer records to exempt a batch of customers from sales tax, they'll automatically enqueue and sync to TaxJar. To manually backfill customers, go to the **TaxJar** dropdown in your menu bar and select **Backfill > Backfill Records**, then select **Customers** in the **Backfill Type** field:

<img src="/images/guides/integrations/netsuite/taxjar-backfill-dropdown.png" alt="TaxJar Backfill Customers Dropdown"/>

You can review all of your exempt customers under **TaxJar > Reports > Exempt Customers**.

### Order Exemptions & Taxability

To exempt an individual order rather than a customer, click the **TaxJar** tab on a transaction and select an exemption type from the dropdown:

<img src="/images/guides/integrations/netsuite/taxjar-order-exemptions.png" alt="TaxJar Order Exemptions"/>

If you sell on a marketplace that TaxJar doesn't support yet, you can use the **Marketplace** exemption to designate an order as custom marketplace exempt. TaxJar will automatically determine if the order is shipped to a state with a marketplace facilitator law and handle it accordingly for reporting / filing.

If you have exempt customers that are sometimes taxable for specific orders, you can also use the TaxJar Exemption Type dropdown to set an order as **Non-Exempt**. This will override the customer exemption and allow you to collect sales tax on an order for a customer who would typically be exempt from sales tax.

### Multiple TaxJar Accounts

In a NetSuite OneWorld environment, it is possible to link individual subsidiaries to different TaxJar accounts. This might be helpful for a scenario in which each subsidiary, or legal entity, maintains a different tax registration with individual states.  Syncing transactions to different TaxJar accounts allows TaxJar to file separately for those legal entities.  After signing up for one or more new TaxJar accounts, generate an API token for each account.  Then,

* In NetSuite, navigate to **Setup > Company > Subsidiaries**.
* Click **Edit** next to the subsidiary whose transactions should go to a separate TaxJar account.
* In the **TaxJar API Token** field, enter the API token for the TaxJar account this subsidiary should use.

If you only use one TaxJar account, you do not need to enter an API token on your subsidiary records.  The default token has already been specified in the TaxJar configuration process.

### Sales Tax Adjustments

If you need to refund sales tax on a previous order for a customer that was processed prior to exempting them, we recommend fully refunding the order and making a copy of the original order via **Actions > Make Copy**.

### Address Validation

TaxJar provides US address validation directly inside NetSuite to ensure valid addresses are sent to our API for accurate sales tax calculations. To set up address validation, go to **Customization > Forms > Address Forms**. You'll find a custom address form named "TaxJar Address Validation Form":

<img src="/images/guides/integrations/netsuite/custom-address-form.png" alt="TaxJar Address Validation Form"/>

Click the "Edit" link and go to the "Custom Code" tab. Select `tj_validate_address.js` as the script file:

<img src="/images/guides/integrations/netsuite/taxjar-address-validation-custom-code.png" alt="TaxJar Address Validation Form Custom Code"/>

Next, click the "Country" tab to enable the form in the United States:

<img src="/images/guides/integrations/netsuite/custom-address-form-country.png" alt="TaxJar Address Validation Form Country Selection"/>

You can now validate addresses anywhere in NetSuite! Upon clicking the "Validate Address" button, we'll automatically clean up the address and add a ZIP+4 postal code:

<img src="/images/guides/integrations/netsuite/taxjar-address-validation.png" alt="TaxJar Address Validation"/>

### Discount Items

Order-level discounts and line discounts should behave similar to native NetSuite behavior for both sales tax calculations and reporting / filing. Discounts added as a line item to an order will discount the preceding line item.

If you use discount items for gift card redemptions or other scenarios which may require applying the discount after calculating tax, use the "Apply After Tax" checkbox on the "TaxJar" tab when configuring a discount item:

<img src="/images/guides/integrations/netsuite/apply-after-tax.png" alt="TaxJar Apply Discounts After Tax"/>

## Sales Tax Calculations

TaxJar directly integrates with NetSuite and provides sales tax calculations for the following records in NetSuite:

- Quotes
- Opportunities
- Sales orders
- Invoices
- Cash sales
- Credit memos
- Cash refunds
- Return authorizations

Before making a calculation, TaxJar requires a valid shipping address and one or more line items in a given record. After providing this information, click the **Preview Tax** button to get a summary of sales tax organized by jurisdiction:

<img src="/images/guides/integrations/netsuite/suitetax-summary.png" alt="SuiteTax Sales Tax Summary"/>

For US calculations, this summary may include state, city, county, and district tax. In Canada, GST / PST / QST amounts. In other countries, VAT will be listed. You'll also notice the tax is broken out for each line item under the **Tax Details** tab:

<img src="/images/guides/integrations/netsuite/suitetax-tax-details.png" alt="SuiteTax Tax Details Tab"/>

Once a record is processed, the underlying tax types and tax codes may be referenced in your NetSuite Tax Report under **Reports > Financial > Tax Report** (SuiteTax only). You can review the underlying API requests and responses under **TaxJar > Reports > Logs** to verify calculations.

If you save the record before previewing tax, don't worry. TaxJar will automatically calculate sales tax after you save a record.

### Backup Rates

When sales tax is previewed or calculated, a request is made to our API through SuiteTax. In the unlikely event that our API is unavailable (we boast [99.99% uptime](https://status.taxjar.com/)), we'll apply a backup rate as a fallback to ensure you collect sales tax. A backup rate is an average tax rate across all postal codes in a given region or country.

After configuring the integration, we'll retrieve backup rates for every region and country we currently support and store the rates directly inside NetSuite. Each month we'll update the rates using a scheduled script for accurate backup calculations.

<img src="/images/guides/integrations/netsuite/taxjar-backup-rates.png" alt="TaxJar Backup Rates"/>

You can review the current backup rates under **TaxJar > Reports > Backup Rates**.

### Skip & Override Calculations

When importing orders from an external platform such as Shopify, Amazon, eBay, or a custom homegrown system, you may want to skip API calculations and bring in the sales tax you've already collected "as-is". TaxJar makes it easy to pass in a custom field and generate the tax details for SuiteTax. You can set this field using a NetSuite connector such as Celigo / FarApp, CSV imports, or your own SuiteTalk web services integration.

Use one of the following custom transaction body fields to import tax for an order without recalculating tax in SuiteTax:

- `custbody_tj_external_tax_amount` for order-level sales tax amounts
- `custbody_tj_external_tax_rate` for order-level sales tax rates

To test out this functionality, you can also edit these fields directly inside the **TaxJar** subtab on a transaction record. Click the **Preview Tax** button or save the record to apply the tax.

If your platform records sales tax at the line level, you can use one of the following custom transaction column fields to import tax for each line item:

- `custcol_tj_external_tax_amount` for line-level sales tax amounts
- `custcol_tj_external_tax_rate` for line-level sales tax rates

Regarding marketplace-facilitated transactions, for which a marketplace (e.g. Amazon) collects taxes and remits them on your behalf, external tax can be excluded from transaction total. In order to prevent the external tax amount or rate (order-level or line-level) from being included in the transaction total, and prevent it from impacting GL, check off the transaction body checkbox `custbody_tj_exclude_external_tax` for a particular transaction.

### Will Call Shipping

If you allow customers to pick up orders at your storefront or warehouse, use the "Will Call" shipping option to calculate sales tax based on the location of the order instead of the shipping address:

<img src="/images/guides/integrations/netsuite/taxjar-will-call-shipping.png" alt="TaxJar Will Call Shipping"/>

Will Call shipping is available under the "TaxJar" subtab for shipping items via **Lists > Accounting > Shipping Items** and individual orders.

### Calculate Tax with SuiteScript

Developers can manually trigger a sales tax calculation within SuiteScript for both Legacy Tax and SuiteTax. This can be useful after a record is programmatically created or in certain scenarios where tax may not be calculated before another action must take place, such as authorizing a credit card charge.

To calculate sales tax in SuiteScript with Legacy Tax, use the `calculateTax` and `buildTaxDetails` methods after including the `tj_leg_calculations_public` module. Keep in mind these methods do not support records in dynamic mode.

<pre>
define([
  'N/record',
  '/SuiteBundles/Bundle 265097/com.taxjar.salestax/tj_leg_calculations_public'
], function (record, taxjar) {
    // ...
    var rec = record.load({ type: record.Type.SALES_ORDER, id: 10257 });
    taxjar.calculateTax(rec);
    taxjar.buildTaxDetails(rec);
    // ...
}
</pre>

To calculate sales tax in SuiteScript with SuiteTax, use the `record.Macro.CALCULATE_TAX` macro:

<pre>
define([
  'N/record'
], function (record) {
    // ...
    var rec = record.create({ type: record.Type.SALES_ORDER, isDynamic: true });
    rec.executeMacro({ id: record.Macro.CALCULATE_TAX });
    // ...
}
</pre>

## Sales Tax Reporting

TaxJar automatically syncs invoices, cash sales, credit memos, and cash refunds for sales tax reporting and filing. This is done automatically behind the scenes when one of these records is created or updated inside NetSuite. To backfill older transactions from NetSuite into TaxJar, go to the **TaxJar** dropdown in your menu bar and select **Backfill > Backfill Records**, then select **Transactions** in the **Backfill Type** field:

<img src="/images/guides/integrations/netsuite/taxjar-backfill-dropdown.png" alt="TaxJar Backfill Transactions Dropdown"/>

From there, use the datepickers in the **Start Date** and **End Date** to select a date range of transactions to backfill:

<img src="/images/guides/integrations/netsuite/taxjar-backfill-transactions.png" alt="TaxJar Backfill Transactions"/>

Click **Backfill Records** and transactions with a transaction date within that range will be queued for syncing. To monitor the queue system, go to **TaxJar > Reports > Queue** to view pending, processed, and invalidated transactions:

<img src="/images/guides/integrations/netsuite/queue-report.png" alt="TaxJar Queue Report"/>

You can browse and filter through all of your synced transactions under **TaxJar > Reports > Synced Transactions**:

<img src="/images/guides/integrations/netsuite/synced-transactions-report.png" alt="TaxJar Synced Transactions Report"/>

### Transaction States

For accrual basis accounting, TaxJar imports **open** invoices and credit memos. For cash basis accounting, TaxJar only imports **paid in full** invoices and **fully applied** credit memos. Cash sales and cash refunds are always synced over. Additionally, only transactions shipped to the US with USD currency are synced to TaxJar. At this time TaxJar only supports reporting and filing in the United States.

After a customer payment is recorded, any associated invoices will be synced if they're in a **paid in full** status.

After a customer refund is recorded, any associated credit memos will be synced if they're in a **fully applied** status.

### Standalone Refunds

If you create credit memos or cash refunds separately from an invoice or cash sale in NetSuite, you may want to specify a reference transaction that links the refund to the original order before syncing the refund to TaxJar. Click the **TaxJar** subtab on a refund transaction and select a synced order from the **TaxJar Reference Transaction** field:

<img src="/images/guides/integrations/netsuite/taxjar-reference-transaction.png" alt="TaxJar Reference Transaction"/>

After saving, our integration will reference this transaction as a fallback if we can't find an originating order for the refund.

### Marketplace Exemptions

If you sell on marketplaces such as Amazon, eBay, Etsy, or Walmart and import orders from these channels into NetSuite, you can designate them as marketplace exempt for TaxJar reporting and filing. Simply change the **TaxJar Provider** field from "api" to "amazon", "ebay", "etsy", or "walmart" when editing a transaction:

<img src="/images/guides/integrations/netsuite/marketplace-exemptions.png" alt="TaxJar Marketplace Exemptions for NetSuite"/>

You can also set a provider for many transactions at once using the [mass update](https://system.netsuite.com/app/help/helpcenter.nl?fid=section_N666653.html) feature under **Lists > Mass Update > Mass Updates**. After doing so, make sure to backfill these transactions into TaxJar via **TaxJar > Backfill > Transactions**.

Import marketplace transactions using a connector via SuiteTalk / web services? You can programmatically set the transaction body custom field `custbody_tj_provider` to the channel of your choice before creating the order or refund in NetSuite.

### Skipping / Filtering Transactions

If you'd like to skip specific transactions from syncing to TaxJar, you can use the "Skip TaxJar Sync" checkbox on individual transactions on the "TaxJar" subtab:

<img src="/images/guides/integrations/netsuite/skip-taxjar-sync.png" alt="TaxJar Skip TaxJar Sync Checkbox"/>

For skipping transactions in bulk, use the [mass update](https://system.netsuite.com/app/help/helpcenter.nl?fid=section_N666653.html) feature under **Lists > Mass Update > Mass Updates** and select `Invoice`, `Cash Sale`, `Credit Memo`, or `Cash Refund` under **General Updates > Transaction Types**.

Import transactions using a connector via SuiteTalk / web services? You can programmatically set the transaction body custom field `custbody_tj_sync_skip` to true (T) or false (F) based on your given logic or criteria.

### Skipping Subsidiary Transaction Calculations or Transaction Sync Process

If you'd like to prevent a specific subsidiary's transactions from syncing with TaxJar, you can use the "Disable TaxJar Sync" checkbox on a specific subsidiary record:

<img src="/images/guides/integrations/netsuite/taxjar-subsidiary-sync-checkbox.png" alt="TaxJar Disable TaxJar Sync Checkbox"/>

For Legacy Tax environments, if you'd like to prevent tax calculations from being carried out for a specific subsidiary's transactions, you can use the "Disable TaxJar Calculations" checkbox on a specific subsidiary record:

<img src="/images/guides/integrations/netsuite/taxjar-subsidiary-calc-checkbox.png" alt="TaxJar Disable TaxJar Calculations Checkbox"/>

### Sync Permissions

If you receive `INSUFFICIENT_PERMISSION` error notifications from NetSuite after installing the TaxJar bundle, you may need to update access for non-administrator roles or update script deployments to execute as a specific role under **Customization > Scripting > Script Deployments**. For security reasons, our integration defaults the execution to "Current Role" for script deployments instead of "Administrator".

To allow specific roles to enqueue and sync transactions in real-time after saving an invoice, cash sale, cash refund, or credit memo, make sure the role has the "Custom Record Entries" permission. Alternatively, change the following script deployments to execute as an "Administrator" role:

- customdeploy_tj_sync_orders_cashsales
- customdeploy_tj_sync_orders_custpayments
- customdeploy_tj_sync_orders_invoices
- customdeploy_tj_sync_refunds_cashrefunds
- customdeploy_tj_sync_refunds_creditmemos
- customdeploy_tj_sync_refunds_custrefunds
- customdeploy_tj_sync_customers

## Wrapping Up

Congratulations, you've finished setting up TaxJar and NetSuite! At this point you should be collecting sales tax in NetSuite and syncing transactions for reporting / filing.

## Current Limitations

The following items are currently unsupported by TaxJar in NetSuite:

- If "Item Line Shipping" is enabled, TaxJar will use the first line item shipping address for calculations and reporting. At this time, TaxJar does not support multiple shipping addresses through our API.
- TaxJar does not currently support use tax calculations for the following record types: Credit card charge, credit card refund, purchase order, vendor bill, vendor credit, vendor return authorization. Calculations will be skipped for these record types when attempting to estimate or record tax via SuiteTax.
- Legacy Tax environments currently have the following known limitations:
    - Only partial support for Site Builder.  Sales tax is calculated with the order is submitted but is not shown when the shopping cart is viewed before checkout.
    - It does not currently support SuiteCommerce or SuiteCommerce Advanced.
    - It does not currently support separate G/L accounts for individual tax agencies.

If you are using SuiteTax, please review the [known limitations of SuiteTax](https://system.netsuite.com/app/help/helpcenter.nl?fid=section_4683973968.html) in the NetSuite Help Center prior to installing SuiteTax.

## Integration Changelog

Curious to see what's changed with our integration lately? Read on to learn more!

### v2.7.1 - 2021-12-17
- Fixed bundle installation issue caused by inaccessible module.

### v2.7.0 - 2021-12-15
- SuiteCommerce/SuiteCommerce Advanced real-time cart sales tax calculations now available in Legacy Tax environments.
- "Apply After Tax" checkbox added to payment items.

### v2.6.4 - 2021-11-08
- Legacy tax environments with NetSuite native tax calculations utilized on transactions for customers with no TaxJar tax item set have now been fixed to allow native calculations to be carried out properly.
- When line-level shipping is utilized on transactions, shipping address is now being sourced from the first line rather than on the header-level for transactions synced with TaxJar.
- Fixed issue with transactions missing state/province value within their shipping address.

### v2.6.3 - 2021-10-18
- Resolved issue with subsidiary lookup in standard edition environments that was causing an error upon saving transactions with non-US/CA customer shipping country.

### v2.6.2 - 2021-10-14
- Fixed issue with setting tax total when customer country does not match subsidiary country.
- Fixed issue with TaxJar validation process occurring for transactions with which calculations were disabled for the applicable subsidiary, validation will now be skipped for these cases.
- Negative line items on transactions are now being handled as discounts when not explicitly set with discount items, as this would previously cause the discount amount passed to TaxJar to show an incorrect amount.

### v2.6.1 - 2021-09-16
- Excluded shipping and handling changes during dynamic external tax recalculation process.
- Fixed issue with customer deletion process in which customer ID was not properly passed to TaxJar endpoint which was causing failed deletion calls.
- Fixed issue when a custom SuiteScript voids a transaction in which TaxJar validation was causing void process to fail.

### v2.6.0 - 2021-08-31
- External tax can now be excluded from the transaction total and GL for marketplace transactions using the `custbody_tj_exclude_external_tax` transaction body field.
- Synced transactions report criteria fixed to now properly display all synced transactions.
- Added customer exemption type field validation process.

### v2.5.1 - 2021-08-04
- Shipping and handling tax added for transaction external tax rate calculations.
- Updated bundle SHA-1 signature method usage to SHA-256 as required for NetSuite 2021.2 release.

### v2.5.0 - 2021-07-23
- Updated Legacy Tax and SuiteTax external tax calculation for child transactions when external tax amount is set to proportionally reduce taxes.
- Added "Disable TaxJar Calculations" checkbox to subsidiary records to disable Legacy Tax calculations for specific subsidiaries.
- Fixed issue with TaxJar configuration wizard "Cancel" button.

### v2.4.1 - 2021-06-29
- Fixed an issue with order sync process in which NetSuite Standard Edition accounts cannot lookup subsidiary ID, causing error.

### v2.4.0 - 2021-06-15
- Legacy Tax calculations will no longer be performed for transactions in which the applicable address is within a non-nexus state.
- Added "Disable Transaction Sync" checkbox to subsidiary records to disable transaction and customer sync for specific subsidiaries.
- Skip line item validation for opportunity records in SuiteTax and Legacy Tax.
- Fixed issue in which pending approval invoices are synced with TaxJar when accrual accounting is enabled.
- Fixed preview tax functionality for Legacy Tax when calculations are disabled or a customer does not have a TaxJar tax item.
- Added validation to accounts receivable and accounts payable account values within TaxJar configuration assistant for SuiteTax.

### v2.3.0 - 2021-03-31
- Added Legacy Tax calculation fallbacks to use native tax codes in NetSuite if TaxJar calculations are disabled or tax code for the customer is not set to "TaxJar".
- Updated [TaxJar API version](https://developers.taxjar.com/api/reference/#api-version) to `2020-08-07` for improved transaction sync validation.
- Fixed handling costs for Legacy Tax calculations and transaction sync.
- Fixed unexpected error for Legacy Tax international (non-US/CA) calculations.
- Fixed an error with empty carts for SuiteTax calculations and SuiteCommerce 2020.2.
- Fixed errors from being returned in SuiteCommerce when TaxJar calculations are disabled or an invalid TaxJar API response is returned for SuiteTax calculations.

### v2.2.1 - 2021-02-17
- Integration support for NetSuite 2021.1.
- Added accounting method dropdown setting for Accrual or Cash Basis accounting in setup wizard.
- Fixed zero quantity lines with amounts for SuiteTax and Legacy Tax calculations.

### v2.2.0 - 2020-12-09
- Public Legacy Tax functions for `calculateTax` and `buildTaxDetails` now available for developers to programmatically calculate tax using TaxJar in their own scripts.
- Fixed Legacy Tax permission for passing order-level exemptions such as `wholesale`.
- Fixed Legacy Tax external tax distribution across line items when an order-level external tax amount was set (presentational only).
- Fixed SuiteTax nexus registration date lookup when using UK / EU `D/M/YYYY` date format.
- Fixed transaction sync retries with overlapping transaction IDs between orders and refunds, resolving potential `SSS_USAGE_LIMIT_EXCEEDED` errors.

### v2.1.3 - 2020-10-16
- Lookup missing address states based on zip code for Legacy Tax calculations.
- Display notification when an order is not marked as taxable for Legacy Tax calculations.
- Set first item to taxable when per-line taxes are not enabled in NetSuite for Legacy Tax calculations to avoid `TRANS_UNBALNCD` errors.
- Fixed Preview Tax button when too many client scripts are loaded on a record type or the page is slow to respond for Legacy Tax calculations.
- Fixed an access permission for company addresses when a location is not set on transactions such as quotes / estimates.
- Fixed an issue with calculating tax on overdiscounted orders for SuiteTax.

### v2.1.2 - 2020-10-01
- Lookup missing address states based on zip code for transaction sync.
- Fixed an access permission for non-administrators when applying customer payments or refunds.

### v2.1.1 - 2020-09-18
- Bumped version for SuiteTax plugin script to execute as "TaxJar Tax Engine" role.

### v2.1.0 - 2020-09-17
- Will Call shipping now available for orders and shipping items / methods. Calculate sales tax based on the company location of the order.
- Fixed an issue with passing correct nexus addresses at the subsidiary level for SuiteTax and NetSuite OneWorld.
- Fixed an issue with applying backup rates for Legacy Tax calculations.
- Fixed an issue with pulling country data for ship-from addresses when falling back to a subsidiary address.
- Skip uncalculated shipping costs validation when populating external tax for Legacy Tax calculations.
- Display API errors in NetSuite UI for Legacy Tax calculations.

### v2.0.13 - 2020-09-04
- Fixed API request and response logging for Legacy Tax calculations.
- Fixed UI notifications for Legacy Tax calculations when external tax is populated.
- Fixed an issue with fractional / decimal quantities for transaction sync. Fractional quantities will be down converted to 1.
- Fixed an issue with product tax codes not being sent for calculations within SuiteCommerce via SuiteTax.
- Fixed an undefined error when generating tax details after a transaction is saved in Legacy Tax.
- Fixed an undefined error when external tax is populated without an address in Legacy Tax.

### v2.0.12 - 2020-08-13
- Fixed an issue the caused an error when saving Purchase Requests.
- Fixed an issue where Legacy Tax calculations ignored an external tax amount or rate of 0 and calculated tax anyway.
- Added a custom role with the minimum permissions needed for Legacy Tax calculation scripts to run.  This addresses a concern about using Administrator permissions which came up during our 2020.2 "Built for NetSuite" review.

### v2.0.11 - 2020-08-07
- Fixed an issue with Legacy Tax calculations that would not allow customers to create transactions with custom addresses.

### v2.0.10 - 2020-07-31
- Fixed a TaxEngine error displayed during Guest Checkout in SuiteCommerce Advanced.
- Reference transactions for standalone credit memos and cash refunds are now optional when syncing transactions to TaxJar.

### v2.0.9 - 2020-07-20
- Fixed an issue with Legacy Tax transaction sync not including the line item sales tax values.
- Fixed an error that occurred when a credit memo was applied to too many invoices.
- Added a custom User-Agent header to all API requests.

### v2.0.8 - 2020-07-09
- Fixed an issue with transaction sync when a payment was applied to thousands of invoices.
- Updated the discount logic to skip items marked with "Apply after tax"
- Allow nexus updates when a transaction has tax calculated in an external system.

### v2.0.7 - 2020-07-01
- Fixed an issue with background processing of invoices causing an error in NetSuite Standard environments.
- Updated calculations to use only the first street address line to improve tax calculation accuracy.

### v2.0.6 - 2020-06-25
- Fixed an issue when marking a large number of items were marked with "Apply after tax".
- Fixed an issue with Legacy Tax calculations when a unit price was not provided on a line item.

### v2.0.5 - 2020-06-22
- Add initial support for UK/AU/EU tax calculations for Legacy Tax.
- Fixed an issue when line discounts were larger than the line item being discounted.

### v2.0.4 - 2020-06-11
- Fixed an issue when applying a markup across multiple line items that prevented pushing transactions to TaxJar in some cases.

### v2.0.3 - 2020-06-04
- Allow users to specify sales tax as a line item when importing transactions from marketplace platforms (Legacy Tax).
- Only display the Preview Tax button when Sales Tax Calculations are enabled (Legacy Tax).
- Fixed an error that occurred when creating a customer payment record and applying it to a large number of invoices.

### v2.0.2 - 2020-05-22
- Fix decimal precision on order-level amounts when syncing transactions to TaxJar.
- Skip address check if external tax is provided for legacy calculations.
- Skip legacy calculations and continue importing an order that does not pass validation in a web services execution context.

### v2.0.1 - 2020-05-11
- Update messaging when Professional or Premium account is required.
- Update script deployment for Legacy Tax Suitelet.

### v2.0.0 - 2020-05-08
- Add beta support for legacy tax calculations in NetSuite.

### v1.7.3 - 2020-05-05
- Fixed an issue when adjusting an order level discount when the last line item on the order was not a discountable item.
- Fixed an issue that prevented pushing transactions to TaxJar when they included items marked as "Apply After Tax" with negative values.

### v1.7.2 - 2020-04-29
- Fixed an issue pushing transactions to TaxJar which included line items with no unit price.
- Fixed an issue in which the 'shippingcost' field was returned as a string in some NetSuite environments.
- Added better handling for records that should be 'skipped' when pushing transactions to TaxJar.

### v1.7.1 - 2020-04-22
- Fixed an issue when pushing transactions to TaxJar when there is no 'discounts_after_tax' configuration setting.

### v1.7.0 - 2020-04-16
- Added support for syncing transactions with Item Groups, Payment items, Markup items, Subtotal items, and Description items.
- Added better handling of discount and markup items when applied to Item Groups and Subtotal items.
- Added support for syncing transactions with positive discounts (discount items that increase an item's unit price).
- Fixed an issue that skipped syncing backfill transactions that were already synced even when the 'Force Sync' box was checked.

### v1.6.14 - 2020-03-30
- Fixed an issue that occurred when applying a credit memo to an invoice in NetSuite Standard environments preventing both the credit memo and the invoice from being pushed to TaxJar.

### v1.6.13 - 2020-03-26
- Allow transactions that provide external tax values to bypass nexus comparison validations.

### v1.6.12 - 2020-03-23
- Allow saving transactions in NetSuite when external tax values are provided and the transaction would not otherwise pass data validations related to tax calculation.  This change is meant to allow saving transactions in NetSuite that come from external eCommerce systems with incomplete addresses.  These transactions still cannot be pushed into TaxJar with incomplete address information.

### v1.6.11 - 2020-03-10
- Fixed an issue that prevented transactions with Payment Items being pushed to TaxJar
- Fixed an issue with VOIDed transactions that were not properly updated in TaxJar and no error was reported to user.

### v1.6.10 - 2020-02-20
- Fixed an issue that sent the wrong exemption type when pushing marketplace exemption orders to TaxJar.

### v1.6.9 - 2020-02-14
- Fixed an issue that resulted in an error when creating vendor bills.

### v1.6.8 - 2020-02-13
- Fixed an issue causing every customer updated via mass update or inline edit to be pushed to TaxJar regardless of the fields being updated or the exemption status of the customer.

### v1.6.7 - 2020-02-11
- Fixed an error when SuiteTax was triggered on transactions that are not related to a customer.

### v1.6.6 - 2020-02-10
- Use customer exemption status when calculating tax on a transaction if no order exemption status is selected.  This eliminates the need to wait for customer records to sync to TaxJar before creating orders that are exempt from sales tax.
- Fixed an issue that would not delete marketplace provider refunds from TaxJar correctly when corresponding credit memos were deleted in NetSuite.

### v1.6.5 - 2020-01-27
- Fixed an issue that prevented discounts on item groups from being applied properly when calculating tax.
- Fixed an issue that prevented pushing transactions to TaxJar if they contained item groups.
- Fixed an issue that prevented deleting transactions from TaxJar with a TaxJar Provider other than 'api' ('amazon', 'walmart', 'ebay', 'etsy').

### v1.6.4 - 2020-01-20
- Updated the Backfill Customers & Transactions link on the TaxJar Portlet to point to the correct Suitelet.

### v1.6.3 - 2020-01-16
- Updated the user interface for backfilling customers and transactions providing more information and preventing the submission of new backfill requests while one is running.
- Fixed an issue that prevents pushing an invoice to TaxJar when that invoice transitions to a "Paid if Full" status by applying an existing credit memo.
- Fixed an issue that prevents pushing transactions to TaxJar when they were created or updated via web services, CSV import, or another bulk context.

### v1.6.2 - 2020-01-02
- Fixed an issue that doubled sales tax related to shipping when a handling charge was present on the transaction.  This update treats the handling charge like a separate line item for sales tax calculations purposes.
- Updated the TaxJar queue report to include a link directly to the logs relevant to a given transaction.
- Fixed an issue in the bundling process that prevented the address validation script from running.

### v1.6.1 - 2019-12-12
- Fixed an issue that prevented cash refunds from being pushed to TaxJar under certain scenarios.

### v1.6.0 - 2019-12-12
- Add support for multiple TaxJar accounts.  Each subsidiary can be configured to push data to a different TaxJar account.
- Fixed an issue that prevented users from creating transactions with a $0.00 subtotal and a value specified in the external tax field.

### v1.5.3 - 2019-11-20
- Fix rounding issue when specifying an external tax amount.
- Fix issue when a payment record uses a credit memo to pay an invoice.
- Add the TaxJar Category custom item field to Assembly Item records.

### v1.5.2 - 2019-11-11
- Fix RCRD_DSNT_EXIST error when return authorization is created from a sales order.

### v1.5.1 - 2019-11-01

- Fix issue with incrementing the retry count on queued record items.

### v1.5.0 - 2019-11-01

- **Redesigned Backfill Workers** Backfill scripts were re-written to take advantage of NetSuite's map/reduce architecture which provides faster performance and greater scalability.
- Sync exempt customers to TaxJar when using bulk update methods like CSV import, mass updates, and web services.
- Optimized the monthly product tax category sync.
- Restored the TaxJar Backfill role to allow users to run backfill operations without administrative privileges.

### v1.4.0 - 2019-10-11

- **Order-level exemptions for custom marketplace exemptions, wholesale, government, and other exemptions.** This field can also be used to mark an order as non-exempt to override a customer exemption.
- SuiteTax mapping for external transactions at the line level. Use the `custcol_tj_external_tax_amount` and `custcol_tj_external_tax_rate` transaction column fields to import your line sales tax "as-is" from external platforms without recalculating tax.
- Enqueue invoices when a deposit application is applied via Invoice Sales Orders.
- Fix deleted record sync during transaction backfill process.

### v1.3.3 - 2019-10-08

- Only sync exempt customers during backfill process.
- Fix customer sync error when attempting to update and getting a 404 response.

### v1.3.2 - 2019-08-29

- Fix error when syncing transactions with subtotal lines.

### v1.3.1 - 2019-08-22

- Clear TaxJar sync date when copying an invoice or cash sale transaction.
- Fix error when syncing transactions with description line items and empty amounts.
- Support internal override for accrual basis accounting.

### v1.3.0 - 2019-08-08

- **Automatic SuiteTax mapping for external transactions.** Use the `custbody_tj_external_tax_amount` and `custbody_tj_external_tax_rate` transaction body fields to import your sales tax "as-is" from external platforms without recalculating tax.
- Override state-level nexus mismatches in SuiteTax. If TaxJar determines a different nexus state / region from what SuiteTax determines, we will automatically override the nexus to ensure sales tax is recorded in the proper sales tax payable account.
- Refactor discount calculations to fully support order-level discounts, line discounts, and discounts applied with items after tax such as gift card redemptions.
- Sync exempt prospect and lead customer records to TaxJar when backfilled.
- Fall back to company ship-from address in NetSuite Standard Edition.
- Require default payable and receivable accounts in TaxJar configuration for SuiteTax.

### v1.2.1 - 2019-07-17

- Sum up line discount totals manually for SuiteTax calculations.
- Fix calculation error when using a location with multiple address lines.
- Fix duplicate tab issue for non-inventory items "Apply After Tax" setting.

### v1.2.0 - 2019-06-18

- Skip non-inventory items (such as gift card redemptions) from calculations via "Apply After Tax" checkbox.
- Remove "NULL" strings for empty address lines (2 & 3) when calculating sales tax.
- Fix type error when attempting to sync a refund from a return authorization tied to a sales order.

### v1.1.1 - 2019-05-07

- Fix nexus address lookup for calculations in NetSuite Standard edition.
- Fix script execution limit for calculations on orders with 150+ line items.
- Fix transaction force push to sync records that have not been updated.
- Hide calculation settings if SuiteTax is not enabled.

### v1.1.0 - 2019-04-19

- Support standalone refunds using new custom transaction body field for transaction sync.
- Fix line item sales tax when pushing orders and refunds during transaction sync.
- Fix type error when attempting to sync a refund from a return authorization without a reference ID.

### v1.0.1 - 2019-04-12

- Automatically enqueue customers on a mass update instead of requiring a backfill.
- Support custom line amounts for calculations and transaction sync.
- Improve order-level discount distribution across multiple lines for transaction sync.
- Cache tax code and tax type IDs during calculations.
- Skip nexus address for calculations if tax engine is not set to "TaxJar".
- Fix generated tax codes with duplicate county and city jurisdiction names.
- Fix product tax codes when pushing transactions to TaxJar.
- Fix international calculations without a state or region in the shipping address.
- Fix tax details override error during calculation.
- Fix transaction backfill error when exceeding scheduled script usage threshold.

### v1.0.0 - 2019-03-29

- **Multi-channel transaction support for marketplace exemptions.** Transaction body field `custbody_tj_provider` can be used to set a provider such as "amazon", "ebay", "etsy", and "walmart" to designate marketplace exempt transactions within TaxJar.
- Bundle custom address form for address validation.
- Always show custom transaction body fields on sales records.
- Fix transaction reference ID lookup for cash refunds.
- Check invoice "paid in full" status and credit memo "fully applied" status prior to enqueueing records.
- Fix skip sync lookup for customer payments and refunds when enqueueing transactions.
- Fix "record does not exist" error when attempting to enqueue a deleted customer payment or refund.

### v0.6.1 - 2019-03-07

- Support bulk invoicing of sales orders when queueing invoices and cash sales.
- Fix system error when failing to write a TaxJar log message.

### v0.6.0 - 2019-02-04

- Skip specific transactions from syncing via "Skip TaxJar Sync" checkbox.
- Skip specific discount items from calculations via "Apply After Tax" checkbox.
- Sync invoices and credit memos after applying a customer payment or refund.
- Apply discount line items to previous line item and use absolute amounts.
- Fix nexus address lookup when nexuses have not been saved with TaxJar custom fields for SuiteTax.
- Fix Setup > Nexuses menu tab for NetSuite 2019.1.
- Remove custom role for backfilling transactions until resolved in NetSuite 2019.1.

### v0.5.2 - 2019-01-24

- Fix permission issues on custom records for non-administrators.
- Fix end date on queue worker scheduled script.
- Automatically invalidate record in queue when deleted or no longer exists.
- Drop cash sale deposited status requirement prior to syncing.
- Update reports with improved labels and relative URLs.
- Support free-form state names in addresses.
- Tweak TaxJar configuration help text.

### v0.5.1 - 2019-01-16

- Skip SuiteTax calculations for use tax record types: Credit card charge, credit card refund, purchase order, vendor bill, vendor credit, vendor return authorization.
- Directly override nexus if SuiteTax nexus determination differs from TaxJar.
- Remove default tax or shipping tax if tax rate is zero percent.
- Tax category item dropdown should now be available for inventory items.
- Custom fields should now be shown on existing custom forms.
- Fix "TaxJar Backfill" custom role name.

### v0.5.0 - 2019-01-10

- **Initial release of our NetSuite integration.** Sales tax calculations powered by SuiteTax for rooftop-accurate rates down to the jurisdiction level. Transaction sync and backfilling. Supports product exemptions, customer exemptions, shipping taxability, sourcing logic, and address validation.

If you have additional questions or need help integrating NetSuite and TaxJar, please [contact](https://www.taxjar.com/contact/) our support team.
