# teste-tallos

Este é um projeto para controle de funcionários usando VueJS, Vuex e Vuetify, solicitado pela empresa Tallos como teste admissional. O objetivo é em consumir uma API protegida pelo método de autenticação JWT e limitando as ações de cada usuário. (API: https://github.com/KelpGF/Teste-Tallos-API)


## Tecnologias utilizadas:
  - [Vue.js](https://vuejs.org)
  - [Vuex](https://vuex.vuejs.org)
  - [Vuetify](https://vuetifyjs.com/)
  - [NPM](https://www.npmjs.com)
  - [Docker](https://www.docker.com)
  - [Socket.IO](https://socket.io/)


### Instalando as dependências e rodando o projeto:
```
npm install && npm run serve
```
##### ou utilizar o docker
```
docker-compose up --build
```
###### (Caso não utilizar o npm install mas também não queria ficar com os warnings do editor de códigos, você pode copiar do container o node_modules)
```
docker cp teste-tallos:/srv/app/node_modules/. ./node_modules)
```

## Observações sobre o sistema
  - O Administrador possuí acesso a todas as funcionalidades
  - O Gerente possuí acesso a todas as funcionalidades, exeto a de deletar outros funcionários
  - O Gerente não pode cadastrar um Administrador, nem editar o cargo de um funcionário para Administrador
  - O Usuário tem acesso somente a leitura dos dados
