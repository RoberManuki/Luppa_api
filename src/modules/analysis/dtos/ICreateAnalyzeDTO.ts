export default interface ICreateAnalyzeDTO {
  fullName: string;
  cpf: string;
  documents: Array<{
    status: 'fraud' | 'valid' | 'error';
    link: string;
  }>;
}
