import { Module } from '@nestjs/common';
import { DatabaseTopicRepository } from './topic.repository';

@Module({
  providers: [DatabaseTopicRepository],
})
export class RepositoryModule {}
