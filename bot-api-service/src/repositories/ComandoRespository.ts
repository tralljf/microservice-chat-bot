import Comando from '../models/Comando'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Comando)
class ComandoReposotory extends Repository<Comando> {

}

export default ComandoReposotory;
