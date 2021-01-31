import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProviderService from './ListProviderService';

let fakeUsersRepository: FakeUsersRepository;
let listProvider: ListProviderService;

describe('ListProvider', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProvider = new ListProviderService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'john@email.com.br',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'john travolta',
      email: 'travolta@email.com.br',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'manuki',
      email: 'manuki@email.com.br',
      password: '12345678',
    });

    const providers = await listProvider.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
