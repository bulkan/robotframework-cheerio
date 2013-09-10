var xmlrpc         = require('xmlrpc')
  , RemoteServer   = require('rfremoteserver')
  , CheerioLibrary = require('../lib/keywords');

var options = {host: 'localhost', port: 4242};

describe('CheerioLibrary', function() {
  var server = null;
  var client = null;

  before(function(done){
    server = new RemoteServer(options, [CheerioLibrary]);
    server.start_remote_server();
    // need to give the server a litte time to start
    setTimeout(function(){
      var html = encodeURIComponent('<ul id="fruits"><li class="apple">Apple</li><li class="orange">Orange</li><li class="pear">Pear</li></ul>');
      client = new xmlrpc.createClient(options, false);
      client.methodCall('run_keyword', ['load', [html]], done);
    }, 100);
  });

  it('has keywords from cheerio', function(done){
    client.methodCall('get_keyword_names', null, function(err, value){
      if (err) return done(err);
      value.should.not.be.empty;
      value.should.include('text');
      done();
    });
  });

  it('text returns data', function(done){
    client.methodCall('run_keyword', ['text', ['.apple']], function(err, value){
      if (err) return done(err);
      value.should.have.property('return');
      value.should.have.property('status');
      value.status.should.be.equal('PASS');
      value.return.should.be.equal('Apple');
      done();
    });
  });


  it('attr is able return the attribute value', function(done){
    client.methodCall('run_keyword', ['attr', ['ul', 'id']], function(err, value){
      if (err) return done(err);
      value.status.should.be.equal('PASS');
      value.return.should.be.equal('fruits');
      done();
    });
  });

  it('attr is able to set an attribute value', function(done){
    client.methodCall('run_keyword', ['attr', ['ul', 'id', 'meyveler']], function(err, value){
      if (err) return done(err);
      value.return.should.be.equal('meyveler');
      done();
    });
  });

  it('remove_attr is able to remove an attribute', function(done){
    client.methodCall('run_keyword', ['remove_attr', ['ul', 'id']], function(err, value){
      if (err) return done(err);
      value.status.should.be.equal('PASS');
      client.methodCall('run_keyword', ['attr', ['ul', 'id']], function(err, value){
        value.status.should.be.equal('PASS');
        value.return.should.be.equal('');
        done();
      });
    });
  });

});
