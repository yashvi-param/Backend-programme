import http from "http";

const server = http.createServer((req, res) => {

  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("This is Home Page");
  } 
  
  else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("This is About Page");
  } 
  
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Page not found");
  }

});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});