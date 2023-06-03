import { ITopicEntity } from '../../domain/entities/topic.entity';
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
export class Topic implements ITopicEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('string')
  title: string;
  @Column('text')
  description: string;
  @ManyToOne(() => User, (user) => user.createdTopics)
  author: User;
  @OneToMany(() => Comment, (comment) => comment.topic)
  comments: Comment[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column('number')
  upvotes: number;
  @Column('number')
  downvotes: number;
  @Column('boolean')
  enabled: boolean;
}
