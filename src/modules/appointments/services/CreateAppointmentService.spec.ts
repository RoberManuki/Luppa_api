import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      user_id: 'fake_user_id',
      provider_id: 'fake_provider_id',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('fake_provider_id');
    expect(appointment.user_id).toBe('fake_user_id');
  });

  it('should not be able to create two appointments in the same date', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);
    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'fake_user_id',
      provider_id: 'fake_provider_id',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: 'fake_user_id',
        provider_id: 'fake_provider_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
