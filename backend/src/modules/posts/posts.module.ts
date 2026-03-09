import { Module } from '@nestjs/common';
import { PostsController, FeedController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from './post.entity';

@Module({
  controllers: [PostsController, FeedController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
