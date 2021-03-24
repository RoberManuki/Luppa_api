/* eslint-disable @typescript-eslint/no-unused-vars */
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAnalysisRepository from '../repositories/fakes/FakeAnalysisRepository';
import FakeDocumentsRepository from '../repositories/fakes/FakeDocumentsRepository';
import FindAnalyzeService from './FindAnalyzeService';

let fakeAnalysisRepository: FakeAnalysisRepository;
let fakeDocumentsRepository: FakeDocumentsRepository;
let findAnalyze: FindAnalyzeService;
let fakeCacheProvider: FakeCacheProvider;

describe('FindAnalyze', () => {
  beforeEach(() => {
    fakeAnalysisRepository = new FakeAnalysisRepository();
    fakeCacheProvider = new FakeCacheProvider();
    fakeDocumentsRepository = new FakeDocumentsRepository();

    findAnalyze = new FindAnalyzeService(
      fakeAnalysisRepository,
      fakeDocumentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to find an analyze', async () => {
    const analyze = await fakeAnalysisRepository.create({
      fullName: 'john doe',
      cpf: '13223653694',
      documents: [
        { status: 'valid', link: 'link1' },
        { status: 'error', link: 'link2' },
        { status: 'fraud', link: 'link3' },
      ],
    });

    const findAnAnalyze = await findAnalyze.execute(analyze.id);

    // Não consegui fazer os testes corretamente
    expect(findAnAnalyze).toHaveProperty('analysisId');
  });
});
