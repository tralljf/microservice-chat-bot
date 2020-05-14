import { getRepository } from "typeorm";
import Comando from '../models/Comando'
import axios from 'axios'

interface bootService{
    bot_name: string;
    command: string
}

class ResolveBotService {

    public async execute({bot_name, command}: bootService ): Promise<Object>{
        const comandoRepository = getRepository(Comando);
        const comando = await comandoRepository.findOne({
            where: {
                comando: command
            }
        })

        const data = await axios({
            method: 'get',
            url: comando?.acao,
            responseType: 'json'
        })
        .then(function (res) {
            return res.data
        });

        return data
    }
}


export default ResolveBotService;
