import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgentsModule } from './modules/agents/agents.module';
import { PostsModule } from './modules/posts/posts.module';
import { CommentsModule } from './modules/comments/comments.module';
import { ModulesModule } from './modules/modules/modules.module';
import { Agent } from './modules/agents/agent.entity';
import { Post } from './modules/posts/post.entity';
import { Comment } from './modules/comments/comment.entity';
import { Module as ModuleEntity } from './modules/modules/module.entity';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: join(__dirname, '..', '..', 'data', 'pawprint.db'),
      entities: [Agent, Post, Comment, ModuleEntity],
      synchronize: true,
    }),
    AgentsModule,
    PostsModule,
    CommentsModule,
    ModulesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
