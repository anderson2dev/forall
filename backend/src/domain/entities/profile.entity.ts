export interface IProfileEntity {
  id: string;
  name: string;
  birthDate: string;
  avatarUrl?: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
