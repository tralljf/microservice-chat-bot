import { Module } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import { AppGateway } from '../app.gateway';
import {ClientsModule, Transport} from "@nestjs/microservices";
import { join } from 'path';

@Module({
    imports: [ //Cria conexão da fila de requisições
        new Promise((resolve) => {
            setTimeout(() => {
                resolve(ClientsModule.register([
                    {
                        name: 'BOT_PACKAGE',
                        transport: Transport.GRPC,
                        options: {
                            url: 'localhost:50051',
                            package: 'CoveiroBot',
                            protoPath: join(__dirname, '../proto/bot.proto')
                        },
                    },
                ]))
            }, 500)
        })
    ],
    providers: [AppGateway, ConfigService]
})
export class ChatModule {}
