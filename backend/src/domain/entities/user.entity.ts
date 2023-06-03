import { IProfileEntity } from './profile.entity';
import { ICommentInterface } from './comment.entity';
import { ITopicEntity } from './topic.entity';

export interface IUserEntity {
  id: string;
  login: string;
  password: string;
  profile: IProfileEntity;
  comments: Array<ICommentInterface>;
  createdTopics: Array<ITopicEntity>;
  createdAt: Date;
  updatedAt: Date;
  enabled: boolean;
}
