---
title: Sales Tax Calculations
---

Every platform handles sales tax calculations differently with a varying degree of accuracy. Most commonly you’ll find zip-based tax rates, allowing merchants to set up a tax rate by 5-digit postal code. These rates [work fine in certain scenarios](https://blog.taxjar.com/zip-codes-sales-tax/), but ideally you want to collect sales tax based on the street address for US calculations:

<img src="/images/guides/accuracy.png" width="75%" alt="SmartCalcs Accuracy">

Beyond that, there’s plenty of other decisions most platforms don't natively support around sales tax. Given the necessary data, SmartCalcs automatically handles the following for you:

* Street-level rooftop calculations
* Line item taxability and itemized discounts
* Shipping / freight taxability
* Product taxability and exemptions
* Customer exemptions
* Sourcing logic for interstate and intrastate orders
* Multiple nexus addresses per merchant
* Sales tax holidays

All of this is done through our [sales tax calculation endpoint](https://developers.taxjar.com/api/reference/#post-calculate-sales-tax-for-an-order): `/v2/taxes`. Let’s go through some best practices when using this API endpoint.

---

## From Address

When making a request to `/v2/taxes`, the first thing you’ll be asked to provide are the `from_` parameters. According to the [documentation](https://developers.taxjar.com/api/reference/#post-calculate-sales-tax-for-an-order), these are optional because we can determine nexus elsewhere:

* Using the `nexus_addresses[]` parameter.
* From a merchant’s address on file in their TaxJar account.

```json
{
  "from_country": "US",
  "from_zip": "92093",
  "from_state": "CA",
  "from_city": "La Jolla",
  "from_street": "9500 Gilman Drive"
}
```

The concept of [nexus](https://blog.taxjar.com/sales-tax-nexus-definition/) is very important for US-based transactions. If a merchant doesn’t have nexus in the same state as the customer’s shipping address, no sales tax is collected.

However, it gets trickier in the US. [Individual states in the US handle sales tax differently](https://blog.taxjar.com/charging-sales-tax-rates/). Some want you to collect based on the destination of the buyer, others want you to collect based on your store’s origin.

If you ship an order from out of state into an origin-based state, that state may effectively become destination-based.

*Based on this scenario, we highly recommend using the `from_` parameters to ensure the correct sourcing logic for a state.*

Using our [state guides](https://www.taxjar.com/states/), you can find out the sourcing of a state and how we handle interstate orders.

### International Scenarios

[Sales tax in Canada](https://canadabusiness.ca/government/taxes-gst-hst/federal-tax-information/overview-of-charging-and-collecting-sales-tax/) is simpler than the US, but it’s still important to consider nexus for our polite and friendly merchants up North.

We look at the destination of the buyer when collecting sales tax in Canada. Generally, at least some sales tax is collected regardless of nexus.

However, in provinces such as Quebec, nexus can determine whether or not to charge a higher tax rate:

* If an order is shipped to Quebec but the merchant doesn’t have nexus in Quebec, only 5% GST is collected.

* If the merchant has nexus in Quebec, GST + QST is collected.

Further out, we provide [VAT rates](https://blog.taxjar.com/european-vat-us-ecommerce-sellers/) for the EU and Australia. These countries are much simpler. If the merchant has nexus in one of these countries, we’ll collect sales tax. [Click here](/api/reference/#countries) for a full list of supported countries.

### Store Location

When determining the address to populate in the `from_` parameters, we generally recommend using the store’s location or shipping origin. Here’s what Graham our sales tax analyst has to say:

> **Most origin states consider the location at which the seller received the order from the customer the situs of the sale.** If the location at which the seller receives the order is in the state, then it trumps the ship-from location. If the location at which the seller receives the order is located outside the state, some states will source the sale to the ship-from location if that location is in the state (example: CA), and some will source it to destination (example: TX). Sales for which the order was received at a location in state but shipped from a location outside the state are virtually always sourced to the location at which the seller receives the order. Sales for which the order was received out of state and shipped from out of state are always destination.

---

## To Address

Providing the `to_` params for `/v2/taxes` is more straightforward. At a minimum, `to_country` is required for all calculations. `to_state` and `to_zip` are required for the US and Canada.

```json
{
  "to_country": "US",
  "to_zip": "90002",
  "to_state": "CA",
  "to_city": "Los Angeles",
  "to_street": "1335 E 103rd St"
}
```

The more data you put into these parameters, the more you’ll get back. If you provide a way to estimate tax in the cart, less data is fine. Once the customer completes the checkout process, you’ll want to provide their entire address for the most accurate calculation.

**We recommend providing the customer’s shipping address for the `to_` parameters.**

There are scenarios when this may not apply:

* If you’re selling [digital / virtual products](https://blog.taxjar.com/sales-tax-digital-products/) or SaaS subscriptions, consider using the customer’s billing address.

* If you provide a local pickup shipping method, use the store’s location or a brick and mortar address.

---

## Amount

The `amount` param is always the total amount of the order, excluding shipping. It’s optional. You may opt to use `line_items[]` instead. If you provide both `amount` and line items, we’ll compare the two to make sure they match up.

```json
{
  "amount": 15
}
```

**We recommend providing both params or simply `line_items[]` for the most flexibility.**

---

## Shipping

At this time we only provide a `shipping` param to cover freight tax. If you need to pass handling fees as well, consider using a separate line item.

```json
{
  "shipping": 1.5
}
```

[Shipping taxability](https://blog.taxjar.com/sales-tax-and-shipping/) is automatically determined by state / region in SmartCalcs. If you need to override this functionality to always collect freight tax, consider using a separate line item for shipping and passing $0 in the `shipping` param.

---

## Nexus Addresses

Without providing nexus addresses, SmartCalcs will assume the merchant only has nexus based on their `from_` address or any nexus states on file in their TaxJar account.

```json
{
  "nexus_addresses": [
    {
      "id": "Main Location",
      "country": "US",
      "zip": "92093",
      "state": "CA",
      "city": "La Jolla",
      "street": "9500 Gilman Drive"
    }
  ]
}
```

Depending on your requirements, it may be fine to only support one nexus address per merchant using the `from_` address. Merchants with multiple nexus addresses will need to sign up for a TaxJar account and manage their states inside the TaxJar app.

In order to support `nexus_addresses[]` on your platform, you may need to introduce a way for merchants to manage multiple business addresses. Ideally, provide a way to manage nexus addresses directly through SmartCalcs similar to our Magento integrations:

![Magento 2 Nexus Addresses](/images/guides/nexus-addresses.png)

SmartCalcs provides a set of nexus address endpoints that we’ll cover later.

### International Limitations

At this time, the TaxJar app is oriented toward US merchants. We only support one international address on file per account from the TaxJar app.

This means that if your platform relies heavily on merchants outside of the US, you’ll want to use the `nexus_addresses[]` param to ensure all of their nexus addresses can be sent through SmartCalcs.

---

## Line Items

To support product taxability and itemized discounts, **we always recommend using the `line_items[]` param.**

```json
{
  "line_items": [
    {
      "id": "1",
      "quantity": 1,
      "product_tax_code": "20010",
      "unit_price": 15,
      "discount": 0
    }
  ]
}
```

The `id` param should always be unique. If multiple line items share the same `id`, you may receive an incorrect calculation. Avoid using a product ID for this param if it’s possible to add multiple line items with the same product, such as customizable products with variations. Consider using a unique ID associated with the line item itself.

The `unit_price` should be the base price of the line item before taking into account the `quantity`. We’ll multiply the `unit_price` by `quantity` in SmartCalcs.

Pay special attention to the `discount` param. Pass the **total** discount of the line item and factor in the quantity. For example:

<pre>
Unit Price: $5.00
Quantity: 3
Discount: 20%
</pre>

The `discount` param would be **$3.00**, not $1.00.

---

## Tax Status

If products on your platform have a tax status, you’ll want to exempt non-taxable products. In the `line_items[]` collection, pass a `product_tax_code` of `99999` for each non-taxable product to exempt it from sales tax.

Fully taxable products don’t require a `product_tax_code`. We’ll automatically assume it’s taxable.

---

## Product Exemptions

To handle product taxability, you’ll need to allow merchants to assign their products to a TaxJar product category. If you have a product tax class system built into your platform, consider associating a TaxJar product category with a tax class.

Our `/v2/categories` endpoint is provided so you can pull down our product categories and keep them updated in your system. You can retrieve the category name and tax code for each category:

```json
{
  "categories": [
    {
      "name": "Clothing",
      "product_tax_code": "20010",
      "description": " All human wearing apparel suitable for general use"
    }
  ]
}
```

Using this data, you could populate a dropdown for merchants to select a TaxJar product category when managing tax classes or individual products.

In most of our implementations, we associate our tax codes with the notion of a tax class. This may differ based on your internal requirements. For example, a merchant selling clothing would create a “Clothing” tax class and assign it to “Clothing - 20010”, the category provided by TaxJar. When a clothing product is added to the cart, the tax class and associated tax code is retrieved. If a tax code is found, it’s passed via `product_tax_code`.

We have a limited set of categories, but we’re planning to expand the list over time. If a product doesn’t have a category, we’ll assume it’s always taxable. Our “exempt” category can be used to fully exempt certain types of products if the merchant must exempt.

---

## Customer Exemptions

Exempting customers is similar to fully exempting line items — if a customer is designated as exempt, you’ll want to pass a `product_tax_code` of `99999` for each line item in the order. Generally we provide an option to exempt a customer by a customer tax class, but not all platforms support tax classes for customers.

If your platform doesn’t provide customer tax classes, you may want to consider an option for exempting individual customers or customer groups from sales tax.

### Handling the Response

Use the `amount_to_collect` attribute to return back the amount of sales tax to collect in your platform.

If you’d like to provide granular, itemized data by jurisdiction or line item you can access the `breakdown` attribute. We’ll return back the amount to collect and corresponding rates at the state, county, city, and special district level for both the overall order and individual line items. At this time, we don’t provide the jurisdiction names but it’s on our roadmap.

```json
{
  "tax": {
    "order_total_amount": 16.5,
    "shipping": 1.5,
    "taxable_amount": 15,
    "amount_to_collect": 1.35,
    "rate": 0.09,
    "has_nexus": true,
    "freight_taxable": false,
    "tax_source": "destination",
    "breakdown": {}
  }
}
```

For Canada, we’ll return back the GST and PST rates. Elsewhere, we’ll return back country-based tax such as standard or reduced VAT rates.

---

## API Guidelines

Here’s the most important takeaway for calculating sales tax: **Only make US-based calculation requests where the merchant has nexus.**

* If an order is shipping to a merchant’s nexus state, make a request to `/v2/rates`.
* If an order is **not** shipping to a merchant’s nexus state, do not make a request. Ideally, fall back to your tax rate system.

This guideline may save your merchants some money on API calculations, so take note to implement. Here’s several more:

* Provide as much data as you can to ensure accurate calculations.
* If possible, cache your calculation API responses until an order detail changes (line item, address, shipping, etc).
* Review your code to ensure you’re conservatively making requests to SmartCalcs and avoiding duplicate calls.
* Always catch API request errors. Ideally, fall back to your tax rate system so merchants can utilize their own backup rates. If you see an ongoing problem, reach out to our support team.
* Log API requests and responses on your end for easy debugging.

---

## Branding Guidelines

---


## Testing Guidelines

---

## UX Guidelines

* Try your best to use the settings and data already provided by the merchant on your platform for populating `from_` parameters, such as their store location.

* Respect your platform’s existing tax settings and implement ways for SmartCalcs to handle them. For example, adding a separate line item for handling fees or fixed product taxes.

* If SmartCalcs doesn’t support all of your existing tax settings, make sure you communicate that to your merchants. For example, disabling specific settings if the TaxJar integration is enabled or adding a note to each field.

* Set some intelligent defaults if certain settings don’t apply to SmartCalcs. For example, the merchant should usually use the customer’s shipping address when calculating tax, not the billing address or store location.

* In addition to all of the above, make enabling sales tax calculations as simple as possible. It should only require a checkbox to activate.

* Point merchants in the right direction to configure product exemptions, customer exemptions, and nexus address management if you plan to add this functionality.

* When providing a dropdown list of TaxJar product categories, consider using this format:
<pre>
Clothing (20010)
Food & Groceries (40030)
and so on…
</pre>

---

<a href="/integrations/sales-tax-reporting/" class="btn">Next: Sales Tax Reporting</a>
