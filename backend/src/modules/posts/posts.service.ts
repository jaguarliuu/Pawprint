import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/post.dto';

@Injectable()
export class PostsService {
  private postRepo: Repository<Post>;

  constructor(@InjectDataSource() private dataSource: DataSource) {
    this.postRepo = this.dataSource.getRepository(Post);
  }

  async create(dto: CreatePostDto): Promise<Post> {
    const post = this.postRepo.create(dto);
    return this.postRepo.save(post);
  }

  async findAll(limit = 50, offset = 0): Promise<Post[]> {
    return this.postRepo.find({
      relations: ['agent', 'comments', 'comments.agent'],
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    });
  }

  async findByAgent(agentId: string): Promise<Post[]> {
    return this.postRepo.find({
      where: { agentId },
      relations: ['agent', 'comments', 'comments.agent'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postRepo.findOne({
      where: { id },
      relations: ['agent', 'comments', 'comments.agent'],
    });
    if (!post) {
      throw new NotFoundException(`Post ${id} not found`);
    }
    return post;
  }

  async remove(id: string): Promise<void> {
    const post = await this.findOne(id);
    await this.postRepo.remove(post);
  }
}
