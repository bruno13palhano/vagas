var insertResult;
var readResult;
var updateResult;
var deleteResult;
var listResult;

let host = "localhost";
let port = "3000";
let route = '';

class ControllerDB{
    constructor(url){
        this.url = url;
    }

    insertClientDb(){  
        let clientForm = document.getElementById('dados');
        let clientJSON = `{"clientName" : "${clientForm[0].value}", "clientEmail" : "${clientForm[1].value}", "clientAddress" : "${clientForm[2].value}"}`;

        fetch(this.url, {
            method: "POST",
            body: clientJSON,
            headers: {
                "Content-Type" : "text/plain",
                "Content-Length" : clientJSON.length
            }
    
        }).then(response =>{
            response.text().then(result =>{
                if(result == 1){    
                    insertResult = result;
                    console.log("Cliente inserido com sucesso.");
                }else{
                    insertResult = result;
                    console.log("Erro ao inserir o cliente.");
                }
            });
    
        }).catch(err =>{
            console.log(err);
        });
    }

    readClientDb(){
        let clientForm = document.getElementById('read');
        let clienteId = clientForm[0].value;

        fetch(this.url, {
            method: "POST",
            body: clienteId,
            headers: {
                "Content-Type" : "text/plain",
                "Content-Length" : clienteId.length
            }

        }).then(response =>{
            response.text().then(result =>{
                readResult = JSON.parse(result);
                console.log(readResult);
            });
    
        }).catch(err =>{
            console.log(err);
        });
    }

    updateClientDb(){
        let clientForm = document.getElementById('update');
        let clientJSON = `{"clientId" : ${clientForm[0].value}, "clientName" : "${clientForm[1].value}", "clientEmail" : "${clientForm[2].value}", "clientAddress" : "${clientForm[3].value}"}`;

        fetch(this.url, {
            method: "POST",
            body: clientJSON,
            headers: {
                "Content-Type" : "text/plain",
                "Content-Length" : clientJSON.length
            }
    
        }).then(response =>{
            response.text().then(result =>{
                if(result == 1){
                    updateResult = result;
                    console.log("Cliente atualizado com sucesso.");
                }else{
                    updateResult = result;
                    console.log("Cliente não existe");
                }
            });
    
        }).catch(err =>{
            console.log(err);
        });
    }

    deleteClientDb(){
        let clientForm = document.getElementById('delete');
        let clientId = clientForm[0].value;

        fetch(this.url, {
            method: "POST",
            body: clientId,
            headers: {
                "Content-Type" : "text/plain",
                "Content-Length" : clientId.length
            }
    
        }).then(response =>{
            response.text().then(result =>{
                if(result == 1){
                    deleteResult = result;
                    console.log("Cliente deletado com sucesso.");
                }else{
                    deleteResult = result;
                    console.log("Cliente não existe.");
                }
            });
    
        }).catch(err =>{
            console.log(err);
        });
    }

    listClientsDB(){

        fetch(this.url, {
            method: "GET"

        }).then(response =>{
            response.text().then(result =>{
                listResult = JSON.parse(result);
                console.log(listResult);
            });
        });
    }

    setUrl(url){
        this.url = url;
    }
    getUrl(){
        return this.url;
    }
}

let controller = new ControllerDB(`http://${host}:${port}/index`);

function insertClient(){
    route = "insert";
    controller.setUrl(`http://${host}:${port}/${route}`);
    controller.insertClientDb();
}
function readClient(){
    route = "read" ;
    controller.setUrl(`http://${host}:${port}/${route}`);
    controller.readClientDb();
}
function updateClient(){
    route = "update";
    controller.setUrl(`http://${host}:${port}/${route}`);
    controller.updateClientDb();
}
function deleteClient(){
    route = "delete";
    controller.setUrl(`http://${host}:${port}/${route}`);
    controller.deleteClientDb();
}
function listClients(){
    route = "listclients";
    controller.setUrl(`http://${host}:${port}/${route}`);
    controller.listClientsDB();
}