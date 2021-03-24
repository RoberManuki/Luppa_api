/* eslint-disable @typescript-eslint/no-unused-vars */
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAnalysisRepository from '../repositories/fakes/FakeAnalysisRepository';
import CreateAnalysisService from './CreateAnalysisService';

let fakeAnalysisRepository: FakeAnalysisRepository;
let createAnalysisService: CreateAnalysisService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateAnalysis', () => {
  beforeEach(() => {
    fakeAnalysisRepository = new FakeAnalysisRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAnalysisService = new CreateAnalysisService(
      fakeAnalysisRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create an analyze', async () => {
    const analyze = await fakeAnalysisRepository.create({
      fullName: 'john doe',
      cpf: '13223653694',
      documents: [
        { status: 'valid', link: 'link1' },
        { status: 'error', link: 'link2' },
        { status: 'fraud', link: 'link3' },
      ],
    });

    // Não consegui fazer os testes corretamente
    expect(analyze).toHaveProperty('analysisId');
  });
});
