import { useEffect, useState } from 'react';
import { empresaService } from '../services/api';
import { EmpresaParceira } from '../types';

const EMPTY: EmpresaParceira = { nome: '', email: '', senha: '', cnpj: '' };

export default function EmpresasPage() {
  const [empresas, setEmpresas] = useState<EmpresaParceira[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState<EmpresaParceira | null>(null);
  const [form, setForm] = useState<EmpresaParceira>(EMPTY);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [salvando, setSalvando] = useState(false);

  const carregar = () => {
    setLoading(true);
    empresaService.listar().then(setEmpresas).finally(() => setLoading(false));
  };

  useEffect(() => { carregar(); }, []);

  const abrirCriar = () => {
    setEditando(null); setForm(EMPTY); setErro(''); setSucesso('');
    setShowModal(true);
  };

  const abrirEditar = (e: EmpresaParceira) => {
    setEditando(e); setForm({ ...e, senha: '' }); setErro(''); setSucesso('');
    setShowModal(true);
  };

  const fecharModal = () => { setShowModal(false); setErro(''); };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSalvando(true); setErro('');
    try {
      if (editando?.id) {
        await empresaService.atualizar(editando.id, form);
        setSucesso('Empresa atualizada com sucesso!');
      } else {
        await empresaService.criar(form);
        setSucesso('Empresa cadastrada com sucesso!');
      }
      carregar();
      setTimeout(() => { fecharModal(); setSucesso(''); }, 1200);
    } catch (err: any) {
      const msg = err.response?.data?.erro || 'Erro ao salvar empresa';
      setErro(msg);
    } finally {
      setSalvando(false);
    }
  };

  const handleDeletar = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir esta empresa?')) return;
    try {
      await empresaService.deletar(id);
      carregar();
    } catch {
      alert('Erro ao deletar empresa');
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Empresas Parceiras</h2>
          <p className="page-subtitle">Gerencie as empresas parceiras do sistema</p>
        </div>
        <button className="btn btn-primary" onClick={abrirCriar}>＋ Nova Empresa</button>
      </div>

      <div className="card">
        {loading ? (
          <div className="loading"><div className="spinner" /> Carregando...</div>
        ) : empresas.length === 0 ? (
          <div className="empty-state">
            <div className="icon">🏢</div>
            <p>Nenhuma empresa parceira cadastrada ainda.</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>CNPJ</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {empresas.map(emp => (
                  <tr key={emp.id}>
                    <td><span className="nome">{emp.nome}</span></td>
                    <td>{emp.email}</td>
                    <td><span className="badge">{emp.cnpj}</span></td>
                    <td>
                      <div className="td-actions">
                        <button className="btn btn-ghost btn-sm" onClick={() => abrirEditar(emp)}>✏️ Editar</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDeletar(emp.id!)}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">{editando ? '✏️ Editar Empresa' : '🏢 Nova Empresa Parceira'}</h3>
            {erro && <div className="alert alert-error">{erro}</div>}
            {sucesso && <div className="alert alert-success">{sucesso}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group span-2">
                  <label>Nome da Empresa</label>
                  <input name="nome" value={form.nome} onChange={handleChange} required placeholder="Ex: Restaurante Universitário" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="contato@empresa.com" />
                </div>
                <div className="form-group">
                  <label>Senha {editando && '(deixe em branco para manter)'}</label>
                  <input name="senha" type="password" value={form.senha} onChange={handleChange}
                    required={!editando} placeholder="••••••••" />
                </div>
                <div className="form-group span-2">
                  <label>CNPJ</label>
                  <input name="cnpj" value={form.cnpj} onChange={handleChange} required placeholder="00.000.000/0001-00" />
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-ghost" onClick={fecharModal}>Cancelar</button>
                <button type="submit" className="btn btn-primary" disabled={salvando}>
                  {salvando ? '...' : editando ? 'Salvar Alterações' : 'Cadastrar Empresa'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
