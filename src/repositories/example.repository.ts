import { AppContext } from '../core/context/app-context';
import { ExampleEntity } from '../entities/example.entity';

export class ExampleRepository {
  constructor(private readonly _context: AppContext) {}

  public async find(): Promise<ExampleEntity[]> {
    const queryRunner = await this._context.connection.getQueryRunner();
    return await queryRunner.manager.getRepository(ExampleEntity).find();
  }
}
