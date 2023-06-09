import { DomainProfile } from './profile.model';
import { DomainComment } from './comment.model';
import { DomainTopic } from './topic.model';

export class DomainUser {
  id: string;
  login: string;
  password: string;
  profile: DomainProfile;
  comments: Array<DomainComment>;
  createdTopics: Array<DomainTopic>;
  createdAt: Date;
  updatedAt: Date;
  enabled: boolean;
}
