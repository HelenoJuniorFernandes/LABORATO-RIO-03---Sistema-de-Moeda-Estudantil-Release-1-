import { useEffect, useState } from 'react';
import { alunoService, instituicaoService } from '../services/api';
import { Aluno, InstituicaoEnsino } from '../types';

const EMPTY_ALUNO: Aluno = {
  nome: '', email: '', senha: '', cpf: '', rg: '',
  endereco: '', curso: '', instituicaoEnsinoId: 0,
};

export default function AlunosPage() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [instituicoes, setInstituicoes] = useState<InstituicaoEnsino[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editando, setEditando] = useState<Aluno | null>(null);
  const [form, setForm] = useState<Aluno>(EMPTY_ALUNO);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [salvando, setSalvando] = useState(false);

  const carregar = () => {
    setLoading(true);
    Promise.all([alunoService.listar(), instituicaoService.listar()])
      .then(([a, i]) => { setAlunos(a); setInstituicoes(i); })
      .finally(() => setLoading(false));
  };

  useEffect(() => { carregar(); }, []);

  const abrirCriar = () => {
    setEditando(null);
    setForm(EMPTY_ALUNO);
    setErro(''); setSucesso('');
    setShowModal(true);
  };

  const abrirEditar = (aluno: Aluno) => {
    setEditando(aluno);
    setForm({ ...aluno, senha: '' });
    setErro(''); setSucesso('');
    setShowModal(true);
  };

  const fecharModal = () => { setShowModal(false); setErro(''); };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: name === 'instituicaoEnsinoId' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSalvando(true); setErro('');
    try {
      if (editando?.id) {
        await alunoService.atualizar(editando.id, form);
        setSucesso('Aluno atualizado com sucesso!');
      } else {
        await alunoService.criar(form);
        setSucesso('Aluno cadastrado com sucesso!');
      }
      carregar();
      setTimeout(() => { fecharModal(); setSucesso(''); }, 1200);
    } catch (err: any) {
      const msg = err.response?.data?.erro || err.response?.data?.message || 'Erro ao salvar aluno';
      setErro(msg);
    } finally {
      setSalvando(false);
    }
  };

  const handleDeletar = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este aluno?')) return;
    try {
      await alunoService.deletar(id);
      carregar();
    } catch {
      alert('Erro ao deletar aluno');
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h2 className="page-title">Alunos</h2>
          <p className="page-subtitle">Gerencie os alunos cadastrados no sistema</p>
        </div>
        <button className="btn btn-primary" onClick={abrirCriar}>
          ＋ Novo Aluno
        </button>
      </div>

      <div className="card">
        {loading ? (
          <div className="loading"><div className="spinner" /> Carregando...</div>
        ) : alunos.length === 0 ? (
          <div className="empty-state">
            <div className="icon">🎓</div>
            <p>Nenhum aluno cadastrado ainda.</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>CPF</th>
                  <th>Curso</th>
                  <th>Instituição</th>
                  <th>Saldo 🪙</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {alunos.map(aluno => (
                  <tr key={aluno.id}>
                    <td><span className="nome">{aluno.nome}</span></td>
                    <td>{aluno.email}</td>
                    <td><span className="badge">{aluno.cpf}</span></td>
                    <td>{aluno.curso}</td>
                    <td>{aluno.instituicaoEnsinoNome}</td>
                    <td style={{ color: 'var(--coin)', fontFamily: 'var(--mono)', fontWeight: 600 }}>
                      {aluno.saldoMoedas?.toFixed(0)}
                    </td>
                    <td>
                      <div className="td-actions">
                        <button className="btn btn-ghost btn-sm" onClick={() => abrirEditar(aluno)}>✏️ Editar</button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDeletar(aluno.id!)}>🗑️</button>
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
            <h3 className="modal-title">
              {editando ? '✏️ Editar Aluno' : '🎓 Novo Aluno'}
            </h3>

            {erro && <div className="alert alert-error">{erro}</div>}
            {sucesso && <div className="alert alert-success">{sucesso}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group span-2">
                  <label>Nome completo</label>
                  <input name="nome" value={form.nome} onChange={handleChange} required placeholder="Ex: João da Silva" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="joao@email.com" />
                </div>
                <div className="form-group">
                  <label>Senha {editando && '(deixe em branco para manter)'}</label>
                  <input name="senha" type="password" value={form.senha} onChange={handleChange}
                    required={!editando} placeholder="••••••••" />
                </div>
                <div className="form-group">
                  <label>CPF</label>
                  <input name="cpf" value={form.cpf} onChange={handleChange} required placeholder="000.000.000-00" />
                </div>
                <div className="form-group">
                  <label>RG</label>
                  <input name="rg" value={form.rg} onChange={handleChange} required placeholder="MG-00.000.000" />
                </div>
                <div className="form-group span-2">
                  <label>Endereço</label>
                  <input name="endereco" value={form.endereco} onChange={handleChange} required placeholder="Rua, número, bairro, cidade" />
                </div>
                <div className="form-group">
                  <label>Curso</label>
                  <input name="curso" value={form.curso} onChange={handleChange} required placeholder="Ex: Ciência da Computação" />
                </div>
                <div className="form-group">
                  <label>Instituição de Ensino</label>
                  <select name="instituicaoEnsinoId" value={form.instituicaoEnsinoId} onChange={handleChange} required>
                    <option value={0} disabled>Selecione a instituição</option>
                    {instituicoes.map(inst => (
                      <option key={inst.id} value={inst.id}>{inst.nome}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-ghost" onClick={fecharModal}>Cancelar</button>
                <button type="submit" className="btn btn-primary" disabled={salvando}>
                  {salvando ? '...' : editando ? 'Salvar Alterações' : 'Cadastrar Aluno'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
