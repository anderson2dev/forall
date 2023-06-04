import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseTopicRepository } from '../../../src/infrastructure/repository/topic.repository';

describe('DatabaseTopicRepository', () => {
  let service: DatabaseTopicRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseTopicRepository],
    }).compile();

    service = module.get<DatabaseTopicRepository>(DatabaseTopicRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
