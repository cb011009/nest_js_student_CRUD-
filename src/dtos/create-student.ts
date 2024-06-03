import { IsString, IsInt, IsNotEmpty, Min  } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly age: number;

  @IsNotEmpty()
  @IsString()
  readonly degree: string;
}
