import { ProductDto } from 'src/product/dto/product.dto';
import { ProductEntity } from 'src/product/entity/product.entity';
import { UserDto } from 'src/users/dto/user.dto';
import { UsersEntity } from 'src/users/entity/users.entity';

export const toUserDto = (data: UsersEntity): UserDto => {
  const { id, first_name, last_name, email } = data;
  const userDto: UserDto = {
    id,
    first_name,
    last_name,
    email,
  };
  return userDto;
};

export const toProductDto = (data: ProductEntity): ProductDto => {
  const {
    id,
    name,
    color,
    price,
    description,
    image_url,
    // created_at,
    // updated_at,
  } = data;
  const productDto: ProductDto = {
    id,
    name,
    color,
    description,
    price,
    image_url,
    // created_at,
    // updated_at,
  };
  return productDto;
};
