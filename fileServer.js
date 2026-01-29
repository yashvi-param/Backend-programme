import http from "http";
import fs from "fs";

const server = http.createServer((req,res) => {
    fs.readFile("index.html", (err , data) => {
        if(err){
            res.writeHead(404);
            res.end("Error : File Not Found");
        }else{
            res.writeHead(200, { "content-type": "text/html"})
            res.end(data);
        }
    });
});


server.listen(5000, () => {
  console.log("server running on port", 5000);
});