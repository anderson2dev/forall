import { Module } from '@nestjs/common';
import { DatabaseTopicRepository } from './topic.repository';
import { DatabaseUserRepository } from './user.repository';
import { DatabaseCommentRepository } from './comment.repostitory';
import { DatabaseProfileRepository } from './profile.repository';
@Module({
  providers: [
    DatabaseTopicRepository,
    DatabaseUserRepository,
    DatabaseProfileRepository,
    DatabaseCommentRepository,
  ],
})
export class RepositoryModule {}
