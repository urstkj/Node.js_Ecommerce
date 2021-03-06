#!/usr/bin/env node

var Path = require('path')
  , Optionall = require('optionall')
  , FS = require('fs')
  , Async = require('async')
  , _ = require('underscore')
  , Belt = require('jsbelt')
  , Util = require('util')
  , Winston = require('winston')
  , Events = require('events')
  , Spinner = require('its-thinking')
  , CP = require('child_process')
  , Request = require('request')
  , Assert = require('assert')
  , CSV = require('fast-csv')
;

var O = new Optionall({
                       '__dirname': Path.resolve(module.filename + '/../..')
                     , 'file_priority': [
                         'package.json'
                       , 'assets.json'
                       , 'settings.json'
                       , 'environment.json'
                       , 'config.json'
                       , 'credentials.json'
                       , 'users.json'
                       ]
                     });

var Log = new Winston.Logger();
Log.add(Winston.transports.Console, {'level': 'debug', 'colorize': true, 'timestamp': false});

setTimeout(function(){
  process.exit(1);
}, 60 * 1000 * 29);

var Spin = new Spinner(4);

var GB = _.defaults(O.argv, {
  'query': {

  }
, 'skip': 0
, 'limit': 50
, 'sort': '-created_at'
, 'auth': {
    'user': _.keys(O.admin_users)[0]
  , 'pass': _.values(O.admin_users)[0]
  }
, 'model': 'order'
, 'iterator': function(o2, cb){
    if (!o2 || !o2.slug) return cb();

    console.log('Updating ' + GB.model + ' [' + o2.slug + ']...');

    Async.eachSeries(_.keys(o2.vendor_orders) || [], function(k, cb2){
      Async.eachSeries(o2.vendor_orders[k], function(o, cb3){
        console.log('Updating vendor order [' + (Belt.get(o, 'order.id') || Belt.get(o, 'id')) + ']...');

        Request({
          'url': O.host + '/admin/order/' + o2._id + '/vendor/' + k
                 + '/order/' + (Belt.get(o, 'order.id') || Belt.get(o, 'id')) + '/update.json'
        , 'auth': GB.auth
        , 'json': true
        , 'method': 'get'
        }, Belt.cw(cb3));

      }, Belt.cw(cb2));
    }, Belt.cw(cb));
  }
});

Spin.start();

Async.waterfall([
  function(cb){
    var cont;

    return Async.doWhilst(function(next){
      Request({
        'url': O.host + '/admin/' + GB.model + '/list.json'
      , 'auth': GB.auth
      , 'body': {
          'query': GB.query
        , 'skip': GB.skip
        , 'limit': GB.limit
        , 'sort': GB.sort
        }
      , 'method': 'post'
      , 'json': true
      }, function(err, res, json){
        cont = _.any(Belt.get(json, 'data')) ? true : false;
        GB.skip += GB.limit;
        console.log(GB.skip);

        Async.eachLimit(Belt.get(json, 'data') || [], 6, function(d, cb2){
          GB.iterator(d, cb2);
        }, Belt.cw(next, 0));
      })
    }, function(){ return cont; }, Belt.cw(cb, 0));
  }
], function(err){
  Spin.stop();
  if (err) Log.error(err);
  return process.exit(err ? 1 : 0);
});
