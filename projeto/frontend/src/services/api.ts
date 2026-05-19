import axios from 'axios';
import { Aluno, EmpresaParceira, InstituicaoEnsino } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Auth ───────────────────────────────────────────
export const authService = {
  login: (credenciais: any) => api.post('/api/auth/login', credenciais).then(r => r.data),
};

// ── Alunos ──────────────────────────────────────────
export const alunoService = {
  listar: () => api.get<Aluno[]>('/api/alunos').then(r => r.data),
  buscar: (id: number) => api.get<Aluno>(`/api/alunos/${id}`).then(r => r.data),
  criar: (aluno: Aluno) => api.post<Aluno>('/api/alunos', aluno).then(r => r.data),
  atualizar: (id: number, aluno: Aluno) => api.put<Aluno>(`/api/alunos/${id}`, aluno).then(r => r.data),
  deletar: (id: number) => api.delete(`/api/alunos/${id}`),
};

// ── Empresas Parceiras ───────────────────────────────
export const empresaService = {
  listar: () => api.get<EmpresaParceira[]>('/api/empresas').then(r => r.data),
  buscar: (id: number) => api.get<EmpresaParceira>(`/api/empresas/${id}`).then(r => r.data),
  criar: (empresa: EmpresaParceira) => api.post<EmpresaParceira>('/api/empresas', empresa).then(r => r.data),
  atualizar: (id: number, empresa: EmpresaParceira) => api.put<EmpresaParceira>(`/api/empresas/${id}`, empresa).then(r => r.data),
  deletar: (id: number) => api.delete(`/api/empresas/${id}`),
};

// ── Instituições de Ensino ───────────────────────────
export const instituicaoService = {
  listar: () => api.get<InstituicaoEnsino[]>('/api/instituicoes').then(r => r.data),
};

// ── Vantagens ────────────────────────────────────────
export const vantagemService = {
  listar: () => api.get<any[]>('/api/vantagens').then(r => r.data),
  listarMinhas: () => api.get<any[]>('/api/vantagens/empresa').then(r => r.data),
  criar: (vantagem: any) => api.post<any>('/api/vantagens', vantagem).then(r => r.data),
  atualizar: (id: number, vantagem: any) => api.put<any>(`/api/vantagens/${id}`, vantagem).then(r => r.data),
  deletar: (id: number) => api.delete(`/api/vantagens/${id}`),
};

// ── Transações ───────────────────────────────────────
export const transacaoService = {
  extrato: () => api.get<any[]>('/api/transacoes/extrato').then(r => r.data),
  transferir: (dados: any) => api.post<any>('/api/transacoes/transferir', dados).then(r => r.data),
  resgatar: (dados: any) => api.post<any>('/api/transacoes/resgatar', dados).then(r => r.data),
};

export default api;
