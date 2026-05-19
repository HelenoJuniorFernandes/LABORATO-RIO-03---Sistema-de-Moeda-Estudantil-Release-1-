import React, { useEffect, useState } from 'react';
import { vantagemService, transacaoService } from '../services/api';

const LojaVantagensPage: React.FC = () => {
  const [vantagens, setVantagens] = useState<any[]>([]);

  const loadVantagens = () => {
    vantagemService.listar().then(setVantagens).catch(console.error);
  };

  useEffect(() => {
    loadVantagens();
  }, []);

  const handleResgatar = async (vantagemId: number) => {
    if (!window.confirm('Deseja realmente resgatar esta vantagem?')) return;
    try {
      await transacaoService.resgatar({ vantagemId });
      alert('Vantagem resgatada com sucesso! Verifique seu email para o cupom.');
    } catch (err) {
      alert('Erro ao resgatar vantagem. Verifique seu saldo.');
    }
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <div>
          <h2>Loja de Vantagens</h2>
          <p>Troque suas moedas por vantagens em empresas parceiras</p>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {vantagens.map(v => (
          <div key={v.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {v.foto && <img src={v.foto} alt={v.nome} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />}
            <h3>{v.nome}</h3>
            <p style={{ color: '#666', flexGrow: 1 }}>{v.descricao}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
              <strong style={{ color: '#007BFF' }}>{v.custo} Moedas</strong>
              <button className="btn btn-primary" onClick={() => handleResgatar(v.id)}>Resgatar</button>
            </div>
            <small style={{ color: '#999' }}>Parceiro: {v.empresaParceiraNome}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LojaVantagensPage;
