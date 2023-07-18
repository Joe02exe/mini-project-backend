import { IsDate, IsEmail, IsNotEmpty, isEmail } from 'class-validator';

export class User {

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    firstName: string;

    lastName: string;

    @IsEmail()
    email: string;

    @IsDate()
    birthDate: Date;

    role: 'admin' | 'user';
}