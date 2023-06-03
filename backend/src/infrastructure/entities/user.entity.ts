import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { IUserEntity } from '../../domain/entities/user.entity';
import { Profile } from './profile.entity';
import { Topic } from './topic.entity';
import { Comment } from './comment.entity';

@Entity('users')
export class User implements IUserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('string')
  login: string;
  @Column('string')
  password: string;
  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
  @OneToMany(() => Topic, (topic) => topic.author)
  createdTopics: Topic[];
  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column('boolean')
  enabled: boolean;
}
