# Desafio Salestime - Node-JS
**A API é dividida em quatro arquivos, sendo eles:** 
- **[`index.js:`](#index_js)** É o arquivo principal, onde inicia o servidor, a conecção com o banco de dados, recebe as rotas do controller e defini as respostas do servidor para cada rota.
- **[`index.html:`](#index_html)** É a camada view da aplicação, onde recebe os dados inseridos pelos usuários nos formulários e mostra as respostas que foram processadas pelas outras camadas(controller e model). 
- **[`controller.js:`](#controller_js)** É a interface responsável por direcionar as requisições http dos usuários para o servidor, assim como, direcionar as respostas do servidor aos usuários. 
- **[`model.js:`](#model_js)** É a classe que vai tratar da inserção dos dados no banco de dados.
<br><br>
# index   
- ## [`Index.html`](#index_html)
  - #### [`Inserir um cliente`](#insert_html);
  - #### [`Lê dados de um cliente`](#read_html);
  - #### [`Atualizar dados de um cliente`](#update_html);
  - #### [`Deletar um cliente`](#delete_html);
  - #### [`Listar clientes`](#list_html).
- ## [`Index.js`](#index_js)
  - #### [`Configurações do servidor e banco de dados mySQL`](#config_server);
  - #### [`handlerFile(request, response)`](#handler_file);
  - #### [`handlerRequest(request, response)`](#handler_request); 
- ## [`Controller.js`](#controller_js)
  - #### [`insertClient()`](#insert_client);
  - #### [`readClient()`](#read_client);
  - #### [`updateClient()`](#update_client);
  - #### [`deleteClient()`](#delete_client);
  - #### [`listClients()`](#list_clients).
- ## [`Model.js`](#model_js)
  - #### [`insertInDb(connection, table, client)`](#insert_model);
  - #### [`readFromDB(connection, table, id)`](#read_model);
  - #### [`updateInDB(connection, table, client)`](#update_model);
  - #### [`deleteFromDB(connection, table, id)`](#delete_model);
  - #### [`listFromDB(connection, table)`](#list_model).
<br><br>
## <p name="index_html"></p>Index.html
- ### <p name="insert_html"></p>Inserir um cliente
O formulário para inserir um cliente no banco de dados possui três campos e um botão:
 1. **Nome do clinte;**
 2. **E-mail do cliente;**
 3. **Endereço;**
 4. **Botão Insert** (faz à chamda da função **[`insertClient`](#insert_client)** do arquivo **[`controller.js`](#controller_js))**.

O id do cliente é gerado automaticamente.
Há duas respostas possíveis ao clicar no botão *Insert*:
 1. **Em caso positivo:** o cliente foi inserido no banco, e a variável ***insertResult*** recebe o valor 1. Em seguida à mensagem "Cliente inserido com sucesso" é imprimida no console;
 2. **Em caso negaivo:** a variável ***insertResult*** recebe o valor 0, e em seguida à mensagem "Erro ao inserir o cliente" é imprimida no console.
- ### <p name="read_html"></p>Lê dados de um cliente
O formulário de leitura dos dados de um cliente possui um único campo, do qual recebe o id do cliente desejado e um botão.
1. **Id do cliente**;
2. **Botão Read** (faz à chamada da função **[`readCLient()`](#read_client)** do arquivo **[`controller.js`](#controller_js))**.

Há duas respostas possíveis ao clicar no botão *Read*:
 1. **Se o cliente existir no banco de dados:** então, à resposta é um objeto com os dados do cliente armazenado na variável ***readResult***, e à mesma é imprimida no console;
 2. **O cliente não existe no banco de dados:** à resposta é um objeto vazio armazenado na variável ***readResult***, e à mesma é imprimida no console.
- ### <p name="update_html"></p>Atualizar dados de um cliente
O formulário para atualizar os dados de um cliente recebe todos os campos e um botão, são eles:
 1. **Id do cliente** (do qual se quer alterar os dados);
 2. **Nome do cliente** (do qual se quer alterar os dados);
 3. **E-mail do cliente** (do qual se quer alterar os dados);
 4. **Endereço do cliente** (do qual se quer alterar os dados);
 5. **Botão Update** (faz à chamada da função **[`updateClient()`](#update_client)** do arquivo **[`controller.js`](#controller_js))**.    

Há duas respostas possíveis ao clicar no botão *update*:   
  1. **O cliente existe e foi alterado:** nesse caso à variável ***updateResult*** recebe o valor 1, e à mensagem "Cliente atualizado com sucesso" é imprimido no console;   
  2. **O cliente não existe no banco de dados:** nesse caso à variável ***updateResult*** recebe o valor 0, e à mensagem "Cliente não existe" é imprimida no console ; 
- ### <p name="delete_html"></p>Deletar um cliente
O formulário para deletar um cliente, possui um úncio campo, referente ao id do cliente a ser deletado e um botão. 
1. **Id do cliente** (do qual se quer deletar os dados);
2. **botão Delete** (faz à chamada da função **[`deleteClient()`](#delete_client)** do arquivo **[`controller.js`](#controller_js))**.

Existe duas respostas possíveis ao clicar no botão *Delete*:
1. **O cliente existia e foi deletado:** nesse caso à variável ***deleteResult*** recebe o valor 1, e à mensagem "Cliente deletado com sucesso" é imprimida no console;
2. **O cliente não existe no banco de dados:** nesse caso à variável ***deleteResul*** recebe o valor 0, e à mensagem "Cliente não existe" é imprimida no console.
- ### <p name="list_html"></p>Listar clientes
O formulário para listar os clientes só possui um botão *List*, que quando clicado faz à chamada da função **[`listClients()`](#list_clients)** do arquivo **[`controller.js`](#controller_js)**. Há duas respostas possíveis ao clicar no botão *List*:
1. **Se há clientes no banco de dados:** todos são armazenados na variável ***listResult***, e em seguida imprimidos no console;
2. **Não há clientes no banco de dados:** ***listResult*** fica vazia, e é imprimida no console.

<br><br>
## <p name="index_js"></p>Index.js
- ### <p name="config_server"></p>Configurações do servidor e banco de dados mySQL
1. **configurações do servidor:** o servidor possui uma variável ***port*** para configurar a porta, na qual ele irá escutar.
2. **configurações do banco de dados mySql:** o banco de dados possui cinco variáveis:  
 2.1. ***database:*** nome do banco de dados a se conectar;   
 2.2. ***host:*** servidor onde está o banco de dados;   
 2.3. ***password:*** senha do servidor;   
 2.4. ***table:*** nome da tabela que será utilizada;   
 2.5. ***user:*** nome do usuário do banco de dados. 
- ### <p name="handler_file"></p>handlerFile(request, response)
- ### <p name="handler_request"></p>handlerRequest(request, response)
<br><br>
## <p name="controller_js"></p>Controller.js
- ### <p name="insert_client"></p>insertClient()
Cria um novo cliente no banco de dados, com os dados recebidos do fomulário de inserção. 
- ### <p name="read_client"></p>readClient()
- ### <p name="update_client"></p>updateClient()
- ### <p name="delete_client"></p>deleteClient()
- ### <p name="list_clients"></p>listClients()
<br><br>
## <p name="model_js"></p>Model.js
- ### <p name="insert_model"></p>insertInDb(connection, table, client)
- ### <p name="read_model"></p>readFromDB(connection, table, id)
- ### <p name="update_model"></p>updateInDB(connection, table, client)
- ### <p name="delete_model"></p>deleteFromDB(connection, table, id)
- ### <p name="list_model"></p>listFromDB(connection, table)
