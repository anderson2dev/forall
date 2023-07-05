import { ApiProperty } from '@nestjs/swagger';
import { DomainTopic } from '../../../domain/entities/topic.model';
import { DomainUser } from '../../../domain/entities/user.model';
import { DomainComment } from '../../../domain/entities/comment.model';

interface ICreatedTopic {
  title: string;
  description: string;
  author: string;
}

export class TopicPresenter {
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  author: string;

  constructor(topic: ICreatedTopic) {
    this.title = topic.title;
    this.description = topic.description;
    this.author = topic.author;
  }
}

export class GetTopicPresenter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  author: DomainUser;
  @ApiProperty()
  comments: DomainComment[];
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  upvotes: number;
  @ApiProperty()
  downvotes: number;

  constructor(topics: DomainTopic) {
    this.id = topics.id;
    this.title = topics.title;
    this.description = topics.description;
    this.author = topics.author;
    this.comments = topics.comments;
    this.createdAt = topics.createdAt;
    this.updatedAt = topics.updatedAt;
    this.upvotes = topics.upvotes;
    this.downvotes = topics.downvotes;
  }
}
