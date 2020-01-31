---
title: Certification Quickstart
description: "Speed up the certification review process! 🚀"
---

To expedite the certification review process, you may follow the instructions below once initial development on the integration is complete.

By performing specific [calculations and transactions](#section-calculations-and-transactions) from within the platform you're integrating with TaxJar, our Integrations team will more quickly be able to test that the integration is utilizing the [SmartCalcs Sales Tax API](https://developers.taxjar.com/api/reference) properly and satisfies the [Certification Guidelines](/integrations/certification-guidelines) as well as the [Certification Checklist](/integrations/certification-checklist).<br><br>

### Prerequisites

- Set up nexus in New York (NY) in the [TaxJar app](https://app.taxjar.com/account#states) or within the platform's nexus management view.
    - If supporting [multiple international business addresses](/integrations/sales-tax-calculations/#section-international-limitations) for a merchant, add NY in the nexus management view within the platform, which should send NY as a nexus state via the `nexus_addresses` param when [calculating tax](https://developers.taxjar.com/api/reference/#post-calculate-sales-tax-for-an-order).
​

- Ensure Maine (ME) is NOT a nexus state.

- Add product tax code `20010` (Clothing) to an item priced at $109 or less.

- Create a coupon that discounts a single item by $5.

- Create an order-level coupon that discounts an entire order by 50%.

- Create a coupon that enables free shipping. Or, if unavailable:
    - Create a shipping coupon of a fixed amount that equals the cost of shipping for the product set up earlier with product tax code `20010`.<br><br>

### Calculations & Transactions

Perform the following calculations/transactions from within the platform:<br><br>

1. **Check out / complete an order with the following details:**

    Ship-to Address

    > certify taxable order<br>
    > New York, NY 10019<br>
    > US

    Ship-from Address

    > 123 Fake Street<br>
    > Los Angeles, CA 90210<br>
    > US

    Add any fully taxable item and discount it by $5.00.

    Include any non-zero amount for shipping.<br><br>

2. **Check out / complete an order with the following details:**

    Ship-to Address

    > certify product exempt order<br>
    > New York, NY 10019<br>
    > US

    Ship-from Address

    > 123 Fake Street<br>
    > Los Angeles, CA 90210<br>
    > US

    Add the item mapped to product tax code `20010` that is priced at $109.00 or less.

    Include any non-zero amount for shipping and apply the shipping coupon created earlier.<br><br>

3. **Check out / complete an order with the following details:**

    Ship-to Address

    > certify discounted order<br>
    > New York, NY 10019<br>
    > US

    Ship-from Address

    > 123 Fake Street<br>
    > Los Angeles, CA 90210<br>
    > US

    Add two or more _different_ items that are fully taxable.

    Apply the 50% off order-level coupon created earlier.

    Include any non-zero amount for shipping.<br><br>

4. **Check out / complete an order with the following details:**

    Ship-to Address _(New Address)_

    > certify non-nexus order<br>
    > Portland, ME 04102<br>
    > US

    Ship-from Address

    > 123 Fake Street<br>
    > Los Angeles, CA 90210<br>
    > US

    Add any taxable item and complete the order.<br><br>

5. <small>**_(optional)_**</small> **_If_ the platform supports customer exemptions:**

    Create a tax-exempt customer who is exempt from sales tax in NY. The exemption type should be `government`, `wholesale`, or `other`.

    Check out / complete an order to that customer with the following details:

    Ship-to Address

    > certify customer-exempt order<br>
    > New York, NY 10019<br>
    > US

    Ship-from Address

    > 123 Fake Street<br>
    > Los Angeles, CA 90210<br>
    > US

    Add any item and complete the order.<br><br>

6. <small>**_(optional)_**</small> **_If_ the platform has the option to update orders _after pushing_ to TaxJar:**

    Update the first order (`certify taxable order`) by adding a different taxable item so that the total line items included in the order is more than the original order.

    Also, update the ship-to street address to `certify update order`.<br><br>

7. **Refund _one_ item from the third order (`certify discounted order`), making sure to leave the other item(s) in the order.**<br><br>

8. <small>**_(optional)_**</small> **_If_ the platform has the option to update refunds _after pushing_ to TaxJar:**

    Update the same refund by fully refunding the shipping cost.<br><br>

### Other Tests

- To save customers on [billing](https://developers.taxjar.com/api/reference/#billing), we will also test if tax calculations are [cached until order details change](/integrations/sales-tax-calculations/#section-api-guidelines).

- To test for [nexus sync or management](/integrations/certification-checklist/#section-configuration), we will check that a request to [v2/nexus/regions](https://developers.taxjar.com/api/reference/#get-list-nexus-regions) was made, or that all tax calculations pass the `nexus_addresses` param containing a merchant's nexus locations. If the integration supports multiple international business addresses, the `nexus_addresses` param should be used for [international support](https://developers.taxjar.com/api/reference/#countries).

- If you haven't already, you may [submit your integration](/integrations/submit/) and we'll then certify other aspects of the integration, such as:
 - [Branding guidelines](/integrations/onboarding/#section-branding-guidelines)
 - [UX guidelines](/integrations/authentication/#section-ux-guidelines)
 - [Verify API token after save](/integrations/authentication/#section-api-guidelines) <small>_(optional)_</small>
 - [Allow users/merchants to enter a sandbox API token for testing](/integrations/testing/#section-sandbox-environment) <small>_(optional)_</small>
 - [Enable / disable calculations and reporting separately](/integrations/sales-tax-reporting/#section-ux-guidelines)
 - [Provide client-side logging for support](/integrations/certification-checklist/#section-configuration)
 - [Transaction backfill support](/integrations/sales-tax-reporting/#section-backfilling-transactions)
