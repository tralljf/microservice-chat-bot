import Bot from '../models/Bot'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Bot)
class BotReposotory extends Repository<Bot> {

    public async servicesBot(): Promise<Bot[]>{

        const bot = await this.find()

        return bot;
    }

}

export default BotReposotory;
