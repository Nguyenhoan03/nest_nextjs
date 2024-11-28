import { HttpException, Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    if (existingUser) {
      throw new HttpException('Email đã tồn tại', 400);
    }
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = this.userRepository.create({ ...createUserDto, password: hashedPassword });
      return this.userRepository.save(user);
    } catch (error) {
      console.error('Error registering user:', error);
      throw new HttpException('Failed to register user', 500);
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<{ access_token: string; refresh_token: string }> {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new HttpException('Invalid credentials', 401);
    }

    const payload = { id: user.id, email: user.email };
    return this.generateToken(payload);
  }

  private generateToken(payload: { id: number; email: string }) {
    const access_token = jwt.sign({ id: payload.id, email: payload.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refresh_token = jwt.sign({ id: payload.id, email: payload.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return { access_token, refresh_token };
  }

  async refresh_token(refresh_token: string): Promise<{ access_token: string }> {
    try {
      const verify = jwt.verify(refresh_token, process.env.JWT_SECRET) as { id: number; email: string };

      const user = await this.userRepository.findOne({ where: { email: verify.email } });
      console.log(refresh_token);

      if (user) {
        const newAccessToken = this.generateAccessToken({ id: verify.id, email: verify.email });
        return { access_token: newAccessToken };
      } else {
        throw new HttpException('Token không hợp lệ', 401);
      }
    } catch (error) {
      throw new HttpException('Token không hợp lệ', 401);
    }
  }

  private generateAccessToken(payload: { id: number; email: string }) {
    return jwt.sign({ id: payload.id, email: payload.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}