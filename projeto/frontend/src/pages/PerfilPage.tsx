import { useEffect, useState } from 'react';
import { authService, alunoService, empresaService, professorService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function PerfilPage() {
  const { user, updateBalance } = useAuth();
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    carregarPerfil();
  }, []);

  const carregarPerfil = async () => {
    setLoading(true);
    try {
      const data = await authService.me();
      setForm({ ...data, senha: '' });
    } catch (err) {
      setErro('Erro ao carregar dados do perfil');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSalvando(true);
    setErro('');
    setSucesso('');

    try {
      if (user?.role === 'ROLE_ALUNO') {
        await alunoService.atualizar(form.id, form);
      } else if (user?.role === 'ROLE_EMPRESA') {
        await empresaService.atualizar(form.id, form);
      } else if (user?.role === 'ROLE_PROFESSOR') {
        await professorService.atualizar(form.id, form);
      }
      setSucesso('Perfil atualizado com sucesso!');
      await updateBalance();
    } catch (err: any) {
      setErro(err.response?.data?.erro || 'Erro ao atualizar o perfil');
    } finally {
      setSalvando(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Carregando perfil...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>
      <div style={{
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        borderRadius: '16px',
        padding: '30px',
        color: '#fff',
        marginBottom: '20px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '5px' }}>Meu Perfil 👤</h2>
        <p style={{ opacity: 0.9 }}>Mantenha suas informações atualizadas.</p>
      </div>

      <div style={{ background: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        {erro && <div className="alert alert-error">{erro}</div>}
        {sucesso && <div className="alert alert-success">{sucesso}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group span-2">
              <label>Nome Completo</label>
              <input name="nome" value={form.nome || ''} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>E-mail</label>
              <input name="email" type="email" value={form.email || ''} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Nova Senha (deixe em branco para manter)</label>
              <input name="senha" type="password" value={form.senha || ''} onChange={handleChange} placeholder="••••••••" />
            </div>

            {user?.role === 'ROLE_ALUNO' && (
              <>
                <div className="form-group">
                  <label>CPF</label>
                  <input name="cpf" value={form.cpf || ''} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>RG</label>
                  <input name="rg" value={form.rg || ''} onChange={handleChange} required />
                </div>
                <div className="form-group span-2">
                  <label>Endereço</label>
                  <input name="endereco" value={form.endereco || ''} onChange={handleChange} required />
                </div>
                <div className="form-group span-2">
                  <label>Curso</label>
                  <input name="curso" value={form.curso || ''} onChange={handleChange} required />
                </div>
              </>
            )}

            {user?.role === 'ROLE_PROFESSOR' && (
              <>
                <div className="form-group">
                  <label>CPF</label>
                  <input name="cpf" value={form.cpf || ''} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Departamento</label>
                  <input name="departamento" value={form.departamento || ''} onChange={handleChange} required />
                </div>
              </>
            )}

            {user?.role === 'ROLE_EMPRESA' && (
              <div className="form-group span-2">
                <label>CNPJ</label>
                <input name="cnpj" value={form.cnpj || ''} onChange={handleChange} required />
              </div>
            )}
          </div>

          <div style={{ marginTop: '30px', textAlign: 'right' }}>
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={salvando}
              style={{ padding: '12px 30px', fontSize: '1.1rem', borderRadius: '8px', background: 'linear-gradient(90deg, #1e3c72, #2a5298)', border: 'none', color: '#fff' }}
            >
              {salvando ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
