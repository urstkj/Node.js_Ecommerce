define({ "api": [
  {
    "type": "post",
    "url": "/user/authenticate.json",
    "title": "Authenticate As User / Login",
    "name": "AuthenticateUser",
    "group": "User",
    "permission": [
      {
        "name": "public"
      }
    ],
    "description": "<p>Once authenticated, user's session cookie is used to authenticate the user. API clients must use cookie-based storage for authentication.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User's email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>User's password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>unique _id of user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"data\":   {\n    \"_id\": \"1234bCad\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotPermitted",
            "description": "<p>User not permitted to authenticate (for any reason).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "UserNotPermitted:",
          "content": "HTTP/1.1 200 OK\n{\n  \"error\": \"UserNotPermitted\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "lib/controllers/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/create.json",
    "title": "Create User",
    "name": "CreateUser",
    "group": "User",
    "permission": [
      {
        "name": "admin, public"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>full name of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password of user (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "locality_name",
            "description": "<p>locality name of user (e.g. &quot;us&quot;)</p>"
          },
          {
            "group": "Parameter",
            "type": "Object[]",
            "optional": false,
            "field": "addresses",
            "description": "<p>List of addresses of user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addresses.name",
            "description": "<p>name of address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addresses.contact",
            "description": "<p>name of contact at address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addresses.street",
            "description": "<p>street address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addresses.street_b",
            "description": "<p>second line of street address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addresses.locality",
            "description": "<p>city/locality of address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addresses.region",
            "description": "<p>municipal region code (i.e. state abbreviation) of address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addresses.country",
            "description": "<p>country code of address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addresses.postal_code",
            "description": "<p>postal code of address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addresses.phone",
            "description": "<p>phone number of address</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "roles",
            "description": "<p>roles of user (requires admin permissions)</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "roles.customer",
            "description": "<p>user is a customer (requires admin permissions)</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "roles.setmember",
            "description": "<p>user is a setmember (requires admin permissions)</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "roles.admin",
            "description": "<p>user is an admin (requires admin permissions)</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "payment_method_tokens",
            "description": "<p>credit/debit card tokens for this account</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>unique identifier of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>full name of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of user</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "locality",
            "description": "<p>locality of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "locality.name",
            "description": "<p>name of locality (e.g. &quot;us&quot;)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "locality.long_name",
            "description": "<p>full name of locality (e.g. &quot;United States&quot;)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "locality.language",
            "description": "<p>ISO code language of locality (e.g. &quot;en&quot;)</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "addresses",
            "description": "<p>List of addresses of user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses._id",
            "description": "<p>unique _id of address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.name",
            "description": "<p>name of address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.contact",
            "description": "<p>name of contact at address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.street",
            "description": "<p>street address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.street_b",
            "description": "<p>second line of street address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.locality",
            "description": "<p>city/locality of address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.region",
            "description": "<p>municipal region code (i.e. state abbreviation) of address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.country",
            "description": "<p>country code of address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.postal_code",
            "description": "<p>postal code of address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.phone",
            "description": "<p>phone number of address</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "roles",
            "description": "<p>roles of user</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "roles.customer",
            "description": "<p>user is a customer</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "roles.setmember",
            "description": "<p>user is a setmember</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "roles.admin",
            "description": "<p>user is an admin</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "payment_methods",
            "description": "<p>credit/debit cards linked to this account</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "payment_methods.id",
            "description": "<p>id of payment method</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "payment_methods.brand",
            "description": "<p>brand of payment method (e.g &quot;Visa&quot;)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "payment_methods.exp_month",
            "description": "<p>expiration month of payment method (e.g 1)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "payment_methods.exp_year",
            "description": "<p>expiration year of payment method (e.g 2017)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "payment_methods.last4",
            "description": "<p>last four digits of payment method (e.g &quot;1234&quot;)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "created_at",
            "description": "<p>epoch timestamp of when user was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "updated_at",
            "description": "<p>epoch timestamp of when user account was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"data\":   {\n    \"_id\": \"1234bCad\"\n  , \"name\": \"Homer Simpson\"\n  , \"email\": \"homer@simpsons.org\"\n  , \"locality\": {\n      \"name\": \"us\"\n    , \"long_name\": \"United States\"\n    , \"language\": \"en\"\n    }\n  , \"addresses\": [\n      {\n        \"_id\": \"1234bCaf67\"\n      , \"name\": \"Home\"\n      , \"contact\": \"Simpson Family\"\n      , \"street\": \"742 Evergreen Terrace\"\n      , \"locality\": \"Springfield\"\n      , \"region\": \"KY\"\n      , \"country\": \"US\"\n      , \"postal_code\": \"55512\"\n      , \"phone\": \"555-123-5433\"\n      }\n    , {\n        \"_id\": \"1234bCaf68\"\n      , \"name\": \"Work\"\n      , \"contact\": \"Springfield Nuclear Plant c/o Mr. Burns\"\n      , \"street\": \"100 Industrial Way\"\n      , \"street_b\": \"Sector 7G\"\n      , \"locality\": \"Springfield\"\n      , \"region\": \"KY\"\n      , \"country\": \"US\"\n      , \"postal_code\": \"55512\"\n      , \"phone\": \"555-124-9192\"\n      }\n    ]\n  , \"roles\": {\n      \"customer\": true\n    , \"setmember\": false\n    , \"admin\": false\n    }\n  , \"payment_methods\": [\n      {\n        \"id\": \"card_19fv2Q2eZvKYlo2CXOnFdTJO\"\n      , \"brand\": \"Visa\"\n      , \"exp_month\": 2\n      , \"exp_year\": 2022\n      , \"last4\": \"9645\"\n      }\n    , {\n        \"id\": \"card_234sdfk4a7fsx6642478\"\n      , \"brand\": \"Amex\"\n      , \"exp_month\": 1\n      , \"exp_year\": 2029\n      , \"last4\": \"1111\"\n      }\n    ]\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Error",
            "description": "<p>Error messages vary. Errors are returned for various data validation, missing field, and duplicate value issues</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "ExampleError:",
          "content": "HTTP/1.1 200 OK\n{\n  \"error\": \"ExampleError\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "lib/controllers/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/deauthenticate.json",
    "title": "Deauthenticate User / Logout",
    "name": "DeauthenticateUser",
    "group": "User",
    "permission": [
      {
        "name": "current user"
      }
    ],
    "description": "<p>Once deauthenticated, user's session is destroyed</p>",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"data\":   {\n    \"status\": \"OK\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "lib/controllers/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user/:_id/read.json",
    "title": "Read User information",
    "name": "ReadUser",
    "group": "User",
    "permission": [
      {
        "name": "admin, current user"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "_id",
            "description": "<p>User's unique identifier</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>unique identifier of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>full name of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of user</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "locality",
            "description": "<p>locality of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "locality.name",
            "description": "<p>name of locality (e.g. &quot;us&quot;)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "locality.long_name",
            "description": "<p>full name of locality (e.g. &quot;United States&quot;)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "locality.language",
            "description": "<p>ISO code language of locality (e.g. &quot;en&quot;)</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "addresses",
            "description": "<p>List of addresses of user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.name",
            "description": "<p>name of address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.contact",
            "description": "<p>name of contact at address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.street",
            "description": "<p>street address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.street_b",
            "description": "<p>second line of street address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.locality",
            "description": "<p>city/locality of address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.region",
            "description": "<p>municipal region code (i.e. state abbreviation) of address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.country",
            "description": "<p>country code of address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.postal_code",
            "description": "<p>postal code of address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.phone",
            "description": "<p>phone number of address</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "roles",
            "description": "<p>roles of user</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "roles.customer",
            "description": "<p>user is a customer</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "roles.setmember",
            "description": "<p>user is a setmember</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "roles.admin",
            "description": "<p>user is an admin</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "payment_methods",
            "description": "<p>credit/debit cards linked to this account</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "payment_methods.id",
            "description": "<p>id of payment method</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "payment_methods.brand",
            "description": "<p>brand of payment method (e.g &quot;Visa&quot;)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "payment_methods.exp_month",
            "description": "<p>expiration month of payment method (e.g 1)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "payment_methods.exp_year",
            "description": "<p>expiration year of payment method (e.g 2017)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "payment_methods.last4",
            "description": "<p>last four digits of payment method (e.g &quot;1234&quot;)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"data\":   {\n    \"_id\": \"1234bCad\"\n  , \"name\": \"Homer Simpson\"\n  , \"email\": \"homer@simpsons.org\"\n  , \"locality\": {\n      \"name\": \"us\"\n    , \"long_name\": \"United States\"\n    , \"language\": \"en\"\n    }\n  , \"addresses\": [\n      {\n        \"_id\": \"1234bCaf67\"\n      , \"name\": \"Home\"\n      , \"contact\": \"Simpson Family\"\n      , \"street\": \"742 Evergreen Terrace\"\n      , \"locality\": \"Springfield\"\n      , \"region\": \"KY\"\n      , \"country\": \"US\"\n      , \"postal_code\": \"55512\"\n      , \"phone\": \"555-123-5433\"\n      }\n    , {\n        \"_id\": \"1234bCaf68\"\n      , \"name\": \"Work\"\n      , \"contact\": \"Springfield Nuclear Plant c/o Mr. Burns\"\n      , \"street\": \"100 Industrial Way\"\n      , \"street_b\": \"Sector 7G\"\n      , \"locality\": \"Springfield\"\n      , \"region\": \"KY\"\n      , \"country\": \"US\"\n      , \"postal_code\": \"55512\"\n      , \"phone\": \"555-124-9192\"\n      }\n    ]\n  , \"roles\": {\n      \"customer\": true\n    , \"setmember\": false\n    , \"admin\": false\n    }\n  , \"payment_methods\": [\n      {\n        \"id\": \"card_19fv2Q2eZvKYlo2CXOnFdTJO\"\n      , \"brand\": \"Visa\"\n      , \"exp_month\": 2\n      , \"exp_year\": 2022\n      , \"last4\": \"9645\"\n      }\n    , {\n        \"id\": \"card_234sdfk4a7fsx6642478\"\n      , \"brand\": \"Amex\"\n      , \"exp_month\": 1\n      , \"exp_year\": 2029\n      , \"last4\": \"1111\"\n      }\n    ]\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotPermitted",
            "description": "<p>Current user not permitted to perform operation</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User was not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "NotPermitted:",
          "content": "HTTP/1.1 200 OK\n{\n  \"error\": \"UserNotPermitted\"\n}",
          "type": "json"
        },
        {
          "title": "UserNotFound:",
          "content": "HTTP/1.1 200 OK\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "lib/controllers/user.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/user/:_id/update.json",
    "title": "Update User",
    "name": "UpdateUser",
    "group": "User",
    "permission": [
      {
        "name": "admin, current user"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>full name of user</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "locality_name",
            "description": "<p>locality name of user (e.g. &quot;us&quot;)</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "roles",
            "description": "<p>roles of user (requires admin permissions)</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "roles.customer",
            "description": "<p>user is a customer (requires admin permissions)</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "roles.setmember",
            "description": "<p>user is a setmember (requires admin permissions)</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "roles.admin",
            "description": "<p>user is an admin (requires admin permissions)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>unique identifier of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>full name of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of user</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "locality",
            "description": "<p>locality of user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "locality.name",
            "description": "<p>name of locality (e.g. &quot;us&quot;)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "locality.long_name",
            "description": "<p>full name of locality (e.g. &quot;United States&quot;)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "locality.language",
            "description": "<p>ISO code language of locality (e.g. &quot;en&quot;)</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "addresses",
            "description": "<p>List of addresses of user.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses._id",
            "description": "<p>unique _id of address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.name",
            "description": "<p>name of address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.contact",
            "description": "<p>name of contact at address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.street",
            "description": "<p>street address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.street_b",
            "description": "<p>second line of street address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.locality",
            "description": "<p>city/locality of address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.region",
            "description": "<p>municipal region code (i.e. state abbreviation) of address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.country",
            "description": "<p>country code of address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.postal_code",
            "description": "<p>postal code of address</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "addresses.phone",
            "description": "<p>phone number of address</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "roles",
            "description": "<p>roles of user</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "roles.customer",
            "description": "<p>user is a customer</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "roles.setmember",
            "description": "<p>user is a setmember</p>"
          },
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "roles.admin",
            "description": "<p>user is an admin</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "payment_methods",
            "description": "<p>credit/debit cards linked to this account</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "payment_methods.id",
            "description": "<p>id of payment method</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "payment_methods.brand",
            "description": "<p>brand of payment method (e.g &quot;Visa&quot;)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "payment_methods.exp_month",
            "description": "<p>expiration month of payment method (e.g 1)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "payment_methods.exp_year",
            "description": "<p>expiration year of payment method (e.g 2017)</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "payment_methods.last4",
            "description": "<p>last four digits of payment method (e.g &quot;1234&quot;)</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "created_at",
            "description": "<p>epoch timestamp of when user was created</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "updated_at",
            "description": "<p>epoch timestamp of when user account was last updated</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"data\":   {\n    \"_id\": \"1234bCad\"\n  , \"name\": \"Homer Simpson\"\n  , \"email\": \"homer@simpsons.org\"\n  , \"locality\": {\n      \"name\": \"us\"\n    , \"long_name\": \"United States\"\n    , \"language\": \"en\"\n    }\n  , \"addresses\": [\n      {\n        \"_id\": \"1234bCaf67\"\n      , \"name\": \"Home\"\n      , \"contact\": \"Simpson Family\"\n      , \"street\": \"742 Evergreen Terrace\"\n      , \"locality\": \"Springfield\"\n      , \"region\": \"KY\"\n      , \"country\": \"US\"\n      , \"postal_code\": \"55512\"\n      , \"phone\": \"555-123-5433\"\n      }\n    , {\n        \"_id\": \"1234bCaf68\"\n      , \"name\": \"Work\"\n      , \"contact\": \"Springfield Nuclear Plant c/o Mr. Burns\"\n      , \"street\": \"100 Industrial Way\"\n      , \"street_b\": \"Sector 7G\"\n      , \"locality\": \"Springfield\"\n      , \"region\": \"KY\"\n      , \"country\": \"US\"\n      , \"postal_code\": \"55512\"\n      , \"phone\": \"555-124-9192\"\n      }\n    ]\n  , \"roles\": {\n      \"customer\": true\n    , \"setmember\": false\n    , \"admin\": false\n    }\n  , \"payment_methods\": [\n      {\n        \"id\": \"card_19fv2Q2eZvKYlo2CXOnFdTJO\"\n      , \"brand\": \"Visa\"\n      , \"exp_month\": 2\n      , \"exp_year\": 2022\n      , \"last4\": \"9645\"\n      }\n    , {\n        \"id\": \"card_234sdfk4a7fsx6642478\"\n      , \"brand\": \"Amex\"\n      , \"exp_month\": 1\n      , \"exp_year\": 2029\n      , \"last4\": \"1111\"\n      }\n    ]\n  }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotPermitted",
            "description": "<p>User not permitted to perform operation.</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "UserNotPermitted:",
          "content": "HTTP/1.1 200 OK\n{\n  \"error\": \"UserNotPermitted\"\n}",
          "type": "json"
        },
        {
          "title": "UserNotFound:",
          "content": "HTTP/1.1 200 OK\n{\n  \"error\": \"UserNotFound\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "lib/controllers/user.js",
    "groupTitle": "User"
  }
] });
