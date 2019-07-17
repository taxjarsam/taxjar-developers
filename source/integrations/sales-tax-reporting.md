---
title: Sales Tax Reporting
description: "Import transactions from your eCommerce platform into TaxJar for automated sales tax reporting and filing."
---

TaxJar provides automated sales tax reports and filing for online merchants in the United States. To generate state-based reports and determine how much sales tax a merchant has collected vs. how much they ought to have collected, we need their order and refund transactions.

Transactions are imported into TaxJar either one of two ways:

* From the TaxJar app using an in-house integration, such as Amazon, eBay, or Walmart. TaxJar queues up workers behind-the-scenes to go out and import transactions from a merchant’s store on a nightly basis. Merchants can backfill transactions from previous dates.
![TaxJar Welcome Dialog](/images/guides/taxjar-welcome.png)
<small>**Note:** Only in-house integrations are shown in the TaxJar welcome dialog. Custom integrations can be found on our [sales tax integrations](https://www.taxjar.com/sales-tax-integrations/) page. We hope to provide more opportunities for exposure inside the TaxJar app soon. [Contact us](https://www.taxjar.com/contact/) for more information.</small>

* In real-time through SmartCalcs using the API transaction endpoints. When to import a merchant’s transactions and supporting backfills is provided at the discretion of the platform.

**If you’re building a custom integration with SmartCalcs, you’ll want to use our API to import transactions into TaxJar.** The biggest advantage of this method involves *real-time importing* — the moment a transaction is paid and shipped, you can import it into TaxJar. It’s also the fastest way to get transactions into our system.

---

## Order Transactions

**While you can import orders at any time, we recommend importing an order once it’s been shipped and paid/invoiced.** If an order is canceled, you can avoid having to delete the order from TaxJar if you wait until it’s been paid. There’s a couple ways you may want to do this:

* If your platform has a `completed_at` date, only import orders that have been completed.

* If your platform has the notion of an order status, ensure the order status is in a shipped, paid, or complete status before importing.

It’s best to implement your transaction import for TaxJar when the order state changes or when an order is updated.

When you import an order into TaxJar, it will show up as an “API Transaction” in the merchant’s account under [Transactions](https://app.taxjar.com/transactions):

![TaxJar API Transaction](/images/guides/api-transaction.png)

Import **all US-based transactions**, not just where the merchant has nexus. Your merchants may reach [economic nexus thresholds](https://blog.taxjar.com/economic-nexus-laws/) based on their total revenue or number of transactions in a given state without a physical presence. Our [sales and transactions checker](https://www.taxjar.com/sales-and-transactions-checker/) helps them determine if they hit these thresholds and need to register in additional states.

### Transaction ID & Date

When providing a `transaction_id` for an order transaction, use the unique increment identifier associated with the order. If it’s possible that this ID can overlap between multiple stores or different types of transactions for this merchant, you may want to prepend or append a unique string on the ID.

For example, we append “-refund” to refund transaction IDs in Magento since order and refund transaction IDs can overlap each other.

Next you’ll need to provide the `transaction_date` parameter. We recommend using an order `created_at` datetime for `transaction_date` since we want to record the exact date when the transaction took place and sales tax was collected.

```json
{
  "transaction_id": "0000000001",
  "transaction_date": "2017/09/01"
}
```

### From & To Address

* Use the store’s location or shipping origin for the `from_` parameters.

* Use the customer’s shipping address for the `to_` parameters, unless it’s a [digital / virtual product](https://blog.taxjar.com/sales-tax-digital-products/) or in-store pickup (similar to calculations).

```json
{
  "from_street": "123 Pacific Ave",
  "from_city": "Santa Monica",
  "from_state": "CA",
  "from_zip": "90002",
  "from_country": "US",
  "to_street": "123 Palm Grove Ln",
  "to_city": "Los Angeles",
  "to_state": "CA",
  "to_zip": "90002",
  "to_country": "US"
}
```

### Amount, Shipping, and Sales Tax

One particular gotcha with this `amount` param — this time *include* the shipping, but do not include sales tax. This is confusing, we know, and we hope to provide more consistency in a future iteration of our API.

Also, use dollars for the amounts in these endpoints! Right now we only support USD currency in the TaxJar app.

The `shipping` and `sales_tax` params are required. Provide the total order amounts for each.

```json
{
  "amount": 16.5,
  "shipping": 1.5,
  "sales_tax": 0.95
}
```

### Line Items

Since transactions are shown directly in the TaxJar app for merchants to review, we always recommend including line items. Here’s how we show the transaction data you provide in TaxJar:

![TaxJar API Transaction Breakdown](/images/guides/api-transaction-breakdown.jpg)

The first line item you send in an API request will always be used for the transaction’s title in TaxJar.  If multiple line items are included, the merchant will see a “[+ X more]” appended to the title.

Remember, discounts are provided at the line item level factoring in the quantity, **not per unit.**

<pre>
Discount: $1.00 each
</pre>

```json
{
  "line_items": [
    {
      "quantity": 3,
      "product_identifier": "12-34234-9",
      "description": "Fuzzy Widget",
      "unit_price": 5,
      "discount": 3,
      "sales_tax": 0.95
    }
  ]
}
```

Similar to [sales tax calculations](/integrations/sales-tax-calculations/), remember to distribute order-level discounts across line items proportionally or evenly.

<pre>
Discount: 50%
</pre>

```json
{
  "line_items": [
    {
      "id": "1",
      "quantity": 2,
      "unit_price": 5,
      "discount": 5
    },
    {
      "id": "2",
      "quantity": 1,
      "unit_price": 10,
      "discount": 5
    }
  ]
}
```

### Order-level Exemptions

Transactions may also be marked as tax-exempt at the order-level by passing the `exemption_type` param in [calculations](https://developers.taxjar.com/api/reference/#taxes) as well as when creating or updating [transactions](https://developers.taxjar.com/api/reference/#transactions). Allowable values are `government`, `wholesale`, `other`, and `non_exempt`.

One use case is to mark a single transaction as taxable for an otherwise exempt customer by passing `non_exempt`. With the exception of `non_exempt`, a customer exemption type takes precedence over an order-level exemption type. In other words, when usage of the `customer_id` param qualifies the transaction as exempt, the customer's exemption type will be applied, rather than the value of `exemption_type` sent in the request.

### Shipping Discounts

SmartCalcs doesn’t provide an order-level discount param for shipping. To handle a shipping discount, simply deduct the amount from the `shipping` param. Given a free shipping discount, set `shipping` to zero.

```json
{
  "shipping": 0
}
```

### Handling Fees

Since we currently do not support a `handling` param, you’ll need to add any handling fees as a separate line item. Feel free to use the `description` param inside `line_items[]` to label as a handling fee:


```json
{
  "line_items": [
    {
      "description": "Handling Fee",
      "unit_price": 3.5
    }
  ]
}
```

---

## Refund Transactions

TaxJar supports both full and partial refund transactions. Additionally, you can import multiple refund transactions for a single order via `transaction_reference_id`.

### Transaction ID, Reference ID, and Date

Similar to orders, always provide a unique `transaction_id`. If it’s possible that a refund ID can overlap with an order ID, append “-refund” to the end of the refund `transaction_id`.

Submit the refund’s order ID for `transaction_reference_id` .

The refund `transaction_date` should be the date the refund is created.

```json
{
  "transaction_id": "0000000001-refund",
  "transaction_date": "2017/09/01"
}
```

### Other Parameters

Remaining parameters for refund transactions should behave similarly to order transactions.

For partial refunds, include the reduced amount and line item amounts when making the API request.

---

## Backfilling Transactions

If you’re integrating TaxJar into an established platform, your merchants may want to “backfill” their previous transactions into TaxJar for reporting purposes. This isn’t absolutely required, but it will save your merchants time not having to do it themselves.

Alternatively, you can allow them export their old transactions to a CSV file and they can upload it manually through the TaxJar app.

To backfill transactions through SmartCalcs, you should filter a collection of order transactions by an `updated_at` or `created_at` date range and based on the API guidelines mentioned below. Using `updated_at` ensures you’ll catch older orders that may have taken longer to process, whereas `created_at` allows you to import orders created on a specific date or date range. Typically we use `updated_at` to find transactions.

Our in-house Magento 2 integration is a good example to follow for backfilling transactions. For each transaction, we set a sync date for each order and credit memo (refund) in the merchant’s database:

* No sync date? Create the transaction in TaxJar (`POST` request).
* Transaction hasn’t been updated since sync date? Skip the transaction.
* Transaction updated? Update the transaction in TaxJar (`PUT` request).

![Magento 2 Transaction Sync Date](/images/guides/transaction-sync-date.png)

![Magento 2 Transaction Sync](/images/guides/transaction-sync.png)

If we encounter a `422` error when attempting to create a new transaction that exists, we fallback to an update (PUT) request.

If we encounter a `404` error when attempting to update an existing transaction that does not exist, we fallback to a create (POST) request.

Along the way, we check each transaction to ensure it adheres to the API guidelines. Only `complete` and `closed` transactions are imported from Magento 2. Each API request and response is logged for the merchant to review later if needed.

---

## API Guidelines

* Import order transactions after they've been shipped and paid/invoiced.

* We recommend only importing US-based transactions for merchants. At this time, our reporting app only supports US sales tax reports.

* Additionally, only import USD currency transactions.

---

## Branding Guidelines

* Use "Transaction Sync" when referring to real-time importing of order and refund transactions into TaxJar.

* If you support importing older transactions within a date range, use the term "backfill" in headlines and action buttons such as "Backfill Transactions".

---

## Testing Guidelines

* Use a separate TaxJar account for testing transactions.

* Write integration tests between your platform and SmartCalcs integration to ensure your transaction import process properly handles order and refund transactions. [Review a checklist of scenarios to test.](/integrations/testing/)

* Consider using HTTP response fixtures instead of making an API request for each test. Mocking and stubbing libraries may assist with capturing SmartCalcs responses for ongoing use. If a transaction already exists in TaxJar, you'll receive an error if you attempt to re-create it using a `POST` request.

---

## UX Guidelines

* Use a separate checkbox or toggle switch to enable sales tax reporting. Transactions should only be imported into TaxJar if enabled:
![Magento 2 Transaction Sync Toggle](/images/guides/transaction-sync-toggle.png)

* Explain to your merchants how to backfill their previous orders into TaxJar, either through your own backfill functionality or via CSV upload.

* In your help documentation, consider explaining when transactions appear in TaxJar and how they appear as an “API Transaction”.

---

<a href="/integrations/testing/" class="btn">Next: Testing &amp; Scenarios</a>
