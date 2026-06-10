import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  slug: string;
  @Column({ nullable: true })
  description: string;
  @Column({ name: 'is_active' })
  isActive: number;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];
}