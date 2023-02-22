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
