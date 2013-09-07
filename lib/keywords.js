var cheerio      = require('cheerio')
  , RemoteServer = require('rfremoteserver');


var $ = null;

var CheerioLibrary = {

  load: {
    docs: "load in html",
    args: ["html"],
    impl: function(params, callback){
      var html = params.shift();
      $ = cheerio.load(decodeURIComponent(html));
      RemoteServer.pass({}, callback);
    }
  },

  get_text: {
    docs: "get the text within the element matchin selector",
    args: ["sel"],
    impl: function(params, callback){
      var sel = params[0].shift();
      RemoteServer.pass({return: $(sel).text()}, callback);
    }
  }
};

module.exports = CheerioLibrary;
