## Chat service
Chat desenvolvido utilizando o framework Nestjs, onde é responsável em subir um servidor WebSocketServer e se conectar a um microserviço via GRPC com PROTO3.

O sitema recebe as requisições, e baseado nos comandos enviados no chat ele envia um brodcast ou uma resposta para o cliente que requisitou (resultado da chamada ao bot).

## Recursos utilizados
    _ Nest
    - TypeScript (framework é escrito em TypeScript)
    - GRPC

[Nest](https://github.com/nestjs/nest) framework TypeScript.

## Instalar a aplicação
  yarn install

## Rodar a aplicação
  yarn start:dev
  
  -- Serviço do Chat deve rodar na porta 3132, para que o front consiga conectar no socket 
  -- É necessário que o microserviço de bot tenha sido iniciado na porta 50051