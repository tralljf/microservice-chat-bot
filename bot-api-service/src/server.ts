import express, { Request, Response, NextFunction, request, response } from "express";
import 'express-async-errors';
import './database'
import AppError from './erros/AppError';
import logRequest from './middlewares/logRequest'
import grpc from 'grpc'
import path from 'path'
import ResolveBotService from './services/ResolveBotService'


const app = express();

app.use(express.json());
app.use(logRequest)
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError){
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message
        })
    }

    console.log('🚨🚨🚨' + err)

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })

})

var protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = path.resolve(__dirname, 'proto', 'bot.proto')
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: Object,
        defaults: true,
        oneofs: true
    });

var bot = grpc.loadPackageDefinition(packageDefinition).CoveiroBot;

async function AnswerResponse(call, callback) {
    const resolveBotService = new ResolveBotService()
    const resp = await resolveBotService.execute({
        bot_name: call.request.bot_name,
        command : call.request.command
    })

    callback(null, {answer: JSON.stringify(resp)});
}


var server = new grpc.Server();
server.addService(bot.BotService.service, {Answer: AnswerResponse});
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
server.start();
