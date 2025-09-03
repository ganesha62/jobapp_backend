import { IsString, IsEnum, IsDateString, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator';

export enum JobType {
  FULL_TIME = 'Full-time',
  PART_TIME = 'Part-time',
  CONTRACT = 'Contract',
  INTERNSHIP = 'Internship',
}


export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsEnum(JobType)
  type: JobType;

  @IsString()
  @IsNotEmpty()
  salaryRange: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  applicationDeadline: string;

  @IsOptional()
  @IsBoolean()
  isRemote?: boolean;
}
