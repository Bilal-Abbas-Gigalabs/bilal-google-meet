const http = require("http");
var link = process.argv.slice(2);

const server = http.createServer((req, res) => {
  res
    .writeHead(301, {
      Location: `${link}`,
    })
    .end();
});

server.listen(5000);