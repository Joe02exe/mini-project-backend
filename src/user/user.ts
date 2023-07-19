import { ApiProperty } from '@nestjs/swagger';
import { IsDataURI, IsDate, IsDateString, IsEmail, IsNotEmpty, isEmail, isNotEmpty } from 'class-validator';

export class User {

    @ApiProperty()
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @ApiProperty()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @ApiProperty()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsDateString()
    birthDate: Date;

    @IsNotEmpty()
    role: 'admin' | 'user';
}
