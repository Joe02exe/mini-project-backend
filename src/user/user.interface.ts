import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNotEmpty, isEmail } from 'class-validator';

export class User {

    @IsNotEmpty()
    @ApiProperty()
    username: string;

    @IsNotEmpty()
    @ApiProperty()
    password: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @IsEmail()
    @ApiProperty()
    email: string;


    @IsDate()
    @ApiProperty()
    birthDate: Date;

    role: 'admin' | 'user';
}