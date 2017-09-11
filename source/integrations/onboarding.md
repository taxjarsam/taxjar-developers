---
title: Merchant Onboarding
---

There’s no “one size fits all” approach for onboarding new users to sales tax in your platform, but we’ll provide you with some guidelines.

---

## Choose the Right Context

Implement your integration and provide TaxJar-related functionality where it makes most sense in your platform.

Many of our in-house integrations can be found in a “tax settings” page. If your platform already provides a way to manage tax, this is the perfect place to mention TaxJar and provide TaxJar-related functionality:

![TaxJar Context](/images/guides/taxjar-context.png)

---

## Be Upfront

Clearly state which TaxJar features you provide for merchants. First, let’s dive into each high-level service TaxJar currently offers:

### Sales Tax Calculations

Most integrations provide sales tax calculations at checkout. This functionality is provided completely through [SmartCalcs](https://www.taxjar.com/smartcalcs/), our sales tax API. When a customer visits a cart or checkout page, your platform will make a request to SmartCalcs with the merchant and customer’s details to calculate the right amount of sales tax. You’ll use that data to collect sales tax for the merchant during the checkout process.

This product is branded as **[TaxJar SmartCalcs](https://www.taxjar.com/smartcalcs/)**.

### Sales Tax Reporting

You can also import transactions (orders and refunds) into TaxJar directly from your platform through SmartCalcs. Merchants can see their transactions by logging into the TaxJar app at [https://app.taxjar.com](https://app.taxjar.com). At this time, TaxJar provides reporting for US merchants.

This product is branded as **[TaxJar Reports](https://www.taxjar.com/sales-tax-reporting/)**.

### Sales Tax Filing

Once a merchant imports their transactions into TaxJar, we can automatically file their sales tax returns. If you implement sales tax reporting in your integration, no additional work is needed to support sales tax filing. Merchants can enroll in AutoFile directly from the TaxJar app at [https://app.taxjar.com](https://app.taxjar.com).

This product is branded as **[TaxJar AutoFile](https://www.taxjar.com/autofile/)**.

---

## Be Concise

When introducing your merchants to TaxJar, shortly explain your offering based on your integration's supported TaxJar functionality. Feel free to use one of the copy samples listed below:

> *Let TaxJar automate your sales tax calculations, reporting, and filings in minutes.*

> *Let TaxJar help you collect sales tax at checkout in minutes.*

> *TaxJar will save you hours by simplifying your sales tax returns. Over 9,000 happy customers!*

From there, provide a call to action button or link to nudge the merchant in the right direction. Feel free to use our logo on a white background to accompany the text:

<img src="/images/logo.svg" width="25%" alt="TaxJar" style="margin: 0">

---

## Allow Merchants to Sign Up for TaxJar

In order to use TaxJar for both calculations and reporting, merchants will need to sign up for a TaxJar account. For your call to action, you should link to our API signup page at [https://app.taxjar.com/api\_sign\_up](https://app.taxjar.com/api_sign_up). Consider one of the following labels for a call to action button or link:

> *Sign up for TaxJar*

> *Get Started with TaxJar*

> *Create a New TaxJar Account*

This call to action button should stand out from other elements on the page to entice users to sign up. It shouldn't have to compete for attention with other call to actions.

---

## Branding Guidelines

* When mentioning TaxJar, always capitalize the “T” and “J”. Combine the “Tax” and “Jar” into one word. Do not use “Taxjar”, “Tax jar”, or “Tax Jar”.

* Adhere to the following terms for TaxJar’s products:
	* TaxJar AutoFile (Filing)
	* TaxJar Reports (Reporting)
	* TaxJar SmartCalcs (Calculations)

* Use the logos provided in our `taxjar/brand` [repository on GitHub](https://github.com/taxjar/brand).

* Do not change the aspect ratio of our logos or screenshots.

---

<a href="/integrations/authentication/" class="btn">Next: Authentication</a>
