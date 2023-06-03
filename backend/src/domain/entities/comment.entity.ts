import { ITopicEntity } from './topic.entity';
import { User } from '../../infrastructure/entities/user.entity';

export interface ICommentInterface {
  id: string;
  author: User;
  topic: ITopicEntity;
  referencedComments: Array<ICommentInterface>;
  content: string;
  upvotes: number;
  downvotes: number;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}
