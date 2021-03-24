import Document from '@modules/analysis/infra/typeorm/entities/Document';

export default interface IDocumentsRepository {
  findAllDocuments(): Promise<Document[]>;
}
