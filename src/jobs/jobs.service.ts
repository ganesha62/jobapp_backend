import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './job.entity';

interface JobFilters {
  title?: string;
  location?: string;
  type?: string;
  salaryMin?: number;
  salaryMax?: number;
}

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const job = this.jobRepository.create({
      ...createJobDto,
      applicationDeadline: new Date(createJobDto.applicationDeadline),
    });
    return this.jobRepository.save(job);
  }

  async findAll(filters: JobFilters): Promise<Job[]> {
    const queryBuilder = this.jobRepository.createQueryBuilder('job');

    queryBuilder.where('job.isActive = :isActive', { isActive: true });

    if (filters.title) {
      queryBuilder.andWhere('job.title ILIKE :title', {
        title: `%${filters.title}%`,
      });
    }

    if (filters.location) {
      queryBuilder.andWhere('job.location ILIKE :location', {
        location: `%${filters.location}%`,
      });
    }

    if (filters.type) {
      queryBuilder.andWhere('job.type = :type', { type: filters.type });
    }

    // Basic salary filtering (assumes salary format like "₹5-10 LPA")
    if (filters.salaryMin !== undefined || filters.salaryMax !== undefined) {
      queryBuilder.andWhere(
        '(CAST(SUBSTRING(job.salaryRange FROM \'₹(\\d+)-\') AS INTEGER) >= :salaryMin OR :salaryMin IS NULL)',
        { salaryMin: filters.salaryMin },
      );
      queryBuilder.andWhere(
        '(CAST(SUBSTRING(job.salaryRange FROM \'-(\\d+)\') AS INTEGER) <= :salaryMax OR :salaryMax IS NULL)',
        { salaryMax: filters.salaryMax },
      );
    }

    queryBuilder.orderBy('job.createdAt', 'DESC');

    return queryBuilder.getMany();
  }

  async findOne(id: string): Promise<Job> {
    const job = await this.jobRepository.findOne({ where: { id } });
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    return job;
  }

  async update(id: string, updateJobDto: UpdateJobDto): Promise<Job> {
    const job = await this.findOne(id);
    
    const updatedJob = {
      ...updateJobDto,
      applicationDeadline: updateJobDto.applicationDeadline 
        ? new Date(updateJobDto.applicationDeadline) 
        : job.applicationDeadline,
    };

    await this.jobRepository.update(id, updatedJob);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const job = await this.findOne(id);
    await this.jobRepository.remove(job);
  }
}