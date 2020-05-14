---
title: Handling Sales Tax with Laravel Cashier
description: Learn how to add sales tax to subscriptions and single charges using Laravel Cashier + TaxJar.
author: jake_johnson
date: 2017-05-18 12:00 UTC
category: Laravel
tags: laravel, api
published: true
---

Building a SaaS application with Laravel and wondering how to collect sales tax? You’ve come to the right place! In this guide we’ll cover how to use TaxJar’s sales tax API with [Laravel Cashier](https://github.com/laravel/cashier), an interface to Stripe's subscription billing services. After including TaxJar’s API client in your Laravel project, you’ll be able to calculate sales tax on the fly when creating a new subscription or single charge.

If you’re not familiar with SaaS taxability in the United States, [review this blog post](https://blog.taxjar.com/saas-sales-tax/) first to determine if you actually need to collect sales tax in the states where you have nexus. At this time, only a handful of states consider SaaS products taxable. We update our posts frequently to reflect new changes, so make sure to keep an eye on it. Remember, always [ask your accountant](https://www.taxjar.com/sales-tax-accountant-directory/) for advice if you have unique sales tax requirements you’re unsure about.

END_SUMMARY

## Getting Started

First you’ll want to install the `taxjar/taxjar-php` package via Composer using the following command:

```
composer require taxjar/taxjar-php
```

### TaxJar API Token

You’ll also need a way to authenticate with our sales tax API to request rates. [Sign up for a TaxJar account](https://app.taxjar.com/api_sign_up/basic/) to generate a new API token. From there, copy and paste the API token into your project’s `.env` file:

```
TAXJAR_API_TOKEN=[Your API Token]
```

Now you can securely reference that token anywhere in your app using `env('TAXJAR_API_TOKEN')`. Nice!

### Setting Up Laravel Cashier

If you haven’t already set up the Cashier package in your Laravel project, you’ll want to do that now. [Follow this guide](https://laravel.com/docs/5.4/billing#configuration) to get started and run the necessary database migrations.

Once you’ve perused Laravel’s documentation for [managing subscriptions](https://laravel.com/docs/5.4/billing#subscriptions) and written some code for your controllers, we’ll be able to extend your billable model (such as `User`) to provide a tax rate for subscriptions.

## Adding Sales Tax to Subscriptions

Jump into your billable model and add a new public class method called `taxPercentage`:

```php
<?php
use Laravel\Cashier\Billable;

class User extends Authenticatable
{
    use Billable;

    public function taxPercentage() {
        return 0;
    }
}
```

This method will be [invoked](https://github.com/laravel/cashier/blob/58efad0548d307426be6d4efbba0193f49285408/src/SubscriptionBuilder.php#L259) when creating a new subscription in Stripe. As of Dec. 2014, Stripe now includes the `tax_percent` attribute in their [subscription object](https://stripe.com/docs/api#subscription_object). Laravel Cashier [simply populates the `tax_percent` attribute](https://github.com/laravel/cashier/blob/58efad0548d307426be6d4efbba0193f49285408/src/SubscriptionBuilder.php#L231) based on the returned value from the `taxPercentage` method.

Let’s introduce some logic into this method to first determine if we need to collect sales tax for a given user. For these examples, let’s pretend you have nexus in two states: New York (NY) and Washington (WA). SaaS products are taxable in both of these states. You also have a `User` model with the `Billable` trait in your model definition. The `User` model has a set of `address_` attributes so we can reference the user’s address for calculating tax: `address_street`, `address_city`, `address_state`, `address_zip`, and `address_country`.

If the user resides in New York or Washington, we’ll make an API request for the tax rate. Otherwise we’ll return 0. This dramatically reduces the amount of API calls you’re making to TaxJar and can save you money.

```php
<?php
use Laravel\Cashier\Billable;

class User extends Authenticatable
{
    use Billable;

    public function taxPercentage() {
        if (in_array($this->address_state, ['NY', 'WA'])) {
            // Request rates if user resides in NY or WA
        }

        return 0;
    }
}
```

Next, let's import `\TaxJar\Client` into the `User` model namespace and instantiate the client with your API token:

```php
<?php
use Laravel\Cashier\Billable;

class User extends Authenticatable
{
    use Billable;

    public function taxPercentage() {
        $client = \TaxJar\Client::withApiKey(env('TAXJAR_API_TOKEN'));

        if (in_array($this->address_state, ['NY', 'WA'])) {
            // Request rates if user resides in NY or WA
        }

        return 0;
    }
}
```

Finally, we’ll make a request to the [`/rates/:zip`](https://developers.taxjar.com/api/reference/#rates) endpoint using `ratesForLocation` with the following parameters: `street`, `city`, and `country`. These parameters are optional, but important for accurate rates. For example, if a street address is provided, we'll return back *rooftop* accurate rates in states where we have the necessary boundary data, such as Washington.

The `zip` argument is always required. At a minimum, make sure you have the user's zip code on file. If you only provide a `zip`, [read this blog post](https://blog.taxjar.com/zip-codes-sales-tax/) regarding sales tax accuracy around zip-based rates.

```php
<?php
use Laravel\Cashier\Billable;

class User extends Authenticatable
{
    use Billable;

    public function taxPercentage() {
        $client = \TaxJar\Client::withApiKey(env('TAXJAR_API_TOKEN'));

        if (in_array($this->address_state, ['NY', 'WA'])) {
            try {
                $rates = $client->ratesForLocation($this->address_zip, [
                    'street' => $this->address_street,
                    'city' => $this->address_city,
                    'country' => $this->address_country
                ]);
                return round($rates->combined_rate * 100, 2);
            } catch (Exception $e) {
                // Log error
            }
        }

        return 0;
    }
}
```

Notice we're using the `combined_rate` attribute to return the tax percentage in Laravel Cashier, rounded to two decimal places as required. This works great for NY and WA because they’re both [destination-based states](https://blog.taxjar.com/charging-sales-tax-rates/) and we’re collecting sales tax based on the user’s address. If you have an [origin-based](https://blog.taxjar.com/charging-sales-tax-rates/) nexus state, you’ll want to collect sales tax based on your business address instead.

Another thing you’ll want to consider is how to handle API errors beyond logging. We provide a [summarized rates](https://developers.taxjar.com/api/reference/?php#get-summarize-tax-rates-for-all-regions) endpoint with average and minimum rates for each state/region. This means you can store the average rate for NY and WA somewhere in your database just in case you’re unable to retrieve a rate from our API, reducing the likelihood of under-collecting sales tax.

After creating a new subscription, you’ll be able to see the tax percentage under Subscriptions as “Tax Percent” in the Stripe dashboard:

![Stripe Dashboard: Subscription](/images/blog/handling-sales-tax-with-stripe/stripe-subscriptions.png)

## Adding Sales Tax to Single Charges

Making a single, one-off charge in Laravel Cashier is simple:

```php
<?php
// Stripe Accepts Charges In Cents...
$user->charge(100);
```

Unfortunately, there's no tax parameters to be found in Stripe's [charge object](https://stripe.com/docs/api#charge_object). This means you'll want to add the sales tax amount (in cents) to the final amount. You can either use our `ratesForLocation` method to get the rate and calculate yourself, or use [`taxForOrder`](https://developers.taxjar.com/api/reference/#taxes) to retrieve the `amount_to_collect` attribute. Our `/taxes` endpoint automatically handles sourcing logic and product exemptions:

```php
<?php
$client = \TaxJar\Client::withApiKey(env('TAXJAR_API_TOKEN'));

try {
    $tax = $client->taxForOrder([
        'from_country' => 'US',
        'from_zip' => '92093',
        'from_state' => 'CA',
        'from_city' => 'La Jolla',
        'from_street' => '9500 Gilman Drive',
        'to_country' => 'US',
        'to_zip' => '90002',
        'to_state' => 'CA',
        'to_city' => 'Los Angeles',
        'to_street' => '1335 E 103rd St',
        'amount' => 100,
        'shipping' => 0,
        'nexus_addresses' => [
            [
                'id' => 'Main Location',
                'country' => 'US',
                'zip' => '92093',
                'state' => 'CA',
                'city' => 'La Jolla',
                'street' => '9500 Gilman Drive',
            ]
        ],
        'line_items' => [
            [
                'id' => '1',
                'quantity' => 1,
                'product_tax_code' => '30070',
                'unit_price' => 100,
                'discount' => 0
            ]
        ]
    ]);

    // Charge the user $100.00 (subtotal) + $8.00 (tax)
    $subtotal = 10000;
    $taxAmount = $tax->amount_to_collect * 100;
    $taxPercent = $tax->rate * 100;
    $total = $subtotal + $taxAmount;

    $user->charge($total);

} catch (Exception $e) {
    // Log error
}
```

Fortunately, we can use the `metadata` parameter to list out the tax amount and rate to reference later if needed:

```php
<?php
// ...
    // Charge the user $100.00 (subtotal) + $8.00 (tax)
    $subtotal = 10000;
    $taxAmount = $tax->amount_to_collect * 100;
    $taxPercent = $tax->rate * 100;
    $total = $subtotal + $taxAmount;

    $user->charge($total, [
        'metadata' => [
            'tax' => $taxAmount, // $8.00 tax amount
            'tax_percent' => $taxPercent // 8% tax rate
        ]
    ]);
// ...
```

The `metadata` attribute is a simple way to store a set of key/value pairs in a structured format. It's available in most Stripe objects. When reviewing payments in the Stripe dashboard you’ll be able to see this metadata under Payment Details or in the JSON objects for logging and events.

If you’re based in Canada or the EU, you could store the full tax breakdown in the `metadata` attribute as well:

```php
<?php
// Charge the user €100.00 (subtotal) + €25.00 (VAT)
$user->charge(12500, [
    'metadata' => [
        'tax' => 2500, // VAT amount
        'standard_rate' => 25,
        'reduced_rate' => 6,
        'super_reduced_rate' => 12,
        'freight_taxable' => true
    ]
]);
```

## Wrapping Up

That covers how to handle sales tax calculations with Laravel Cashier and TaxJar for both subscriptions and single charges. If you have any questions about our sales tax API, feel free to [contact us](https://www.taxjar.com/contact/). We're always happy to help out!
