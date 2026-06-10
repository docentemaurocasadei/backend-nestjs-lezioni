import { Post } from '../../posts/entities/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];
}
