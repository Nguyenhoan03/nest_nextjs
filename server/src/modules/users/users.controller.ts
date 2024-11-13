import { Controller, Body, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/register')
    RegisterUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.registerUser(createUserDto);
    }
    @Post('/login')
    async login(@Body() loginUserDto: LoginUserDto) {
        return this.usersService.loginUser(loginUserDto);
    }
}
