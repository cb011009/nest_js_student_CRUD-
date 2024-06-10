import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BasicStrategy } from './basic.strategy';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports:[ConfigModule],
  providers: [AuthService, BasicStrategy],
  exports: [AuthService],
})
export class AuthModule {}


