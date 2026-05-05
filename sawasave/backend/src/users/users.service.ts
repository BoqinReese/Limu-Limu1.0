import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserStatus } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const passwordHash = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      passwordHash,
      status: UserStatus.ACTIVE,
    });
    return this.usersRepository.save(user);
  }

  async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { phoneNumber } });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async setTransactionPin(userId: string, pin: string): Promise<User> {
    const pinHash = await bcrypt.hash(pin, 10);
    await this.usersRepository.update(userId, { transactionPinHash: pinHash });
    return this.findById(userId);
  }

  async verifyTransactionPin(
    userId: string,
    pin: string,
  ): Promise<boolean> {
    const user = await this.findById(userId);
    if (!user || !user.transactionPinHash) {
      return false;
    }
    return bcrypt.compare(pin, user.transactionPinHash);
  }

  async updateLastLogin(userId: string): Promise<void> {
    await this.usersRepository.update(userId, {
      lastLoginAt: new Date(),
    });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
}

export interface CreateUserDto {
  phoneNumber: string;
  email?: string;
  fullName: string;
  idNumber?: string;
  idType?: string;
  occupation?: string;
  location?: string;
  emergencyContact?: string;
  password: string;
  roles?: string[];
}
