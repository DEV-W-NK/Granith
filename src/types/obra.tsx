export type StatusObra = 'ativa' | 'pausada' | 'concluida' | 'cancelada' | 'planejamento';

export interface Obra {
  id: string;
  nome: string;
  cliente: string;
  status: StatusObra;
  localizacao: string;
  dataInicio: string;
  previsaoTermino: string;
  orcamentoTotal: number;
  gastoAtual: number;
  progressoFisico: number;
  equipe: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface NovaObra {
  nome: string;
  cliente: string;
  status: StatusObra;
  localizacao: string;
  dataInicio: string;
  previsaoTermino: string;
  orcamentoTotal: number;
  gastoAtual?: number;
  progressoFisico?: number;
  equipe?: number;
}

export interface ObrasStats {
  totalObras: number;
  obrasAtivas: number;
  obrasPausadas: number;
  obrasConcluidas: number;
  orcamentoTotal: number;
  gastoTotal: number;
  progressoMedio: number;
}

export interface SearchObrasParams {
  searchTerm?: string;
  statusFilter?: StatusObra | null;
}