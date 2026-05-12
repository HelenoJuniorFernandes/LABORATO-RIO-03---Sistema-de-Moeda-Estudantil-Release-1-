import { useEffect, useState } from 'react';
import { alunoService, empresaService, instituicaoService } from '../services/api';

export default function Dashboard() {
  const [counts, setCounts] = useState({ alunos: 0, empresas: 0, instituicoes: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      alunoService.listar(),
      empresaService.listar(),
      instituicaoService.listar(),
    ]).then(([alunos, empresas, instituicoes]) => {
      setCounts({
        alunos: alunos.length,
        empresas: empresas.length,
        instituicoes: instituicoes.length,
      });
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Dashboard</h2>
          <p className="page-subtitle">Visão geral do sistema</p>
        </div>
      </div>

      {loading ? (
        <div className="loading"><div className="spinner" /> Carregando...</div>
      ) : (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🎓</div>
            <div className="stat-info">
              <div className="value">{counts.alunos}</div>
              <div className="label">Alunos Cadastrados</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏢</div>
            <div className="stat-info">
              <div className="value">{counts.empresas}</div>
              <div className="label">Empresas Parceiras</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏫</div>
            <div className="stat-info">
              <div className="value">{counts.instituicoes}</div>
              <div className="label">Instituições de Ensino</div>
            </div>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <span className="card-title">Sobre o Sistema</span>
        </div>
        <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', lineHeight: '1.7' }}>
          O <strong style={{ color: 'var(--text)' }}>Sistema de Moeda Estudantil</strong> permite que professores
          reconheçam o mérito de seus alunos através de uma moeda virtual. Os alunos podem trocar essas moedas
          por vantagens em empresas parceiras como descontos em restaurantes, mensalidades e materiais.
        </p>
        <div style={{ marginTop: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {['Sprint 02', 'Spring Boot 3', 'React + TypeScript', 'PostgreSQL'].map(tag => (
            <span key={tag} className="badge">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
