import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt-auth.strategy';
import { GoogleStrategy } from './google-auth.strategy';
import { RolesGuard } from './roles.guard'; 
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google', session: true }),
    JwtModule.registerAsync({
      inject: [ConfigService], 
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), 
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, GoogleStrategy, RolesGuard],
  controllers: [AuthController],
  exports: [AuthService, RolesGuard, JwtModule], 
})
export class AuthModule {}

