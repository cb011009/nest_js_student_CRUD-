import { Controller, Get, Post, Patch, Delete, Body, UseGuards, Param, NotFoundException } from '@nestjs/common';
import { StudentsService } from './student.service';
import { Student} from 'src/schemas/student.schema';
import { AuthGuard } from '@nestjs/passport'; 
import { CreateStudentDto } from 'src/dtos/create-student'; 
import { UpdateStudentDto } from 'src/dtos/update-student'; // Import CreateStudentDto

@Controller('students')
@UseGuards(AuthGuard('basic')) 
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

 
@Get()
async findAll(): Promise<Student[]> {
  return this.studentsService.findAll();
}

@Post()
  async create(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    return this.studentsService.create(createStudentDto);
  }


  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto): Promise<Student> {
    const updatedStudent = await this.studentsService.update(id, updateStudentDto);
    if (!updatedStudent) {
      throw new NotFoundException('Student not found');
    }
    return updatedStudent;
  }


  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.studentsService.delete(id);
  }
}
