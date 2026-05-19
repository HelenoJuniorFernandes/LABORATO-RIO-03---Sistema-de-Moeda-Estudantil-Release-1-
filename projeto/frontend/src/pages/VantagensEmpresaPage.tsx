import React, { useEffect, useState } from 'react';
import { vantagemService } from '../services/api';

const VantagensEmpresaPage: React.FC = () => {
  const [vantagens, setVantagens] = useState<any[]>([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [custo, setCusto] = useState('');
  const [foto, setFoto] = useState('');

  const loadVantagens = () => {
    vantagemService.listarMinhas().then(setVantagens).catch(console.error);
  };

  useEffect(() => {
    loadVantagens();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await vantagemService.criar({ nome, descricao, custo: Number(custo), foto });
      alert('Vantagem cadastrada com sucesso!');
      setNome('');
      setDescricao('');
      setCusto('');
      setFoto('');
      loadVantagens();
    } catch (err) {
      alert('Erro ao cadastrar vantagem.');
    }
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <div>
          <h2>Minhas Vantagens</h2>
          <p>Gerencie as vantagens que sua empresa oferece</p>
        </div>
      </header>

      <div className="card" style={{ marginBottom: '20px' }}>
        <h3>Nova Vantagem</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginTop: '15px' }}>
          <input type="text" placeholder="Nome da Vantagem" value={nome} onChange={e => setNome(e.target.value)} required />
          <input type="text" placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} required />
          <input type="number" placeholder="Custo (Moedas)" value={custo} onChange={e => setCusto(e.target.value)} required min="1" />
          <input type="text" placeholder="URL da Foto" value={foto} onChange={e => setFoto(e.target.value)} />
          <button type="submit" className="btn btn-primary">Cadastrar</button>
        </form>
      </div>

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Custo</th>
            </tr>
          </thead>
          <tbody>
            {vantagens.map(v => (
              <tr key={v.id}>
                <td>{v.nome}</td>
                <td>{v.descricao}</td>
                <td>{v.custo} Moedas</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VantagensEmpresaPage;
