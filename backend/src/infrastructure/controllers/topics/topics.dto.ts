import { ApiProperty } from '@nestjs/swagger';

export class CreateTopicDTO {
  @ApiProperty({ required: true, description: 'Id  of the author topic' })
  author: string;
  @ApiProperty({ required: true, description: 'Title of the topic' })
  description: string;
  @ApiProperty({ required: true, description: 'Description of the topic' })
  title: string;
}
