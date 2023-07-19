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
import { User } from './user';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/user')
@ApiTags('user')
export class UserController {
    constructor(private userService: UserService){}
    
    @Post('add')
    async signupUser(@Body() user : User): Promise<User>  {
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
      return this.userService.getUser(username);
      }

}
