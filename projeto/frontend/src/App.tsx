import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AlunosPage from './pages/AlunosPage';
import EmpresasPage from './pages/EmpresasPage';
import InstituicoesPage from './pages/InstituicoesPage';
import LoginPage from './pages/LoginPage';
import ExtratoPage from './pages/ExtratoPage';
import VantagensEmpresaPage from './pages/VantagensEmpresaPage';
import LojaVantagensPage from './pages/LojaVantagensPage';
import TransferenciaPage from './pages/TransferenciaPage';
import PerfilPage from './pages/PerfilPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function Sidebar() {
  const { logout, user } = useAuth();

  const adminItems = [
    { path: '/alunos', label: 'Alunos', icon: '👨‍🎓' },
    { path: '/empresas', label: 'Empresas Parceiras', icon: '🏢' },
    { path: '/instituicoes', label: 'Instituições', icon: '🏫' },
  ];

  const alunoItems = [
    { path: '/loja', label: 'Loja de Vantagens', icon: '🛍️' },
    { path: '/extrato', label: 'Meu Extrato', icon: '📄' },
  ];

  const empresaItems = [
    { path: '/minhas-vantagens', label: 'Minhas Vantagens', icon: '🎁' },
  ];

  const professorItems = [
    { path: '/transferir', label: 'Enviar Moedas', icon: '💸' },
    { path: '/extrato', label: 'Meu Extrato', icon: '📄' },
  ];

  return (
    <aside className="sidebar" style={{ background: '#111827', color: '#f3f4f6' }}>
      <div className="sidebar-header" style={{ padding: '25px 20px', borderBottom: '1px solid #1f2937' }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 'bold', margin: 0, background: 'linear-gradient(90deg, #60A5FA, #34D399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Moeda Estudantil</h1>
        <span style={{ fontSize: '0.80rem', color: '#9CA3AF', letterSpacing: '1px', textTransform: 'uppercase' }}>Sistema Universitário</span>
      </div>

      <nav className="sidebar-nav" style={{ padding: '20px 15px' }}>
        <div className="nav-section">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} style={{ borderRadius: '8px', padding: '12px 15px', marginBottom: '5px' }}>
            <span className="icon">📊</span> Dashboard
          </NavLink>
          <NavLink to="/perfil" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} style={{ borderRadius: '8px', padding: '12px 15px', marginBottom: '5px' }}>
            <span className="icon">👤</span> Meu Perfil
          </NavLink>
        </div>
        
        {user?.role === 'ROLE_USER' && (
          <div className="nav-section" style={{ marginTop: '20px' }}>
            <div className="nav-label" style={{ color: '#6B7280', fontSize: '0.75rem', fontWeight: 'bold', paddingLeft: '15px', marginBottom: '10px', textTransform: 'uppercase' }}>Administração</div>
            {adminItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                style={{ borderRadius: '8px', padding: '10px 15px', marginBottom: '5px' }}
              >
                <span className="icon">{item.icon}</span> {item.label}
              </NavLink>
            ))}
          </div>
        )}

        {user?.role === 'ROLE_ALUNO' && (
          <div className="nav-section" style={{ marginTop: '20px' }}>
            <div className="nav-label" style={{ color: '#6B7280', fontSize: '0.75rem', fontWeight: 'bold', paddingLeft: '15px', marginBottom: '10px', textTransform: 'uppercase' }}>Área do Aluno</div>
            {alunoItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                style={{ borderRadius: '8px', padding: '10px 15px', marginBottom: '5px' }}
              >
                <span className="icon">{item.icon}</span> {item.label}
              </NavLink>
            ))}
          </div>
        )}

        {user?.role === 'ROLE_EMPRESA' && (
          <div className="nav-section" style={{ marginTop: '20px' }}>
            <div className="nav-label" style={{ color: '#6B7280', fontSize: '0.75rem', fontWeight: 'bold', paddingLeft: '15px', marginBottom: '10px', textTransform: 'uppercase' }}>Área da Empresa</div>
            {empresaItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                style={{ borderRadius: '8px', padding: '10px 15px', marginBottom: '5px' }}
              >
                <span className="icon">{item.icon}</span> {item.label}
              </NavLink>
            ))}
          </div>
        )}

        {user?.role === 'ROLE_PROFESSOR' && (
          <div className="nav-section" style={{ marginTop: '20px' }}>
            <div className="nav-label" style={{ color: '#6B7280', fontSize: '0.75rem', fontWeight: 'bold', paddingLeft: '15px', marginBottom: '10px', textTransform: 'uppercase' }}>Área do Professor</div>
            {professorItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                style={{ borderRadius: '8px', padding: '10px 15px', marginBottom: '5px' }}
              >
                <span className="icon">{item.icon}</span> {item.label}
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      <div className="sidebar-footer" style={{ padding: '20px', borderTop: '1px solid #1f2937' }}>
        <button className="btn-logout" onClick={logout} style={{ width: '100%', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.2s' }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
        >
          🚪 Sair
        </button>
      </div>
    </aside>
  );
}

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { signed, loading } = useAuth();
  
  if (loading) return <div>Carregando...</div>;
  
  return signed ? children : <Navigate to="/login" />;
}

function Navbar() {
  const { user } = useAuth();

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 30px',
      background: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
      boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <img src="/logo.png" alt="Logo Moeda Estudantil" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#1e3c72' }}>
          Sistema de Moeda Estudantil
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ fontSize: '0.9rem', color: '#666' }}>
          Olá, <strong>{user?.nome || 'Usuário'}</strong> 👋
        </div>
        <div style={{ fontSize: '0.9rem', color: '#666', background: '#f0f0f0', padding: '5px 10px', borderRadius: '12px' }}>
          {user?.role === 'ROLE_ALUNO' ? '🎓 Aluno' : user?.role === 'ROLE_PROFESSOR' ? '👨‍🏫 Professor' : user?.role === 'ROLE_EMPRESA' ? '🏢 Empresa' : 'Administrador'}
        </div>
        
        {(user?.role === 'ROLE_ALUNO' || user?.role === 'ROLE_PROFESSOR') && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)', 
            padding: '8px 15px', 
            borderRadius: '20px',
            color: '#fff',
            fontWeight: 'bold',
            boxShadow: '0 4px 10px rgba(255, 165, 0, 0.3)'
          }}>
            <span style={{ fontSize: '1.2rem' }}>🪙</span>
            <span>{user?.saldoMoedas !== undefined ? user.saldoMoedas : '0'} Moedas</span>
          </div>
        )}
      </div>
    </header>
  );
}

function MainLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100vh', overflow: 'hidden', marginLeft: '260px' }}>
        <Navbar />
        <main className="main-content" style={{ flex: 1, overflowY: 'auto' }}>
          <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/perfil" element={<PerfilPage />} />
          <Route path="/alunos" element={<AlunosPage />} />
          <Route path="/empresas" element={<EmpresasPage />} />
          <Route path="/instituicoes" element={<InstituicoesPage />} />
          <Route path="/extrato" element={<ExtratoPage />} />
          <Route path="/minhas-vantagens" element={<VantagensEmpresaPage />} />
          <Route path="/loja" element={<LojaVantagensPage />} />
          <Route path="/transferir" element={<TransferenciaPage />} />
        </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/*" element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
