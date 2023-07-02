import { DomainProfile } from '../../domain/entities/profile.model';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  OneToOne,
} from 'typeorm';

import { Image } from './image.entity';

@Entity('profiles')
export class Profile extends DomainProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @OneToOne(() => Image)
  avatar: Image;
  @Column('timetz')
  birthDate: string;
  @Column('varchar')
  email: string;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
  @Column('varchar')
  name: string;
}
