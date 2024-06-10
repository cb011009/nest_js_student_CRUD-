import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
 
  constructor(private readonly configService : ConfigService){}

   private readonly  username = this.configService.get<string>('AUTH_USERNAME');
   private readonly  password = this.configService.get<string>('AUTH_PASSWORD');

  async validateUser(username: string, password: string): Promise<any> {
    if (username === this.username && password === this.password) {
      return { username: this.username }; 
    }
    return null;
  }
}

