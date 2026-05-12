import axios from 'axios';
import { Aluno, EmpresaParceira, InstituicaoEnsino } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: { 'Content-Type': 'application/json' },
});

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

export default api;
