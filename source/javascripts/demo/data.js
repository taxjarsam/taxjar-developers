(function (window, document) {
  window.apiData = {
    "tasks": {
      "ratesForLocation": {
        "method": "GET",
        "url": "https://api.taxjar.com/v2/rates",
        "docs": "http://developers.taxjar.com/api/#get-show-tax-rates-for-a-location",
        "args": ["zip"],
        "presets": {
          "location": {
            "_name": "Location",
            "_description": "Tell TaxJar where to calculate sales tax.",
            "data": [
              {
                "_name": "New York",
                "_type": "location",
                "zip": "10118",
                "city": "New York",
                "country": "US"
              },
              {
                "_name": "California",
                "_type": "location",
                "zip": "90404",
                "city": "Santa Monica",
                "country": "US"
              },
              {
                "_name": "Florida",
                "_type": "location",
                "zip": "33132",
                "city": "Miami",
                "country": "US"
              }
            ]
          }
        }
      },
      "taxForOrder": {
        "method": "POST",
        "url": "https://api.taxjar.com/v2/taxes",
        "docs": "http://developers.taxjar.com/api/#post-calculate-sales-tax-for-an-order",
        "defaults": {
          "amount": 19.99,
          "shipping": 10
        },
        "presets": {
          "nexus_address": {
            "_name": "Nexus Address",
            "_description": "Tell TaxJar where your company has nexus (e.g. physical presence, employees, etc).",
            "data": [
              {
                "_name": "New York",
                "_type": "address",
                "from_street": "350 5th Avenue",
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
            ]
          },
          "line_items": {
            "_name": "Products",
            "_description": "Build a customer order! Choose products to calculate sales tax for.",
            "_multiple": true,
            "data": [
              {
                "_name": "T-Shirt",
                "_type": "product",
                "id": 1,
                "quantity": 1,
                "unit_price": 19.99
              },
              {
                "_name": "Designer Boots",
                "_type": "product",
                "id": 2,
                "quantity": 1,
                "unit_price": 199.85
              },
              {
                "_name": "Gaming Console",
                "_type": "product",
                "id": 3,
                "quantity": 1,
                "unit_price": 399.95
              }
            ],
          },
          "to_addresses": {
            "_name": "Destination",
            "_description": "Choose a delivery address for this order.",
            "data": [
              {
                "_name": "New York",
                "_type": "address",
                "to_street": "45 Rockefeller Plaza",
                "to_city": "New York",
                "to_state": "NY",
                "to_zip": "10111",
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
    }
  };
})(window);