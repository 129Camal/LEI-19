var elasticsearch=require('elasticsearch');

var client = new elasticsearch.Client( {  
  hosts: [
    'https://[username]:[password]@[server]:[port]/', // substituir por credenciais validas, ver melhor depois
    'https://[username]:[password]@[server]:[port]/'
  ]
});

module.exports = client;