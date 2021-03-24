import Document from '../../infra/typeorm/entities/Document';
import IDocumentsRepository from '../IDocumentsRepository';

class FakeDocumentsRepository implements IDocumentsRepository {
  private documents: Document[] = [];

  public async findAllDocuments(): Promise<Document[]> {
    const documentsArray = this.documents.map(doc => doc);

    return documentsArray;
  }
}

export default FakeDocumentsRepository;
