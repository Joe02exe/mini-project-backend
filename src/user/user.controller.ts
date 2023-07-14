import {
    Controller,
    Post,
    Body,
  } from '@nestjs/common';
import { User, User as UserModel} from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Post('add')
      async signupUser(@Body() user : User) {
        
        return this.userService.createUser(user);
      }
}
