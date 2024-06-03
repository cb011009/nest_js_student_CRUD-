import { Injectable } from '@nestjs/common';


@Injectable()
export class AuthService {
  private readonly username = 'john';
  private readonly password = 'password123';



  async validateUser(username: string, password: string): Promise<any> {
    if (username === this.username && password === this.password) {
      return { username: this.username }; 
    }
    return null;
  }
}

