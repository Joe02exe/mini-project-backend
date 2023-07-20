import { User } from './user';
import { stringified, validateDTO } from '../transfrom';

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
    
    expect(errors.length).toBe(0);
    expect(instance.username).toBe(user.username);
    expect(instance.firstName).toBe(user.firstName);
    expect(instance.lastName).toBe(user.lastName);
    expect(instance.email).toBe(user.email);
    expect(instance.birthDate).toStrictEqual(user.birthDate);
    expect(instance.password).toBe(user.password);
    expect(instance.role).toBe(user.role);
  })
  it("user should not be validated (empty password)", async () => {
    const user = {
      username: "henry",
      firstName: "henry",
      lastName: "mr",
      password: "",
      role: 'user',
      email: "this@gmail.com",
      birthDate: new Date(1333333).toISOString()
    }
    const {errors} = await validateDTO(User, user)
    
    expect(errors.length).toBe(1);
    expect(stringified(errors)).toContain(`password should not be empty`)
  })

  it("user should not be validated (empty username)", async () => {
    const user = {
      username: "",
      firstName: "henry",
      lastName: "mr",
      password: "pw",
      role: 'user',
      email: "this@gmail.com",
      birthDate: new Date(1333333).toISOString()
    }
    const {errors} = await validateDTO(User, user)
    
    expect(errors.length).toBe(1);
    expect(stringified(errors)).toContain(`username should not be empty`)
  })

  it("user should not be validated (empty email)", async () => {
    const user = {
      username: "henry",
      firstName: "henry",
      lastName: "mr",
      password: "pw",
      role: 'user',
      email: "",
      birthDate: new Date(1333333).toISOString()
    }
    const {errors} = await validateDTO(User, user)
    
    expect(errors.length).toBe(1);
    expect(stringified(errors)).toContain(`email should not be empty`)
  })

  it("user should not be validated (firstname or lastname should not be empty)", async () => {
    const user = {
      username: "henry",
      firstName: "",
      lastName: "",
      password: "password",
      role: 'user',
      email: "this@gmail.com",
      birthDate: new Date(1333333).toISOString()
    }
    const {errors} = await validateDTO(User, user)
    
    expect(errors.length).toBe(2);
    expect(stringified(errors)).toContain(`firstName should not be empty`)
    expect(stringified(errors)).toContain(`lastName should not be empty`)
  })

  it("user should not be validated (wrong userRole)", async () => {
    const user = {
      username: "henry",
      firstName: "henry",
      lastName: "mr",
      password: "pw",
      role: 'randomUserRole',
      email: "this@gmail.com",
      birthDate: new Date(1333333).toISOString()
    }
    const {errors} = await validateDTO(User, user)
    
    expect(errors.length).toBe(1);
    expect(stringified(errors)).toContain(`role must be one of the following values: admin, user`)
  })

  it("user should not be validated (wrong emailInput and no role)", async () => {
    const user = {
      username: "henry",
      firstName: "henry",
      lastName: "mr",
      password: "pw",
      role: "",
      email: "thisIsNotGmail.com",
      birthDate: new Date(1333333).toISOString()
    }
    const {errors} = await validateDTO(User, user)
    
    expect(errors.length).toBe(2);
    expect(stringified(errors)).toContain("email must be an email")
    expect(stringified(errors)).toContain("role should not be empty")
  })
});



