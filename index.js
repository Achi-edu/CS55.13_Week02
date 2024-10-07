const http = require("http");
const fs = require("fs").promises;

const requestListener = function(req, res) {
  console.log(req.url);

  if (req.url === "/") {
    fs.readFile(__dirname + "/index.html")
        .then(contents => {
          res.setHeader("Content-Type", "text/html; charset=UTF-8");
          res.writeHead(200);
          res.end(contents);
        });
  } else if (req.url === "/data.json") {
    fs.readFile(__dirname + "/data.json")
        .then(contents => {
          res.setHeader("Content-Type", "application/json; charset=UTF-8");
          res.writeHead(200);
          res.end(contents);
        });
  } else if (req.url === "/assets/styles.css") {
      fs.readFile(__dirname + "/assets/styles.css")
          .then(contents => {
              res.setHeader("Content-Type", "text/css; charset=UTF-8");
              res.writeHead(200);
              res.end(contents);
          });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
};

const server = http.createServer(requestListener);
const host = "0.0.0.0";
const port = "8080";

server.listen(port, host, () => {
  console.log('Server is running');
});
