$.module = require('com.navid.tabs');

(function(args) {

  var props = {};

  if (_.isArray(args.children)) {

    props.views = _.map(args.children, function forEach(child) {
      return {
        title: _.isString(child.title) ? child.title : '',
        view: child
      };
    });
  }

  if (_.isFinite(args.current)) {
    props.current = parseInt(args.current, 10);
  }

  var tab = _.omit(args, 'children', 'current');

  if (_.size(tab) > 0) {

    // convert string to constant
    if (_.isString(tab.alignment)) {
      tab.alignment = $.module[tab.alignment];
    }

    props.tab = tab;
  }

  $.instance.applyProperties(props);

})(arguments[0] || {});

$.on = function on(name, callback) {
  $.instance.addEventListener(eventName(name), callback);
};

$.off = function off(name, callback) {
  $.instance.removeEventListener(eventName(name), callback);
};

$.applyProperties = function applyProperties(props) {
  $.instance.applyProperties(props);
};

$.add = function addView(title, view) {

  if (!_.isString(title)) {
    view = title;
    title = _.isString(view.title) ? view.title : '';
  }

  $.instance.add(title, view);
};

$.remove = function removeView(viewOrPosition) {
  $.instance.remove(viewOrPosition);
};

function eventName(name) {
  return (name.substr(-11) === '_EVENT_NAME') ? $.module[name.toUpperCase()] : name;
}