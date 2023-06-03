import { ICommentInterface } from './comment.entity';
import { IUserEntity } from './user.entity';

export interface ITopicEntity {
  id: string;
  upvotes: number;
  downvotes: number;
  title: string;
  description: string;
  comments: Array<ICommentInterface>;
  author: IUserEntity;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}
