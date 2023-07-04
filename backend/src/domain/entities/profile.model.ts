import { DomainImage } from './image.model';

export class DomainProfile {
  id: string;
  name: string;
  birthDate: string;
  avatar?: DomainImage;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
