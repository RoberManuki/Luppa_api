export default interface IAnalyzeResponseDTO {
  analysisId: string;
  fullName: string;
  cpf: string;
  analyzedAt: Date;
  documents: Array<{
    id: string;
    status: string;
    link: string;
  }>;
}
