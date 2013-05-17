var APP = APP || {};
APP.bindEvents = function(){
    APP.EventBus.bind("questions:complete", function(points){APP.EventBus.trigger("result:show", points);},this);
};
APP.GO = function(){
    APP.bindEvents();
    var content = $("#content");
    APP.Result.init(content);
    APP.Questions.init(content);
};

APP.EventBus = {};

APP.EventBus.bind = function (ev, callback, context) {
    var calls = this._callbacks || (this._callbacks = {});
    var list = calls[ev] || (calls[ev] = []);
    list.push([callback, context]);
    return this;
};

APP.EventBus.unbind = function (ev, callback) {
    var calls;
    if (!ev) {
        this._callbacks = {};
    } else if (calls = this._callbacks) {
        if (!callback) {
            calls[ev] = [];
        } else {
            var list = calls[ev];
            if (!list) return this;
            for (var i = 0, l = list.length; i < l; i++) {
                if (list[i] && callback === list[i][0]) {
                    list[i] = null;
                    break;
                }
            }
        }
    }
    return this;
};

APP.EventBus.trigger = function (eventName) {
    var list, calls, ev, callback, args;
    var both = 2;
    if (!(calls = this._callbacks)) return this;
    while (both--) {
        ev = both ? 'all' : eventName;
        if (list = calls[ev]) {
            for (var i = 0, l = list.length; i < l; i++) {
                if (!(callback = list[i])) {
                    list.splice(i, 1);
                    i--;
                    l--;
                } else {
                    args = both ? arguments : Array.prototype.slice.call(arguments, 1);
                    callback[0].apply(callback[1] || this, args);
                }
            }
        }
    }
    return this;
};
