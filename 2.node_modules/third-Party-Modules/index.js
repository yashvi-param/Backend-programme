import http from "http";

const server = http.createServer((req ,res)  =>{
    res.end("Hello from node server");
});

const port=5000;

server.listen(port, (err) => {
    if(err){
        console.log(err);
        return;
    }else{
        console.log("server running on port",port);
    }
});