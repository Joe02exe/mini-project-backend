import { Injectable } from '@nestjs/common';
import { User } from './user';
import { PrismaService } from '../prisma/prisma.service';
import { validate } from 'class-validator';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) {}

  async createUser(user: User): Promise<User> {
    try {
      await validate(user)
      const result = await this.prisma.user.create({ data: user });
      return result;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user.');
    }
  }

  async getUser(name: string) {
    try {
      const result = await this.prisma.user.findFirst({
        where: { username: name },
      });
      return result;
    } catch (error) {

      console.error('Error getting user:', error);
      throw new Error('Failed to get user.');
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
      const { username, ...updateUser } = user;
      const result = await this.prisma.user.update({
        where: { username: user.username },
        data: updateUser,
      });
      return result;
    } catch (error) {

        console.error('Error updating user:', error);
      throw new Error('Failed to update user.');
    }
  }


}
