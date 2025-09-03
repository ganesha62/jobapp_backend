import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,  PrimaryColumn, Generated } from 'typeorm';

@Entity('jobs')
export class Job {
  @PrimaryColumn()
  @Generated('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  company: string;

  @Column()
  location: string;

  @Column({
    type: 'enum',
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
  })
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';

  @Column()
  salaryRange: string;

  @Column('text')
  description: string;

  // @Column('text')
  // requirements: string;

  // @Column('text')
  // responsibilities: string;

  @Column('date')
  applicationDeadline: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isRemote: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
