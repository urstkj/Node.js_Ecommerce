var View = function(options, callback){
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

        Controllers[GB.model.name].Update(self.get(), function(err, doc){
          if (err) return bootbox.alert(err.message);
        });
      }
    , 'click [name="delete"]': function(e){
        e.preventDefault();

        var self = this;

        bootbox.confirm('Are you sure you want to delete this ' + GB.model.name + '?'
        , function(conf){
          if (!conf) return;

          Controllers[GB.model.name].Delete(self.get(), function(err, doc){
            if (err) return bootbox.alert(err.message);

            return document.location = '/admin/' + GB.model.name + '/list';
          });
        });
      }
    }
  , 'transformers': {
      'set:subcategories': function(val, $el){
        $el.val(_.pluck(val, 'name').join(','));
        $el.tagsinput({
          'tagClass': 'label label-primary'
        });
      }
    , 'set:self': function(val, $el){
        $el.attr('data-id', this.data._id);
      }
    , 'get:subcategories': function(val){
        return _.map(Belt.arrayDefalse(val.split(',')), function(v){
          return {
            'name': v
          };
        });
      }
    }
  });

  gb['view'] = new Bh.View(a.o);

  gb.view.emit('load');

  return gb.view;
};

$(document).ready(function(){
  Controllers[GB.model.name].Read({'_id': GB._id}, function(err, doc){
    GB['data'] = doc;

    if (err || !GB.data) return document.location = '/admin/' + GB.model.name + '/list';

    GB['view'] = View({
      'data': GB.data
    });

    Socket.emit('room:join', {
      'room': GB.model.name + ':' + GB._id
    });

    Socket.on(GB.model.name + ':' + GB._id + ':update', function(data){
      GB.view.set(data);
    });

    Socket.on(GB.model.name + ':' + GB._id + ':delete', function(data){
      return document.location = '/admin/' + GB.model.name + '/list';
    });

    GB.view.set(GB.data);
  });
});