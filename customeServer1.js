import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html" });
  res.end("<h1>hello from server this </h1>");
});

const port = 5000;

server.listen(port, () => {
  console.log("server running on port", port);
});