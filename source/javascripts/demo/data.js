(function (window, document) {
  window.apiData = {
    "tasks": {
      "taxForOrder": {
        "method": "POST",
        "url": "https://api.taxjar.com/v2/taxes",
        "defaults": {
          "amount": 19.99,
          "shipping": 10
        },
        "presets": {
          "nexus_address": [
            {
              "_name": "New York",
              "_type": "address",
              "from_street": "350 5th Ave",
              "from_city": "New York",
              "from_state": "NY",
              "from_zip": "10118",
              "from_country": "US"
            },
            {
              "_name": "California",
              "_type": "address",
              "from_street": "600 Montgomery St",
              "from_city": "San Francisco",
              "from_state": "CA",
              "from_zip": "94111",
              "from_country": "US",
            },
            {
              "_name": "Florida",
              "_type": "address",
              "from_street": "1435 Brickell Avenue",
              "from_city": "Miami",
              "from_state": "FL",
              "from_zip": "33132",
              "from_country": "US",
            }
          ],
          "line_items": [
            {
              "_name": "T-Shirt",
              "_type": "product",
              "_multiple": true,
              "id": 123456,
              "quantity": 1,
              "unit_price": 19.99
            }
          ],
          "to_addresses": [
            {
              "_name": "New York",
              "_type": "address",
              "to_street": "350 5th Ave",
              "to_city": "New York",
              "to_state": "NY",
              "to_zip": "10118",
              "to_country": "US"
            },
            {
              "_name": "Kansas City",
              "_type": "address",
              "to_street": "30 W Pershing Rd",
              "to_city": "Kansas City",
              "to_state": "MO",
              "to_zip": "64108",
              "to_country": "US"
            },
            {
              "_name": "Seattle",
              "_type": "address",
              "to_street": "400 Broad St",
              "to_city": "Seattle",
              "to_state": "WA",
              "to_zip": "98109",
              "to_country": "US"
            }
          ]
        }
      }
    }
  };
})(window);