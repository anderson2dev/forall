// TODO: FIX THIS DUMMMY SHIT LATER

import { Module } from '@nestjs/common';
import { DatabaseTopicRepository } from './topic.repository';
import { DatabaseUserRepository } from './user.repository';
import { DatabaseCommentRepository } from './comment.repostitory';
import { DatabaseProfileRepository } from './profile.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Topic } from '../entities/topic.entity';
import { Comment } from '../entities/comment.entity';
import { Profile } from '../entities/profile.entity';
@Module({
  imports: [
    TypeOrmModule,
    TypeOrmModule.forFeature([User, Topic, Comment, Profile]),
  ],
  providers: [
    DatabaseTopicRepository,
    DatabaseUserRepository,
    DatabaseProfileRepository,
    DatabaseCommentRepository,
  ],
  exports: [
    DatabaseTopicRepository,
    DatabaseUserRepository,
    DatabaseProfileRepository,
    DatabaseCommentRepository,
  ],
})
export class RepositoryModule {}
