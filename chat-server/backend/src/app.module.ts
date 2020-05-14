/* eslint-disable @typescript-eslint/ban-ts-ignore */
import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import { ChatModule } from './chat/chat.module';


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        ChatModule
    ],
    controllers: [],
})
export class AppModule {
}
