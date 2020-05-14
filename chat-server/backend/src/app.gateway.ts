import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  MessageBody,
  ConnectedSocket
 } from '@nestjs/websockets';
import { Logger, Inject } from '@nestjs/common';
import { Socket, Server } from 'socket.io'; 
import {ConfigService} from "@nestjs/config";
import { Observable } from 'rxjs';
import {ClientGrpc} from "@nestjs/microservices";


interface BotRpc {
    answer(data): Observable<any>

}
@WebSocketGateway()
export class AppGateway implements OnGatewayInit{

    @WebSocketServer() 
    private server: Server;
    private logger: Logger = new Logger('AppGateway');


    constructor(
        @Inject('BOT_PACKAGE') private botRpc: ClientGrpc,
        private config: ConfigService,
    ){}

    afterInit(instance) {
        const origins = this.config.get('SOCKET_IO_ALLOW_ORIGINS').split(',');
        const server: Server = instance.server;
        // server.origins(origins);
    }

    @SubscribeMessage('join')
    async onJoin(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: { userName: string , content: string}
    ) {
        console.log('join', client.id);
        this.server.emit('send-message', data);
    }

    @SubscribeMessage('send-message')
    async handleMessage(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: { userName: string, content: string }
    ) {
        try {

            const {content} = data;
        
            if (content.startsWith('!')) {
                const service: BotRpc = this.botRpc.getService('BotService');
                const botName = content.split('!')[1].split(' ')[0];
                service
                    .answer({
                        botName,
                        command: content.split('!')[1]
                    })
                    .toPromise()
                    .then((result) => {
                        console.info(result.answer)
                        client.emit('send-message', {
                            userName: 'CodeBot',
                            content: JSON.parse(result.answer),
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                    });

                return;
            }


            this.server.emit('send-message', data);

            console.log(data);
        } catch (e) {
            console.error(e);
            if (e.name === 'NotAuthorized') {
                this.disconnectClient(client, e);
            }
        }
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
    }

    disconnectClient(client: Socket, error: Error) {
        client.error({message: error.message, name: error.name});
        client.disconnect(true);
    }
}