import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return 'we are the Worior!!';
  }
}
