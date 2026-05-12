export interface InstituicaoEnsino {
  id: number;
  nome: string;
}

export interface Aluno {
  id?: number;
  nome: string;
  email: string;
  senha?: string;
  cpf: string;
  rg: string;
  endereco: string;
  curso: string;
  saldoMoedas?: number;
  instituicaoEnsinoId: number;
  instituicaoEnsinoNome?: string;
}

export interface EmpresaParceira {
  id?: number;
  nome: string;
  email: string;
  senha?: string;
  cnpj: string;
}

export interface ApiError {
  erro: string;
  status: number;
  campos?: Record<string, string>;
}
