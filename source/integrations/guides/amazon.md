---
title: "Sales Tax Guide for Amazon FBA Sellers"
description: "This guide will walk you through how to set up, charge and pay sales tax for Amazon FBA"
layout: guide
priority: 0.7
guide_name: Amazon
reference: {
  "Platform": "Amazon",
  "Versions": "FBA & Non-FBA",
  "TaxJar Product Page": "<a href=/amazon-fba-sales-tax/>Visit</a>",
  "Last Updated": "June 14, 2016"
}
toc: {
  "A Sales Tax Calculation Solution for Amazon Sellers": "#section-a-sales-tax-calculation-solution-for-amazon-sellers",
  "Upgrade to Professional Seller": "#section-upgrade-to-professional-seller",
  "Here are the steps to begin collecting sales tax through Amazon": "#section-here-are-the-steps-to-begin-collecting-sales-tax-through-amazon",
  "Tax Settings Overview": "#section-tax-settings-overview",
  "Tax Settings for FBA States": "#section-tax-settings-for-fba-states"

}
resources: {
  "Amazon Sales Tax Page": "https://www.amazon.com/gp/help/customer/display.html?nodeId=468512"
}
---

This guide will take you step by step through how to integrate TaxJar with your Amazon account. With your TaxJar integration, you’ll enable real-time sales tax calculations and reporting from all of your channels -- along with the ability to automate your filing.

Sales tax is complex, with regulations changing constantly. For a primer on the basics of sales tax, including [nexus](https://www.taxjar.com/resources/sales-tax/nexus), [registration](https://www.taxjar.com/resources/sales-tax/registration), filing, reporting, calculations and more, please visit [Sales Tax Fundamentals](https://www.taxjar.com/resources/sales-tax). Also, be sure to take a look at our [Resource Center](https://www.taxjar.com/resources/), with articles, webinars and videos for beginners and experts alike.

Please note that TaxJar for Amazon requires a [TaxJar Professional or Premium](https://www.taxjar.com/how-it-works/) subscription. To sign up, or to upgrade your existing account, please [contact](https://www.taxjar.com/contact/) our sales team.

## A Sales Tax Calculation Solution for Amazon Sellers

Every state that Amazon has a warehouse in <a class='links' href='https://blog.taxjar.com/sales-tax-and-shipping/'>considers your inventory nexus</a> (a presence sufficient enough that you are required to register your business with the state, collect sales tax, and remit that sales tax collected to the state when they tell you to).

Now that you’ve recognized the need to comply in multiple states, the next step is to correctly setup sales tax collection in Seller Central. And that’s what this guide is all about. The following pages will give you an overview of how to use Tax Settings and, most importantly, apply the correct settings for each of the FBA states.

**Before you get started, make sure you have all of the following.**

**A Professional Seller Account** – *Note: Individual Accounts cannot use the Amazon tax service. At the bottom of this page is information Amazon provides on how to upgrade from an Individual Account to a Pro Account.

**Know the states in which you have nexus.** – [Here’s a link to a page explaining which states Amazon FBA sellers have nexus in.](https://blog.taxjar.com/fba-sales-tax-nexus/)

**State registration numbers in each state you want to collect sales tax.** – This assumes you have registered your business in each state. Remember that most states consider it to be unlawful to collect sales tax without a license.

## Upgrade to Professional Seller

<div class="panel panel-warning">
  <div class="panel-heading">
    <div class="panel-title"><b>*Upgrading to a Amazon Pro Account</b></div>
  </div>
  <div class="panel-body">
    <ol>
      <li>Go to your <a class="links" href="http://www.amazon.com/seller-account">Seller Account.&nbsp;</a></li>
      <li>Under the Settings heading, click the “Account Info” link.</li>
      <li>On the Seller Account Information page, go to the Selling Plan section and click the “Modify Plan” button.</li>
      <li>On the next page, click the “Upgrade” button. </li>
      <li>Review the information on the next page and click the “Proceed to Upgrade” button to accept the terms and switch your plan. </li>
    </ol>
<p>After clicking the “Proceed to Upgrade” button, you will be returned to your Seller Account Information page and see a message indicating that the upgrade process has begun. Your subscription to the new selling plan will begin immediately, and additional links to Professional seller tools will appear on your Seller Account page. Some billing features may take up to 30 minutes to become effective. Once the upgrade process is completed you will no longer be charged the $0.99 closing fee on your orders.
<strong> You will instead be charged a monthly subscription fee of $39.99 for your Professional selling plan.</strong></p>
  </div>
</div>

## Here are the steps to begin collecting sales tax through Amazon

1. <strong> First, login to TaxJar. </strong>

    If you don’t have a TaxJar account yet,  <a href="https://app.taxjar.com/sign_in/"> start here for a 30-day free trial.</a> (No credit card required.)


2. <strong> When you login you’ll be asked to link a cart. Click “Connect to Amazon.”</strong>


    ![](/images/guides/amazon/connect_to_amazon.jpg)

    You’ll arrive at a page titled “Connect with Amazon" that looks like this:

    ![](/images/guides/amazon/taxjar_amazon_instructions_step_2.png)


3. <strong> Your next step is to click the link to open the <a href="https://sellercentral.amazon.com/" target="_blank">Amazon Marketplace Web Services Page</a> (Link should open in a new window.)</strong>

    You should end up on a page that looks like this:

    ![](/images/guides/amazon/amazon_marketplace_web_service_step_3.png)

    <div class="alert alert-danger">
    Important: You can only use TaxJar if you are an Amazon Professional Seller. If you are not a Professional Seller, here’s how to <a href='#upgrade-to-professional-seller'>become one.</a>
    </div>


4. <strong>Click the "Authorize New Developer" button. (If you haven’t already, you’ll be asked to sign into your Amazon Professional Seller account here.)</strong>

    ![](/images/guides/amazon/amazon_authorize_new_dev.png)

    Choose <strong>“I want to give a developer access to my Amazon Seller account with MWS.” </strong>

    ![](/images/guides/amazon/amazon-step-4a.png)
    ![](/images/guides/amazon/amazon-step-4b.png)

5. <strong>Amazon will now ask you for the developer’s name and account number. Enter the following:</strong>


    <div class="panel panel-success">
      <div class="panel-body">
    <strong>Developer Name:</strong> TaxJar
    </div>
    </div>

    <div class="panel panel-success">
      <div class="panel-body">
    <strong>Developer Account No:</strong> 0019-7913-7366
      </div>
    </div>

    <div class="alert alert-danger">
      (Important Note: Be sure to copy and paste the Developer Account Number without any spaces!)
    </div>

6. <strong>Once you’ve copied and pasted your information, click the “Next” button. </strong>

7. <strong>On this page, read over and then accept the License Agreement. Click the “Next” button.</strong>


8. <strong>You’ll see a “Congratulations” message from Amazon, confirming that you’ve correctly entered the information given to you by TaxJar to access your account.</strong>

    ![](/images/guides/amazon/congratulations_amazon.png)


9. <strong>You’re almost done, but there are a couple more very important steps to complete before your TaxJar and Amazon accounts are connected. TaxJar needs you to give us the information from your Amazon web services account by pasting two sets of data into your TaxJar account. </strong>

    For these last two steps, you’ll need to find your Seller ID and MWS Auth Token on the Amazon web services page.

    <strong>They should be in boxes like this: </strong>

    ![](/images/guides/amazon/test_store_amazon_tokens.png)

10.  <strong>Copy and paste your Seller ID back into TaxJar. Be sure to copy just the letters and numbers without any extra spaces.</strong>

11. <strong>And finally, copy and paste your MWS Auth Token into TaxJar. This is a string of letters and numbers that begins with “amazon.MWS” (without the quotation marks.) </strong>


    <div class="panel panel-success">
    <div class="panel-body">
    <p>When you have correctly entered both your Seller ID and MWS Auth Token, the boxes in your TaxJar account will turn green to show you are all set!</p>
    </div>
    </div>

12. <strong>Just hit “Save & Continue” in TaxJar. The next screen will confirm that your Amazon and TaxJar accounts are now connected.</strong>


    ![](/images/guides/amazon/amazon_account_connected.png)

13. <strong> Congratulations! You're all set now. Make sure you review the next step and modify your sales tax settings to ensure that Amazon is collecting the right amount of sales tax on your behalf. </strong>



##Tax Settings Overview

First, go to <a href="https://sellercentral.amazon.com" class="links">Seller Central</a> and login to your account.

 ![](/images/Screenshot_2015-05-29_10.13.34.png)

Next, **click on “Settings”** and then **click “Tax Settings”** form the dropdown menu.

![](/images/Screenshot_2015-05-29_10.16.40.png)

<div class="alert alert-danger"> Note: If you can’t see “Tax Settings” as an option to click then your Amazon Seller account is an individual account, not a Professional Account.</div>


The first screen you’ll see in ‘Tax Settings’ should look like the screenshot below.

![](/images/Screenshot_2015-05-29_10.20.14.png)

You will notice three clickable options. Below is a simple review of each option.

**View Tax Calculation Methodology**

This is recommended reading. It explains how Amazon’s tax service actually works. You can’t find this info anywhere else.

**View Master Product Tax Codes and Rules**

This is really helpful if you have questions about the taxability of the items in your inventory. Amazon provides product tax codes (PTCs) that you can assign to your inventory that helps classify how sales tax should be collected (or not collected if the item is not taxable). Here’s a screenshot of just the top of the list of PTCs.

![](/images/Screenshot_2015-05-29_10.22.07.png)

**Matching each item you sell to a specific PTC.**

As an example let’s take A_BOOKS_GEN:

**Here’s what Amazon says about A_BOOKS_GEN:**

1.  _**What is this code used for?** This code is intended to be used for books._
2.  _**What kinds of products are typically included?** Items typically included within this product tax code include books. A book is defined as a set of printed sheets bound together_
3.  _**What kinds of products are typically excluded?** Items typically excluded from this tax product code are as follows: Religious Books, Newspapers, Electronic Books_

Using the same example, if you sell newspapers on Amazon, the most important thing to get out of the above you shouldn’t be using the A_BOOKS_GEN PTC. You’ll notice there are a bunch of options to help you better classify newspapers.

The other really helpful thing to notice below the description of the tax code is the Product Taxability Rules. This tells you if that PTC is taxable. If it is, you’ll see a “T”. If it’s not taxable, or exempt from sales tax, you’ll see an “E”. Some tax codes may be exempt or taxable until a certain price. That’s also represented in the table.

You’ll notice the Product Taxability Rules give you taxability not only for the state but also for local jurisdictions (County, City, and District). Remember, in certain states the sales tax rate may be a sum of several different taxes. Even though you only see one sales tax rate being charged, that rate could be the state, the county, the city, and even a special district tax all added up into one.

For the most part, if the state considers something to be taxable then the local jurisdictions follow suit. Rarely are there discrepancies between the state and a local tax jurisdiction on the taxability of an item.

**View/Edit your Tax Collection and Shipping & Handling and Gift Wrap Tax Obligations Settings**

This is where all of the magic happens. For you as an FBA seller, this is the most important section of Tax Settings because this is where you’re telling Amazon when to collect sales tax.

Before getting to the actual decision-making part of the process, let’s go through numbers 1 through 4 at the top of the page in plain English.

**1\. Choose your Product Tax Codes**

Here you can either choose a default PTC (Amazon calls this “seller defined”) for all of your items by checking the box that says Use default Product Tax Code or assign a PTC at what Amazon calls the “offer level” (which means assigning PTCs for individual items). Amazon says, “you can make an offer level PTC assignment through your listings feed or the Add a Product feature in Seller Central.”

Note: Amazon says items that don’t have a either a default PTC or an offer level PTC will result in no sales tax collected.

**2\. Specify your Tax Collection Obligations (States, Counties, Cities, Districts)**

Amazon gives you the option to collect sales tax at the state level all the way down to the local level. You can collect no sales tax, collect for both the state and all of the local jurisdictions, or collect only part of the sales tax required. That’s all up to you the seller to decide.

One important thing that Amazon points out is that in order to use this option you’ll need a valid state registration number. Without that number, this option won’t work.

The biggest question FBA sellers ask is, “What should I collect?”. We’ll cover that shortly.

**3\. Specify a Custom Rate per State (Optional)**

As you can probably tell from the title this means that you can choose to collect sales tax at a flat tax rate for a state instead of using using’s Amazon’s tax settings for a state. If you use a custom rate you are choosing not to use Amazon’s predetermined rates for state and local jurisdictions. Your rate overrides everything.

You should know that using the custom rate means that rate will apply to any item you sell that’s taxable. PTC’s that are by default exempt will still remain exempt.

**4\. Choose Shipping & Handling and Gift Wrap Tax Settings**

Unfortunately for FBA sellers, the states don’t agree if shipping, handling, or gift wrap charges that are separately stated on an invoice are taxable or not. Some states say they are taxable, some say they’re not.

Amazon allows you to decide if you want to tax shipping, handling, and gift wrap charges. The gift wrap portion of this is related to the actual service of gift-wrapping, not the paper that you wrap in item in.

Here’s the way it works: if you choose to tax shipping, handling, or gift wrap then Amazon will charge sales tax at the same rate the item that’s being shipped or handles is being taxed. For example, if the sales tax rate for the item you’re selling is 8.25%, then the sales tax rate for shipping on that item will also be 8.25%. If the item is not taxable, then the shipping, handling, or gift wrap will not be taxed.

## Tax Settings for FBA States

<a class="w-inline-block expand-image" href="/images/guides/amazon/fba-sales-tax-chart.png" target="_blank"><img src="/images/guides/amazon/fba-sales-tax-chart.png"/></a>

If you have additional questions or need help integrating your Acumatica and TaxJar accounts, please [contact](https://www.taxjar.com/contact/) our support team.
