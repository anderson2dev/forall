import { DomainComment } from '../../domain/entities/comment.model';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Topic } from './topic.entity';

@Entity('comments')
export class Comment extends DomainComment {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ManyToOne(() => User, (user) => user.comments)
  author: User;
  @ManyToOne(() => Topic, (topic) => topic.comments)
  topic: Topic;
  @ManyToOne(() => Comment, (comment) => comment.referencedComments)
  referencedComments: Comment[];
  @Column('text')
  content: string;
  @Column('integer')
  upvotes: number;
  @Column('integer')
  downvotes: number;
  @Column('bool')
  enabled: boolean;
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
