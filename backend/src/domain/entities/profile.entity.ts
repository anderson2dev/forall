import { IUserEntity } from './user.entity';

export interface IProfileEntity {
  id: string;
  name: string;
  birthDate: Date;
  avatarUrl?: string;
  email: string;
  user: IUserEntity;
}
