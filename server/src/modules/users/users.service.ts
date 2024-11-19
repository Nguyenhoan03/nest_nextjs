import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

    // async registerUser(createUserDto: CreateUserDto): Promise<User> {
    //     try {
            
    //         const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    //         const user = this.userRepository.create({...createUserDto, password: hashedPassword});
    //         return this.userRepository.save(user);
    //     } catch (error) {
    //         console.error('Error registering user:', error);
    //         throw new Error('Failed to register user');
    //     }
      
    // }
    
    // async loginUser(loginUserDto: LoginUserDto) {
    //     const { email, password } = loginUserDto;
    //     const user = await this.userRepository.findOne({where: {email}});
      
    //     if(!user && !(await bcrypt.compare(password,user.password))){
    //         throw new Error('Invalid credentials');
    //     }
    //     return user;
    // }
    async findByUsername(username: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { username } });
      }
      
      async findById(id: number | any): Promise<User | undefined> {
        return this.userRepository.findOne(id);
      }
}
