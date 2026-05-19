import React, { useEffect, useState } from 'react';
import { alunoService, transacaoService } from '../services/api';

const TransferenciaPage: React.FC = () => {
  const [alunos, setAlunos] = useState<any[]>([]);
  const [alunoId, setAlunoId] = useState('');
  const [valor, setValor] = useState('');
  const [motivo, setMotivo] = useState('');

  useEffect(() => {
    alunoService.listar().then(setAlunos).catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await transacaoService.transferir({ alunoId: Number(alunoId), valor: Number(valor), motivo });
      alert('Moedas enviadas com sucesso!');
      setAlunoId('');
      setValor('');
      setMotivo('');
    } catch (err) {
      alert('Erro ao transferir moedas. Verifique seu saldo.');
    }
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <div>
          <h2>Enviar Moedas</h2>
          <p>Recompense seus alunos com moedas estudantis</p>
        </div>
      </header>

      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Aluno:</label>
            <select value={alunoId} onChange={e => setAlunoId(e.target.value)} required style={{ width: '100%', padding: '10px' }}>
              <option value="">Selecione um aluno...</option>
              {alunos.map(a => (
                <option key={a.id} value={a.id}>{a.nome} ({a.cpf})</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Valor (Moedas):</label>
            <input type="number" min="1" value={valor} onChange={e => setValor(e.target.value)} required style={{ width: '100%', padding: '10px' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Motivo:</label>
            <textarea value={motivo} onChange={e => setMotivo(e.target.value)} required style={{ width: '100%', padding: '10px', minHeight: '80px' }} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ padding: '12px' }}>Enviar Moedas</button>
        </form>
      </div>
    </div>
  );
};

export default TransferenciaPage;
