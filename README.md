## CHAT AND CHAT BOT 
    Projeto de estudos:
        - Serviço de CHAT (backend e frontend)
        - Microserviço de BOT

    Front se conecta ao socket no backend e envia a mensagem
    O Backend verifica se a mensagem é para um bot e conecta com GRPC com PROTO 3 ao Microserviço de BOT
    O Bot recebe o comando, consome a API externa e responde ao Backend
    O Backend responde ao cliente que solicitou o BOT
    Caso o Front não chame um comando de bot, o Backend emite um brodcast para todos os clientes conectados no chat

## Recursos utilizados
    - Nodejs (express)
    - HTML
    - CSS
    - Javascript
    - Nestjs
    - TypeScript
    - GRPC
    - TypeORM
    - Mysql

## Instalar a aplicação e execução
    Verificar o README de cada projeto

    Seguir a ordem:
      - bot-api-service
      - chat-server
        - backend
        - frontend
