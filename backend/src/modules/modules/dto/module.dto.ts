import type { ModuleType } from '../module.entity';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateModuleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  key: string;

  @IsEnum(['markdown', 'json', 'html', 'widget'])
  @IsOptional()
  type?: ModuleType;

  @IsString()
  @IsNotEmpty()
  data: string;

  @IsString()
  @IsOptional()
  render?: string;

  @IsString()
  @IsNotEmpty()
  agentId: string;
}

export class UpdateModuleDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  data?: string;

  @IsString()
  @IsOptional()
  render?: string;
}
