import { DbContext } from '../core/context/db-context';
import { ExampleEntity } from '../entities/example.entity';
import { ExampleRepository } from '../repositories/example.repository';

export class ExampleService {
  private readonly exampleRepository: ExampleRepository;

  constructor(private readonly _context: DbContext) {
    this.exampleRepository = new ExampleRepository(this._context);
  }

  async test(): Promise<ExampleEntity[]> {
    return await this.exampleRepository.find();
  }
}
