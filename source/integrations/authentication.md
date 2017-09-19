---
title: Authentication
description: "Learn how to authenticate TaxJar accounts in your eCommerce platform."
---

In order to make API requests to SmartCalcs, you’ll need to authenticate a TaxJar account using the `Authorization` header. We currently provide two choices for integrations based on whether you’d like to provide sales tax calculations, reporting, or both:

---

## Single API Token for Calculations Only

If you’re only providing sales tax calculations, you have the option of using your own TaxJar API token instead of asking your merchants for one:

* No account setup involved for the merchant
* Provide free calculations for merchants, fully subsidizing the cost
* Easily track API request usage from your TaxJar account

With this approach, you’ll want to ensure merchants can provide one or more [nexus addresses](https://developers.taxjar.com/api/guides/#nexus-address-example) based on your requirements.

---

## Token-Based Authentication

In order to make API requests on behalf of a TaxJar user, you’ll need to ask for their API token. At the moment we only provide token-based authentication:

* Merchants are required to have an active TaxJar account with a paid subscription
* Merchants generate their own API token from the TaxJar app and paste it directly into your app

TaxJar does not yet provide [oAuth-based authentication](https://en.wikipedia.org/wiki/OAuth), so you will be responsible for storing the merchant’s API token in your system.

---

## Security Requirements

If you allow merchants to use their own TaxJar accounts, it's your responsibility to store their TaxJar API tokens in your system securely. **Always encrypt sensitive merchant data both in transit and storage over SSL.** Additionally, we recommend the following:

* Use access control on data storage where merchant / customer data is kept
* Maintain a regular cadence of security testing in production environments
* Perform adequate logging of events and API calls

---

## API Guidelines

* Use the `Authorization` header to securely pass a TaxJar API token for each SmartCalcs request.

* Never expose a TaxJar API token in a frontend AJAX request using JavaScript. If you're using AJAX, perform the SmartCalcs request in your backend or through a proxy script.

* Consider verifying the merchant's TaxJar API token after saving by hitting the `/v2/categories` endpoint. If SmartCalcs returns a `401 Unauthorized` response, return back an error message.

---

## Branding Guidelines

* Always use the phrase “API token” when mentioning TaxJar API credentials, do not use “API key”.

---

## Testing Guidelines

* When using token-based authentication, ensure no requests are made if an API token is not provided by the merchant. If an API token is provided, ensure it's passed correctly in each request.

* Click test your integration after each update by reviewing the before and after state of providing a TaxJar API token.

---

## UX Guidelines

* The very first thing you should ask for is the merchant’s TaxJar API token.

* If possible, TaxJar-related settings should be hidden or out of focus until a TaxJar API token is provided by the merchant.

* Provide a link for merchants to sign up for TaxJar and generate a new token through our API flow in a new window or tab using `_blank`: [https://app.taxjar.com/api\_sign\_up](https://app.taxjar.com/api_sign_up)

* Point merchants to this article for additional help generating an API token: [How do I get a SmartCalcs sales tax API token? | TaxJar Support](https://support.taxjar.com/knowledge_base/topics/how-do-i-get-a-smartcalcs-sales-tax-api-token)

---

<a href="/integrations/sales-tax-calculations/" class="btn">Next: Sales Tax Calculations</a>
