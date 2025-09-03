import { IsOptional, IsString, IsIn } from 'class-validator';

export class FilterJobDto {
  @IsOptional()
  @IsString()
  jobTitle?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsIn(['Full-time', 'Part-time', 'Contract', 'Internship'])
  jobType?: string;

  @IsOptional()
  @IsString()
  minSalary?: string;

  @IsOptional()
  @IsString()
  maxSalary?: string;
}