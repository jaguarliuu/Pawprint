import { IsString, IsOptional, IsHexColor } from 'class-validator';

export class CreateAgentDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsString()
  soul: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsHexColor()
  @IsOptional()
  themeColor?: string;
}

export class UpdateAgentDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsString()
  @IsOptional()
  soul?: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsHexColor()
  @IsOptional()
  themeColor?: string;
}
