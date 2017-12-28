---
title: Airtable + Vue.js for Static Websites
description: Learn how to use the Airtable API as a database in your static websites!
author: jake_johnson
date: 2017-12-22 12:00 UTC
category: JavaScript
tags: airtable, vue, vuejs, javascript, static-websites
published: true
---

Here at TaxJar we work with a lot of interesting datasets to help online sellers figure out sales tax:

* Amazon FBA warehouses
* Due dates and filing deadlines
* Product tax exemptions
* Sales tax holidays
* And more

We also provide sales tax content across a variety of static and dynamic websites using Middleman, Nanoc, and WordPress. Some of this content overlaps on multiple sites. As our marketing team continues to grow, we need a way to collaborate on this type of presentational data in a single location so it can remain up-to-date and relevant everywhere.

END_SUMMARY

![Airtable](/images/blog/airtable-and-vue-js-for-static-websites/airtable.png)

This is why we love using [Airtable](https://airtable.com), a collaborative spreadsheet app with a wonderful and easy to use API. Using Airtable allows our marketing team to easily make changes in a friendly UI. From there we can pull the JSON data and present it however we like, whether it’s a simple list, a sortable table, or even an [interactive map](https://www.taxjar.com/sales-tax-maps/):

![TaxJar Sales Tax Maps](/images/blog/airtable-and-vue-js-for-static-websites/sales-tax-maps.jpg)

## Getting Started with Airtable

For static websites, integrating with Airtable is straightforward. You’ll want to create a **read-only** user and use the API key generated for that user to ensure your datasets can only be read, not modified:

![Airtable Read Only Account](/images/blog/airtable-and-vue-js-for-static-websites/airtable-read-only-account.png)

Under the account page, click the **Generate API key** link to generate a new API key for your read-only user:

![Airtable Generate API Key](/images/blog/airtable-and-vue-js-for-static-websites/airtable-generate-api-key.png)

Log out of your read-only account and log in to your main account. From your main Airtable account, share your bases with the read-only account. Make sure permissions are set to **Read only**:

![Airtable Base Collaborators](/images/blog/airtable-and-vue-js-for-static-websites/airtable-collaborators.png)

Now you can access the API docs specifically tailored for your base:

![Airtable API Docs](/images/blog/airtable-and-vue-js-for-static-websites/airtable-api-docs.jpg)

Keep in mind the API is limited to 5 requests per second. If you exceed this rate, you’ll receive a 429 status code and may need to wait 30 seconds for subsequent requests.

## Using the Airtable API

For this example, we’ll write a quick Vue.js component with Axios to pull JSON data from Airtable and populate it in a Bootstrap table:

![Bootstrap Table](/images/blog/airtable-and-vue-js-for-static-websites/fba-warehouse-table.jpg)

To make our AJAX request, we’ll need to provide a URL to a specific Airtable base and a table within that base. You can get the URL using the cURL examples inside the Airtable API docs:

![Airtable Endpoint](/images/blog/airtable-and-vue-js-for-static-websites/airtable-endpoint.png)

Since we’re using a read-only API key with limited access, we can safely include this key in our JavaScript code to pass in the `Authorization` header:

```javascript
import axios from 'axios';

axios({
  url: 'https://api.airtable.com/v0/appPQ2yJdnvqXADnw/clothing',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
}).then((res) => {
  // res.data.records
});
```

At a bare minimum, that’s all you need to get data from Airtable! The rest comes down to formatting and displaying the data to your liking. Let’s scaffold a Vue component with a Bootstrap table template:

```html
<template>
  <table class="table table-bordered table-striped">
    <thead>
      <tr>
        <th v-for="(col, colIndex) in columns" :key="colIndex">
          {{ col }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="record in records" :key="record.id">
        <td v-for="(col, colIndex) in columns" :key="record.id + '-' + colIndex">
          {{ record.fields[col] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from 'axios';

export default {
  name: 'VueAirtable',
  props: [
    'columns'
  ],
  data: function () {
    return {
      apiUrl: 'https://api.airtable.com/v0/',
      apiKey: 'YOUR_API_KEY', // Always use a read-only account token
      base: 'appPQ2yJdnvqXADnw/clothing',
      records: []
    };
  },
  mounted: function () {
    this.getData();
  },
  methods: {
    getData: function () {
      axios({
        url: this.apiUrl + this.base,
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      }).then((res) => {
        this.records = res.data.records;
      });
    }
  }
}
</script>
```

Piece of cake 🍰 In your website or app, include the component with the columns you’d like to show from your Airtable:

```html
<template>
  <div id="app">
    <vue-airtable :columns="['Warehouse Code', 'Street Address', 'County', 'Sales Tax Rate']"></vue-airtable>
  </div>
</template>

<script>
import VueAirtable from './components/VueAirtable';

export default {
  name: 'app',
  components: {
    VueAirtable
  }
}
</script>
```

Perhaps you want to re-use this component across multiple bases and tables / views? Or filter and sort records? Let’s add more props:

```javascript
props: [
  'base',
  'columns',
  'filter',
  'sort'
],
```

Remove the `base` data param:

```javascript
  data: function () {
    return {
      apiUrl: 'https://api.airtable.com/v0/',
      apiKey: 'YOUR_API_KEY', // Always use a read-only account token
      records: []
    };
  },
```

Lastly, let’s update our `getData` method to use the `base` prop and pass some additional GET query params in the request:

```javascript
  methods: {
    getData: function () {
      axios({
        url: this.apiUrl + this.base,
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        },
        params: {
          filterByFormula: this.filter || '',
          sort: this.sort || ''
        }
      }).then((res) => {
        this.records = res.data.records;
      });
    }
  }
```

Easy! We now have a dynamic filterable sortable Airtable component that we can use anywhere in our static website. You could take this component even further by supporting `fields`, `maxRecords`, `pageSize`, and other parameters from the Airtable record list endpoints.

That's a quick rundown of how we use Airtable at TaxJar. If you have any questions or ideas for other Airtable use cases, let me know in the comments below!
