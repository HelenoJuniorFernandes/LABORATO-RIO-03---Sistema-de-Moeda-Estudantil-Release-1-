import { useEffect, useState } from 'react';
import { instituicaoService } from '../services/api';
import { InstituicaoEnsino } from '../types';

export default function InstituicoesPage() {
  const [instituicoes, setInstituicoes] = useState<InstituicaoEnsino[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    instituicaoService.listar().then(setInstituicoes).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Instituições de Ensino</h2>
          <p className="page-subtitle">Instituições pré-cadastradas no sistema</p>
        </div>
      </div>

      <div className="card">
        {loading ? (
          <div className="loading"><div className="spinner" /> Carregando...</div>
        ) : instituicoes.length === 0 ? (
          <div className="empty-state">
            <div className="icon">🏫</div>
            <p>Nenhuma instituição cadastrada.</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome da Instituição</th>
                </tr>
              </thead>
              <tbody>
                {instituicoes.map(inst => (
                  <tr key={inst.id}>
                    <td style={{ fontFamily: 'var(--mono)', color: 'var(--text-muted)' }}>{inst.id}</td>
                    <td><span className="nome">{inst.nome}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p style={{ marginTop: '16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          ℹ️ As instituições são pré-cadastradas pela administração do sistema no momento da parceria.
        </p>
      </div>
    </div>
  );
}
