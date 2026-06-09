import React, { useEffect, useState } from 'react';
import { vantagemService, transacaoService } from '../services/api';

const LojaVantagensPage: React.FC = () => {
  const [vantagens, setVantagens] = useState<any[]>([]);
  const [modal, setModal] = useState<{show: boolean, type: 'success' | 'error' | 'confirm', message: string, cupom?: string, onConfirm?: () => void} | null>(null);

  const loadVantagens = () => {
    vantagemService.listar().then(setVantagens).catch(console.error);
  };

  useEffect(() => {
    loadVantagens();
  }, []);

  const handleResgatarClick = (vantagemId: number) => {
    setModal({
      show: true,
      type: 'confirm',
      message: 'Deseja realmente resgatar esta vantagem?',
      onConfirm: () => efetuarResgate(vantagemId)
    });
  };

  const efetuarResgate = async (vantagemId: number) => {
    setModal(null);
    try {
      const resp = await transacaoService.resgatar({ vantagemId });
      setModal({ show: true, type: 'success', message: 'Vantagem resgatada com sucesso! Um e-mail com este cupom foi enviado.', cupom: resp.cupom });
    } catch (err) {
      setModal({ show: true, type: 'error', message: 'Erro ao resgatar vantagem. Verifique seu saldo.' });
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
              <button className="btn btn-primary" onClick={() => handleResgatarClick(v.id)}>Resgatar</button>
            </div>
            <small style={{ color: '#999' }}>Parceiro: {v.empresaParceiraNome}</small>
          </div>
        ))}
      </div>

      {modal?.show && (
        <div className="modal-overlay">
          <div className="modal" style={{ maxWidth: '400px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>
              {modal.type === 'success' ? '✅' : modal.type === 'error' ? '❌' : '❓'}
            </div>
            <h3 className="modal-title" style={{ justifyContent: 'center' }}>
              {modal.type === 'success' ? 'Sucesso!' : modal.type === 'error' ? 'Atenção' : 'Confirmação'}
            </h3>
            <p style={{ color: 'var(--text-light)', marginBottom: '20px' }}>{modal.message}</p>
            
            {modal.cupom && (
              <div style={{ background: '#fff', padding: '15px', borderRadius: '8px', display: 'inline-block', marginBottom: '20px' }}>
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${modal.cupom}`} alt="QR Code Cupom" />
                <div style={{ color: '#000', fontWeight: 'bold', marginTop: '10px', fontSize: '1.2rem', letterSpacing: '2px' }}>
                  {modal.cupom}
                </div>
              </div>
            )}
            
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              {modal.type === 'confirm' ? (
                <>
                  <button className="btn btn-ghost" onClick={() => setModal(null)} style={{ flex: 1 }}>Cancelar</button>
                  <button className="btn btn-primary" onClick={modal.onConfirm} style={{ flex: 1 }}>Confirmar</button>
                </>
              ) : (
                <button className="btn btn-primary" onClick={() => setModal(null)} style={{ width: '100%', justifyContent: 'center' }}>
                  Fechar
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LojaVantagensPage;
