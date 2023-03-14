import { IsNotEmpty, IsEmail } from 'class-validator';
import { IsPhoneNumber } from 'src/decorators';
export class CreateUserDto {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;


  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}
