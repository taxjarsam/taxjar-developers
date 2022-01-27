---
title: "Integration Guide for Stripe Billing (Beta)"
description: "In-depth guide on how to use TaxJar's Stripe integration."
layout: guide
plus: true
priority: 0.7
guide_name: Stripe
reference: {
  "Last Updated": "2022-01-25",
  "Platform": "Stripe Billing",
  "&nbsp;": "&nbsp;",
  "&nbsp; ": "&nbsp;"
}
toc: {
  "Stripe services": "#section-stripe-services",
  "Connecting to Your Stripe Account": "#section-connecting-to-your-stripe-account",
  "Sales Tax Reporting": "#section-sales-tax-reporting",
  "Sales Tax Calculations": "#section-sales-tax-calculations",
  "Understanding Invoices": "#section-understanding-invoices-sales-tax",
  "Product Exemptions": "#section-product-exemptions",
  "Customer Exemptions": "#section-customer-exemptions",
  "Limitations": "#section-limitations",
  "Testing": "#section-testing"
}
---

TaxJar’s integration for Stripe (beta) allows Stripe Billing users to calculate,
collect, report and file sales tax.

If you’re a Stripe user who sells on multiple platforms like Amazon, Ebay, and
Shopify in addition to Stripe, we recommend creating a TaxJar account and
utilizing this integration.

If you’re a Stripe-only user, we recommend you explore Stripe Tax which
integrates directly with Stripe Checkout, Billing, Invoicing, and Connect.
[Learn more about Stripe Tax](https://stripe.com/tax).

<div class="alert alert-info" role="alert">
  <p><strong>Request access for TaxJar Integration for Stripe</strong></p>
  <p>TaxJar’s integration for Stripe is available by invitation-only. If you’re interested in using TaxJar’s calculations, reporting, or filing, you must request access.</p>
  <a class="u-display--inline-block u--learn-more" href="https://go.taxjar.com/2021-WR-Stripe-Integration_LP-01-Request.html" title="TaxJar Sales Tax API">Request access</a>
</div>

Sales tax is complex, with regulations changing constantly. For a primer on the
basics of sales tax, including [nexus](https://www.taxjar.com/resources/sales-tax/nexus),
[registration](https://www.taxjar.com/resources/sales-tax/registration), filing,
reporting, calculations and more, please visit [Sales Tax Fundamentals](https://www.taxjar.com/resources/sales-tax). Also, be sure to take
a look at our [Resource Center](https://www.taxjar.com/resources/), with
articles, webinars and videos for beginners and experts alike.

## Support

<table class="support-table">
<thead>
<tr>
<th>Service</th>
<th class="center">Imports</th>
<th class="center">TaxJar Calculations</th>
<th class="center">Stripe Tax</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://stripe.com/docs/billing">Stripe Billing (Subscriptions)</a></td>
<td class="center">x</td>
<td class="center">x<sup>1</sup></td>
<td class="center">x</td>
</tr>
<tr>
<td><a href="https://stripe.com/docs/invoicing">Stripe Invoicing</a></td>
<td class="center">x</td>
<td class="center">x</td>
<td class="center">x</td>
</tr>
<tr>
<td><a href="https://stripe.com/docs/payments/accept-a-payment?integration=checkout">Checkout in Payment Mode</a></td>
<td class="center">x<sup>4</sup></td>
<td class="center"> </td>
<td class="center">x</td>
</tr>
<tr>
<td><a href="https://stripe.com/docs/billing/subscriptions/checkout">Checkout in Subscription Mode</a></td>
<td class="center">x</td>
<td class="center">x<sup>1</sup></td>
<td class="center">x</td>
</tr>
<tr>
<td><a href="https://stripe.com/docs/payments/save-and-reuse?platform=checkout">Checkout in Setup Mode</a><sup>2</sup></td>
<td class="center"> </td>
<td class="center"> </td>
<td class="center"> </td>
</tr>
<tr>
<td><a href="https://stripe.com/docs/payments/payment-intents">Payment Intents</a><sup>3</sup></td>
<td class="center"> </td>
<td class="center"> </td>
<td class="center"> </td>
</tr>
<tr>
<td><a href="https://stripe.com/docs/payments/charges-api">Charges</a><sup>3</sup></td>
<td class="center"> </td>
<td class="center"> </td>
<td class="center"> </td>
</tr>
</tbody>
</table>

Notes:

1. Subscriptions and TaxJar Calculations do not work on the first invoice of a
   subscription. Use [Stripe Tax](https://stripe.com/tax) instead, which also
   has the benefit of displaying the taxes to end-users.
2. Checkout Sessions in setup mode end up creating PaymentIntents which are not
   supported.
3. Charges and Payment Intents are supported only if they're created by Stripe
   products, such as Stripe Billing or Checkout. Direct charges and payment
   intents are not supported.
4. Checkout Session support began on 2021-09-16. Previous to this date, charges
   would be imported that resulted from these Checkout Sessions.

## Connecting to Your Stripe Account

Once you have a Stripe account and TaxJar account, log into your TaxJar account.
Navigate to **[Account → Linked
Accounts](https://app.taxjar.com/account#linked-accounts)**. You will see a
button to initiate an integration between your TaxJar account and your Stripe
account. Click the Stripe button.

<figure class="u-text--center">
  <img src="/images/guides/stripe/taxjar-link-stripe.png" alt="Link your Stripe Account"/>
  <figcaption class="u-text--shrink-1">Link your Stripe account to TaxJar</figcaption>
</figure>

After linking your Stripe account and receiving confirmation from our Support
team that your account's been enabled for calculations, TaxJar will prompt you
if you want to activate sales tax calculations on your invoices.

<div class="alert alert-info" role="alert">
<p><strong>Why does TaxJar need write-access to my Stripe account?</strong></p>

<p>TaxJar can calculate taxes for your invoices on your behalf. For us to do
that, we must be able to create new <a
href="https://stripe.com/docs/billing/taxes/tax-rates" rel="nofollow"
target="_blank">Tax Rates</a> in your Stripe account, and update your invoices
and invoice line items with those tax rates.</p>

<p>We do not alter your invoices in any other way, and you can always deactivate
TaxJar's tax calculation integration. Read on for more details on how TaxJar
manages taxes for you in Stripe's system.</p>
</div>

## Sales Tax Reporting

After you link your Stripe account to TaxJar, we will be able to import all paid
invoices, credit notes, and charges for you automatically. Immediately after
linking, we will trigger an import to fetch recent transactions from Stripe, and
we schedule regular imports to capture new and updated invoices, charges, and
credit notes in your Stripe account.

### Invoices

Invoices have the most detail and include line items, tax rates, the customer,
associated charges and credit notes.

### Charges

A charge represents the movement of money, either collected from the buyer or
refunded from the seller to the buyer. These charges can be associated with
invoices to represent payments or refunds on that invoice. Charges may also
stand alone, without being attached to an invoice.

<div class="alert alert-info" role="alert">
<p><strong>Stripe Tax users with sales tax reporting should use Credit Notes
instead</strong></p>

<p>Money movement in Stripe is designed to be easy and straight-forward, but a
trade-off is that charges and payment refunds can work without features such as
tax calculations. Tax calculation is critical for sales tax reporting, so it's
important to use Stripe features that support tax, such as invoices.</p>

<p>Payments made via Charges or bare Payment Intents (those not attached to
invoices) do not calculate taxes, and therefore refunds to those payments also
do not calculate taxes. <strong>Payment refunds do not decrease liability and
therefore will not appear in TaxJar for reporting. To refund a payment, please
instead issue Credit Notes which will decrease liability and will appear in
TaxJar for reporting.</strong></p>

<p>Please review <a href="https://stripe.com/docs/tax/faq" title="Stripe Tax FAQs"
rel="nofollow" target="_blank">Stripe Tax FAQs</a></p>
</div>

### Credit Notes issued before payment

Credit Notes that are created _before_ the customer has paid the invoice are
imported into TaxJar as discounts on orders. Since payment has not yet occurred,
we interpret credit notes as discounts on the order.

### Credit Notes issued after payment

Credit Notes that are created _after_ the customer has paid the invoice are
imported into TaxJar as refunds and associated with the order. Since payment has
already occurred, we don't update the original order and instead import the
transaction as a refund since this refund may occur in different tax periods.


## Sales Tax Calculations

<div class="alert alert-info" role="alert">
  <p><strong>Request access for TaxJar Integration for Stripe</strong></p>
  <p>TaxJar’s integration for Stripe is available by invitation-only. If you’re interested in using TaxJar’s calculations, reporting, or filing, you must request access.</p>
  <a class="u-display--inline-block u--learn-more" href="https://go.taxjar.com/2021-WR-Stripe-Integration_LP-01-Request.html" title="TaxJar Sales Tax API">Request access</a>
</div>

After you link your Stripe account to TaxJar, you will be asked if you want
TaxJar to automatically calculate taxes for invoices.

<figure class="u-text--center">
  <img src="/images/guides/stripe/taxjar-link-stripe-taxes.png" alt="Would you like
  TaxJar to calculate taxes for invoices?"/>
  <figcaption class="u-text--shrink-1">Calculate taxes for invoices</figcaption>
</figure>

Once you check this box and click "Save & Continue", TaxJar will start listening
to Stripe webhooks for certain events. Stripe will send data to TaxJar after
invoices are are created and updated. TaxJar will react to these events and
update the invoice with taxes immediately.

If you want to deactivate TaxJar's integration for sales tax calculation, then
you may edit the connection and uncheck this box. Imports will continue to
happen normally. If you wish to completely disconnect the TaxJar integration,
then "unlink" the account; unlinking will stop tax calculations and imports for
Stripe.

<figure class="u-text--center">
  <img src="/images/guides/stripe/taxjar-link-stripe-edit.png" alt="Edit or unlink your Stripe account"/>
  <figcaption class="u-text--shrink-1">Edit or unlink your Stripe account from TaxJar</figcaption>
</figure>

<strong>Important: Please be sure to enable API calculations for your nexus
states in your TaxJar account's <a
href="https://app.taxjar.com/account#states">State Nexus Settings</a> by
checking the box under "Calculate Sales Tax in This State"</strong>. If you no
longer have nexus in a state, you can disable your calculations for a specific
state by clicking "Remove Nexus" in your State Nexus Settings.

<figure class="u-text--center">
  <img src="/images/guides/stripe/taxjar-check-nextus-state.png" alt="Check for each state with Nexus"/>
  <figcaption class="u-text--shrink-1">Enable nexus for each state where you have nexus</figcaption>
</figure>

## Understanding Invoice's Sales Tax

Now that your Stripe account is linked and activated for sales tax calculations,
Stripe and TaxJar will work together when you are creating and updating
invoices. Let's walk through an invoice together.

First we will create an invoice. We will use Stripe's user interface (UI) to
create the new invoice. You may also create invoices programmatically through
their API. For this guide, we will focus on Stripe's UI.

<figure class="u-text--center">
  <img src="/images/guides/stripe/stripe-new-invoice.png" alt="New Invoice"/>
  <figcaption class="u-text--shrink-1">New Invoice in Stripe's system</figcaption>
</figure>

Next we will attach a customer that is responsible for the new invoice. If you
don't already have the customer in your system, you may create one at the same
screen. In this case, we already have a taxable customer.

<figure class="u-text--center">
  <img src="/images/guides/stripe/stripe-add-customer.png" alt="Attach Customer"/>
  <figcaption class="u-text--shrink-1">Attach a customer to the invoice</figcaption>
</figure>

Next we will add line items to the invoice.

<figure class="u-text--center">
  <img src="/images/guides/stripe/stripe-add-item.png" alt="Attach Items to Invoice"/>
  <figcaption class="u-text--shrink-1">Attach items to the invoice</figcaption>
</figure>

In this moment, you won't see the taxes update immediately, but rest assured
that the tax calculations are happening behind the scenes. Before you finalize
the invoice, refresh the page and you should see the taxes be filled in. Let's
refresh the page now to verify that all is working.

<figure class="u-text--center">
  <img src="/images/guides/stripe/stripe-refresh-with-taxes.png" alt="Refresh the page to verify"/>
  <figcaption class="u-text--shrink-1">See? The taxes are added</figcaption>
</figure>

TaxJar has calculated all the taxes for your invoice, created 3 new Tax Rates in
this scenario, and attached those new rates to the invoice item. At this point,
you can submit your invoice for payment.

<div class="alert alert-info" role="alert">
<p><strong>Do I need to refresh the page for every invoice?</strong></p>

<p>Absolutely not. This is just an illustration to show you that the integration
is doing its job. When invoices are updated with new invoice items, changed
quantities, and a number of other factors, Stripe will send these events to
TaxJar and will wait on TaxJar to acknowledge before you can send the invoice to
your customer for payment.</p>
</div>

## Product Exemptions

Your products and charges may need to have product tax codes attached to them; these codes
inform TaxJar how the item should be treated. For example, some products may be
tax exempt or have reduced rates.

### Charges

While TaxJar will not automatically calculate taxes on charges, we will
calculate how much tax should have been collected when we import the charge for
reporting and filing. To make sure this matches you'll want to add metadata to
your charge.

Add metadata to your charge with the key of **product_tax_code** and the value
equaling [a TaxJar product tax code.](https://developers.taxjar.com/api/reference/#get-list-tax-categories)

### Products

Let's navigate to our products, and click on a product that should be classified.

<figure class="u-text--center">
  <img src="/images/guides/stripe/stripe-products.png" alt="Adjust your products"/>
  <figcaption class="u-text--shrink-1">List of all products in Stripe</figcaption>
</figure>

<figure class="u-text--center">
  <img src="/images/guides/stripe/stripe-product-tax-code.png" alt="Add metadata to include the product tax code"/>
  <figcaption class="u-text--shrink-1">This product should have a product tax code</figcaption>
</figure>

To classify this product, we are going to add metadata to the product. TaxJar
will read this metadata and use it to inform how we calculate taxes on the
invoice line items that include this product.

The key should equal **product_tax_code**, and the value should equal the code
provided by TaxJar. In this case, it is **1411803A0001**. The good news is that
once the product tax codes are attached to the product, they will be applied to
all invoices going forward. Be sure to double-check you're adding the correct
product tax codes.

[See a list of our current product tax codes.](https://developers.taxjar.com/api/reference/#get-list-tax-categories)

Let's see how it works. Back on our invoice, let's add another line item. This
time, we'll add a gift card which should be tax exempt.

<figure class="u-text--center">
  <img src="/images/guides/stripe/stripe-add-exempt-item.png" alt="Add a tax-exempt product"/>
  <figcaption class="u-text--shrink-1">This new line item should be tax exempt</figcaption>
</figure>

Now that we have two items, Stripe displays more information about how the taxes
are affecting the invoice.

Since TaxJar knows about this product tax code, we know not to attach any tax
rates to that line item. Stripe confirms this with the tool-tips which specify
that the taxes are only applied to the taxable line items. You will also notice
that no tax rate sits on tax-exempt line items.


## Customer Exemptions

Products are not the only entities that can be tax exempt; customers may also be
tax exempt. TaxJar can handle this too! The easiest way to express this is from
Stripe's system when editing the customer's record. Let's navigate to a customer
and mark them as tax exempt.

<figure class="u-text--center">
  <img src="/images/guides/stripe/stripe-customer-list.png" alt="List of customers"/>
  <figcaption class="u-text--shrink-1">Navigate to your tax-exempt customer</figcaption>
</figure>

Once at the customer details, you can edit the customer information to classify
them as tax exempt.

<figure class="u-text--center">
  <img src="/images/guides/stripe/stripe-customer-edit.png" alt="Edit customers"/>
  <figcaption class="u-text--shrink-1">Actions → Edit Information</figcaption>
</figure>

<figure class="u-text--center">
  <img src="/images/guides/stripe/stripe-customer-exempt.png" alt="Changing a customer's tax status to exempt"/>
  <figcaption class="u-text--shrink-1">Change the customer's Tax status to "Exempt"</figcaption>
</figure>

Find their "Tax status", switch it to "Exempt", and save the customer. You can
now create a new invoice, attach it to the exempt customer, and verify that no
taxes are attached to any line items.

If you operate within a country that has VAT (such as the EU countries), then
you may want to consider Stripe's tax status of "Reverse charge". Depending on
your situation, you may want to shift VAT reporting to the EU customer. TaxJar
will treat these customers as "exempt" in your reports.

<figure class="u-text--center">
  <img src="/images/guides/stripe/stripe-customer-invoice-exempt.png" alt="Invoice for tax-exempt customer"/>
  <figcaption class="u-text--shrink-1">Invoice for a tax-exempt customer</figcaption>
</figure>

## Limitations

TaxJar provides the best experience possible for Stripe users, but there are
some areas that are limited due to the available Stripe APIs.

### Automatic tax calculations on first invoice of subscriptions

Stripe automatically moves a subscription's first invoice toward collection without waiting
for any automated updates.  Unfortunately this means we can not automatically add
tax rates to this invoice.

To collect sales tax on the first invoice of a subscription you'll need to use our
[taxes API endpoint](https://developers.taxjar.com/api/reference/#post-calculate-sales-tax-for-an-order)
and then programmatically add the tax rates to your invoice.  This has
the benefit of showing your customers the full cost of the subscription upfront including
all taxes owed.

All future tax rates for the subscription can now be automatically managed by TaxJar.

### Inclusive Tax Rates

TaxJar creates Tax Rates as tax exclusive, meaning that TaxJar will attach
tax-exclusive rates to your invoice line items, which will increase the amount
of money to be collected from the buyer to account for those taxes.

[Read more about exclusive Tax Rates at Stripe](https://stripe.com/docs/billing/taxes/tax-rates#inclusive-vs-exclusive-tax)

### Standalone payments

Imports support standalone payments; the limitation is only with sales tax
calculations.

For sales tax calculations, standalone payments are not attached to invoices,
and therefore lack context required to accurately calculate taxes for that
payment. Also, Stripe does not allow attaching tax rates to standalone payments.

### Custom Line Items on Credit Notes.

Custom line items on credits notes have some limitations. Imports of credit
notes and their line items are not affected; this limitation is only about sales
tax calculations.

When an invoice is paid, you may issue credits back to the customer for a
variety of reasons. Usually, credits are interpreted as partial or full refunds
on the original invoice.

For example, if you sell 2 Breakable Pots and the customer receives 1 as broken
during shipment, you may choose to refund the one Breakable Pot. This may be
issued as a credit note in Stripe's system where you specify that a quantity of
1 Breakable Pot as credited. Stripe will do the right thing automatically and
also refund the tax collected for that 1 Breakable Pot. This is a supported
scenario; you do not need to do anything to account for refunded taxes in this
scenario.

Another example, if you sell 2 Breakable Pots but the customer is not satisfied
with the product, you might decide to refund $5 of the total sale (which does
not correlate to any item prices). You can create a custom line item in the
credit note, specify the amount as $5, and issue the credit. In this scenario,
you must manually attach the appropriate taxes to the new custom line item.
Remember, TaxJar attaches taxes to each line item and since you're creating a
new line item, now you must associate the appropriate taxes to that new line
item.

Let's walk through this together.

First we will create a new credit note. Notice that the taxes are applied to the
line items.

<figure class="u-text--center">
  <img src="/images/guides/stripe/stripe-customized-credit-note.png" alt="Taxes applied to line items"/>
  <figcaption class="u-text--shrink-1">Taxes are applied to the line items on
  the invoice</figcaption>
</figure>

In this scenario, we have 3 taxes applied: A state tax, a county tax, and a
special district tax. Let's remember these.

Uncheck the existing line items since we're not crediting those in their
entirety. Now we will create a custom line item.

<figure class="u-text--center">
  <img src="/images/guides/stripe/stripe-customized-credit-note-line-item.png" alt="New Custom Line Item"/>
  <figcaption class="u-text--shrink-1">New custom line item</figcaption>
</figure>

With the new custom line item, click "Set item tax" next to it, and attach the
same tax rates attached to the other line items.

<figure class="u-text--center">
  <img src="/images/guides/stripe/stripe-customized-credit-note-line-item-taxes.png" alt="Select the appropriate taxes"/>
  <figcaption class="u-text--shrink-1">Applying the same tax rates</figcaption>
</figure>

Verify that the tax rates are applied. You can see the total tax rate.

<figure class="u-text--center">
  <img src="/images/guides/stripe/stripe-customized-credit-note-line-item-good.png" alt="Verify taxes are applied"/>
  <figcaption class="u-text--shrink-1">The total tax rate on the line item is
  consistent with the other taxable items</figcaption>
</figure>

Now you're ready to issue a credit for the custom line item, which represents a
partial refund. This will credit the appropriate amount of tax that was
originally collected.

## Testing

Stripe has great documentation on [Testing Stripe Billing](https://stripe.com/docs/billing/testing).
We highly recommend you review their documentation first. When you're ready to
connect to TaxJar, please note that TaxJar will only import transactions that
are in live mode. Test mode is not supported for imports.

If you would like to test [tax calculations](#sales-tax-calculations), you may
test it by creating draft invoices in live mode, and then discarding those draft
invoices.

If you have additional questions or need help integrating your Stripe and TaxJar accounts, please [contact](https://www.taxjar.com/contact/) our support team.
