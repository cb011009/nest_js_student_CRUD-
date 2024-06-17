import { Module,ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsController } from './student.controller';
import { StudentsService } from './student.service';
import { Student, StudentSchema } from 'src/schemas/student.schema';
import { APP_PIPE } from '@nestjs/core';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]), AuthModule],
  controllers: [StudentsController],
  providers: [StudentsService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    StudentsService
  ],
 
})
export class StudentsModule {}

