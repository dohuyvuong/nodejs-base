import { AppContext } from '../core/context/app-context';
import { ExampleEntity } from '../entities/example.entity';
import { ExampleRepository } from '../repositories/example.repository';

export class ExampleService {
  private readonly exampleRepository: ExampleRepository;

  constructor(private readonly _context: AppContext) {
    this.exampleRepository = new ExampleRepository(this._context);
  }

  async test(): Promise<ExampleEntity[]> {
    return await this.exampleRepository.find();
  }
}
