# TaxJar Developers

Developer portal for TaxJar, powered by Middleman. Our v2 API docs are hosted on a [separate repo](https://github.com/taxjar/taxjar-api-docs) to keep things organized and located at [/api](https://developers.taxjar.com/api).

## Getting Started

Clone the repo and simply run the following command:

```
bundle install && bower install
```

This should install the Ruby and Bower dependencies you need to get up and going.

## Development

To develop and preview the documentation locally, use the following Middleman command:

```
middleman server
```

This will watch for changes and compile them on the fly.

## Blogging

To write a new blog article, use the following shortcut via Middleman:

```
middleman article "My Article Title"
```

Open the generated Markdown file and use the frontmatter template below:

```
---
title: Handling Sales Tax with Stripe
description: Learn how to add sales tax to charges and subscriptions in Stripe along with a Rails example for calculating sales tax using SmartCalcs.
author: jake_johnson
date: 2015-12-14 00:11 UTC
category: Stripe
tags: smartcalcs, stripe, api 
published: true
---
```

If you're a brand new author, update `data/authors.json` with your name, avatar, and Twitter account.

For new categories you'll also want to update `data/categories.json`.

## Deployment

To deploy to S3, you'll need to have your `.env` file set up with the appropriate credentials and run the following commands:

```
middleman build && s3_website push
```