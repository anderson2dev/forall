import { DomainProfile } from '../../domain/entities/profile.model';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';

@Entity('profiles')
export class Profile extends DomainProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar')
  avatarUrl?: string;
  @Column('timetz')
  birthDate: string;
  @Column('varchar')
  email: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column('varchar')
  name: string;
}
