import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './student/student.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import {ConfigService} from '@nestjs/config';


@Module({
  imports: [ 
    ConfigModule.forRoot({
      isGlobal: true, 
      envFilePath: '.env',
    }),

    MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('MONGO_DB_CONNECTION_STRING'),
    }),

    inject: [ConfigService],
  }),
  StudentsModule,
  AuthModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

