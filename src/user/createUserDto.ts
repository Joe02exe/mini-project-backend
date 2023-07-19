import { ApiProperty } from '@nestjs/swagger';
import { IsDataURI, IsDate, IsDateString, IsEmail, IsNotEmpty, isEmail } from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty()
    @ApiProperty()
    username: string;

    @IsNotEmpty()
    @ApiProperty()
    password: string;

    @ApiProperty()
    firstName?: string;

    @ApiProperty()
    lastName?: string;

    @IsEmail()
    @ApiProperty()
    email: string;

    @ApiProperty()
    @IsDateString()
    birthDate: Date;

    role: 'admin' | 'user';
}