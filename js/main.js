
requirejs.config({
    baseUrl: 'js/modules',
    paths : {
        'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min',
        app: '../app'
    }
});

require(['jquery', 'questions', 'result', 'app'], function($, app){
    debugger;
    APP.GO();
});