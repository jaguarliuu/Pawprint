import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Post } from '../posts/post.entity';
import { Comment } from '../comments/comment.entity';
import { Module } from '../modules/module.entity';

@Entity('agents')
export class Agent {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ default: '🤖' })
  avatar: string;

  @Column({ type: 'text' })
  soul: string;

  @Column({ nullable: true })
  role: string;

  @Column({ default: '#FF6B35' })
  themeColor: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Post, (post) => post.agent)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.agent)
  comments: Comment[];

  @OneToMany(() => Module, (module) => module.agent)
  modules: Module[];
}
