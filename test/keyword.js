var xmlrpc       = require('xmlrpc')
  , CheerioLibrary = require('../lib/keywords');

var options = {host: 'localhost', port: 4242};

describe('CheerioLibrary', function() {
  var server = null;

  before(function(done){
    var html = '<ul id="fruits"><li class="apple">Apple</li><li class="orange">Orange</li><li class="pear">Pear</li></ul>';
    server = new CheerioLibrary(options, html);
    server.start_remote_server();
    // need to give the server a litte time to start
    setTimeout(done, 100);
  });

  it('has keywords from cheerio', function(done){
    var client = new xmlrpc.createClient(options, false);
    client.methodCall('get_keyword_names', null, function(err, value){
      if (err) return done(err);
      value.should.not.be.empty;
      value.should.include('get text');
      done();
    });
  });

  it('get_text returns data', function(done){
    var client = new xmlrpc.createClient(options, false);
    client.methodCall('run_keyword', ['get text', '.apple'], function(err, value){
      if (err) return done(err);
      value.should.have.property('return');
      value.should.have.property('status');
      value.status.should.be.equal('PASS');
      value.return.should.be.equal('Apple');
      done();
    });
  });
});