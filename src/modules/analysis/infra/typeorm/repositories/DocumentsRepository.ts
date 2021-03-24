import { getRepository, Repository } from 'typeorm';

import Document from '@modules/analysis/infra/typeorm/entities/Document';
import IDocumentsRepository from '@modules/analysis/repositories/IDocumentsRepository';

class DocumentsRepository implements IDocumentsRepository {
  private ormRepository: Repository<Document>;

  constructor() {
    this.ormRepository = getRepository(Document);
  }

  public async findAllDocuments(): Promise<Document[]> {
    const documents = await this.ormRepository.find();

    return documents;
  }
}

export default DocumentsRepository;
