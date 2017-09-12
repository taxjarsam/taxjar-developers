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

1. Create a mock order using details around a unique tax scenario, such as no shipping tax in California or clothing product exemptions in New York.
2. Ensure the SmartCalcs integration is enabled or included programmatically.
3. Call your platform's checkout calculation process with SmartCalcs to get the order totals with sales tax included.
4. Capture the SmartCalcs API response as a fixture using your mocking or stubbing library and using it for ongoing tests (optional).
5. Assert the order and line item totals equal their expected values.

We recommend logging both the API request and response during this process so you can determine exactly what was passed to SmartCalcs and the resulting calculation.

In addition to integration tests, you may want to outline a click-testing process to run through each time you update your integration. This would involve enabling the integration in your platform and testing customer-facing orders at checkout and merchant-facing backend orders directly in the browser.

To help you along the way, we've provided a list of testing scenarios for both sales tax calculations and reporting.

---

## Testing Scenarios

### Request Parameters

<label><input type="checkbox">&nbsp;&nbsp; `from_` parameters use merchant/store shipping origin</label>

<label><input type="checkbox">&nbsp;&nbsp; `to_` parameters use customer shipping address for non-virtual products</label>

<label><input type="checkbox">&nbsp;&nbsp; `to_` parameters use customer billing address for virtual products</label>

<label><input type="checkbox">&nbsp;&nbsp; Either `amount` or `line_items[]` in request</label>

<label><input type="checkbox">&nbsp;&nbsp; `shipping` in request</label>

<label><input type="checkbox">&nbsp;&nbsp; `line_items[]` populated for one product</label>

<label><input type="checkbox">&nbsp;&nbsp; `line_items[]` populated for multiple products</label>

<label><input type="checkbox">&nbsp;&nbsp; `line_items[]` populated for non-simple, variable/configurable and bundled products</label>

<label><input type="checkbox">&nbsp;&nbsp; Product tax code passed for products assigned to tax class w/ TaxJar tax code</label>

<label><input type="checkbox">&nbsp;&nbsp; Quantity passed for line items with more than 1 quantity each</label>

### Sales Tax Calculations

<label><input type="checkbox">&nbsp;&nbsp; Calculation for `from_` and `to_` address in same state / region</label>

<label><input type="checkbox">&nbsp;&nbsp; Calculation for `from_` and `to_` address in different states, both nexus states</label>

<label><input type="checkbox">&nbsp;&nbsp; No calculation for `from_` and `to_` address in different states, one nexus state</label>

<label><input type="checkbox">&nbsp;&nbsp; No calculation for `from_` and `to_` address in different states, no nexus</label>

<label><input type="checkbox">&nbsp;&nbsp; Calculation for clothing product in NY</label>

<label><input type="checkbox">&nbsp;&nbsp; Calculation for food and grocery product in CA</label>

<label><input type="checkbox">&nbsp;&nbsp; No shipping tax for order in CA</label>

<label><input type="checkbox">&nbsp;&nbsp; Rooftop calculation for order in SST state (e.g. WA, KS, etc)</label>

<label><input type="checkbox">&nbsp;&nbsp; Discount calculation for coupon percentage discount</label>

<label><input type="checkbox">&nbsp;&nbsp; Discount calculation for coupon fixed amount discount</label>

<label><input type="checkbox">&nbsp;&nbsp; Discount calculation for volume discount</label>
