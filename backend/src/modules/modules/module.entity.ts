import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Agent } from '../agents/agent.entity';

export type ModuleType = 'markdown' | 'json' | 'html' | 'widget';

@Entity('modules')
export class Module {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  key: string;

  @Column({
    type: 'simple-enum',
    enum: ['markdown', 'json', 'html', 'widget'],
    default: 'markdown',
  })
  type: ModuleType;

  @Column({ type: 'text' })
  data: string;

  @Column({ default: 'default' })
  render: string;

  @ManyToOne(() => Agent, (agent) => agent.modules)
  agent: Agent;

  @Column()
  agentId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
