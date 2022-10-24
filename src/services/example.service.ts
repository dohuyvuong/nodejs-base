import { AppContext } from '../core/context/app-context';
import { ResponseCodeEnum } from '../core/enums/response-code.enum';
import { ApiError } from '../core/models/api.error';
import { ExampleEntity } from '../entities/example.entity';
import { ExampleRepository } from '../repositories/example.repository';

export class ExampleService {
  private readonly exampleRepository: ExampleRepository;

  constructor(private readonly _context: AppContext) {
    this.exampleRepository = new ExampleRepository(this._context);
  }

  async getExamples(): Promise<ExampleEntity[]> {
    const result = await this.exampleRepository.find();
    return new Promise((resolve) => {
      setTimeout(() => resolve(result), 30000);
    });
  }

  async getExample(id: number): Promise<ExampleEntity> {
    const example = await this.exampleRepository.findById(id);
    if (!example) {
      throw new ApiError(ResponseCodeEnum.NOT_FOUND);
    }

    return example;
  }
}
