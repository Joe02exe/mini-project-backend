import {
    Controller,
    Post,
    Body,
    Get,
    Delete,
    Param,
    ParseIntPipe,
    Put,
  } from '@nestjs/common';
import { User, User as UserModel} from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    
    @Post('add')
    async signupUser(@Body() user : User) {
      console.log(user)
      return this.userService.createUser(user);
    }

    @Get('getAll')
    async getAll() {
      return this.userService.getAllUsers();
    }

    @Delete('delete/:id')
    deleteUser(@Param('id') id: string) {
      return this.userService.deleteUser(id);
    }

    @Put('update/:id')
    updateUser(@Param('id') id: string, @Body() user : User){
      return this.userService.updateUser(user)
    }

}
