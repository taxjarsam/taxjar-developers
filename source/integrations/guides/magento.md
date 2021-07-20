---
title: "Magento Sales Tax Extension Guide"
description: "In-depth guide on how to use TaxJar's Magento extension for store merchants and developers."
layout: guide
priority: 0.7
guide_name: Magento
reference: {
  "Platform": "Magento CE & EE",
  "Versions": "1.7.x - 1.9.x",
  "Extension": "<a href='https://marketplace.magento.com/taxjar-taxjar-salestaxautomation.html'>Magento Marketplace</a>",
  "Last Updated": "March 03, 2020"
}
toc: {
  "Getting Started": "#getting-started-with-taxjar",
  "Sales Tax Calculations": "#sales-tax-calculations",
  "Sales Tax Reporting": "#sales-tax-reporting",
  "How TaxJar's API Works": "#how-taxjars-api-works",
  "How Reporting Works": "#how-reporting-works",
  "International Stores": "#international-stores",
  "Extension Changelog": "#extension-changelog"
}
articles: {
  "Sales Tax Nexus Defined": "https://blog.taxjar.com/sales-tax-nexus-definition/",
  "Origin-Based and Destination-Based Sales Tax Collection 101": "https://blog.taxjar.com/charging-sales-tax-rates/",
  "The New York Clothing Sales Tax Exemption Demystified": "https://blog.taxjar.com/the-new-york-clothing-sales-tax-exemption-demystified/"
}
resources: {
  "Magento Sales Tax Extension": "https://marketplace.magento.com/taxjar-taxjar-salestaxautomation.html",
  "GitHub Repository": "https://github.com/taxjar/taxjar-magento-extension",
  "Magento Sales Tax Guide": "/guides/sales-tax-guide-for-magento/",
  "Magento Sales Tax FAQs": "https://support.taxjar.com/category/246-magento"
}
---

We put together this integration guide for Magento 1.x merchants and developers looking to better understand TaxJar's extension for sales tax calculations. **Using Magento 2?** Check out our official [Magento 2 sales tax extension guide](/guides/integrations/magento2/).

You'll learn how TaxJar provides checkout calculations with our API and zip-based rates for native Magento calculations as a fallback. Along the way, we'll configure your store to collect sales tax where you have nexus, handle product exemptions, import orders into TaxJar, and much more.

## Getting Started with TaxJar

First install the Magento sales tax extension. The Magento 1 TaxJar Extension is no longer listed in the Magento marketplace (Magento Connect) and we share 3 options for installation in our [GitHub ReadMe](https://github.com/taxjar/taxjar-magento-extension#getting-started).

Alternatively, you can access all of the code on [GitHub](https://github.com/taxjar/taxjar-magento-extension) or [download the extension as a ZIP](https://github.com/taxjar/taxjar-magento-extension/archive/master.zip).

If you're installing the extension manually, upload all files in the `/app` directory to their respective directories.

That's it!

If you're already logged in to your Magento admin panel, log out and log back in again for a clean slate.

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
        <p>Go to <b>System > Configuration</b> in your admin panel. Under <b>Shipping Settings > Origin</b>, make sure you have a valid address with a US-based region and 5-digit postal code. If not, go ahead and add your address then click the orange <b>Save Config</b> button.</p>
        <p><img src="/images/guides/integrations/magento/shipping-settings.png" alt="Magento Shipping Origin"/></p>
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

        <p>To review your existing rates, go to <b>Sales > Tax > Manage Tax Zones & Rates</b>.</p>

        <p><img src="/images/guides/magento/tax-rates.png" alt="Magento Tax Rates"/></p>
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

        <p><img src="/images/guides/integrations/magento/tax-rules.png" alt="Magento Tax Rules"/></p>
      </div>
    </div>
  </div>
</div>

## Sales Tax Calculations

You've reviewed the pre-import checklist and everything looks ready for primetime.

Go to **System > Configuration** from the main menu. Select **Tax** under the **Sales** configuration menu on the left. We're now ready to configure the TaxJar Magento extension for sales tax calculations.

<img src="/images/guides/integrations/magento/taxjar-config-v3.png" alt="Magento TaxJar Configuration"/>

<iframe style="width: 100%" height="400" src="https://www.youtube.com/embed/xJoScYX3gdA" allowfullscreen></iframe>

### Connecting to TaxJar

Before enabling the TaxJar API, you'll first need to connect to TaxJar from your Magento store. Click the **Connect to TaxJar** button. This will open a popup asking you to create a new account or log in to TaxJar. Once you're in, you'll be shown a confirmation screen to import your API token:

<img src="/images/guides/integrations/magento/taxjar-connect-confirm-v2.png" alt="TaxJar Connect Confirmation"/>

Click the **Connect** button and your token will automatically be saved in Magento. The configuration screen will refresh and show new options:

<img src="/images/guides/integrations/magento/taxjar-config-connected-v3.png" alt="TaxJar Configuration After Connection"/>

### Nexus Addresses

After connecting to TaxJar, you'll first want to set up the states where your company has nexus. Go to **Sales > Tax > Nexus Addresses** from the main menu. From there you can add, change, or delete nexus addresses associated with your TaxJar account. There's also a **Sync from TaxJar** button to automatically import any of your existing addresses from TaxJar:

<img src="/images/guides/integrations/magento/nexus-addresses.png" alt="Magento Nexus Addresses"/>

We currently support one address per state/region in the US and Canada. For [other countries](https://developers.taxjar.com/api/reference/#countries) we support one address per country. Make sure you enter a valid address for each state. If you're unsure where you need to collect sales tax, read our [blog post on nexus](https://blog.taxjar.com/sales-tax-nexus-definition/). We also provide helpful [sales tax guides for each state](/states/).

When managing your nexus addresses in Magento, all of your changes are automatically synced with TaxJar. Once you're finished adding all of the
states where you have nexus, continue on.

<iframe style="width: 100%" height="400" src="https://www.youtube.com/embed/mdr7r56aTaQ" allowfullscreen></iframe>

### Product Sales Tax Exemptions

Before enabling the TaxJar API, you may want to assign a TaxJar product tax code to a product tax class in Magento. For example, say you have nexus in New York and sell clothing apparel. [Clothing items under $110 are exempt in certain jurisdictions of New York](https://blog.taxjar.com/the-new-york-clothing-sales-tax-exemption-demystified/). To set this up in Magento, all we need to do is go to **Sales > Tax > Product Tax Classes**. Click the `Taxable Goods` class and you'll notice a shiny new dropdown for assigning a TaxJar product category:

<img src="/images/guides/integrations/magento/taxjar-product-tax-code2.png" alt="Magento TaxJar Product Tax Codes"/>

Select `Clothing` and click **Save Class**. You now have clothing tax exemptions applied to all products assigned to the `Taxable Goods` class. This works for new or existing product tax classes. We leave the tax code assigning up to you and it's completely optional.

For a list of product tax codes the TaxJar API currently supports, check out our [category endpoint](https://developers.taxjar.com/api/reference/#get-list-tax-categories) reference.

### Customer Sales Tax Exemptions

If you have customer groups exempt from sales tax, you'll need to set their corresponding tax classes to exempt for checkout calculations. Go to **Sales > Tax > Customer Tax Classes**. Click the customer tax class you'd like to exempt and you'll notice a dropdown:

<img src="/images/guides/integrations/magento/taxjar-customer-class-exempt.png" alt="Magento TaxJar Exempt Customer Tax Classes"/>

Select `Yes` and click **Save Class**. Now any customers associated with that customer tax class will be exempt from the TaxJar API. If you're still seeing sales tax collected, make sure you're not collecting for this class using our backup rates feature or your own custom tax rates by reviewing your tax rules under **Sales > Tax > Manage Tax Rules**.

### Enabling TaxJar's API

By default Magento uses zip-based rates for calculating sales tax. When you calculate taxes by zip code, you may not be collecting the most accurate amount of sales tax. Zip codes can cover multiple districts, counties, cities, and even states/regions. These jurisdictions can have different rates. In addition, you may have product exemptions depending on what you're selling and where. There's limitations when you rely solely on a zip code for figuring out sales tax.

With TaxJar's API enabled you'll get the most accurate sales tax rates based on the entire shipping address (not just zip code) with built-in support for shipping taxability, sourcing logic, itemized discounts, and product exemptions. Response times are fast (sub-75ms) with [99.99% uptime](https://status.taxjar.com/). Rest assured it won't interrupt your checkout process.

<img src="/images/guides/integrations/magento/checkout-tax.png" alt="API Checkout Tax"/>

Set **Enabled for Checkout** to `Yes` for live checkout calculations. Click the orange **Save Config** button. Upon saving, TaxJar's API will be used for calculations instead of Magento's rate-based tables. However, we can still [use those rate-based tables as a fallback](#section-backup-sales-tax-rates) just in case.

<img src="/images/guides/integrations/magento/taxjar-config-api.png" alt="Magento TaxJar API Config"/>

<iframe style="width: 100%" height="400" src="https://www.youtube.com/embed/SSR3zACz0_4" allowfullscreen></iframe>

### Backup Sales Tax Rates

We provide a fallback to Magento's native zip-based rates in case our API becomes unresponsive. While that's [unlikely to happen](https://status.taxjar.com/), it's always good to have a backup plan. Upon setting **Backup Rates** to `Yes` for the first time, you'll be shown a screen similar to this:

<img src="/images/guides/integrations/magento/taxjar-import-success2.png" alt="Magento TaxJar Import Success"/>

You'll notice we imported zip-based sales tax rates for each US state where you have nexus. Since we're downloading thousands of rates into your database at once, this can take several minutes. For [destination-based](https://blog.taxjar.com/charging-sales-tax-rates/) states, TaxJar always returns the highest rate for each zip code to ensure you're not under-collecting sales tax. For [origin-based](https://blog.taxjar.com/charging-sales-tax-rates/) states we do the same for wildcard rates. **We only provide backup rates for US states at this time.**

If you decide to add a new nexus state under **Sales > Tax > Nexus Addresses** and would like to refresh your rates manually, just click the **Sync Backup Rates** button. It's that simple. We'll automatically refresh your backup rates on the first of each month to make sure they're up to date.

To verify sales tax rates and rules are loaded, go to **Sales > Tax > Manage Tax Rules**. You should see your imported rates attached to a couple of sales tax rules:

<img src="/images/guides/integrations/magento/tax-rules.png" alt="Magento Tax Rules"/>

When turning off nexus for a state, please keep in mind that **we never remove tax rates for non-nexus states/regions**. This allows our merchants to use their own custom zip-based rates in Magento if needed. After removing a nexus state, you'll need to manually remove the rates for that state and re-sync your backup rates to refresh the tax rules.

<iframe style="width: 100%" height="400" src="https://www.youtube.com/embed/W4uJFNvimC0" allowfullscreen></iframe>

### Backup Sales Tax Classes

If you're taking advantage of our backup rates, make sure you select the appropriate product and customer tax classes under the TaxJar configuration. Usually this means you'll want to select `Taxable Goods` and `Retail Customer` if you haven't added your own custom classes. Additionally you'll want to select `Shipping` for a separate tax rule if you plan to collect sales tax on shipping fees.

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
        <p>Based on your shipping origin state configured under <b>Shipping Settings > Origin</b>, we set the shipping taxability and whether to use <a href="https://blog.taxjar.com/charging-sales-tax-rates/">origin or destination-based sourcing</a> (e.g. your address of shipping origin or the customer's shipping address).</p>

        <p>This means we update two settings under <b>Sales > Tax</b> in your store configuration: <b>Tax Class for Shipping</b> and <b>Tax Calculation Based On</b>.</p>

        <p><img src="/images/guides/integrations/magento/tax-config-shipping.png" alt="Magento Tax Shipping Configuration"/></p>

        <p>For most stores, <b>Tax Class for Shipping</b> will be set to the default <code>Shipping</code> product tax class and <b>Tax Calculation Based On</b> will be set to <code>Shipping Address</code>. If your store's shipping origin is origin-based (not destination), we'll set it to <code>Shipping Origin</code>.</p>

        <p><i>Keep in mind these settings only affect Magento's native zip-based rates calculations.</i> If you decide to enable the TaxJar API (live checkout calculations), this will only be used as a backup.</p>
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

        <p><img src="/images/guides/integrations/magento/tax-config-display.png" alt="Magento Tax Display Configuration"/></p>
      </div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="post-heading3">
      <h4 class="panel-title">
        <img src="/images/lander/checkmark.svg" width="20"/>&nbsp;&nbsp;
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#post-install-accordion" href="#post-collapse3" aria-expanded="false" aria-controls="post-collapse3">
          API User & Role
        </a>
      </h4>
    </div>
    <div id="post-collapse3" class="panel-collapse collapse" role="tabpanel" aria-labelledby="post-heading3">
      <div class="panel-body">
        <p>In order to import transactions into your TaxJar account, we need access to your store via Magento's Core API (SOAP/XML-RPC). Our extension automatically creates a new API user and role under <b>System > Web Services</b>. This allows you to automate your sales tax reporting and save hours of time each filing period.</p>
        <p><img src="/images/guides/magento/soap-user.png" alt="Magento SOAP User"/></p>
        <p><img src="/images/guides/magento/soap-role.png" alt="Magento SOAP Role"/></p>
        <p>We'll cover how to finish connecting TaxJar to your Magento store shortly. No data will be shared until you link the account from TaxJar, but you now have everything configured to make it work seamlessly. <b><i>If you'd prefer to only use TaxJar for sales tax calculations, feel free to remove the API user and role.</i></b></p>
      </div>
    </div>
  </div>
</div>

If you're a developer, you may be wondering if TaxJar changes anything with the database after installation. Beyond setting default configuration values and storing extension-related data in the `core_config_data` table, we only add a single column to `tax_class` for managing product tax class codes and a `tax_nexus` table for managing nexus addresses.

### Debug Mode

If you need to contact support, enabling debug mode shows you diagnostic information about your Magento store and the TaxJar extension itself. It also prevents the extension from downloading zip-based rates into your store.

To help us help you, take a screenshot of the debug mode message and include it in your support email if you're having difficulties. Disable it afterwards if you want to continue importing rates.

When debug mode is enabled, calculation API requests and responses will be logged to `/var/log/taxjar/calculations.log`. You can use this log file to further investigate issues.

<img src="/images/guides/integrations/magento/taxjar-debug-mode.png" alt="Magento TaxJar Debug Mode"/>

## Sales Tax Reporting

We're almost done setting up TaxJar with your Magento store. If you're interested in sales tax reporting and automated filing, proceed!

Make sure your server fulfills Magento's [system requirements](http://docs.magento.com/m1/ce/user_guide/magento/system-requirements.html). Your PHP memory limit should be at least 256 MB or higher (512 MB recommended). If you're not sure about the requirements, contact your hosting provider.

The latest version of our extension now supports real-time transaction syncing between TaxJar and Magento. Once your order is invoiced and shipped from the Magento admin panel, it's automatically synced to TaxJar through our API. On subsequent changes, the order is updated. Separate refunds are created for each credit memo in the order. We only sync orders with a `complete` or `closed` order state.

### Setting Up Sales Tax Reporting

To begin syncing transactions with TaxJar, go to **System > Configuration** from the main menu. Select **Tax** under the **Sales** configuration menu on the left. Under **TaxJar Sales Tax Automation**, you'll find a **Transaction Sync** setting:

<img src="/images/guides/integrations/magento/transaction-sync.png" alt="Magento TaxJar Transaction Sync"/>

Click the **Transaction Sync** dropdown and select `Yes`. That's it! Future orders will now be synced to TaxJar once they transition into a `complete` or `closed` order state. To see when a transaction was synced, go to the individual order or credit memo in your admin panel. You'll find a **Synced to TaxJar** row in the summary with the sync date:

<img src="/images/guides/integrations/magento/transaction-sync-order-sync-date.png" alt="Magento TaxJar Order Synced At Date"/>

### Backfilling Transactions

Now that we're syncing transactions, it's likely that you have previous Magento orders that haven't been synced to TaxJar yet. To backfill transactions, click the **Sync Transactions** button that's shown after you enable **Transaction Sync**:

<img src="/images/guides/integrations/magento/transaction-sync-backfill-button.png" alt="Magento TaxJar Backfill Button"/>

You will be redirected to a new page, allowing you to pick a date range of orders you'd like to sync:

<img src="/images/guides/integrations/magento/transaction-sync-backfill-page.png" alt="Magento TaxJar Backfill Modal"/>

After selecting the **From** and **To** states, click the orange **Sync to TaxJar** button. We'll look for `complete` and `closed` orders updated within that date range and push them to TaxJar. Once the process is finished, you'll be able to view a log of what happened.

Whenever a transaction is synced to TaxJar, it's recorded in a log file for your reference. You can find the log file at `/var/log/taxjar.log`.

### Multi-Store Transaction Sync

Agencies or merchants with multiple business entities across different websites or stores can now use multiple TaxJar accounts to sync their transactions from a single Magento instance. To get started, go to **System > Configuration** from the main menu. Select **Tax** under the **Sales** configuration menu on the left. Switch to one of your stores using the "Current Configuration Scope" dropdown.

From there, you'll want to scroll down the page to enable **Debug Mode** in the TaxJar module. Once the **API Token** field is visible, replace the existing API token with another TaxJar API token. Click the **Save Config** button and turn off **Debug Mode**. Now any order or credit memo processed through that store will be synced to a different TaxJar account for reporting and filing.


---

### Wrapping Up

You've finished setting up TaxJar and Magento! At this point you should be collecting sales tax in your Magento store and importing orders into TaxJar for reporting. From here on out this guide becomes more in-depth to explain what we're doing behind the scenes. If you're curious, feel free to read on.

---

## How TaxJar's API Works

Your store seems to be calculating sales tax correctly, but now you might be wondering several things:

- How many API calls will be made per order?
- What happens if TaxJar's API goes down or becomes unresponsive?
- How does TaxJar's API handle my custom / international rates?
- Will TaxJar's API work with my other extensions?
- How often do the zip-based rates refresh?

**Our extension only makes live API calls when the order resides in a state where you have nexus.** This saves you a lot of API calls and money. Additionally, API calls are cached until the checkout data changes. So if you have a customer repeatedly loading the checkout page without changing their shipping info, your store will not make additional API calls. **On average, our integration will make 2-3 API calls per order in a nexus state.** If you allow customers to estimate their shipping and tax on the cart page, that's included.

API calls are only made under 3 circumstances:

1. Checkout process for a nexus state
2. Cart shipping and tax estimate for a nexus state
3. Refreshing zip-based backup rates in the admin panel

If the order does not reside in a nexus state, **TaxJar's API will fall back to Magento's zip-based rate tables.** This gives you the opportunity to use custom or international rates for regions where you may have nexus that TaxJar either doesn't support yet or you'd rather handle it yourself.

In the unlikely event that our API goes down or times out after 10 seconds, Magento's native calculations will kick in using the backup rates as well.

Our integration observes the `sales_quote_collect_totals_before` checkout event and extends the `Mage_Tax_Model_Sales_Total_Quote_Tax` model only if enabled. If you're using a third-party checkout extension or something else that may rely on Magento's internal rate tables (such as multi-warehouse inventory), try out TaxJar's extension on a test or staging server before deploying to production.

Your zip-based rates will refresh automatically on the first of each month via cron job. You can manually refresh these rates yourself by re-saving the TaxJar extension configuration. Each refresh counts as one API call.

After a customer completes an order using the TaxJar API, our extension will record the sales tax amount and rate by line item in your database. If your store allows multiple currencies, the sales tax will be converted to the customer's currency:

<img src="/images/guides/integrations/magento/order-alternate-currencies.png" alt="Magento TaxJar Alternate Currencies"/>

## How Reporting Works

After setting up your Magento connection in the TaxJar app, we'll automatically queue up an import to pull order and refund transactions from your store for the last 60 days. From there we'll continue to import your store transactions on a nightly basis. If you sign up for a paid TaxJar subscription, you can request a backfill import for older transactions.

To import transactions from your store into TaxJar, we connect to your store using Magento's Core API over a SOAP/XML-RPC endpoint. Our extension creates an API user and role automatically.

We break up imports into smaller jobs divided by day to minimize load on your server. To speed up the import process, you'll want to make sure **WSDL Cache** is enabled under **System > Configuration > Services > Magento Core API > General Settings**. **WS-I Compliance** must also be set to `No`.

<img src="/images/guides/integrations/magento/api-config-wsdl.png" alt="Magento Core API Configuration"/>

Orders must be in a `complete` or `closed` state for TaxJar to import them. This ensures we only import completed orders and refunds into the system.

## International Stores

We support checkout calculations in [more than 30 countries](https://developers.taxjar.com/api/reference/#countries) including VAT in the EU and Canada. To perform international calculations, add the countries to your nexus addresses under **Sales > Tax > Nexus Addresses**. For backup zip-based rates, we currently support the United States since it's tightly integrated with our reporting app.

With that said, our integration will automatically fall back to custom zip-based rates in Magento and already supports non-USD currencies. If you need backup rates in other countries you can set up custom tax rules under **Sales > Tax > Manage Tax Rules**.

## Extension Changelog

Curious to see what's changed with our extension lately? Read on to learn more!

### 3.0.2

- Update the gift card product tax category to be more accurate.
- Add a custom user agent string and Referer header to all API requests.

### 3.0.1

- Improve support for M2ePro users when syncing multi-channel orders to TaxJar
- Improve storing product tax categories by storing them in their own table

### 3.0.0

- Real-time transaction sync for Magento 1 now available. If you were previously connected to TaxJar through our app, we’ll automatically unlink your store and begin pushing orders through our API. If you were previously using our beta, orders will continue to be pushed through our API.
- Improve security by removing the now deprecated SOAP API users/roles.
- Make provider default to Magento for better reporting inside TaxJar.
- Replace serialize/unserialize functions with JSON encode/decode.

### v2.4.2

- Products set to "None" tax class will no longer pass a fully exempt `99999` tax code for calculations and transaction sync in order to support AutoFile.
- Add description to product tax class field explaining that a TaxJar category is required to exempt products from sales tax.

### v2.4.1

- Make nexus address fields (street, city, zip) optional for remote sellers / economic nexus.
- Fix error when syncing nexus addresses with an incomplete TaxJar business profile.
- Rename empty product category label from "None" to "Fully Taxable".
- Include fixed product taxes in total tax amount.

### v2.4.0

- Add calculation logging when debug mode is enabled.
- Improve backup rate sync performance up to 25%.
- Fix calculations for bundle product quantities caused by regression in 2.3.7.

### v2.3.7

- Fix discounts applied to shipping amounts for calculations.
- Fix calculations on newly added cart items if redirect to cart after adding a product is turned off.
- Fix zip validation for backup rates.
- Fix PHP 7 type error when running scheduled backup rate sync.

### v2.3.6

- Increase API request timeout to 30 seconds for merchants with large volume of backup rates.
- Fully exempt tax when product tax class is set to "None".
- Fix backup rates field comment typo.

### v2.3.5

- Fix calculations for fixed price bundle products.
- Add note to "TaxJar Exempt" field for customer exemptions.

### v2.3.4

- Fix child item quantity undefined offset error.
- Improve US region validation for backup rates and tax configuration.

### v2.3.3

- Fix child item quantity calculation for bundle items when parent quantity is > 1.

### v2.3.2

- Improve checkout calculation support for bundle products.

### v2.3.1

- Add manage account and sales tax report buttons to configuration.
- Create reporting API user and role immediately after connecting to TaxJar.
- Import TaxJar product categories immediately after connecting to TaxJar.
- Fix multi-store connection issue with SID param.
- Fix non-SSL store connection issue.

### v2.3.0

- Exempt specific customer tax classes from TaxJar API requests.
- Support product tax codes in Core API salesOrderInfo response.

### v2.2.1

- Support Magento EE gift card tax exemption.
- Tweak calculation requests to rely directly on line items for upcoming TaxJar API accuracy check.

### v2.2.0

- Updated tax calculation API endpoint for Magento merchants.

### v2.1.2

- Fix calculations with associated items in configurable/bundled products.
- Fix calculations fallback for earlier versions of Magento CE before 1.8.
- Add tax by line item rather than subtotal to prevent rounding issues.
- Fix nexus check for international locations.

### v2.1.1

- Fix nexus upgrade script for v2.0.1 users.
- Purge nexus addresses on disconnect for switching accounts.
- Package nexus address template form.phtml.

### v2.1.0

- **Nexus addresses can now be managed in Magento under Sales > Tax > Nexus Addresses.** If upgrading from a previous version and using checkout calculations, make sure you sync your existing addresses from TaxJar or set up a new address. Your addresses will automatically sync with TaxJar when added or changed.
- **International support for TaxJar API checkout calculations.** One nexus address per country outside of US/CA is currently supported for [more than 30 countries](https://developers.taxjar.com/api/reference/#countries).
- Review nexus addresses for missing data and set up observer to report tax configuration issues.
- Report errors when using AJAX sync backup rate button in the TaxJar configuration.

### v2.0.1

- Separate TaxJar API shipping tax amount for orders and invoices.
- Fix display issue after connecting to TaxJar with caching enabled.
- Minor bug fixes for older versions of PHP and strict standards.

### v2.0.0

- **Moved TaxJar configuration to System > Configuration > Tax.** This is a breaking change with new configuration fields. If upgrading from a previous version, you'll need to re-connect to TaxJar and re-enable your settings.
- Streamlined configuration with focus on TaxJar API and zip-based rates as a fallback.
- New "Connect to TaxJar" button for faster onboarding.
- New select fields for assigning backup tax rules to custom product and customer tax classes.
- New AJAX sync button for manually refreshing backup rates from TaxJar.
- Admin notifications tied to our RSS feed for extension updates and news.

### v1.6.1

- Hotfix TaxJar API integration model casing.
- Trim shipping origin postal code before making API requests.
- Minor code cleanup.

### v1.6.0

- TaxJar API integration at checkout for live sales tax calculations and higher accuracy.
- Product tax code support for exemptions.
- Fix rule and rate purging when uninstalling extension.
