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

type Simple = {
  simple: string
}

@Controller('api/user')
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

    @Put('update')
    updateUser(@Body() user : User){
      return this.userService.updateUser(user)
    }

    @Get("get/:username")
    getUser(@Param('username') username : string) {
      console.log("in here")
      return this.userService.getUser(username);
      }

}
