// students.service.ts

import { Injectable, BadRequestException ,NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from 'src/schemas/student.schema';
import { CreateStudentDto } from 'src/dtos/create-student'; 
import { UpdateStudentDto } from 'src/dtos/update-student'; 
@Injectable()
export class StudentsService {
  constructor(@InjectModel(Student.name) private readonly studentModel: Model<StudentDocument>) {}

  async findAll(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const createdStudent = new this.studentModel(createStudentDto);
    try {
      return await createdStudent.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
    const allowedFields = ['name', 'age', 'degree']; // Define allowed fields
    const updateKeys = Object.keys(updateStudentDto);
    const isValidOperation = updateKeys.every(key => allowedFields.includes(key));

    if (!isValidOperation) {
      throw new BadRequestException('Invalid update operation: some fields are not allowed.');
    }

    const existingStudent = await this.studentModel.findByIdAndUpdate(id, updateStudentDto, { new: true });
    if (!existingStudent) {
      throw new NotFoundException(`Student with ID '${id}' not found`);
    }
    return existingStudent;
  }

  async delete(id: string): Promise<void> {
    const deletedStudent = await this.studentModel.findByIdAndDelete(id);
    if (!deletedStudent) {
      throw new NotFoundException(`Student with ID '${id}' not found`);
    }
  }
}

