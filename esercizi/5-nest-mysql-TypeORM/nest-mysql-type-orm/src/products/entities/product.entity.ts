import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  slug: string;
  @Column()
  description: string;
  @Column()
  base_price: number;
  @Column()
  sku: string;
  @Column()
  is_active: boolean;
  @Column()
  created_at: Date;
  @Column()
  updated_at: Date;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable({
    name: 'product_category',
    joinColumn: { name: 'product_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  categories: Category[];
}
