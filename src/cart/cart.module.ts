import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './cart.service';
import { CartEntity } from './entity/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity])],
  providers: [CartService],
  controllers: [CartService],
})
export class CartModule {}
