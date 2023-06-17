import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseTopicRepository } from '../../../infrastructure/repository/topic.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from '../../../infrastructure/entities/topic.entity';

describe('DatabaseTopicRepository', () => {
  let service: DatabaseTopicRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule, TypeOrmModule.forFeature([Topic])],
      providers: [DatabaseTopicRepository],
    }).compile();
    console.log(module);
    service = module.get<DatabaseTopicRepository>(DatabaseTopicRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
