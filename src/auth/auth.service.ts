import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ROLES } from './roles.constants';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateJwtToken(user: any): string {
    let roles = [ROLES.REGULAR_USER]; 

    if (user.email === 'dulanmihimansa@gmail.com') {
      roles = [ROLES.ADMIN];
    }

    const payload = {
      sub: user.googleId,
      email: user.email,
      name: user.name,
      roles,
    };
    return this.jwtService.sign(payload);
  }
}


