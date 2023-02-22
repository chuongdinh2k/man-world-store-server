import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.create.dto';
import { UserDto } from './dto/user.dto';
import { UsersEntity } from './entity/users.entity';
import * as bcrypt from 'bcrypt';
import { toUserDto } from 'src/shared/mapper';
import { LoginUserDto } from './dto/user-login.dto';
import { comparePasswords } from 'src/shared/utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepo: Repository<UsersEntity>,
  ) {}

  async findOne(options?: object): Promise<any> {
    const user = await this.userRepo.findOne(options);
    return user;
  }

  async findOneByLogin({ email, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new HttpException(
        'Email or password is Invalid!',
        HttpStatus.UNAUTHORIZED,
      );
    }

    // compare password
    const areEqual = await comparePasswords(user.password, password);
    if (!areEqual) {
      throw new HttpException(
        'Email or password is Invalid!',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return toUserDto(user);
  }

  async create(userDto: CreateUserDto): Promise<UserDto> {
    const { first_name, last_name, password, email } = userDto;
    // check if user is exist in the db
    const userExist = await this.userRepo.findOne({
      where: { email },
    });
    if (userExist) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }
    // const newPasswordHased = await bcrypt.hash(password, 10);
    const user: UsersEntity = await this.userRepo.create({
      password,
      first_name,
      last_name,
      email,
    });

    await this.userRepo.save(user);
    return toUserDto(user);
  }
}
