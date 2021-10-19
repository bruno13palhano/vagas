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
Trata as solicitações de arquivos e chama a função **[`handlerRequest(request, response)`](#handler_request)** para definir as rotas.
- ### <p name="handler_request"></p>handlerRequest(request, response)
Função que define as rotas que o servidor irá responder, são elas:
1. **/insert**
2. **/read**
3. **/update**
4. **/delete**
5. **/listclients**
<br><br>
## <p name="controller_js"></p>Controller.js
No arquivo *controller.js* à variável ***controller*** recebe uma instância da classe **ControllerDB**, que será utilizada para manipular as rotas do usuário e as respostas do servidor por meio de seus métodos. há mais três variáveis responsáveis por configurar a url, são elas:
1. **host**; 
2. **port**;
3. **route** (*/insert, /read, /update, /delete, /listclients*).    

E há mais cinco variáveis para armazenar as respostas do servidor, são elas:
1. **insertResult**
2. **readResult**
3. **updateResult**
4. **deleteResult**
5. **listResult**
- ### <p name="insert_client"></p>insertClient()
Cria um novo cliente no banco de dados, com os dados recebidos do **[`fomulário de inserção`](#insert_html)**. Há dois métodos chamados na variável ***controller*** dentro desta função, são eles:
1. **controller.setUrl("http://${host}:${port}/${route}"):** que define a url para a rota */insert*;
2. **controller.insertClientDB():** método que inseri o cliente no banco de dados e armazena a resposta do servirdor na variável ***insertResult***.
- ### <p name="read_client"></p>readClient()
Faz a leitura do cliente no banco de dados com o id passado no **[`fomulário de leitura`](#read_html)**. Há dois métodos chamados na variável ***controller*** dentro desta função, são eles:
1. **controller.setUrl("http://${host}:${port}/${route}"):** que define a url para a rota */read*;
2. **controller.readClientDB():** método que faz a leitura do cliente no banco de dados e armazena a resposta do servirdor na variável ***readtResult***.
- ### <p name="update_client"></p>updateClient()
Atualiza os dados do cliente no banco de dados referente ao **[`fomulário de atualização`](#update_html)**. Há dois métodos chamados na variável ***controller*** dentro desta função, são eles:
1. **controller.setUrl("http://${host}:${port}/${route}"):** que define a url para a rota */update*;
2. **controller.updateClientDB():** método que atualiza os dados do cliente no banco de dados e armazena a resposta do servirdor na variável ***updateResult***.
- ### <p name="delete_client"></p>deleteClient()
Deleta os dados do cliente no banco de dados referente ao id passado no **[`fomulário para deletar cliente`](#delete_html)**. Há dois métodos chamados na variável ***controller*** dentro desta função, são eles:
1. **controller.setUrl("http://${host}:${port}/${route}"):** que define a url para a rota */delete*;
2. **controller.deleteClientDB():** método que deleta os dados do cliente no banco de dados e armazena a resposta do servirdor na variável ***deleteResult***.
- ### <p name="list_clients"></p>listClients()
Lista os dados de todos os clientes no banco de dados referente ao clicar no **[`botão List`](#list_html)**. Há dois métodos chamados na variável ***controller*** dentro desta função, são eles:
1. **controller.setUrl("http://${host}:${port}/${route}"):** que define a url para a rota */listclients*;
2. **controller.listClientsDB():** método que lista os dados de todos os clientes no banco de dados e armazena a resposta do servirdor na variável ***listResult***.
<br><br>
## <p name="model_js"></p>Model.js
Módulo responsável por manipular os dados no banco mySQL.
- ### <p name="insert_model"></p>insertInDb(connection, table, client)
Este método faz a inserção do cliente no banco de dados, ele recebe três parâmetros:
1. **connection:** recebe a conecção mySQL com o banco de dados mySQL;
2. **tabel:** a tabela onde os dados serão inseridos;
3. **client:** o bjeto com os dados do cliente que serão inseridos.

Retorna o valor 1 em caso de sucesso, e 0 caso contrário.
- ### <p name="read_model"></p>readFromDB(connection, table, id)
Este método faz a leitura de um cliente no banco de dados referente ao id passado, ele recebe três parâmetros:
1. **connection:** recebe a conecção mySQL com o banco de dados mySQL;
2. **tabel:** a tabela onde os dados serão inseridos;
3. **id:** do cliente a ser lido.  

Retorna um objeto com os dados do cliente em caso de sucesso, e um objeto vazio em caso contrário.
- ### <p name="update_model"></p>updateInDB(connection, table, client)
Este método faz a atualização do cliente no banco de dados, ele recebe três parâmetros:
1. **connection:** recebe a conecção mySQL com o banco de dados mySQL;
2. **tabel:** a tabela onde os dados serão inseridos;
3. **client:** o bjeto com os dados do cliente que serão atualizados.  

Retorna o valor 1 em caso de sucesso, e 0 caso contrário.
- ### <p name="delete_model"></p>deleteFromDB(connection, table, id)
Este método deleta um cliente no banco de dados referente ao id passado, ele recebe três parâmetros:
1. **connection:** recebe a conecção mySQL com o banco de dados mySQL;
2. **tabel:** a tabela onde os dados serão inseridos;
3. **id:** do cliente a ser deletado. 

Retorna o valor 1 em caso de sucesso, e 0 caso contrário.
- ### <p name="list_model"></p>listFromDB(connection, table)
Este método lista todos os clientes no banco de dados, ele recebe dois parâmetros:
1. **connection:** recebe a conecção mySQL com o banco de dados mySQL;
2. **tabel:** a tabela onde os dados serão inseridos;

Retorna uma lista com todo os clientes em caso de sucesso, e uma lista vazia caso contrário.
