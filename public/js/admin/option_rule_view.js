var OptionRuleView = function(options, callback){
  var a = Belt.argulint(arguments)
    , self = this
    , gb = {};
  a.o = _.defaults(a.o, {
    'el': $('#container')
  , 'triggers': {
      'submit form': function(e){
        e.preventDefault();
      }
    , 'click [name="submit"]': function(e){
        e.preventDefault();
        var self = this;

        if (self.method === 'update'){
          self.update(function(err, gb){
            if (err) return bootbox.alert(err.message);

            self.loadDoc({
              'doc': gb.doc
            });
          });
        } else {
          self.create(function(err, gb){
            if (err) return bootbox.alert(err.message);

            document.location = '/admin/option_rule/' + gb.doc._id + '/read';
          });
        }
      }
      , 'change #category_dropdown select': function (e) {
        e.preventDefault();
        var category = $('#category_dropdown select option:selected').text();

        $('#category_dropdown input').val(category.indexOf('No Product Category') !== -1 ? undefined : category);
      }
      , 'change [name="vendor"]': function (e) {
        e.preventDefault();
        var vendor = $('[name="vendor"] option:selected').val();

        $('#vendor_dropdown input').val(vendor.indexOf('No vendor') !== -1 ? undefined : vendor);
      }
    }
  , 'transformers': {

    }
  });

  gb['view'] = new Bh.View(a.o);

  gb.view['getSelf'] = function(options, callback){
    var a = Belt.argulint(arguments)
      , self = this
      , gb = {};
    a.o = _.defaults(a.o, {

    });

    var obj = self.get();

    return obj;
  };


  gb.view['loadDoc'] = function(options, callback){
    var a = Belt.argulint(arguments)
      , self = this
      , gb = {};
    a.o = _.defaults(a.o, {
      //doc
    });

    self.set(Belt.objFlatten(a.o.doc));

    if (a.o.doc.category && a.o.category !== '') {
      $('#category_dropdown [name="category"]').val(a.o.doc.category);
      $('#category_dropdown [value="' + a.o.doc.category + '"]').prop('selected', true);
    }
    if (a.o.doc.vendor) {
      $('#vendor_dropdown [name="vendor"]').val(a.o.doc.vendor);
      $('#vendor_dropdown [value="' + a.o.doc.vendor + '"]').prop('selected', true);
    }

    self['doc'] = a.o.doc;
  };

  gb.view['create'] = function(options, callback){
    var a = Belt.argulint(arguments)
      , self = this
      , gb = {};
    a.o = _.defaults(a.o, {

    });

    gb['data'] = self.getSelf();
    if (gb.data.vendor == '') delete gb.data.vendor;
    gb['update'] = _.pick(gb.data, [
      'value'
      , 'name'
      , 'category'
      , 'brand'
      , 'vendor'
      , 'active'
      , 'new_value'
      , 'new_name'
      , 'option_hide'
      , 'value_hide'
    ]);

    if (!gb.update.term) delete gb.update.term;

    gb.update = {
      'json': JSON.stringify(gb.update)
    };

    Async.waterfall([
      function(cb){
        $.post('/admin/option_rule/create.json', gb.update, function(json){
          if (Belt.get(json, 'error')) return cb(new Error(json.error));

          gb['doc'] = Belt.get(json, 'data');

          cb();
        });
      }
    ], function(err){
      a.cb(err, gb);
    });
  };

  gb.view['update'] = function(options, callback){
    var a = Belt.argulint(arguments)
      , self = this
      , gb = {};
    a.o = _.defaults(a.o, {

    });

    gb['data'] = self.getSelf();

    if (gb.data.vendor == '') delete gb.data.vendor;
    gb['update'] = _.pick(gb.data, [
      'value'
      , 'name'
      , 'category'
      , 'brand'
      , 'vendor'
      , 'active'
      , 'new_value'
      , 'new_name'
      , 'option_hide'
      , 'value_hide'
    ]);

    gb.update = {
      'json': JSON.stringify(gb.update)
    };

    Async.waterfall([
      function(cb){
        $.post('/admin/option_rule/' + self._id + '/update.json', gb.update, function(json){
          if (Belt.get(json, 'error')) return cb(new Error(json.error));

          gb['doc'] = Belt.get(json, 'data');

          cb();
        });
      }
    ], function(err){
      a.cb(err, gb);
    });
  };

  gb.view['method'] = a.o.method;
  gb.view['_id'] = a.o._id;

  gb.view.emit('load');

  Async.waterfall([
    function(cb){
      $.get('/cache/product/whitelist/categories.json', function(json){
        if (Belt.get(json, 'error')) return cb(new Error(json.error));

        gb['product_categories'] = Belt.get(json);
        gb.product_categories = ['< No Product Category >'].concat(gb.product_categories);
        _.each(gb.product_categories, function(category){
          $("#category_dropdown select").append('<option value="' + category + '">' + category + '</option>');
        });
        cb();
      });
    }
  ]);

  return gb.view;
};
