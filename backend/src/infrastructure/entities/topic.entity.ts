import { DomainTopic } from '../../domain/entities/topic.model';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';

@Entity('topics')
export class Topic extends DomainTopic {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar')
  title: string;
  @Column('text')
  description: string;
  @ManyToOne(() => User, (user) => user.createdTopics)
  author: User;
  @OneToMany(() => Comment, (comment) => comment.topic)
  comments: Comment[];
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
  @Column('integer')
  upvotes: number;
  @Column('integer')
  downvotes: number;
  @Column('boolean')
  enabled: boolean;
}
