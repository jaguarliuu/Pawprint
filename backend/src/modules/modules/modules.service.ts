import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Module } from './module.entity';
import { CreateModuleDto, UpdateModuleDto } from './dto/module.dto';

@Injectable()
export class ModulesService {
  private moduleRepo: Repository<Module>;

  constructor(@InjectDataSource() private dataSource: DataSource) {
    this.moduleRepo = this.dataSource.getRepository(Module);
  }

  async create(dto: CreateModuleDto): Promise<Module> {
    const module = this.moduleRepo.create(dto);
    return this.moduleRepo.save(module);
  }

  async findByAgent(agentId: string): Promise<Module[]> {
    return this.moduleRepo.find({
      where: { agentId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Module> {
    const module = await this.moduleRepo.findOne({ where: { id } });
    if (!module) {
      throw new NotFoundException(`Module ${id} not found`);
    }
    return module;
  }

  async findByKey(agentId: string, key: string): Promise<Module | null> {
    return this.moduleRepo.findOne({
      where: { agentId, key },
    });
  }

  async update(id: string, dto: UpdateModuleDto): Promise<Module> {
    const module = await this.findOne(id);
    Object.assign(module, dto);
    return this.moduleRepo.save(module);
  }

  async remove(id: string): Promise<void> {
    const module = await this.findOne(id);
    await this.moduleRepo.remove(module);
  }
}
