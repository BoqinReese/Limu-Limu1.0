import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  GROUP_ADMIN = 'GROUP_ADMIN',
  TREASURER = 'TREASURER',
  SECRETARY = 'SECRETARY',
  MEMBER = 'MEMBER',
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  fullName: string;

  @Column({ nullable: true })
  idNumber: string;

  @Column({ nullable: true })
  idType: string;

  @Column({ nullable: true })
  occupation: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  emergencyContact: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  transactionPinHash: string;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;

  @Column({ type: 'simple-array', nullable: true })
  roles: string[];

  @Column({ nullable: true })
  deviceToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  lastLoginAt: Date;
}
