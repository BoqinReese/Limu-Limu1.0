import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'SawaSave API - Digital Group Savings for Juba, South Sudan';
  }
}
