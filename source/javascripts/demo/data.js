(function (window, document) {
  window.presets = {
    "requests": {
      "taxForOrder": {
        "method": "POST",
        "url": "https://api.taxjar.com/v2/taxes"
      }
    },
    "nexus_addresses": [
      {
        "name": "New York",
        "from_street": "350 5th Ave",
        "from_city": "New York",
        "from_state": "NY",
        "from_zip": "10118",
        "from_country": "US"
      },
      {
        "name": "California",
        "from_street": "600 Montgomery St",
        "from_city": "San Francisco",
        "from_state": "CA",
        "from_zip": "94111",
        "from_country": "US",
      },
      {
        "name": "Florida",
        "from_street": "1435 Brickell Avenue",
        "from_city": "Miami",
        "from_state": "FL",
        "from_zip": "33132",
        "from_country": "US",
      }
    ],
    "line_items": [
      {
        "name": "T-Shirt",
        "id": "123456",
        "quantity": "1",
        "unit_price": 19.99
      }
    ],
    "to_addresses": [
      {
        "name": "New York",
        "to_street": "350 5th Ave",
        "to_city": "New York",
        "to_state": "NY",
        "to_zip": "10118",
        "to_country": "US"
      }
    ]
  };
})(window);