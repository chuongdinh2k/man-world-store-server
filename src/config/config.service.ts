export interface registrationStatus {
  success: boolean;
  message: string;
}
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import 'dotenv/config';
import { AddressEntity } from 'src/address/entity/address.entity';
import { CartEntity } from 'src/cart/entity/cart.entity';
import { CartItemEntity } from 'src/cart_item/entity/cart_item.entity';
import { ProductEntity } from 'src/product/entity/product.entity';
import { UsersEntity } from 'src/users/entity/users.entity';

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}
  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }
  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }
  public getPort() {
    return this.getValue('PORT', true);
  }
  public isProduction() {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }
  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.getValue('MYSQL_HOST'),
      port: parseInt(this.getValue('MYSQL_PORT')),
      username: this.getValue('MYSQL_USER'),
      password: this.getValue('MYSQL_PASSWORD'),
      database: this.getValue('MYSQL_DATABASE'),
      //   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      entities: [
        UsersEntity,
        AddressEntity,
        ProductEntity,
        CartEntity,
        CartItemEntity,
      ],
      migrationsTableName: 'migration',
      migrations: ['src/migration/*.ts'],
      synchronize: true,
    };
  }
}
const configService = new ConfigService(process.env).ensureValues([
  'MYSQL_HOST',
  'MYSQL_PORT',
  'MYSQL_USER',
  'MYSQL_PASSWORD',
  'MYSQL_DATABASE',
]);
export { configService };
