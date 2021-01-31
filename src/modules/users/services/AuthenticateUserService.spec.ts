import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;
let createUser: CreateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to authenticate an user', async () => {
    const user = await createUser.execute({
      name: 'john doe',
      email: 'john@email.com.br',
      password: '123456',
    });

    // const user = await fakeUsersRepository.create({
    //   name: 'john doe',
    //   email: 'john@email.com.br',
    //   password: '123456',
    // });

    const authenticated = await authenticateUser.execute({
      email: 'john@email.com.br',
      password: '123456',
    });

    expect(authenticated).toHaveProperty('token');
    expect(authenticated.user).toEqual(user);
  });

  it('should not be able to authenticate with a non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'john@email.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'john doe',
      email: 'john@email.com.br',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'john@email.com.br',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
