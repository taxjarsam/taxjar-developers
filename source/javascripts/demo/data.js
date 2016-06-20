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
          "amount": 19.95,
          "shipping": 10
        },
        "contexts": {
          "NY": "<ul><li>Food & grocery items are exempt from all sales tax.</li><li>Clothing items sold in New York under $110 are exempt from the state tax rate, but only exempt from county taxes in certain jurisdictions.<br/><a href='http://developers.taxjar.com/api/guides/#product-exemptions' target='_blank'>Learn More &raquo;</a></li><li>Shipping costs are taxable.</li></ul>",
          "CA": "<ul><li>Food and grocery items are exempt from all sales tax.</li><li>Shipping costs, if stated separately, are exempt from sales tax.</li><li>While you have the option to collect all state and local taxes based on the address of delivery, you technically only need to collect local taxes in jurisdictions you share.</li></ul>",
          "FL": "<ul><li>All of the product categories listed are fully taxable in Florida, as is shipping.</li></ul>"
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
                "from_country": "US"
              },
              {
                "_name": "Florida",
                "_type": "address",
                "from_street": "1435 Brickell Avenue",
                "from_city": "Miami",
                "from_state": "FL",
                "from_zip": "33132",
                "from_country": "US"
              },
              {
                "_name": "British Columbia",
                "_type": "address",
                "from_street": "845 Avison Way",
                "from_city": "Vancouver",
                "from_state": "BC",
                "from_zip": "V6G 3E2",
                "from_country": "CA"
              }
            ]
          },
          "line_items": {
            "_name": "Products",
            "_description": "Build a customer order! Choose products to calculate sales tax for. $10 flat shipping applied to all orders.",
            "_multiple": true,
            "data": [
              {
                "_name": "T-Shirt",
                "_type": "product",
                "id": 1,
                "quantity": 1,
                "unit_price": 19.95,
                "product_tax_code": "20010"
              },
              {
                "_name": "Designer Boots",
                "_type": "product",
                "id": 2,
                "quantity": 1,
                "unit_price": 199.85,
                "product_tax_code": "20010"
              },
              {
                "_name": "Case of Hint Water",
                "_type": "product",
                "id": 3,
                "quantity": 1,
                "unit_price": 16.95,
                "product_tax_code": "40030"
              },
              {
                "_name": "Playstation 4",
                "_type": "product",
                "id": 4,
                "quantity": 1,
                "unit_price": 499.95
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
                "to_street": "668 Route Six",
                "to_city": "Mahopac",
                "to_state": "NY",
                "to_zip": "10541",
                "to_country": "US"
              },
              {
                "_name": "California",
                "_type": "address",
                "to_street": "33 N. First Street",
                "to_city": "Campbell",
                "to_state": "CA",
                "to_zip": "95008",
                "to_country": "US"
              },
              {
                "_name": "Florida",
                "_type": "address",
                "to_street": "200 S Orange Ave",
                "to_city": "Orlando",
                "to_state": "FL",
                "to_zip": "32801",
                "to_country": "US"
              },
              {
                "_name": "Ontario",
                "_type": "address",
                "to_street": "301 Front St W",
                "to_city": "Toronto",
                "to_state": "ON",
                "to_zip": "M5V 2T6",
                "to_country": "CA"
              }
            ]
          }
        }
      }
    }
  };
})(window);