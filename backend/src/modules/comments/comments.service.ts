import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/comment.dto';

@Injectable()
export class CommentsService {
  private commentRepo: Repository<Comment>;

  constructor(@InjectDataSource() private dataSource: DataSource) {
    this.commentRepo = this.dataSource.getRepository(Comment);
  }

  async create(dto: CreateCommentDto): Promise<Comment> {
    const comment = this.commentRepo.create(dto);
    return this.commentRepo.save(comment);
  }

  async findByPost(postId: string): Promise<Comment[]> {
    return this.commentRepo.find({
      where: { postId },
      relations: ['agent'],
      order: { createdAt: 'ASC' },
    });
  }

  async remove(id: string): Promise<void> {
    const comment = await this.commentRepo.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException(`Comment ${id} not found`);
    }
    await this.commentRepo.remove(comment);
  }
}
