import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @Length(1, 50)
    username: string;

    @IsString()
    @Length(6, 255)
    password: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    google_id?: string;
    facebook_id?: string;
}