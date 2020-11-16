# TaxJar Developers

Developer portal for TaxJar, powered by Middleman. Our v2 API docs are hosted on a [separate repo](https://github.com/taxjar/taxjar-api-docs) to keep things organized and located at [/api](https://developers.taxjar.com/api).

## Getting Started

Clone the repo and make sure your Ruby environment manager is using the correct version.

Make sure to install the proper Bundler version:

```
gem install bundler -v 1.17.3
```

Clone the repo and simply run the following command:

```
bundle _1.17.3_ install && bower install
```

This should install the Ruby and Bower dependencies you need to get up and going.

## Development

To develop and preview the documentation locally, use the following Middleman command:

```
middleman server
```

This will watch for changes and compile them on the fly.

Content is rendered at `localhost:4567/`

## Blogging

To write a new blog article, use the following shortcut via Middleman:

```
middleman article "My Article Title"
```

Open the generated Markdown file and use the frontmatter template below:

```
---
title: Handling Sales Tax with Stripe
description: Learn how to add sales tax to charges and subscriptions in Stripe along with a Rails example for calculating sales tax using the TaxJar API.
author: jake_johnson
date: 2015-12-14 00:11 UTC
category: Stripe
tags: stripe, api
published: true
---
```

If you're a brand new author, update `data/authors.json` with your name, avatar, and Twitter account.

For new categories you'll also want to update `data/categories.json`.

## Update Search Index

Requirements:
- [jq](https://stedolan.github.io/jq/download/)
- [Docker](https://docs.docker.com/install/overview/)

We utilize [Algolia](https://www.algolia.com/)/[DocSearch](https://community.algolia.com/docsearch/) for full-site search on developers.taxjar.com. If you need to manually update the search index, you'll need a `.env` file in the root directory with the following rows set to the appropriate values:

```
APPLICATION_ID=<Application ID>
API_KEY=<Admin API Key for Indexing>
```

Then, start up Docker and run this command from the root directory:
```bash
docker run -it --env-file=.env -e "CONFIG=$(cat $(pwd)/docsearch.json | jq -r tostring)" algolia/docsearch-scraper
```

After a minute or two, the crawler should complete and the search index will be updated.

## Deployment

To deploy to S3, you'll need to have your `.env` file set up with the appropriate credentials and run the following commands:

```
middleman build && s3_website push
```
