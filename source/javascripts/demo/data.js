(function (window, document) {
  window.apiData = {
    "tasks": {
      "ratesForLocation": {
        "method": "GET",
        "url": "https://api.taxjar.com/v2/rates",
        "docs": "https://developers.taxjar.com/api/#get-show-tax-rates-for-a-location",
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
              },
              {
                "_name": "Illinois",
                "_type": "location",
                "zip": "60613",
                "city": "Chicago",
                "country": "US"
              }
            ]
          }
        }
      },
      "taxForOrder": {
        "method": "POST",
        "url": "https://api.taxjar.com/v2/taxes",
        "docs": "https://developers.taxjar.com/api/#post-calculate-sales-tax-for-an-order",
        "defaults": {
          "amount": 19.95,
          "shipping": 10
        },
        "contexts": {
          "NY": "<ul><li>Food & grocery items are exempt from all sales tax.</li><li>Clothing items sold in New York under $110 are exempt from the state tax rate, but only exempt from county taxes in certain jurisdictions.<br/><a href='https://developers.taxjar.com/api/guides/#product-exemptions' target='_blank'>Learn More &raquo;</a></li><li>Shipping costs are taxable.</li></ul>",
          "CA": "<ul><li>Food and grocery items are exempt from all sales tax.</li><li>Shipping costs, if stated separately, are exempt from sales tax.</li><li>While you have the option to collect all state and local taxes based on the address of delivery, you technically only need to collect local taxes in jurisdictions you share.</li></ul>",
          "FL": "<ul><li>All of the product categories listed are fully taxable in Florida, as is shipping.</li><li>Florida is a destination-based state, so sales tax is calculated based on the destination of the order or the buyer's shipping address.</li></ul>",
          "IL": "<ul><li>Illinois is an origin-based state, so sales tax is calculated where your business is located if you're based in Illinois.</li><li>If you have nexus in Illinois but you made a sale from outside of the state, you would charge a flat state tax rate. You are not required to charge any local sales tax rates.</li></ul>",
          "No Nexus": "<p>If you don't have nexus in the same state (US) or country as the customer’s delivery address, no sales tax is collected.<br/><a href='https://blog.taxjar.com/sales-tax-nexus-definition/' target='_blank'>Learn More &raquo;</a></p><p>To establish nexus, either...</p><ul><li>Add the nexus state in TaxJar</li><li>Use the <code>nexus_addresses</code> param</li><li>Ensure the <code>from_</code> params are in the same state (US) or country</li></ul>"
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
                "_name": "Illinois",
                "_type": "address",
                "from_street": "1060 W Addison St.",
                "from_city": "Chicago",
                "from_state": "IL",
                "from_zip": "60613",
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
              },
              {
                "_name": "Île-de-France",
                "_type": "address",
                "from_street": "55 Rue du Faubourg Saint-Honoré",
                "from_city": "Paris",
                "from_zip": "75008",
                "from_country": "FR"
              },
              {
                "_name": "New South Wales",
                "_type": "address",
                "from_street": "483 George St",
                "from_city": "Sydney",
                "from_zip": "NSW 2000",
                "from_country": "AU"
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
                "_name": "Illinois",
                "_type": "address",
                "to_street": "207 South Club House Drive",
                "to_city": "Springfield",
                "to_state": "IL",
                "to_zip": "62701",
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
              },
              {
                "_name": "Provence-Alpes-Côte d'Azur",
                "_type": "address",
                "to_street": "Rue Fort du Sanctuaire",
                "to_city": "Marseille",
                "to_zip": "13281",
                "to_country": "FR"
              },
              {
                "_name": "Victoria",
                "_type": "address",
                "to_street": "Brunton Ave",
                "to_city": "Richmond",
                "to_zip": "VIC 3002",
                "to_country": "AU"
              }
            ]
          }
        }
      }
    }
  };
})(window);
