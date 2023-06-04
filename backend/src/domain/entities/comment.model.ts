import { DomainTopic } from './topic.model';
import { User } from '../../infrastructure/entities/user.entity';

export class DomainComment {
  id: string;
  author: User;
  topic: DomainTopic;
  referencedComments: Array<DomainComment>;
  content: string;
  upvotes: number;
  downvotes: number;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}
