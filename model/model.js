class Model{

    insertInDb(connection, table, client){
        return new Promise((resolve, reject) =>{
            let sql = `INSERT INTO ${table} (clientName,clientEmail,clientAddress) VALUES (?)`;
            let values = [client.clientName, client.clientEmail, client.clientAddress];
         
            connection.query(sql, [values], function(err, result){
                if(err) reject(err);            
                
                if(result.affectedRows > 0){
                    console.log(`Número de registros afetados: ${result.affectedRows}`);
                    resolve(1);
                }else{
                    console.log(`Número de registros afetados: ${result.affectedRows}`);
                    resolve(0);
                }
            });
            
        });
    }

    readFromDB(connection, table, id){
        return new Promise((resolve, reject)=>{
            let sql = `SELECT * FROM ${table} WHERE clientId = ${id}`;

            connection.query(sql, function(err, result){
                if(err) reject(err);
                
                try{
                    console.log(`Leitura em: clientId = ${result[0].clientId}, clientName = ${result[0].clientName}, clientEmail = ${result[0].clientEmail}, clientAddress = ${result[0].clientAddress}`);
                }catch(err){
                    console.log("Cliente não existe");
                }
                 
                resolve(result);
            });
            
        });
    }

    updateInDB(connection, table, client){
        return new Promise((resolve, reject)=>{
            let sql = `UPDATE ${table} SET clientName="${client.clientName}", clientEmail="${client.clientEmail}", clientAddress="${client.clientAddress}" WHERE clientId=${client.clientId}`;
            
            connection.query(sql, function(err, result){
                if(err) reject(err);
                
                if(result.affectedRows > 0){ 
                    console.log(`Número de registros afetados: ${result.changedRows}`);
                    resolve(1);
                }else{
                    console.log(`Número de registros afetados: ${result.changedRows}`);
                    resolve(0);
                }
                
            });
        });
    }

    deleteFromDB(connection, table, id){
        return new Promise((resolve, reject)=>{
            let sql = `DELETE FROM ${table} WHERE clientId=${id}`;

            connection.query(sql, function(err, result){
                if(err) reject(err);

                if(result.affectedRows > 0){
                    console.log("Cliente deletado com sucesso.");
                    resolve(1);
                }else{
                    console.log("Cliente não existe.");
                    resolve(0);
                }
            });
        })
    }

    listFromDB(connection, table){
        return new Promise((resolve, reject)=>{
            let sql = `SELECT * FROM ${table}`;

            connection.query(sql, function(err, result, fields){
                if(err) reject(err);

                console.log("Lista de clientes.");
                resolve(result);
            });
        });
    }
}

module.exports = Model;