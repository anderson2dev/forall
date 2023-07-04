import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { DomainImage } from '../../domain/entities/image.model';

@Entity('images')
export class Image extends DomainImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('text')
  url: string;
  @Column('bool')
  enabled: boolean;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
