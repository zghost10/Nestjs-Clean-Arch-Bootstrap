import { User } from "./user.entity";

describe('User Entity', () => {
  const props = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password',
  };

  it('should create a new user with generated ID', () => {
    const user = User.create(props);

    expect(user).toBeInstanceOf(User);
    expect(user.id).toBeDefined(); // Garante que o ID foi gerado
    expect(user.name).toBe(props.name);
    expect(user.email).toBe(props.email);
    expect(user.password).toBe(props.password);
    expect(user.createdAt).toBeDefined();
    expect(user.updatedAt).toBeDefined();
  });

  it('should create a user with provided ID', () => {
    const id = 'some-uuid';
    const user = User.create(props, id);

    expect(user.id).toBe(id);
  });

  it('should update user properties', () => {
    const user = User.create(props);

    user.name = 'Jane Doe';
    user.email = 'jane@example.com';
    user.password = 'newpass';

    expect(user.name).toBe('Jane Doe');
    expect(user.email).toBe('jane@example.com');
    expect(user.password).toBe('newpass');
    expect(user.createdAt).toBeDefined();
    expect(user.updatedAt).toBeDefined();
  });

  it('should convert to JSON correctly', () => {
    const user = User.create(props);

    expect(user.toJSON()).toStrictEqual({
      id: user.id,
      name: props.name,
      email: props.email,
      companyId: null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  });
});