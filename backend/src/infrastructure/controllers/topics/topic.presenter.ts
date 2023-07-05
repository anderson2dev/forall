import { ApiProperty } from '@nestjs/swagger';

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
