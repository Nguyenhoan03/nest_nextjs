import { Controller, Body, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
   
    // @Post('/register')
    // async registerUser(@Body() createUserDto: CreateUserDto) {
    //   return this.usersService.registerUser(createUserDto);
    // }
  
    // // @UseGuards(AuthGuard('local'))
    // @Post('/login')
    // async login(@Body() loginUserDto: LoginUserDto) {
    //   return this.usersService.loginUser(loginUserDto);
    // }
}