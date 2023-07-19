import { User } from './user';
import { validateDTO } from './transfrom';
import { Status, TaskCategory } from 'src/task/task';

describe('User', () => {
  it('should be defined', () => {
    expect(new User()).toBeDefined();
  });

  it("user should be validated", async () => {
    const user = {
      username: "henry",
      firstName: "henry",
      lastName: "mr",
      password: "notThatStrongPassword",
      role: 'user',
      email: "this@gmail.com",
      birthDate: new Date(1333333).toISOString()
    }
    const {instance, errors} = await validateDTO(User, user)
    
    console.log(instance)
    expect(errors.length).toBe(0);
    expect(instance.username).toBe(user.username);
    expect(instance.firstName).toBe(user.firstName);
    expect(instance.lastName).toBe(user.lastName);
    expect(instance.email).toBe(user.email);
    expect(instance.birthDate).toStrictEqual(user.birthDate);
    expect(instance.password).toBe(user.password);
    expect(instance.role).toBe(user.role);
  })
});
