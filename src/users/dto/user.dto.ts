import { IsNotEmpty, IsEmail } from 'class-validator';
import { IsPhoneNumber } from 'src/decorators';

export class UserDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  createdOn?: Date;
}
