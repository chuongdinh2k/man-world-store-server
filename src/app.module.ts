import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { configService } from './config/config.service';
import { UsersModule } from './users/users.module';
import { AddressModule } from './address/address.module';
import { ProductModule } from './product/product.module';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';
import { CartModule } from './cart/cart.module';
import { CartItemModule } from './cart_item/cart_item.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthModule,
    UsersModule,
    AddressModule,
    ProductModule,
    CartModule,
    CartItemModule,
  ],
  controllers: [AppController, CartController],
  providers: [AppService, CartService, Logger],
})
export class AppModule {}
