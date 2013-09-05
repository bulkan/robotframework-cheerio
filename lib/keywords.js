var util         = require('util')
  , cheerio      = require('cheerio')
  , RemoteServer = require('robotremoteserver');

var CheerioLibrary = function(conf, html){
  var self = this;
  self.conf = conf;

  self.$ = cheerio.load(html);

  //console.log(self.$('.apple').html());

  self.get_text = function(params, callback){
    var sel = params[0];
    self.pass({return: self.$(sel).text()}, callback);
  }
};

util.inherits(CheerioLibrary, RemoteServer);

module.exports = CheerioLibrary;
