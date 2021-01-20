import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'john@email.com.br',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê kk',
      email: 'johntre@example.com',
    });

    expect(updatedUser.name).toBe('John Trê kk');
    expect(updatedUser.email).toBe('johntre@example.com');
  });

  it('should not be able to change to another user email ', async () => {
    await fakeUsersRepository.create({
      name: 'john doe',
      email: 'john@email.com.br',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@email.com.br',
      password: 'abcdef',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'teste',
        email: 'john@email.com.br',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'john@email.com.br',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê kk',
      email: 'johntre@example.com',
      old_password: '123456',
      password: 'abcabc',
    });

    expect(updatedUser.password).toBe('abcabc');
  });

  it('should not be able to update the password without the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'john@email.com.br',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê kk',
        email: 'johntre@example.com',
        password: 'abcabc',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'john@email.com.br',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê kk',
        email: 'johntre@example.com',
        old_password: 'wrong_old',
        password: 'abcabc',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
