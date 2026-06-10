import {
  Column,
  Entity,
  //   OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  content: string;
  @Column({ nullable: true })
  summary: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.posts)
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}
