import { Body, Controller, Post, Get } from '@nestjs/common';
import { Post as PostEntity } from './entities/post.entity';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Param, Put, Delete } from '@nestjs/common';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get()
  async findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  @Post()
  async create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return await this.postsService.create(createPostDto);
  }

  @Put(':id')
  async update(
    @Body() updatePostDto: UpdatePostDto,
    @Param('id') id: number,
  ): Promise<PostEntity | null> {
    return await this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.postsService.remove(id);
  }
}
