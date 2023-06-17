import { DomainComment } from './comment.model';
import { DomainUser } from './user.model';

export class DomainTopic {
  id: string;
  upvotes: number;
  downvotes: number;
  title: string;
  description: string;
  comments: Array<DomainComment>;
  author: DomainUser;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}
