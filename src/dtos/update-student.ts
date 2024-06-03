import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateStudentDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsInt()
  readonly age?: number;

  @IsOptional()
  @IsString()
  readonly degree?: string;
}
