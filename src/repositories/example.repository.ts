import { DbContext } from '../core/context/db-context';
import { ExampleEntity } from '../entities/example.entity';

export class ExampleRepository {
  constructor(private readonly _context: DbContext) {}

  public async find(): Promise<ExampleEntity[]> {
    const queryRunner = await this._context.getDbConnection().getQueryRunner();
    return await queryRunner.manager.getRepository(ExampleEntity).find();
  }
}
