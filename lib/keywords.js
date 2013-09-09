var cheerio      = require('cheerio')
  , RemoteServer = require('rfremoteserver');

// cheerio cheerio
var $ = null;


/**
 * Helper function to call methods on cheerio
 *
 * @param sel String the selector
 * @param method String the name of the cheerio method to call
 * @param method_args String argument to pass to the cheerio method
 * @param new_value String optional argument. if passed this will set the value
 *
 * @return result String result of the cheerio method call
 */
function _cheerio_method(sel, method, method_arg, new_value){
  var r = $(sel)[method](method_arg);
  if (new_value)
    r = $(sel)[method](method_arg, new_value)[method](method_arg);
  return r;
}

var CheerioLibrary = {

  /**
   * Loads in the HTML string to cheerio
   */
  load: {
    docs: "load in html",
    args: ["html", "*args"],
    impl: function(params, callback){
      var html = params[0].shift();
      var reload = params[0].shift();
      if (!$ || reload) $ = cheerio.load(decodeURIComponent(html));
      RemoteServer.pass({}, callback);
    }
  },

  text: {
    docs: "get the text within the element matchin selector",
    args: ["sel"],
    impl: function(params, callback){
      var sel = params[0].shift();
      RemoteServer.pass({return: _cheerio_method(sel, 'text')}, callback);
    }
  },

  attr: {
    docs: "get or set an attribute",
    args: ["sel", "attr_name", "*args"],
    impl: function(params, callback){
      var sel = params[0].shift();
      var attr_name = params[0].shift();
      var value = params[0].shift();
      var r = _cheerio_method(sel, 'attr', attr_name, value);
      RemoteServer.pass({'return': r}, callback);
    }
  },

  remove_attr: {
    docs: "remove an attribute",
    args: ["sel", "attr_name"],
    impl: function(params, callback){
      var sel = params[0].shift();
      var attr_name = params[0].shift();
      var r = _cheerio_method(sel, 'removeAttr', attr_name).html();
      RemoteServer.pass({return: r}, callback);
    }
  },

  has_class: {
    docs: "test if an element has a class",
    args: ["sel", "class_name"],
    impl: function(params, callback){
      var sel = params[0].shift();
      var class_name = params[0].shift();
      var r = _cheerio_method(sel, 'hasClass', class_name);
      RemoteServer.pass({return: r}, callback);
    }

  
  }


  
};

module.exports = CheerioLibrary;
