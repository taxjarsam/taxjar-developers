---
title: "Magento 2 Sales Tax Extension Guide"
description: "In-depth guide on how to use TaxJar's Magento 2 extension for store merchants and developers."
layout: guide
priority: 0.7
guide_name: Magento 2
reference: {
  "Platform": "Magento 2 CE & EE",
  "Versions": "2.1.x - 2.4.x",
  "Extension": "<a href='https://marketplace.magento.com/taxjar-module-taxjar.html'>Magento Marketplace</a>",
  "Last Updated": "November 13, 2020"
}
toc: {
  "Getting Started": "#getting-started-with-taxjar",
  "Sales Tax Calculations": "#sales-tax-calculations",
  "Sales Tax Reporting": "#sales-tax-reporting",
  "How the TaxJar API Works": "#how-the-taxjar-api-works",
  "How Reporting Works": "#how-reporting-works",
  "International Stores": "#international-stores",
  "CLI Commands": "#cli-commands",
  "Extension Changelog": "#extension-changelog"
}
articles: {
  "Sales Tax Nexus Defined": "https://blog.taxjar.com/sales-tax-nexus-definition/",
  "Origin-Based and Destination-Based Sales Tax Collection 101": "https://blog.taxjar.com/charging-sales-tax-rates/",
  "The New York Clothing Sales Tax Exemption Demystified": "https://blog.taxjar.com/the-new-york-clothing-sales-tax-exemption-demystified/"
}
resources: {
  "Magento 2 Sales Tax Extension": "https://marketplace.magento.com/taxjar-module-taxjar.html",
  "GitHub Repository": "https://github.com/taxjar/taxjar-magento2-extension",
  "Magento Sales Tax Guide": "/guides/sales-tax-guide-for-magento/",
  "Magento Sales Tax FAQs": "https://support.taxjar.com/category/246-magento"
}
---

We put together this integration guide for Magento 2.x merchants and developers looking to better understand TaxJar's extension for sales tax calculations.

You'll learn how TaxJar provides checkout calculations with the [TaxJar API](/how-it-works/) and zip-based rates for native Magento calculations as a fallback. Along the way, we'll configure your store to collect sales tax where you have nexus, handle product exemptions, import orders into TaxJar, and much more. For a primer on everything sales tax, read our [Magento sales tax guide](/guides/sales-tax-guide-for-magento/) before getting started.

## Getting Started with TaxJar

First install the Magento 2 sales tax extension. The easiest way is to use the [Magento Marketplace](https://marketplace.magento.com/taxjar-module-taxjar.html) and install it from your Magento admin panel.

<!-- Screenshot goes here -->

Alternatively, you can access all of the code on [GitHub](https://github.com/taxjar/taxjar-magento2-extension) and download the extension as a ZIP file by clicking <b>Download ZIP</b>. You can also install our module with [Composer](https://getcomposer.org/) using the following command:

<pre>
composer require taxjar/module-taxjar
</pre>

If you're installing the extension manually, unzip the archive and upload the files to `/app/code/Taxjar/SalesTax`. After uploading, run the following [Magento CLI](http://devdocs.magento.com/guides/v2.0/config-guide/cli/config-cli-subcommands.html) commands:

<pre>
bin/magento module:enable Taxjar_SalesTax
bin/magento setup:upgrade
bin/magento setup:di:compile
</pre>

These commands will enable the TaxJar extension, perform necessary database updates, and re-compile your Magento store. If you decide to manually update the TaxJar extension later, run `setup:upgrade` and `setup:di:compile` again after installing the update.

### Transitioning from Magento 1 to Magento 2

**Already using TaxJar for Magento 1?** Both of our extensions handle sales tax calculations similarly, but if you've been using TaxJar for sales tax reporting and filing you'll need to make a quick change. Log in to your TaxJar account and go to **Account > Linked Accounts**. Click **Unlink** to remove your existing Magento 1 connection. In Magento 2, [transactions are imported directly through our extension](#how-reporting-works) using the TaxJar API. We'll set up transaction sync shortly.

### Pre-Import Checklist

Before going further, let's review some of your existing Magento settings to make sure TaxJar is clear for landing. Log in to your Magento admin panel.

<div class="panel-group" id="pre-install-accordion" role="tablist" aria-multiselectable="true">
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="pre-heading1">
      <h4 class="panel-title">
        <img src="/images/lander/checkmark.svg" class="panel-checkmark" width="20"/>&nbsp;&nbsp;
        <a role="button" data-toggle="collapse" data-parent="#post-install-accordion" href="#pre-collapse1" aria-expanded="true" aria-controls="pre-collapse1">
          Shipping Origin
        </a>
      </h4>
    </div>
    <div id="pre-collapse1" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="pre-heading1">
      <div class="panel-body">
        <p>Go to <b>Stores > Configuration</b> in your admin panel. Under <b>Sales > Shipping Settings > Origin</b>, make sure you have a valid address with a US-based region and 5-digit postal code. If not, go ahead and add your address then click the orange <b>Save Config</b> button.</p>
        <p><img src="/images/guides/integrations/magento2/shipping-settings.png" alt="Magento Shipping Origin"/></p>
      </div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="pre-heading3">
      <h4 class="panel-title">
        <img src="/images/lander/checkmark.svg" class="panel-checkmark" width="20"/>&nbsp;&nbsp;
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#pre-install-accordion" href="#pre-collapse3" aria-expanded="false" aria-controls="pre-collapse3">
          Sales Tax Rates
        </a>
      </h4>
    </div>
    <div id="pre-collapse3" class="panel-collapse collapse" role="tabpanel" aria-labelledby="pre-heading3">
      <div class="panel-body">
        <p>If you have existing sales tax rates, don't worry. <b>We only overwrite zip-based sales tax rates if they reside in one of your nexus states.</b> Your other rates will be remain intact and can still be used.</p>

        <p>To review your existing rates, go to <b>Stores > Tax Zones & Rates</b>.</p>

        <p><img src="/images/guides/integrations/magento2/tax-rates.png" alt="Magento Tax Rates"/></p>
      </div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="pre-heading4">
      <h4 class="panel-title">
        <img src="/images/lander/checkmark.svg" class="panel-checkmark" width="20"/>&nbsp;&nbsp;
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#pre-install-accordion" href="#pre-collapse4" aria-expanded="false" aria-controls="pre-collapse4">
          Sales Tax Rules
        </a>
      </h4>
    </div>
    <div id="pre-collapse4" class="panel-collapse collapse" role="tabpanel" aria-labelledby="pre-heading4">
      <div class="panel-body">
        <p>For existing sales tax rules don't sweat it either. <b>We attach our zip-based sales tax rates to new or existing rules based on the tax classes you select in our extension</b>. This means that custom rates can still be tied to existing sales tax rules. We've designed our extension to stay out of the way as much as possible.</p>

        <p><img src="/images/guides/integrations/magento2/tax-rules.png" alt="Magento Tax Rules"/></p>
      </div>
    </div>
  </div>
</div>

## Sales Tax Calculations

You've reviewed the pre-import checklist and everything looks ready for primetime.

Go to **Stores > Configuration** from the main menu. Select **Tax** under the **Sales** configuration menu on the left. We're now ready to configure the TaxJar Magento 2 extension for sales tax calculations.

<img src="/images/guides/integrations/magento2/taxjar-config.png" alt="Magento TaxJar Configuration"/>

### Connecting to TaxJar

Before enabling the TaxJar API, you'll first need to connect to TaxJar from your Magento store. Click the **Connect to TaxJar** button. This will open a popup asking you to create a new account or log in to TaxJar. Once you're in, you'll be shown a confirmation screen to import your API token:

<img src="/images/guides/integrations/magento2/taxjar-connect-confirm.png" alt="TaxJar Connect Confirmation"/>

Click the **Connect** button and your token will automatically be saved in Magento. The configuration screen will refresh and show new options:

<img src="/images/guides/integrations/magento2/taxjar-config-connected.png" alt="TaxJar Configuration After Connection"/>

### Nexus Addresses

After connecting to TaxJar, you’ll first want to set up the states where your company has nexus. Go to **Stores > Nexus Addresses** from the main menu. From there you can add, change, or delete nexus addresses associated with your TaxJar account. There's also a **Sync from TaxJar** button to automatically import any of your existing addresses from TaxJar:

<img src="/images/guides/integrations/magento2/nexus-addresses.png" alt="Magento Nexus Addresses"/>

We currently support one address per state/region in the US and Canada. For [other countries](https://developers.taxjar.com/api/reference/#countries) we support one address per country. Make sure you enter a valid address for each state. If you're unsure where you need to collect sales tax, read our [blog post on nexus](https://blog.taxjar.com/sales-tax-nexus-definition/). We also provide helpful [sales tax guides for each state](/states/).

Once you're finished adding all of the states where you have nexus, continue on.

### Product Sales Tax Exemptions

Before enabling the TaxJar API, you may want to assign a TaxJar product tax code to a product tax class in Magento. For example, say you have nexus in New York and sell clothing apparel. [Clothing items under $110 are exempt in certain jurisdictions of New York](https://blog.taxjar.com/the-new-york-clothing-sales-tax-exemption-demystified/). To set this up in Magento, all we need to do is go to **Stores > Product Tax Classes**. Click the `Taxable Goods` class and you'll notice a shiny new dropdown for assigning a TaxJar product category:

<img src="/images/guides/integrations/magento2/taxjar-product-tax-code2.png" alt="Magento TaxJar Product Tax Codes"/>

Select `Clothing` and click **Save Product Tax Class**. You now have clothing tax exemptions applied to all products assigned to the `Taxable Goods` class. This works for new or existing product tax classes. We leave the tax code assigning up to you and it's completely optional.

For a list of product tax codes the TaxJar API currently supports, check out our [category endpoint](https://developers.taxjar.com/api/reference/#get-list-tax-categories) reference.

### Customer Sales Tax Exemptions

To exempt a specific customer in Magento for calculations and reporting, edit the customer and update the **TaxJar Exemption Type** field with the appropriate exemption type:

<img src="/images/guides/integrations/magento2/customer-exemptions.png" alt="Magento 2 TaxJar Customer Exemptions"/>

You can also select one or more **TaxJar Exempt Regions** to exempt the customer in specific regions / states. If no regions are selected, the customer will be exempt everywhere. To exempt multiple customers in bulk, use the customer admin grid to filter your customers and select the customers you'd like to exempt. From there, select an exemption type and click **Save Edits**:

<img src="/images/guides/integrations/magento2/bulk-customer-exemptions.png" alt="Magento 2 TaxJar Bulk Customer Exemptions"/>

These customers will then be synced to TaxJar. After they're synced over, they will be exempt from sales tax calculations at checkout and their transactions will be designated as exempt in the TaxJar app for reporting and filing.

<div class="alert alert-warning" role="alert">Exempt customer tax classes are now deprecated in TaxJar's extension as of version 1.4.0. This setting will continue to skip tax calculations if needed, but we recommend updating your customers and choosing the appropriate exemption type. This ensures customer-exempt transactions will be reflected in the TaxJar app for reporting and filing.</div>

### Address Validation

[TaxJar Plus](https://www.taxjar.com/how-it-works/) now offers address validation in Magento 2 to help increase the accuracy of sales tax calculations for your store. When tax rates are [based on the buyer's location](https://blog.taxjar.com/charging-sales-tax-rates/), a valid shipping address is necessary to ensure the most accurate tax rate. After connecting to TaxJar with a valid Plus account, you'll be able to enable address validation under **Stores > Configuration > Sales > Tax**:

<img src="/images/guides/integrations/magento2/address-validation-setting.png" alt="Magento 2 TaxJar Address Validation Setting"/>

Once enabled, shipping addresses will be validated automatically at checkout and in the customer address book. At checkout, both guests and registered customers will see one or more suggested addresses directly after providing a shipping address:

<img src="/images/guides/integrations/magento2/address-validation-suggested-addresses.png" alt="Magento 2 TaxJar Address Validation Suggested Addresses"/>

The address validation feature never blocks or interferes with the checkout process. It asynchronously provides address suggestions after the shipping address is entered. If the shipping address can not be found, the customer is asked to review their address or continue to the next step:

<img src="/images/guides/integrations/magento2/address-validation-invalid-address.png" alt="Magento 2 TaxJar Address Validation Invalid Address"/>

If the shipping address is fully validated, no suggested addresses are shown to the customer. After a suggested address is selected by the customer, the existing address may be updated on the following step, after a shipping method is selected, or when the order is submitted based on whether you're using the native Magento checkout process or a 3rd party checkout extension.

We currently support the following 3rd party checkout extensions for address validation:

- Aheadworks One Step Checkout
- Amasty One Step Checkout

If you use another checkout extension for Magento, please [contact us](https://www.taxjar.com/contact/) for more information. Feel free to use your own stylesheet and customize the design of our suggested addresses section to better fit your Magento theme.

Address validation also works on the backend for order creation and customer management:

<img src="/images/guides/integrations/magento2/address-validation-backend-order.png" alt="Magento 2 TaxJar Address Validation Backend Order"/>

### Enabling the TaxJar API

By default Magento uses zip-based rates for calculating sales tax. When you calculate taxes by zip code, you may not be collecting the most accurate amount of sales tax. Zip codes can cover multiple districts, counties, cities, and even states/regions. These jurisdictions can have different rates. In addition, you may have product exemptions depending on what you're selling and where. There's limitations when you rely solely on a zip code for figuring out sales tax.

With the TaxJar API enabled you'll get the most accurate sales tax rates based on the entire shipping address (not just zip code) with built-in support for shipping taxability, sourcing logic, itemized discounts, and product exemptions. Response times are fast (sub-75ms) with [99.99% uptime](https://status.taxjar.com/). Rest assured it won't interrupt your checkout process.

<img src="/images/guides/integrations/magento2/checkout-tax.png" alt="TaxJar API Checkout Tax"/>

Set **Enabled for Checkout** to `Yes` for live checkout calculations. Click the orange **Save Config** button. Upon saving, the TaxJar API will be used for calculations instead of Magento's rate-based tables. However, we can still [use those rate-based tables as a fallback](#backup-sales-tax-rates) just in case.

<img src="/images/guides/integrations/magento2/taxjar-config-api.png" alt="Magento TaxJar API Config"/>

### Backup Sales Tax Rates

We provide a fallback to Magento's native zip-based rates in case our API becomes unresponsive. While that's [unlikely to happen](https://status.taxjar.com/), it's always good to have a backup plan. Upon setting **Backup Rates** to `Yes` for the first time, you'll be shown a screen similar to this:

<img src="/images/guides/integrations/magento2/taxjar-import-success.png" alt="Magento TaxJar Import Success"/>

You'll notice we imported zip-based sales tax rates for each US state where you have nexus. Since we're downloading thousands of rates into your database at once, this can take several minutes. For [destination-based](https://blog.taxjar.com/charging-sales-tax-rates/) states, TaxJar always returns the highest rate for each zip code to ensure you're not under-collecting sales tax. For [origin-based](https://blog.taxjar.com/charging-sales-tax-rates/) states we do the same for wildcard rates. **We only provide backup rates for US states at this time.**

If you decide to add a new nexus state under **Stores > Nexus Addresses** and would like to refresh your rates manually, just click the **Sync Backup Rates** button. It's that simple. We'll automatically refresh your backup rates on the first of each month to make sure they're up to date.

To verify sales tax rates and rules are loaded, go to **Stores > Tax Rules**. You should see your imported rates attached to a couple of sales tax rules:

<img src="/images/guides/integrations/magento2/tax-rules.png" alt="Magento Tax Rules"/>

When turning off nexus for a state, please keep in mind that **we never remove tax rates for non-nexus states/regions**. This allows our merchants to use their own custom zip-based rates in Magento if needed. After removing a nexus state, you'll need to manually remove the rates for that state and re-sync your backup rates to refresh the tax rules.

### Backup Sales Tax Classes

If you're taking advantage of our backup rates, make sure you select the appropriate product and customer tax classes under the TaxJar configuration. Usually this means you'll want to select `Taxable Goods` and `Retail Customer` if you haven't added your own custom classes.

### Post-Import Configuration

After importing zip-based backup rates, TaxJar's extension automatically does several things to help prepare you for collecting sales tax using Magento's native calculations:

<div class="panel-group" id="post-install-accordion" role="tablist" aria-multiselectable="true">
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="post-heading1">
      <h4 class="panel-title">
        <img src="/images/lander/checkmark.svg" class="panel-checkmark" width="20"/>&nbsp;&nbsp;
        <a role="button" data-toggle="collapse" data-parent="#post-install-accordion" href="#post-collapse1" aria-expanded="true" aria-controls="post-collapse1">
          Shipping Taxability
        </a>
      </h4>
    </div>
    <div id="post-collapse1" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="post-heading1">
      <div class="panel-body">
        <p>Based on your shipping origin state configured under <b>Shipping Settings > Origin</b>, we set Magento's native tax calculations to be based on <a href="https://blog.taxjar.com/charging-sales-tax-rates/">origin or destination-based sourcing</a> (e.g. your address of shipping origin or the customer's shipping address).</p>

        <p>This means we update a setting under <b>Sales > Tax</b> in your store configuration: <b>Tax Calculation Based On</b>. For most stores, <b>Tax Calculation Based On</b> will be set to <code>Shipping Address</code>. If your store's shipping origin is origin-based (not destination), we'll set it to <code>Shipping Origin</code>.</p>

        <p><i>Keep in mind this setting only affects Magento's native zip-based rates calculations.</i> If you decide to enable the TaxJar API (live checkout calculations), this will only be used as a backup.</p>
      </div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="post-heading2">
      <h4 class="panel-title">
        <img src="/images/lander/checkmark.svg" class="panel-checkmark" width="20"/>&nbsp;&nbsp;
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#post-install-accordion" href="#post-collapse2" aria-expanded="false" aria-controls="post-collapse2">
          Tax Display Settings
        </a>
      </h4>
    </div>
    <div id="post-collapse2" class="panel-collapse collapse" role="tabpanel" aria-labelledby="post-heading2">
      <div class="panel-body">
        <p>Our extension sets the following tax display settings under <b>Sales > Tax</b> to <code>Excluding Tax</code>:</p>
        <ul>
          <li>
            Price Display Settings
            <ul>
              <li><b>Display Product Prices in Catalog</b></li>
              <li><b>Display Shipping Prices</b></li>
            </ul>
          </li>
          <li>
            Shopping Cart Display Settings
            <ul>
              <li><b>Display Prices</b></li>
              <li><b>Display Subtotal</b></li>
              <li><b>Display Shipping Amount</b></li>
            </ul>
          </li>
        </ul>

        <p>For most stores, these settings will already be set to <code>Excluding Tax</code>.</p>

        <p><img src="/images/guides/integrations/magento2/tax-config-display.png" alt="Magento Tax Display Configuration"/></p>
      </div>
    </div>
  </div>
</div>

If you're a developer, you may be wondering if TaxJar changes anything with the database after installation. Beyond setting default configuration values and storing extension-related data in the `core_config_data` table, we only add a single column to `tax_class` for managing product tax class codes and a `tax_nexus` table for managing nexus addresses.

### Debug Mode

If you need to contact support, enabling debug mode shows you diagnostic information about your Magento store and the TaxJar extension itself. It also prevents the extension from downloading zip-based rates into your store.

Debug mode also allows you to enable the [Sandbox environment](https://developers.taxjar.com/integrations/testing/#section-sandbox-environment).  TaxJar provides a sandbox environment on all [TaxJar Professional](https://www.taxjar.com/request-demo/) or higher plans for automated testing and development.  Be careful!  The Sandbox environment should only be used for testing and never enabled on a production store.

To help us help you, take a screenshot of the debug mode message and include it in your support email if you're having difficulties. Disable it afterwards if you want to continue importing rates.

<img src="/images/guides/integrations/magento2/taxjar-debug-mode.png" alt="Magento TaxJar Debug Mode"/>

### Multi-Store Calculations

If you have multiple websites or stores with different nexus addresses, you can assign nexus addresses to specific store views. Select the nexus address from **Stores > Nexus Addresses** and update the **Store View** dropdown:

<img src="/images/guides/integrations/magento2/nexus-address-store-view.png" alt="Magento TaxJar Nexus Address Store View"/>

By default a nexus address will be assigned to "All Store Views" and applied globally. Keep in mind that the same one address restriction applies to nexus addresses at the store level. For example, you can't add a separate nexus location in California for one of your stores if you already have a global nexus location for California.

You can also supply different shipping origins per website. Shipping origins are used to help determine [sourcing](https://blog.taxjar.com/charging-sales-tax-rates/) for sales tax calculations. Make sure you review your shipping origins under **Stores > Configuration > Sales > Shipping Settings > Origin**.

## Sales Tax Reporting

We're almost done setting up TaxJar with your Magento 2 store. If you're interested in sales tax reporting and automated filing, proceed!

The latest version of our extension now supports real-time transaction syncing between TaxJar and Magento 2. Once your order is invoiced and shipped from the Magento admin panel, it's automatically synced to TaxJar through our TaxJar API. On subsequent changes, the order is updated. Separate refunds are created for each credit memo in the order. We only sync orders with a `complete` or `closed` order state.

### Setting Up Sales Tax Reporting

To begin syncing transactions with TaxJar, go to **Stores > Configuration** from the main menu. Select **Tax** under the **Sales** configuration menu on the left. Under **TaxJar**, you'll find a **Transaction Sync** setting:

<img src="/images/guides/integrations/magento2/transaction-sync.png" alt="Magento TaxJar Transaction Sync"/>

Click the **Transaction Sync** dropdown and select `Yes`. If it's your first time enabling **Transaction Sync**, you'll be shown a pop-up window to authorize your TaxJar account for syncing transactions. In order to sync transactions with TaxJar, we require a 30 day reporting trial or paid TaxJar subscription:

<img src="/images/guides/integrations/magento2/transaction-sync-upsell.png" alt="Magento TaxJar Transaction Sync Upsell"/>

Click the green **Enable Transaction Sync** button in the pop-up window to finish enabling **Transaction Sync** in your Magento admin panel:

<img src="/images/guides/integrations/magento2/transaction-sync-popup.png" alt="Magento TaxJar Transaction Sync Popup"/>

That's it! Future orders will now be synced to TaxJar once they transition into a `complete` or `closed` order state. To see when a transaction was synced, go to the individual order or credit memo in your admin panel. You'll find a **Synced to TaxJar** row in the summary with the sync date:

<img src="/images/guides/integrations/magento2/transaction-sync-order-sync-date.png" alt="Magento TaxJar Order Synced At Date"/>

You can also browse through your orders and credit memos with the **Synced to TaxJar** grid column. This is turned off by default, so you'll need to customize your grid to show it:

<img src="/images/guides/integrations/magento2/transaction-sync-order-sync-column.png" alt="Magento TaxJar Order Synced At Column"/>

### Backfilling Transactions

Now that we're syncing transactions, it's likely that you have previous Magento orders that haven't been synced to TaxJar yet. To backfill transactions, click the **Sync Transactions** button that's shown after you enable **Transaction Sync**:

<img src="/images/guides/integrations/magento2/transaction-sync-backfill-button.png" alt="Magento TaxJar Backfill Button"/>

A modal window will slide in, allowing you to pick a date range of orders you'd like to sync:

<img src="/images/guides/integrations/magento2/transaction-sync-backfill-modal.png" alt="Magento TaxJar Backfill Modal"/>

After selecting the **From** and **To** states, click the orange **Sync to TaxJar** button. We'll look for `complete` and `closed` orders updated within that date range and push them to TaxJar. Once the process is finished, you'll be able to view a log of what happened.

Whenever a transaction is synced to TaxJar, it's recorded in a log file for your reference. You can find the log file at `/var/log/taxjar.log`.

### Multi-Store Transaction Sync

Agencies or merchants with multiple business entities across different websites or stores can now use multiple TaxJar accounts to sync their transactions from a single Magento instance. To get started, go to **Stores > Configuration** from the main menu. Select **Tax** under the **Sales** configuration menu on the left. Switch to one of your stores using the "Store View" dropdown.

From there, you'll want to scroll down the page to enable **Debug Mode** in the TaxJar module. Once the **API Token** field is visible, replace the existing API token with another TaxJar API token. Click the **Save Config** button and turn off **Debug Mode**. Now any order or credit memo processed through that store will be synced to a different TaxJar account for reporting and filing.

---

### Wrapping Up

You've finished setting up TaxJar and Magento 2! At this point you should be collecting sales tax in your Magento store and syncing orders to TaxJar for reporting. From here on out this guide becomes more in-depth to explain what we're doing behind the scenes. If you're curious, feel free to read on.

---

## How the TaxJar API Works

Your store seems to be calculating sales tax correctly, but now you might be wondering several things:

- How many TaxJar API calls will be made per order?
- What happens if the TaxJar API goes down or becomes unresponsive?
- How does the TaxJar API handle my custom / international rates?
- Will the TaxJar API work with my other extensions?
- How often do the zip-based rates refresh?

**Our extension only makes live API calls when the order resides in a state where you have nexus.** This saves you a lot of API calls and money. Additionally, API calls are cached until the checkout data changes. So if you have a customer repeatedly loading the checkout page without changing their shipping info, your store will not make additional API calls. **On average, the TaxJar API integration will make 2-3 API calls per order in a nexus state.** If you allow customers to estimate their shipping and tax on the cart page, that's included.

API calls are only made under 3 circumstances:

1. Checkout process for a nexus state
2. Cart shipping and tax estimate for a nexus state
3. Refreshing zip-based backup rates in the admin panel

If the order does not reside in a nexus state, **the TaxJar API will fall back to Magento's zip-based rate tables.** This gives you the opportunity to use custom or international rates for regions where you may have nexus that TaxJar either doesn't support yet or you'd rather handle it yourself.

In the unlikely event that the TaxJar API goes down or times out after 10 seconds, Magento's native calculations will kick in using the backup rates as well.

Our TaxJar API integration extends the `\Magento\Tax\Model\Sales\Total\Quote\Tax` model and overrides Magento's native calculations only if checkout calculations are enabled. If you're using a third-party checkout extension or something else that may rely on Magento's internal rate tables (such as multi-warehouse inventory), try out TaxJar's extension on a test or staging server before deploying to production.

Your zip-based rates will refresh automatically on the first of each month via cron job. You can manually refresh these rates yourself by re-saving the TaxJar extension configuration. Each refresh counts as one API call.

After a customer completes an order using the TaxJar API, our extension will record the sales tax amount and rate by line item in your database. If your store allows multiple currencies, the sales tax will be converted to the customer's currency:

<img src="/images/guides/integrations/magento2/order-alternate-currencies.png" alt="Magento TaxJar Alternate Currencies"/>

## How Reporting Works

After enabling **Transaction Sync** in your TaxJar extension configuration, we'll automatically sync orders to your TaxJar account once they're fully invoiced and shipped. This happens immediately after the order transitions into a `complete` or `closed` state using the `sales_order_save_after` event. Credit memos are synced after the associated order is synced. We support both partial and full refunds in TaxJar.

Sync requests go through our TaxJar API using the transaction endpoints. Once an order is synced, we save the timestamp in your database to ensure the order is only synced again after it's updated. In the unlikely event that we can't sync an order, no timestamp will be shown in the individual order view. You'll need to backfill the transaction later if you don't see the timestamp or can't find the order in TaxJar.

Transaction API requests and responses are recorded in a custom log file located at `/var/log/taxjar.log`. This log file contains the sync history for both backfilled and new transactions. You can use `taxjar.log` for debugging or reaching out to TaxJar support if you experience any issues.

## International Stores

We support checkout calculations powered by the TaxJar API in [more than 30 countries](https://developers.taxjar.com/api/reference/#countries) including VAT in the EU and Canada. To perform international calculations, add the countries to your nexus addresses under **Stores > Nexus Addresses**. For backup zip-based rates, we currently support the United States since it's tightly integrated with our reporting app.

With that said, our TaxJar API integration will automatically fall back to custom zip-based rates in Magento and already supports non-USD currencies. If you need backup rates in other countries you can set up custom tax rules under **Stores > Tax Rules**.

## CLI Commands

TaxJar now provides a command in the Magento CLI for developers to sync transactions:

```
bin/magento taxjar:transactions:sync
```

By default this command will backfill the previous day's updated orders in a `complete` or `closed` state. Additionally, you can provide `from` and `to` arguments to sync a date range:

```
bin/magento taxjar:transactions:sync 01/01/2018 01/31/2018
```

We recommend using the CLI for merchants backfilling a high volume of transactions to avoid in-browser AJAX timeouts. You can also use it to increase your PHP memory limit, sleep between date ranges, run the command in a bash script, or schedule the command using a cron job.

## Extension Changelog

Curious to see what's changed with our extension lately? Read on to learn more!

### 1.6.3
- Fix backup rates when using international store shipping address
- Fix address validation for Magento 2.4

### 1.6.2
- Fix incorrect subtotal due to rounding

### 1.6.1
- Fix Credit Memo grid filters
- Fix double inventory restock when order is refunded
- Support new API version header in requests

### 1.6.0
- Add persistent product tax codes to OrderItems to increase reporting accuracy
- Improve tax collectable by rounding to the DEFAULT_PRECISION value
- Fix syncing zero dollar refunds to TaxJar
- Fix array lookups for configurable product tax codes

### 1.5.8
- Add product attribute for product tax codes
- Fix mismatched tax codes for configurable products
- Fix error that prevented orders with deleted products from syncing to TaxJar

### 1.5.7
- Improve the display of the admin configuration page

### 1.5.6
- Fix support for table name prefixes used in admin grids
- Fix requiring TaxJar with composer before installing Magento (thanks @JosephMaxwell)
- Fix a fatal error that occasionally occurred when adding products to the cart (2.4 only)

### 1.5.5
- Update composer requirements to include Magento 2.4

### 1.5.4
- Add support for sandbox API access
- Fix an issue when building the to/from address street

### 1.5.3
- Fix sorting by "Synced to TaxJar" column on admin grids (thanks @bjwirgau)
- Fix for broken code compilation in PHP 5.6
- Improve integration testing for order and refund transactions

### 1.5.2
- Improve accuracy when purging backup rates
- Improve performance when loading admin order/creditmemo grids (thanks @Maikel-Koek)
- Improve calculateRate performance when extension is disabled (thanks @Maikel-Koek)

### 1.5.1
- SmartCalcs Sales Tax API is now simplified to TaxJar Sales Tax API or TaxJar API
- Added integration tests for orders and refunds (adjustment fees and bundled products)
- Fix for refund adjustments at the line item level
- Fix for partial refunds of bundled products

### 1.5.0
- Fix a bug where customer_id was passed as 0 instead of an empty string
- Update product tax categories to remove the plus_only flag

### 1.4.10
- Fix transaction sync not respecting website/store scope when backfilling transactions
- Fix the max discount per line item ignoring line item quantities
- Fix international address validation for logged in customers with a saved address

### 1.4.9
- Fix typo in use statement in class SyncProductCategoriesCommand.

### 1.4.8
- Update product tax categories by syncing them monthly. Also adds a "Sync from TaxJar" button and CLI command.
- Update the gift card product tax category to be more accurate.
- Add a custom user agent string and Referer header to all API requests.
- Fix sorting nexus addresses by store view.

### 1.4.7
- Fix customer save observer when no default shipping address is present

### 1.4.6
- Improve support for M2ePro users when syncing multi-channel orders to TaxJar
- Improve storing product tax categories by storing them in their own table
- Fix several issues when issuing multiple credit memos for unshipped orders

### 1.4.5
- Fix loading customer address data during admin massactions by using the CustomerRepository
- Fix floating point comparisons when using json_encode to cache api requests
- Fix error where discount can be less than the unit price
- Remove unused reporting_access promo code

### 1.4.4
- Fix code compilation in Magento version 2.1

### 1.4.3
- Replace calls to serialize/unserialize with JSON encode/decode.

### 1.4.2
- Improve address validation error handling when missing address data.
- Improve support for deploying production mode when address validation is enabled.
- Fix the hasNexus check from succeeding if the region is empty.
- Fix Enterprise and B2B gift card exemptions not being applied during checkout.
- Update namespace for PHPUnit 6.x compatibility.

### v1.4.1

- Products set to "None" tax class will no longer pass a fully exempt `99999` tax code for calculations and transaction sync in order to support AutoFile.
- Add tooltip to product tax class field explaining that a TaxJar category is required to exempt products from sales tax.
- Fix address validation error during backend order creation process in admin panel.

### v1.4.0

- **Customer exemption support for reporting / filing.** Sync wholesale / resale and government exempt customers for sales tax calculations, reporting, and filing. Exempt customers individually or in bulk using the customer admin grid.
- Customer tax class "TaxJar Exempt" setting is now discouraged in favor of customer-specific exemptions. This setting will continue to skip tax calculations if needed, but we highly recommend updating your customers directly and choosing an exemption type for reporting / filing support.
- Fix front-end form validation after saving customers in admin panel when address validation is enabled.
- Fix JS error after a customer attempts to add / edit an address when address validation is disabled.
- Fix product tax class scoping to specific website when syncing transactions.
- Fix PHP warning when iterating over an empty array during tax calculation.

### v1.3.0

- **Address validation for TaxJar Plus.** Validate and suggest shipping addresses in the checkout process, customer address book, backend orders, and backend customer addresses. Improves accuracy of sales tax calculations.

### v1.2.0

- Multi-store transaction sync can now be enabled on a per-store or per-website basis.
- Make nexus address fields (street, city, zip) optional for remote sellers / economic nexus.
- Sync individual child products in dynamic priced bundle products to support item-specific product tax codes.
- Fix empty line items issue when syncing partial refund adjustments.
- Fix error when syncing nexus addresses with an incomplete TaxJar business profile.
- Rename empty product category label from "None" to "Fully Taxable".

### v1.1.1

- Composer support for Magento 2.3.
- Fix logger typo for calculation exception logging.
- Fix order / credit memo sync date render issue in admin grids.

### v1.1.0

- Admin notifications for TaxJar extension updates now available.
- Add calculation logging when debug mode is enabled.
- Fix partial refund transaction sync for credit memos with adjustments.
- Fix extension conflict with admin frontend scripts.

### v1.0.3

- Fix "None" tax class product exemptions when syncing transactions.

### v1.0.2

- Fix discounts applied to shipping amounts for calculations.
- Directly apply shipping discount to order-level shipping param and remove shipping discount line item when syncing transactions.
- Validate zip codes by country using native patterns for calculations to reduce API request volume.
- Backfill transactions by created_at instead of updated_at.
- Fix transaction sync error for PHP < 7.

### v1.0.1

- Fix error in nexus edit form.
- Update translation dictionary.

### v1.0.0

- **Multi-store calculations and transaction sync.** Nexus addresses can be assigned to specific stores in Magento for calculations. Multiple API tokens can be used to calculate sales tax and sync transactions to TaxJar. After upgrading, please review your TaxJar configuration at the store level and test your checkout.
- **Multi-website shipping origins.** TaxJar now uses different shipping origins by website for calculations and reporting / filing. After upgrading, please review your shipping origins at the website level and test your checkout.
- **Transaction sync CLI command.** Developers can backfill transactions into TaxJar using the Magento CLI. To get started, [read the documentation](#cli-commands) on using `bin/magento taxjar:transactions:sync`.
- Improve full tax summary at checkout with tax amounts and rates per jurisdiction.
- Calculate line item tax amounts in Magento using the API rate for more precise calculations.
- Tweak transaction sync registry code to improve compatibility with 3rd party extensions.
- Increase timeout to 30 seconds for general API requests.

### v0.7.6

- Fix refund transaction sync after creating a new credit memo.
- Fix gift card exemptions in Magento EE.
- Require a unique tax class for backup shipping rates.
- Support split databases when installing the module.

### v0.7.5

- Composer support for Magento 2.2.
- Fix transaction sync for completed virtual orders at checkout.
- Fix debug mode error when TaxJar account has no nexus states.
- Fix minor client exception syntax issue.
- Fix backup rates field comment typo.
- Update specs for Magento 2.2 & PHPUnit 6.

### v0.7.4

- Fully exempt tax for products with tax class set to "None".
- Fix child item quantities for bundle line items when parent quantity is > 1.
- Fix calculations for fixed price bundle products.
- Add note to "TaxJar Exempt" field for customer exemptions.

### v0.7.3

- Ensure non-US, non-USD orders are filtered during transaction backfill process.
- Pass shipping discounts as a separate line item when syncing transactions.
- Prevent duplicate order comments and total refund amounts when syncing refunds.
- Fix line item IDs for credit memo line items when syncing refunds.
- Reduce configurable / bundle product children line items to base products when syncing refunds.
- Hide sync dates for orders and credit memos if empty.

### v0.7.2

- Fix transaction sync for duplicate configurable product line items with different simple products.

### v0.7.1

- Require Magento 2.1 or later for real-time transaction syncing.
- Update translation dictionary.

### v0.7.0

- **Transaction sync for automated sales tax reporting and filing.** Orders and credit memos can now be synced to TaxJar with a 30 day reporting trial or paid subscription.

### v0.6.4

- Fix order creation error with multiple bundle or configurable products.

### v0.6.3

- Support "Apply Customer Tax" configuration setting for before and after discount calculations.

### v0.6.2

- Fix customer exemption check for new customers during admin orders.

### v0.6.1

- Fix tax code error for products without a tax class or set to "None".

### v0.6.0

- Customer tax class management for SmartCalcs customer exemptions now available under **Stores > Customer Tax Classes**.
- Support gift card exemptions in Magento EE.
- Import TaxJar product categories immediately after connecting to TaxJar.
- Fix cron issue when syncing backup rates.
- Tweak version handling in debug mode and connect popup.

### v0.5.0

- **Initial release of our Magento 2 extension.** Sales tax calculations at checkout with backup zip-based rates powered by TaxJar. Supports product exemptions, shipping taxability, sourcing logic, and international calculations in more than 30 countries.
