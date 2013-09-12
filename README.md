robotframework-cheerio
======================

[![NPM](https://nodei.co/npm/robotframework-cheerio.png)](https://nodei.co/npm/robotframework-cheerio/) 

Example keyword library for cheerio.  It uses https://github.com/bulkan/robotremoteserverjs 

    npm install -g robotframework-cheerio


To start a remote server that automatically include keywords for cheerio

    rf-cheerio


You can also load it with other libraries


```
var RemoteServer = require('rfremoteserver')
  , CheerioLibrary = require('../lib/keywords');


var options = {host: 'localhost', port: 8270};


var SimpleKeywordLibray = {

    my_keyword = {
        docs: "just an example keyword",
        args: ["*args"],
        impl: function(params, callback){
           RemoteServer.pass({'return': 'yay'}, callback);
        }
    }

}

server = new RemoteServer(options, [CheerioLibrary, SimpleKeywordLibrary]);
server.start_remote_server();
```


An example test case file for Robot Framework


```
*** Settings ***
Library  OperatingSystem
Library    Remote    http://localhost:${PORT}

*** Variables ***
${PORT}    8270

*** Test Cases ***

Text
   ${html}=  Get Binary File  ${CURDIR}${/}index.html
   Load   ${html}
   ${text}=   Text  .apple
   Should Be Equal As Strings  ${text}  Apple


Attr
   ${html}=  Get Binary File  ${CURDIR}${/}index.html
   Load   ${html}     True
   ${attr}  Attr  ul  id
   Log  ${attr}
   Should Be Equal As Strings  ${attr}   fruits
   Attr  ul  id   new_fruits
   ${attr}  Attr  ul  id
   Should Be Equal As Strings  ${attr}  new_fruits


Remove Attr
   ${html}=  Get Binary File  ${CURDIR}${/}index.html
   Load   ${html}     True
   Remove Attr  ul  id
   ${attr}  Attr  ul  id
   Log  ${attr}
   Should Be Empty  ${attr}


Has Class
   ${html}=  Get Binary File  ${CURDIR}${/}index.html
   Load   ${html}     True
   ${ret}=  Has Class  ul  fruits
   Should Be Equal As Strings  ${ret}  False

   ${ret}=  Has Class  ul>li  orange
   Should Be Equal As Strings  ${ret}  True

   ${ret}=  Has Class  \#contentdiv  content
   Should Be Equal As Strings  ${ret}  True


Add Class
   ${html}=  Get Binary File  ${CURDIR}${/}index.html
   Load   ${html}     True

   Add Class  ul   meyveler
   ${ret}=  Has Class  ul  meyveler
   Should Be Equal As Strings  ${ret}  True
```
