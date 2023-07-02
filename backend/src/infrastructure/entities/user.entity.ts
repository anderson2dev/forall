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
import { DomainUser } from '../../domain/entities/user.model';
import { Profile } from './profile.entity';
import { Topic } from './topic.entity';
import { Comment } from './comment.entity';

@Entity('users')
export class User extends DomainUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar')
  login: string;
  @Column('varchar')
  password: string;
  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
  @OneToMany(() => Topic, (topic) => topic.author)
  createdTopics: Topic[];
  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];
  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;
  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;
  @Column('boolean')
  enabled: boolean;
}
