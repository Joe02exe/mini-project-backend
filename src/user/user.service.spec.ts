import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './user';


describe('UserService', () => {
  let service: UserService;
  let prismaService : PrismaService

  afterAll(async () => {
    prismaService.clear()
  })

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PrismaService],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser()', () => {
    const userData: User = {
      username: "erik",
      firstName: "Erik",
      lastName: "Gasser",
      email: "erik@gmail.com",
      birthDate: new Date(),
      password: "password1",
      role: "admin"
    };
    it('should create user', async () => {
      let user = await service.createUser(userData)
      expect(user.username).toBe(userData.username);
      expect(user.firstName).toBe(userData.firstName);
      expect(user.lastName).toBe(userData.lastName);
      expect(user.email).toBe(userData.email);
      expect(user.birthDate).toStrictEqual(userData.birthDate);
      expect(user.password).toBe(userData.password);
      expect(user.role).toBe(userData.role);

    });
    it('should not create duplicate user', async () => {
      await service
      .createUser(userData)
      .then((user) => expect(user).toBeUndefined())
      .catch((error) => expect(error));

      });
  })

    describe('getUser()', () => {
      const userData: User = {
        username: "erik",
        firstName: "Erik",
        lastName: "Gasser",
        email: "erik@gmail.com",
        birthDate: new Date(),
        password: "password1",
        role: "admin"
      };
      it('should get user with username erik', async () => {
        let user = await service.getUser("erik")
        expect(user.username).toBe(userData.username);
        expect(user.firstName).toBe(userData.firstName);
        expect(user.lastName).toBe(userData.lastName);
        expect(user.email).toBe(userData.email);
        expect(user.password).toBe(userData.password);
        expect(user.role).toBe(userData.role);
      });

      it('should get no user because user does not exist', async () => {
        await service.getUser("notErik")
        .then((user) => expect(user).toBeUndefined())
        .catch((error) => expect(error));
        });
      });


      describe('getUser()', () => {
      const userData: User = {
        username: "erik",
        firstName: "Erik",
        lastName: "Gasser",
        email: "erik@gmail.com",
        birthDate: new Date(),
        password: "password1",
        role: "admin"
      };
      it('should get user with username erik', async () => {
        let user = await service.getUser("erik")
        expect(user.username).toBe(userData.username);
        expect(user.firstName).toBe(userData.firstName);
        expect(user.lastName).toBe(userData.lastName);
        expect(user.email).toBe(userData.email);
        expect(user.password).toBe(userData.password);
        expect(user.role).toBe(userData.role);
      });

      it('should get no user because user does not exist', async () => {
        await service.getUser("notErik")
        .then((user) => expect(user).toBeUndefined())
        .catch((error) => expect(error));
        });
    });
    describe('getUsers()', () => {
      it('should return 1 user: erik', async () => {
        let users = await service.getAllUsers()
        expect(users.length).toBe(1);
      });

      const userData: User = {
        username: "tom",
        firstName: "Tom",
        lastName: "Tasser",
        email: "tom@gmail.com",
        birthDate: new Date(),
        password: "password1",
        role: "user"
      };
      it('should return 2 users', async () => {
        await service.createUser(userData);
        let users = await service.getAllUsers()
        expect(users.length).toBe(2);
      });

      it('should get no user because user does not exist', async () => {
        await service.getUser("notErik")
        .then((user) => expect(user)
        .toBeUndefined())
        .catch((error) => expect(error));
        });
    });
      
    describe('updateUser()', () => {
      const userData: User = {
        username: "erik",
        firstName: "Erik",
        lastName: "Tasser",
        email: "erikNew@gmail.com",
        birthDate: new Date(),
        password: "passwordNew",
        role: "admin"
      };
      it('should update user: erik', async () => {
        let user = await service.updateUser(userData)
      expect(user.username).toBe(userData.username);
      expect(user.firstName).toBe(userData.firstName);
      expect(user.lastName).toBe(userData.lastName);
      expect(user.email).toBe(userData.email);
      expect(user.password).toBe(userData.password);
      expect(user.role).toBe(userData.role);
      });
      const userData2: User = {
        username: "nonExistentUser",
        firstName: "Erik",
        lastName: "Tasser",
        email: "erikNew@gmail.com",
        birthDate: new Date(),
        password: "passwordNew",
        role: "admin"
      };
      it('should not update non existing user', async () => {
        await service.updateUser(userData2)
        .then((user) => expect(user)
        .toBeUndefined())
        .catch((error) => expect(error));
      });  
    }) 

    describe('deleteUser()', () => {
      it('should delete user: erik', async () => {
        await service.deleteUser("erik")
        let users = await service.getAllUsers()
        expect(users.length).toBe(1);
      });
      it('should not be able to delete non existent user: ben', async () => {
        await service.deleteUser("ben")
        .then((user) => expect(user)
        .toBeUndefined())
        .catch((error) => expect(error));
      });
    })
});
