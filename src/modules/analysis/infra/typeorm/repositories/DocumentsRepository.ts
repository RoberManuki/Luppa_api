import { getRepository, Repository } from 'typeorm';

import Document from '@modules/analysis/infra/typeorm/entities/Document';
import IDocumentsRepository from '@modules/analysis/repositories/IDocumentsRepository';

class DocumentsRepository implements IDocumentsRepository {
  private ormRepository: Repository<Document>;

  constructor() {
    this.ormRepository = getRepository(Document);
  }

  private randomInt(min: number, max: number) {
    return min + Math.floor((max - min) * Math.random());
  }

  public async create(documents: string): Promise<Document> {
    const statusValues = ['error', 'valid', 'fraud'];

    const document = this.ormRepository.create({
      status: statusValues[this.randomInt(0, 2)],
      link: documents,
    });

    await this.ormRepository.save(document);

    return document;
  }
}

export default DocumentsRepository;
