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
  , Mongodb = require('mongodb')
  , Request = require('request')
;

var O = new Optionall({
                       '__dirname': Path.resolve(module.filename + '/../../..')
                     , 'file_priority': ['package.json', 'environment.json', 'credentials.json']
                     });

var Log = new Winston.Logger();
Log.add(Winston.transports.Console, {'level': 'debug', 'colorize': true, 'timestamp': false});

var Spin = new Spinner(4);

var GB = _.defaults(O.argv, {
  'mongodb': O.mongodb
, 'collection_name': 'products'
, 'db': 'puma'
, 'brand': 'Puma'
});

Spin.start();

Async.waterfall([
  function(cb){
    return Mongodb.MongoClient.connect('mongodb://'
    + GB.mongodb.host
    + ':' + GB.mongodb.port
    + '/' + (GB.db || GB.mongodb.db)
    , Belt.cs(cb, GB, 'db', 1, 0));
  }
, function(cb){
    var ocb = _.once(cb);
    return GB.db.collection(GB.collection_name, Belt.cs(ocb, GB, 'collection', 1, 0));
  }
, function(cb){
    var count = 0
      , skip = 0
      , limit = 100;

    return Async.doWhilst(function(next){
      GB.collection.find({}).skip(skip).limit(limit).toArray(function(err, res){
        GB['results'] = res || [];
        skip += limit;

        Async.eachSeries(GB.results, function(e, cb2){
          Async.waterfall([
            function(cb3){
              Request({
                'url': O.host + '/product/create.json'
              , 'method': 'post'
              , 'json': _.extend(e.title ? {
                  'name': e.title
                , 'label': {
                    'us': e.title
                  }
                } : {}, e.description ? {
                  'description': {
                    'us': e.description
                  }
                } : {}, {
                  'vendors': [
                    e.brand
                  ]
                , 'brands': [
                    e.brand
                  ]
                }, _.any(e.sizes) ? {
                  'options': _.extend({
                    'size': {
                      'label': {
                        'us': 'size'
                      }
                    , 'values': {
                        'us': e.sizes
                      }
                    }
                  }, e.color ? {
                    'color': {
                      'label': {
                        'us': 'color'
                      }
                    , 'values': {
                        'us': [e.color]
                      }
                    }
                  } : {})
                } : {})
              }, function(err, res, json){
                err = err || Belt.get(json, 'error');
                if (err) return cb3(new Error(err));

                console.log(Belt.stringify(json.data));

                GB['doc'] = json.data;

                cb3();
              });
            }
          , function(cb3){
              Request({
                'url': O.host + '/product/' + GB.doc._id + '/stock/create.json'
              , 'method': 'post'
              , 'json': {
                  'vendor': GB.brand
                , 'sku': e.url.split('/').pop().replace(/\.html$/, '')
                , 'price': e.price
                , 'available_quantity': 10
                }
              }, function(err, res, json){
                err = err || Belt.get(json, 'error');
                if (err) return cb3(new Error(err));

                console.log(Belt.stringify(json));

                GB['doc'] = json.data;

                cb3();
              });
            }
          , function(cb3){
              Async.eachSeries(e.images, function(i, cb4){
                Request({
                  'url': O.host + '/product/' + GB.doc._id + '/media/create.json'
                , 'method': 'post'
                , 'json': {
                    'remote_url': i
                  }
                }, function(err, res, json){
                  err = err || Belt.get(json, 'error');
                  if (err) return cb3(new Error(err));

                  console.log(Belt.stringify(json.data));

                  GB['doc'] = json.data;

                  cb4();
                });
              }, Belt.cw(cb3, 0));
            }
          ], Belt.cw(cb2, 0));
        }, Belt.cw(next, 0));
      });
    }, function(){ return _.any(GB.results); }, Belt.cw(cb, 0));
  }
], function(err){
  Spin.stop();
  if (err) Log.error(err);
  return process.exit(err ? 1 : 0);
});
