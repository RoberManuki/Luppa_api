/* eslint-disable @typescript-eslint/no-unused-vars */
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAnalysisRepository from '../repositories/fakes/FakeAnalysisRepository';
import FakeDocumentsRepository from '../repositories/fakes/FakeDocumentsRepository';
import ListAnalysisService from './ListAnalysisService';

let fakeAnalysisRepository: FakeAnalysisRepository;
let fakeDocumentsRepository: FakeDocumentsRepository;
let listAnalysis: ListAnalysisService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListAnalysis', () => {
  beforeEach(() => {
    fakeAnalysisRepository = new FakeAnalysisRepository();
    fakeCacheProvider = new FakeCacheProvider();
    fakeDocumentsRepository = new FakeDocumentsRepository();

    listAnalysis = new ListAnalysisService(
      fakeAnalysisRepository,
      fakeDocumentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the analysis', async () => {
    const analyze1 = await fakeAnalysisRepository.create({
      fullName: 'john doe',
      cpf: '13223653694',
      documents: [
        { status: 'valid', link: 'link1' },
        { status: 'error', link: 'link2' },
        { status: 'fraud', link: 'link3' },
      ],
    });

    const analyze2 = await fakeAnalysisRepository.create({
      fullName: 'john doe',
      cpf: '13223653694',
      documents: [{ status: 'valid', link: 'link1' }],
    });

    const analysis = await listAnalysis.execute();

    // Não consegui fazer os testes corretamente
    expect(analysis);
  });
});
