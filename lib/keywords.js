var cheerio      = require('cheerio')
  , RemoteServer = require('robotremoteserver');


var $ = null;

var CheerioLibrary = {

  load: {
    docs: "load in html",
    args: ["html"],
    impl: function(params, callback){
      var html = params.shift();
      $ = cheerio.load(html);
    }
  },

  get_text: {
    docs: "get the text within the element matchin selector",
    args: ["sel"],
    impl: function(params, callback){
      var sel = params[0];
      RemoteServer.pass({return: self.$(sel).text()}, callback);
    }
};

module.exports = CheerioLibrary;
