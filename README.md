# NOT FOR PRODUCTION USE

This is still a very early demo and is not properly secured against threats like SQL Injections. Beware!!!

# PSequel: A query facilitator for Postgres

PSequel aims to become a framework that will make bridging nodejs code and postgreSQL queries easier. It will do so by avoiding direct use of SQL queries to fetch and update data and offer methods that will use objects and do run-time validation on data to ensure quality.

[![Build Status](https://travis-ci.org/NewLunarFire/psequel.svg?branch=master)](https://travis-ci.org/NewLunarFire/psequel)

## Typical use
```javascript
var pg = require('pg')
var psequel = require('psequel')

// ... Postgres client initialization
var ps = psequel(pgClient)

// Example model initialization
var users = ps.Model({
    'table': 'users',
    'columns': [{
        'name': 'id',
        'type': 'integer'
    }, {
        'name': 'name',
        'type': 'text'
    }, {
        'name': 'age',
        'type': 'integer'
    }, {
        'name': 'salary',
        'type': 'double'
    }]
})

// Run a select query with all fields
const res = await users.select();

// Run a more complex query, with a where clause
const res = await users.where({
        users.columns['name'].equalsValue('Jo')
    }).select(
        ['age', 'salary']
    );

// Insert a new user in the database
const res = await users.insert({
    'name': 'Winston',
    'age': 34,
    'salary': 123456.78 
});
```

## Select

There are multiple ways to do a select query. Because selects are executed the moment they are called, clauses (where, join, as, etc...) must be specified beforehand.

```javascript
// Select all the fields (similar to *)
model.select();

//Select only one field amongs all
model.select('fieldName');

//Select listed fields
model.select(['field1', 'field2', ..., 'fieldN']);


```
## MORE TO COME...