import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find({ relations: ['posts'] });
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id }, relations: ['posts'] });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
  findPostsCount(id: number) {
    return this.userRepository.query(
      `
      SELECT COUNT(*) FROM posts WHERE userId = ?`,
      [id],
    );
  }

  //  < return this.userRepository
  //     .createQueryBuilder('user')
  //     .leftJoinAndSelect('user.posts', 'post')
  //     .where('user.id = :id', { id })
  //     .loadRelationCountAndMap('user.postsCount', 'user.posts')
  //     .getOne();<<<<<
  //}
}
