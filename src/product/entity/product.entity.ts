import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  color: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  image_url: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
