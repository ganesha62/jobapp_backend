import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsModule } from './jobs/jobs.module';
import { Job } from './jobs/job.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
       ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      entities: [Job],
      synchronize: true,
      logging: true,
    }),
    JobsModule,
  ],
})
export class AppModule {}
