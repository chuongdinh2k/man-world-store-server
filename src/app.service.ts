import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log('runhere');
    return 'Hello World!';
  }
}
