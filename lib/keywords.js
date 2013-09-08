var cheerio      = require('cheerio')
  , RemoteServer = require('rfremoteserver');


var $ = null;

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
      RemoteServer.pass({return: $(sel).text()}, callback);
    }
  },

  attr: {
    docs: "get or set an attribute",
    args: ["sel", "attr_name", "*args"],
    impl: function(params, callback){
      var sel = params[0].shift();
      var attr_name = params[0].shift();
      var value = params[0].shift();

      var r = $(sel).attr(attr_name);
      if (value)
        r = $(sel).attr(attr_name, value).attr(attr_name);

      RemoteServer.pass({return: r}, callback);
    }
  }

  
};

module.exports = CheerioLibrary;
