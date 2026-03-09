import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ModulesService } from './modules.service';
import { CreateModuleDto, UpdateModuleDto } from './dto/module.dto';
import { Module } from './module.entity';

@Controller('api/modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post()
  create(@Body() dto: CreateModuleDto): Promise<Module> {
    return this.modulesService.create(dto);
  }

  @Get('agent/:agentId')
  findByAgent(@Param('agentId') agentId: string): Promise<Module[]> {
    return this.modulesService.findByAgent(agentId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Module> {
    return this.modulesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateModuleDto,
  ): Promise<Module> {
    return this.modulesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.modulesService.remove(id);
  }
}
