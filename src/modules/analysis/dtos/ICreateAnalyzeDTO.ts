export default interface ICreateAnalyzeDTO {
  fullName: string;
  cpf: string;
  documents: Array<{
    status: string;
    link: string;
  }>;
}
