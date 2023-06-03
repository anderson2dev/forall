import { IProfileEntity } from '../../domain/entities/profile.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';

@Entity('profiles')
export class Profile implements IProfileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('string')
  avatarUrl?: string;
  @Column('timetz')
  birthDate: string;
  @Column('string')
  email: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column('string')
  name: string;
}
