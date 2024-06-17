import { BasicStrategy as PassportBasicStrategy } from 'passport-http';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class BasicStrategy extends PassportStrategy(PassportBasicStrategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  /*async validate(username: string, password: string): Promise<any> {
    return await this.authService.validateUser(username, password);
  }*/
}


