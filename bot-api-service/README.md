## Bot Service
Projeto de estudos feito em NodeJS com TypeScript, utilizando o TyperORM e banco de dados Mysql.
E um servidor GRPC com PROTO 3 que resolve e responde a comando cadastrados no banco de dados.

O sistema é um micro serviço que responde as chamadas via protocolo PROTO3, ao receber um comando ele consulta na base qual a api externa ele precisa se comunicar, faz a requisição é retorna o resultado para o serviço que solicitou.

Essa aplicação não é responsável por cadastrar os bot e comandos, essa aplicação fica responsável por outra API a bot-api-CRUD

## Recursos utilizados
    _ NodeJS
    - TypeScript
    - TypeORM
    - Mysql
    - GRPC

## Instalar a aplicação
    yarn install

## Rodar a aplicação
    yarn dev:server

    -- Servidor GRPC rodando na porta 50051
