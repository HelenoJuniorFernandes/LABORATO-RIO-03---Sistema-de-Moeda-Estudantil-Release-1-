import React, { useEffect, useState } from 'react';
import { transacaoService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const ExtratoPage: React.FC = () => {
  const [transacoes, setTransacoes] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    transacaoService.extrato().then(setTransacoes).catch(console.error);
  }, []);

  return (
    <div className="page-container">
      <header className="page-header">
        <div>
          <h2>Meu Extrato</h2>
          <p>Acompanhe suas transações de moedas</p>
        </div>
      </header>

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Tipo</th>
              <th>Valor</th>
              <th>Envolvido</th>
              <th>Motivo/Vantagem</th>
            </tr>
          </thead>
          <tbody>
            {transacoes.map((t: any) => {
              const isRecebimento = t.destinatarioId === user?.id;
              const envolvido = isRecebimento ? t.remetenteNome : t.destinatarioNome;
              const tipoStr = isRecebimento ? 'Entrada' : 'Saída';
              
              return (
                <tr key={t.id}>
                  <td>{new Date(t.dataTransacao).toLocaleString()}</td>
                  <td>
                    <span className={`status-badge ${isRecebimento ? 'status-active' : 'status-inactive'}`}>
                      {tipoStr}
                    </span>
                  </td>
                  <td>
                    <strong style={{ color: isRecebimento ? '#2e7d32' : '#c62828' }}>
                      {isRecebimento ? '+' : '-'}{t.valor} Moedas
                    </strong>
                  </td>
                  <td>{envolvido}</td>
                  <td>{t.vantagemNome ? `Resgate: ${t.vantagemNome}` : t.motivo}</td>
                </tr>
              );
            })}
            {transacoes.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center' }}>Nenhuma transação encontrada.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExtratoPage;
