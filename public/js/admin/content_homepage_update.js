$(document).ready(function(){
    GB['view'] = ContentView({
        'method': 'update'
        , 'page': 'homepage'
    });

    $('[name="code"]').val(_.times(8, function(){
        return _.sample('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split(''));
    }).join(''));
});
