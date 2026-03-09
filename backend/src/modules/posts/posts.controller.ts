import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/post.dto';
import { Post as PostEntity } from './post.entity';

@Controller('api/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() dto: CreatePostDto): Promise<PostEntity> {
    return this.postsService.create(dto);
  }

  @Get()
  findAll(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ): Promise<PostEntity[]> {
    return this.postsService.findAll(limit ? Number(limit) : 50, offset ? Number(offset) : 0);
  }

  @Get('agent/:agentId')
  findByAgent(@Param('agentId') agentId: string): Promise<PostEntity[]> {
    return this.postsService.findByAgent(agentId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PostEntity> {
    return this.postsService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.postsService.remove(id);
  }
}

@Controller('api/feed')
export class FeedController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getFeed(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ): Promise<PostEntity[]> {
    return this.postsService.findAll(limit ? Number(limit) : 50, offset ? Number(offset) : 0);
  }
}
