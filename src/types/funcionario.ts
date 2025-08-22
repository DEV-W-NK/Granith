export type FuncionarioStatus = 'em_campo' | 'folga' | 'ausente' | 'ferias';
export type FuncionarioTipo = 'clt' | 'pj' | 'terceirizado';

export interface Funcionario {
  id: string;
  nome: string;
  funcao: string;
  tipo: FuncionarioTipo;
  obraId?: string;
  status: FuncionarioStatus;
  localizacao?: string;
  telefone?: string;
  email?: string;
  salario?: number;
  dataAdmissao?: string;
  ultimoPonto?: string;
  horasHoje?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface NovoFuncionario {
  nome: string;
  funcao: string;
  tipo: FuncionarioTipo;
  obraId?: string;
  telefone?: string;
  email?: string;
  salario?: number;
  dataAdmissao?: string;
}