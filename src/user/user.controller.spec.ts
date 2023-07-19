import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './user';


describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  let prismaService: PrismaService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService)
    controller = module.get<UserController>(UserController);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get all users', () => {
    it('should return all users', async () => {
      const result : User[] = [{
        "username": "henry",
        "firstName": "henry",
        "lastName": "mr",
        "password": "notThatStrongPassword",
        "role": "admin",
        "email": "this@gmail.com",
        "birthDate": new Date(1333333)
      },
      {
      "username": "henry_2",
      "firstName": "henry",
      "lastName": "mr2",
      "password": "notThatStrongPasswordEither",
      "role": "user",
      "email": "this2@gmail.com",
      "birthDate": new Date(2333333)

    }]
      jest.spyOn(service, 'getAllUsers').mockResolvedValue(result);
      expect(await controller.getAll()).toBe(result);
    });
  });

  describe('get existing user', () => {
    it('should return the user', async () => {
      const result : User = {
        "username": "henry",
        "firstName": "henry",
        "lastName": "mr",
        "password": "notThatStrongPassword",
        "role": "admin",
        "email": "this@gmail.com",
        "birthDate": new Date(1333333)
      }
      jest.spyOn(service, 'getUser').mockResolvedValue(result);
      expect(await controller.getUser("henry")).toBe(result);
    });
  });

  describe('get non-existing user', () => {
    it('should return the user', async () => {
      jest.spyOn(service, 'getUser')
      expect(await controller.getUser("henry222")).toBe(null);
    });
  });

  describe('add new user', () => {
    it('should create the new user and return the user', async () => {
      const result : User = {
        "username": "henry",
        "firstName": "henry",
        "lastName": "mr",
        "password": "notThatStrongPassword",
        "role": "admin",
        "email": "this@gmail.com",
        "birthDate": new Date(1333333)
      }
      jest.spyOn(service, 'createUser').mockResolvedValue(result);
      expect(await controller.signupUser(result)).toBe(result);
    });
  });

  describe('update user', () => {
    it('should update the user', async () => {
      const result : User = {
        "username": "henry",
        "firstName": "henry",
        "lastName": "mr",
        "password": "notThatStrongPassword",
        "role": "admin",
        "email": "this@gmail.com",
        "birthDate": new Date(1333333)
      }
      jest.spyOn(service, 'updateUser').mockResolvedValue(result);
      expect(await controller.updateUser(result)).toBe(result);
    });
  });

  describe('delete user', () => {
    it('should delete the user', async () => {

      jest.spyOn(service, 'deleteUser').mockResolvedValue(null);
      expect(await controller.deleteUser("henry")).toBe(null);
    });
  });
  
});
