const http = require('http');
const mysql = require('mysql');
const url = require('url');
const fs = require('fs');
const Model = require('./model/model.js');

//porta do servidor
let port = 3000;

//dados da conecção mySQL
let database = "seubanco";
let host = "seuhost";
let password = "seupassword"
let table = "suatabela";
let user = "seuuser";


var connection = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database
});

function handlerFile(request, response){
    
    let path = "."+url.parse(request.url).pathname;

    fs.readFile(path, (err, data) =>{
        if(err){
            if(!handlerRequest(request, response)){
                response.writeHead(404, {"Content-Type" : "text/html;charset=utf-8"});
                response.end("<h1>Página Não Encontrada</h1>");
            }
        }else{
            response.writeHead(200, {"Content-Type" : "text/html"});
            response.write(data);
            response.end();
        }
    });
}

async function handlerRequest(request, response){
    
    try{
        let path = url.parse(request.url, true);
        let method = request.method.toUpperCase();

        if(path.pathname == "/index" && method == "GET"){
            response.writeHead(200, {"Content-Type" : "text/html"});
            response.write("Página index");
            response.end();
            
            return true;

        }else if(path.pathname == "/insert" && method == "POST"){
            let body = '';

            await request.on('data', data =>{ 
                body = data.toString();
            });
            
            let bodyJSON = JSON.parse(body);
            let clientAccessDB = new Model();

            let result = await clientAccessDB.insertInDb(connection, table, bodyJSON);
                
            response.writeHead(200, {"Content-Type" : "text/html"});
            response.write(result.toString());
            response.end();

            return true; 

        }else if(path.pathname == "/read" && method == "POST"){
            let body = '';
            
            await request.on('data', data =>{
                body += data.toString();
            });

            let clientAccessDB = new Model();
            let result = await clientAccessDB.readFromDB(connection, table, body);   

            response.writeHead(200, {"Content-Type" : "text/html"});
            response.write(JSON.stringify(result));
            response.end();

            return true;

        }else if(path.pathname == "/update" && method == "POST"){
            let body = '';

            await request.on('data', data=>{
                body += data.toString();
            });
            
            let bodyJSON = JSON.parse(body);

            let clientAccessDB = new Model();
            let result = await clientAccessDB.updateInDB(connection, table, bodyJSON);

            response.writeHead(200, {"Content-Type" : "text/html"});
            response.write(result.toString());
            response.end();

            return true;

        }else if(path.pathname == "/delete" && method == "POST"){
            let id = '';

            await request.on('data', data=>{ 
                id += data.toString();
            });

            let clientAccessDB = new Model();
            let result = await clientAccessDB.deleteFromDB(connection, table, id);

            response.writeHead(200, {"Content-Type" : "text/html"});
            response.write(result.toString());
            response.end();

            return true;

        }else if(path.pathname == "/listclients" && method == "GET"){
            let clientAccessDB = new Model();
            let result = await clientAccessDB.listFromDB(connection, table);

            response.writeHead(200, {"Content-Type" : "text/html"});
            response.write(JSON.stringify(result));
            response.end();
        }

    }catch(err){
        console.log(err);
    }

    return false;
}

http.createServer((request, response) =>{
    
    handlerFile(request, response);

}).listen(port, (err)=>{
    if(err) console.log(err);

    console.log(`Servidor rodando na porta ${port}`);
});