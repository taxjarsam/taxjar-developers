---
title: Testing & Scenarios
---

When testing an integration with SmartCalcs, we want to be confident that your platform correctly handles sales tax both ways:

* Passing the correct data to SmartCalcs in the API request
* Returning the correct data from SmartCalcs using the API response

In this guide, we'll provide some high-level guidelines on how to test your integration effectively and a checklist of common testing scenarios.

---

## Sandbox Environment

At this time we don't provide sandbox accounts but it's on our roadmap. We recommend [creating a separate TaxJar account](https://app.taxjar.com/api_sign_up) with a 30 day trial to test things out. If you need more time, we're happy to extend your trial.

When creating a new TaxJar account, you can either use a new email or simply append "+dev" or "+testing" to your existing email address. Afterwards, generate a new API token and you're ready to begin testing!

---

## Integration Testing

Your platform has a separate checkout calculation process to handle order details and return back totals. Typically, SmartCalcs extends or overrides your existing calculation process to provide sales tax. For this reason, the best way to test calculations involves integration testing:

1. Create a mock order using details around a unique tax scenario.
2. Ensure the SmartCalcs integration is enabled or included programmatically.
3. Call your platform's checkout calculation process with SmartCalcs to get the order totals with sales tax included.
4. Capture the SmartCalcs API response as a fixture using your mocking or stubbing library and using it for ongoing tests (optional).
5. Assert the order and line item totals equal their expected values.

We recommend logging both the API request and response during this process so you can determine exactly what was passed to SmartCalcs and the resulting calculation.

**Verify a specific tax rate by using our [sales tax calculator](https://www.taxjar.com/sales-tax-calculator/).** Keep in mind that different rates may apply based on sourcing rules for individual states and where the merchant has nexus. If something doesn't look right, [send us](https://www.taxjar.com/contact/) the API request and response to review.

For transactions, you'd follow a similar process for testing. Usually an integration will create a new transaction in TaxJar after an order is updated into a `complete` state. You would create a mock order, transition it to the `complete` state and ensure the order transaction was created in our API.

---

## Click Testing

In addition to integration tests, you may want to outline a click testing process to run through each time you update your integration. For calculations, this would involve enabling the integration in your platform and testing customer-facing orders at checkout and merchant-facing backend orders directly in the browser.

If the integration can be downloaded through a marketplace or directory, we recommend downloading the released version and installing it in a staging environment.

---

## Testing Scenarios

We've provided a list of testing scenarios for both sales tax calculations and reporting. [Use the request examples dropdown](https://developers.taxjar.com/api/reference/#taxes) on the right of the API documentation for orders and addresses to test.

### Sales Tax Calculations

<label><input type="checkbox">&nbsp;&nbsp; Calculation for `from_` and `to_` address in same state / region</label>

<label><input type="checkbox">&nbsp;&nbsp; Calculation for `from_` and `to_` address in different states, both nexus states</label>

<label><input type="checkbox">&nbsp;&nbsp; No calculation for `from_` and `to_` address in different states, one nexus state</label>

<label><input type="checkbox">&nbsp;&nbsp; No calculation for `from_` and `to_` address in different states, no nexus</label>

<label><input type="checkbox">&nbsp;&nbsp; Calculation for intrastate order in origin-based nexus state</label>

<label><input type="checkbox">&nbsp;&nbsp; Calculation for interstate order shipped to an origin-based state, both nexus states</label>

<label><input type="checkbox">&nbsp;&nbsp; Rooftop calculation for order in SST state (e.g. WA, KS, etc)</label>

<label><input type="checkbox">&nbsp;&nbsp; Calculation for [clothing product in NY](https://blog.taxjar.com/the-new-york-clothing-sales-tax-exemption-demystified/)</label>

<label><input type="checkbox">&nbsp;&nbsp; Calculation for [food and grocery product](https://blog.taxjar.com/states-grocery-items-tax-exempt/) in CA, TX, NY, etc</label>

<label><input type="checkbox">&nbsp;&nbsp; Calculations for each product type (e.g. configurable / variable, bundle, virtual, etc)</label>

<label><input type="checkbox">&nbsp;&nbsp; No calculation for non-taxable or exempt products using `99999` tax code</label>

<label><input type="checkbox">&nbsp;&nbsp; [No shipping / freight tax](https://blog.taxjar.com/sales-tax-and-shipping/) for orders in CA, AZ, MA, VA, etc</label>

<label><input type="checkbox">&nbsp;&nbsp; Calculation for Canada `from_` and `to_` address in same province / region</label>

<label><input type="checkbox">&nbsp;&nbsp; Calculation for Canada `from_` and `to_` address in [different provinces](https://canadabusiness.ca/government/taxes-gst-hst/federal-tax-information/overview-of-charging-and-collecting-sales-tax/#toc1), both nexus provinces</label>

<label><input type="checkbox">&nbsp;&nbsp; Calculation for Canada `from_` and `to_` address in [different provinces](https://canadabusiness.ca/government/taxes-gst-hst/federal-tax-information/overview-of-charging-and-collecting-sales-tax/#toc1), one nexus province</label>

<label><input type="checkbox">&nbsp;&nbsp; Calculations for [EU Standard and Reduced VAT](https://en.wikipedia.org/wiki/European_Union_value_added_tax#VAT_rates)</label>

<label><input type="checkbox">&nbsp;&nbsp; Calculation for [Australia GST](https://www.ato.gov.au/Business/GST/)</label>

<label><input type="checkbox">&nbsp;&nbsp; Calculation using CAD currency</label>

<label><input type="checkbox">&nbsp;&nbsp; Calculation using EUR currency</label>

<label><input type="checkbox">&nbsp;&nbsp; Calculation using AUD currency</label>

<label><input type="checkbox">&nbsp;&nbsp; Discount calculation for coupon percentage discount</label>

<label><input type="checkbox">&nbsp;&nbsp; Discount calculation for coupon fixed amount discount</label>

<label><input type="checkbox">&nbsp;&nbsp; Discount calculation for volume discount</label>

<label><input type="checkbox">&nbsp;&nbsp; Discount calculation for shipping discount</label>

### Sales Tax Reporting

<label><input type="checkbox">&nbsp;&nbsp; Create a new order transaction after order updates to a `complete` state</label>

<label><input type="checkbox">&nbsp;&nbsp; Update an existing order transaction after a `complete` order is changed</label>

<label><input type="checkbox">&nbsp;&nbsp; Create a new refund transaction when a refund is created for a `complete` order</label>

<label><input type="checkbox">&nbsp;&nbsp; Update an existing refund transaction after a refund is changed if applicable</label>

<label><input type="checkbox">&nbsp;&nbsp; Backfill a collection of `complete` orders with refunds inside a given date range</label>

<label><input type="checkbox">&nbsp;&nbsp; Order transactions include line item discounts</label>

<label><input type="checkbox">&nbsp;&nbsp; Order transactions include shipping discounts</label>

---

<a href="/integrations/faq/" class="btn">Next: FAQs</a>
