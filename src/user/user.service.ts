import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}
    
    
    async createUser(user : User): Promise<User>  
    {    
        console.log("works!")
        const result = await this.prisma.user.create({data:      
        user});
        return result;
    }
}