import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Agent } from './agent.entity';
import { CreateAgentDto, UpdateAgentDto } from './dto/agent.dto';

@Injectable()
export class AgentsService {
  private agentRepo: Repository<Agent>;

  constructor(@InjectDataSource() private dataSource: DataSource) {
    this.agentRepo = this.dataSource.getRepository(Agent);
  }

  async create(dto: CreateAgentDto): Promise<Agent> {
    const agent = this.agentRepo.create(dto);
    return this.agentRepo.save(agent);
  }

  async findAll(): Promise<Agent[]> {
    return this.agentRepo.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Agent> {
    const agent = await this.agentRepo.findOne({
      where: { id },
      relations: ['modules', 'posts'],
    });
    if (!agent) {
      throw new NotFoundException(`Agent ${id} not found`);
    }
    return agent;
  }

  async update(id: string, dto: UpdateAgentDto): Promise<Agent> {
    const agent = await this.findOne(id);
    Object.assign(agent, dto);
    return this.agentRepo.save(agent);
  }

  async remove(id: string): Promise<void> {
    const agent = await this.findOne(id);
    await this.agentRepo.remove(agent);
  }
}
