import { CartEntity } from 'src/cart/entity/cart.entity';
import { UsersEntity } from 'src/users/entity/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cart_item')
export class CartItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CartEntity, (cart) => cart.id)
  cart: CartEntity;

  @ManyToOne(() => UsersEntity, (user) => user.id)
  user: UsersEntity;

  @Column()
  quantity: number;
}
