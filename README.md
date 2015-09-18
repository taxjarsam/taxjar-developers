# TaxJar Developers

Developer portal for TaxJar, powered by Middleman. Our v2 API docs are hosted on a [separate repo](https://github.com/taxjar/taxjar-api-docs) to keep things organized and located at [/api](http://developers.taxjar.com/api).

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

## Deployment

Commits to the `master` branch are compiled on the fly and deployed to Amazon S3 via Codeship.