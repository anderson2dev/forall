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
  avatar?: Image;
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
