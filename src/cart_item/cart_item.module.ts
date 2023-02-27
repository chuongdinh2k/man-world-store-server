import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemEntity } from './entity/cart_item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartItemEntity])],
})
export class CartItemModule {}
