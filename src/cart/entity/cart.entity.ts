import { UsersEntity } from 'src/users/entity/users.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cart')
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UsersEntity, (user) => user.id)
  user: UsersEntity;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
