var http = require('http');

http.createServer((req,res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
}).listen(3000);