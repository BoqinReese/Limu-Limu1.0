import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(phoneNumber: string, password: string): Promise<any> {
    const user = await this.usersService.findByPhoneNumber(phoneNumber);
    if (user && (await bcrypt.compare(password, user.passwordHash))) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async register(registerDto: RegisterDto): Promise<{ accessToken: string }> {
    const existingUser = await this.usersService.findByPhoneNumber(
      registerDto.phoneNumber,
    );
    if (existingUser) {
      throw new UnauthorizedException('Phone number already registered');
    }

    const user = await this.usersService.create(registerDto);
    await this.usersService.updateLastLogin(user.id);

    const payload = { sub: user.id, phone: user.phoneNumber };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const user = await this.validateUser(
      loginDto.phoneNumber,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    await this.usersService.updateLastLogin(user.id);

    const payload = { sub: user.id, phone: user.phoneNumber };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async setTransactionPin(
    userId: string,
    pin: string,
  ): Promise<{ success: boolean }> {
    await this.usersService.setTransactionPin(userId, pin);
    return { success: true };
  }
}

export interface RegisterDto {
  phoneNumber: string;
  email?: string;
  fullName: string;
  idNumber?: string;
  idType?: string;
  occupation?: string;
  location?: string;
  emergencyContact?: string;
  password: string;
}

export interface LoginDto {
  phoneNumber: string;
  password: string;
}
