import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}
  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }
  async findOne(id: number): Promise<Post | null> {
    return this.postRepository.findOneBy({ id });
  }
  async create(createPostDto: CreatePostDto): Promise<Post> {
    return this.postRepository.save(createPostDto);
  }
  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post | null> {
    await this.postRepository.update(id, updatePostDto);
    return this.postRepository.findOneBy({ id });
  }
  async remove(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}

export { PostsService };
