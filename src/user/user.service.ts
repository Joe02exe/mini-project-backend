import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {}

  async createUser(user: User): Promise<User> {
    try {
      console.log("works!");
      const result = await this.prisma.user.create({ data: user });
      return result;
    } catch (error) {

        console.error('Error creating user:', error);
      throw new Error('Failed to create user.');
    }
  }

  async getAllUsers() {
    try {
      const result = await this.prisma.user.findMany();
      return result;
    } catch (error) {

        console.error('Error fetching all users:', error);
      throw new Error('Failed to fetch users.');
    }
  }

  async deleteUser(id: string) {
    try {
      const result = await this.prisma.user.delete({
        where: { username: id },
      });
      return result;
    } catch (error) {

        console.error('Error deleting user:', error);
      throw new Error('Failed to delete user.');
    }
  }

  async updateUser(user: User) {
    try {
      const result = await this.prisma.user.update({
        where: { username: user.username },
        data: user,
      });
      return result;
    } catch (error) {

        console.error('Error updating user:', error);
      throw new Error('Failed to update user.');
    }
  }

  async checkAuthorization(username: string, password: string) : Promise<any> {
    const user : User = await this.prisma.user.findFirst({
        where : {username: username}
    });
    if (user?.password != password) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
