---
title: Certification Checklist
description: "Learn what we look for in a certified TaxJar integration."
---

## Onboarding & Authentication

<label><input type="checkbox">&nbsp;&nbsp; Adhere to our [branding guidelines](/integrations/onboarding/#section-branding-guidelines)</label>

<ul style="list-style-type: none; margin-left: -1.5rem">
  <li><small>In addition to the guidelines linked above, use "API token" terminology &mdash; rather than "API key."</small></li>
</ul>

<label><input type="checkbox">&nbsp;&nbsp; Adhere to our [UX guidelines](/integrations/authentication/#section-ux-guidelines)</label>

<ul style="list-style-type: none; margin-left: -1.5rem">
  <li><small>Follow all UX guidelines. Please also:<small></li>
</ul>

- <small>**Introduce the integration in the right context.** Take an approach that fits with the platform. For example, if you're developing a shopping cart integration and there is a Sales Tax Processors admin menu: it may make sense to place TaxJar settings in **Sales Tax Processors > TaxJar**.</small>
- <small>**Be upfront about the features provided** in the docs and/or within the integration itself.</small>
- <small>**Allow merchants to sign up for TaxJar** if embedded within your solution.</small>
- <small>**Hide TaxJar settings** until an API token is provided.</small>

<label><input type="checkbox">&nbsp;&nbsp; <small style="color: grey">optional</small>&nbsp; [Verify API token](/integrations/authentication/#section-api-guidelines) after save</label>

<label><input type="checkbox">&nbsp;&nbsp; <small style="color: grey">optional</small>&nbsp; Allow users/merchants to enter a [sandbox API token](/integrations/testing/#section-sandbox-environment) for testing</label>

## Configuration

<label><input type="checkbox">&nbsp;&nbsp; [Enable / disable calculations and reporting separately](/integrations/sales-tax-reporting/#section-ux-guidelines)</label>

- <small>Preferable: Separate options to turn on/off each</small>
- <small>Minimum: Single option to turn on/off reporting only (calculations assumed with an API token)</small>


<label><input type="checkbox">&nbsp;&nbsp; [Support nexus sync or management](/integrations/sales-tax-calculations/#section-nexus-addresses)</label>

- <small>Preferred: Provide a nexus management view where users can update their nexus addresses in the platform, [similar to our Magento integrations](/integrations/sales-tax-calculations/#section-nexus-addresses).</small>
  - <small>Pass nexus addresses to the `nexus_addresses[]` param for [calculations](/api/reference/#taxes).</small>
  - <small>This method allows for full control over nexus addresses with international support.</small>
- <small>Minimum: User's nexus regions are synced from TaxJar via [v2/nexus/regions](/api/reference/#nexus)</small>
  - <small>List TaxJar nexus regions somewhere in the platform: TaxJar settings or another appropriate view.</small>
  - <small>Allow user to manually sync nexus regions from TaxJar.</small>

<label><input type="checkbox">&nbsp;&nbsp; Provide client-side logging for support</label>

<ul style="list-style-type: none; margin-left: -1.5rem">
  <li><small><strong>API requests / responses should be logged</strong> to a local file or somewhere in the platform for a merchant to view so they can more easily receive support for technical or tax-related issues.</small></li>
</ul>

<label><input type="checkbox">&nbsp;&nbsp; [Assign products to a category](/integrations/sales-tax-calculations/#section-product-exemptions)</label>

- <small>Preferred: Users should be able to select a category using a dropdown synced with [v2/categories](/api/reference/#categories) either manually or on a recurring basis.</small>
- <small>Minimum: Provide a field for users to enter a `product_tax_code`.</small>

<label><input type="checkbox">&nbsp;&nbsp; <small style="color: grey">optional</small>&nbsp; [Support customer exemptions](/integrations/sales-tax-calculations/#section-customer-exemptions)</label>

- <small>Users should be able to exempt specific customers from sales tax from within the platform.</small>
- <small>Customers should be synced or enqueued on save.</small>

## Sales Tax Calculations

<label><input type="checkbox">&nbsp;&nbsp; [Pass full from address](/integrations/sales-tax-calculations/#section-from-address) via `from_` params</label>

<label><input type="checkbox">&nbsp;&nbsp; [Pass full to address](/integrations/sales-tax-calculations/#section-to-address) via `to_` params</label>

<label><input type="checkbox">&nbsp;&nbsp; [Pass shipping param](/integrations/sales-tax-calculations/#section-shipping)</label>

<label><input type="checkbox">&nbsp;&nbsp; <small style="color: grey">optional</small>&nbsp; Pass `customer_id` param <small>(required if supporting customer exemptions)</small></label>

<label><input type="checkbox">&nbsp;&nbsp; [Pass **line_items[]** param](/integrations/sales-tax-calculations/#section-line-items)</label>

- <label><input type="checkbox">&nbsp;&nbsp; Each line item should have a unique `id`</label>

- <label><input type="checkbox">&nbsp;&nbsp; Include `quantity` and `unit_price` for each line item</label>

- <label><input type="checkbox">&nbsp;&nbsp; Line item `product_tax_code` should be passed when appropriate</label>

- <label><input type="checkbox">&nbsp;&nbsp; Handle line item discounts</label>
  - <small>For product-level discounts, pass the discount amount to the line item's `discount` param.</small>

- <label><input type="checkbox">&nbsp;&nbsp; Handle order-level discounts</label>
  - <small>Distribute order-level discounts to the `discount` param of each line item, making sure to follow [this advice](/integrations/sales-tax-calculations/#section-line-items).</small>

<label><input type="checkbox">&nbsp;&nbsp; [Deduct shipping discounts directly from the **shipping** param](/integrations/sales-tax-calculations/#section-shipping)</label>

<label><input type="checkbox">&nbsp;&nbsp; Only send a request to [**v2/taxes**](/api/reference/#taxes) when a merchant has nexus</label>

<ul style="list-style-type: none; margin-left: -1.5rem">
  <li><small>Avoid unnecessary API calls to <strong>v2/taxes</strong> by understanding the concept of <a href="https://blog.taxjar.com/sales-tax-nexus-definition/" target=_blank>sales tax nexus</a>. If a customer's delivery address is not in a state in which a merchant has nexus, no sales tax needs to be collected; therefore, there's no need to calculate tax. </small><br><small>*Keep in mind this only applies to US-based sales. Tax <i>may</i> need to be calculated for other jurisdictions.</small></li>
</ul>

<label><input type="checkbox">&nbsp;&nbsp; [Cache calculation response until order details change](/integrations/sales-tax-calculations/#section-api-guidelines)</label>

<label><input type="checkbox">&nbsp;&nbsp; <small style="color: grey">optional</small>&nbsp; Checkout doesn't break with an invalid TaxJar API token or if the <a href="https://status.taxjar.com/" target=_blank>API is down</a></label><br>&emsp;&nbsp;<small>*Required for shopping cart integrations</small>

<ul style="list-style-type: none; margin-left: -1.5rem">
  <li><small>For these cases, you could periodically <a href="/integrations/sales-tax-calculations/#section-api-guidelines">pull down backup tax rates</a> from our <strong><a href="/api/reference/#summarized-rates">v2/summary_rates</a></strong> endpoint. At a minimum, make sure customers are still able to check out &mdash; even if $0 of sales tax is collected.</small></li>
</ul>

## Sales Tax Reporting & Filing

Pass the following required params for transactions:

- <label><input type="checkbox">&nbsp;&nbsp; Unique `id` for each [order](/integrations/sales-tax-reporting/#section-order-transactions) and [refund](/integrations/sales-tax-reporting/#section-refund-transactions)</label>

- <label><input type="checkbox">&nbsp;&nbsp; [Transaction reference ID](/integrations/sales-tax-reporting/#section-refund-transactions) for refunds</label>

- <label><input type="checkbox">&nbsp;&nbsp; `transaction_date` for each transaction</label>

- <label><input type="checkbox">&nbsp;&nbsp; Full from address via `from_` params</label>

- <label><input type="checkbox">&nbsp;&nbsp; Full to address via `to_` params</label>

- <label><input type="checkbox">&nbsp;&nbsp; Order-level `amount` param</label>

<ul style="list-style-type: none; margin-left: -1.5rem">
  <li><small>Reminder: <code>amount</code> should equal the total amount of the order, including <code>shipping</code>. Exclude <code>sales_tax</code>.</small></li>
</ul>

- <label><input type="checkbox">&nbsp;&nbsp; `shipping`</label>

- <label><input type="checkbox">&nbsp;&nbsp; Order-level `sales_tax`</label>

- <label><input type="checkbox">&nbsp;&nbsp; `line_items[]` including:</label>

  - <label><input type="checkbox">&nbsp;&nbsp; `quantity`</label>

  - <label><input type="checkbox">&nbsp;&nbsp; `unit_price`</label>

  - <label><input type="checkbox">&nbsp;&nbsp; `product_tax_code` <small>(if not fully taxable)</small></label>

  - <label><input type="checkbox">&nbsp;&nbsp; Line item `sales_tax`</label>

  - <label><input type="checkbox">&nbsp;&nbsp; Line item `discount`</label>

<label><input type="checkbox">&nbsp;&nbsp; <small style="color: grey">optional</small>&nbsp; [Include **customer_id** for exempt customers](/integrations/sales-tax-calculations/#section-customer-exemptions)</label>

<label><input type="checkbox">&nbsp;&nbsp; Distribute order-level discounts across line items</label>

<label><input type="checkbox">&nbsp;&nbsp; Deduct shipping discounts from the `shipping` param</label>

<label><input type="checkbox">&nbsp;&nbsp; Use positive decimals in monetary values for order transactions</label>

<label><input type="checkbox">&nbsp;&nbsp; Use negative decimals in monetary values for refund transactions</label>

<label><input type="checkbox">&nbsp;&nbsp; Pass absolute values to the line item `discount` param</label>

Push **all orders** to TaxJar including:

- <label><input type="checkbox">&nbsp;&nbsp; Orders to customers where the merchant does **_not_** have nexus</label>

- <label><input type="checkbox">&nbsp;&nbsp; Orders from tax-exempt customers and orders with only tax-exempt purchases</label>

<ul style="list-style-type: none; margin-left: -1.5rem">
  <li><small>We require <strong>ALL</strong> transactions be pushed to TaxJar regardless of nexus or taxability. TaxJar customers use our <a href="https://www.taxjar.com/sales-and-transactions-checker/" target=_blank>Sales and Transactions Checker</a> to see their aggregated order data and determine if they've hit an economic nexus threshold in a given state.</small></li>
</ul>

Update transaction details if they're changed after being pushed to TaxJar via:

- <label><input type="checkbox">&nbsp;&nbsp; PUT to [**v2/transactions/orders/:transaction_id**](/api/reference/#put-update-an-order-transaction) for orders</label>

- <label><input type="checkbox">&nbsp;&nbsp; PUT to [**v2/transactions/refunds/:transaction_id**](/api/reference/#put-update-a-refund-transaction) for refunds</label>

<label><input type="checkbox">&nbsp;&nbsp; Provide [transaction backfill support via the API](/integrations/sales-tax-reporting/#section-backfilling-transactions) or, at a minimum, via CSV export so merchants can <a href="https://blog.taxjar.com/import-transactions-to-taxjar/" target=_blank>import transactions manually</a>.</label>
