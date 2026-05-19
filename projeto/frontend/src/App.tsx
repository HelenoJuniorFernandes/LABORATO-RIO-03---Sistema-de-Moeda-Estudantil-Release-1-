import { BrowserRouter, Routes, Route, NavLink, useLocation, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AlunosPage from './pages/AlunosPage';
import EmpresasPage from './pages/EmpresasPage';
import InstituicoesPage from './pages/InstituicoesPage';
import LoginPage from './pages/LoginPage';
import ExtratoPage from './pages/ExtratoPage';
import VantagensEmpresaPage from './pages/VantagensEmpresaPage';
import LojaVantagensPage from './pages/LojaVantagensPage';
import TransferenciaPage from './pages/TransferenciaPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function Sidebar() {
  const { user, logout } = useAuth();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '🏠' },
  ];

  const adminItems = [
    { path: '/alunos', label: 'Alunos', icon: '🎓' },
    { path: '/empresas', label: 'Empresas Parceiras', icon: '🏢' },
    { path: '/instituicoes', label: 'Instituições', icon: '🏫' },
  ];

  const alunoItems = [
    { path: '/loja', label: 'Loja de Vantagens', icon: '🛒' },
    { path: '/extrato', label: 'Meu Extrato', icon: '🧾' },
  ];

  const professorItems = [
    { path: '/transferir', label: 'Enviar Moedas', icon: '🪙' },
    { path: '/extrato', label: 'Meu Extrato', icon: '🧾' },
  ];

  const empresaItems = [
    { path: '/minhas-vantagens', label: 'Minhas Vantagens', icon: '🎁' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h1>Moeda<span>🪙</span><br />Estudantil</h1>
      </div>
      <nav className="sidebar-nav">
        <div className="nav-section">
          <div className="nav-label">Geral</div>
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <span className="icon">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </div>
        
        {user?.role === 'ROLE_USER' && (
          <div className="nav-section">
            <div className="nav-label">Cadastros</div>
            {adminItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                <span className="icon">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </div>
        )}

        {user?.role === 'ROLE_ALUNO' && (
          <div className="nav-section">
            <div className="nav-label">Aluno</div>
            {alunoItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                <span className="icon">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </div>
        )}

        {user?.role === 'ROLE_PROFESSOR' && (
          <div className="nav-section">
            <div className="nav-label">Professor</div>
            {professorItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                <span className="icon">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </div>
        )}

        {user?.role === 'ROLE_EMPRESA' && (
          <div className="nav-section">
            <div className="nav-label">Empresa Parceira</div>
            {empresaItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                <span className="icon">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </div>
        )}
      </nav>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <button onClick={logout} style={{ background: '#ff4d4f', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>Sair</button>
      </div>
    </aside>
  );
}

function PrivateRoute({ children }: { children: JSX.Element }) {
  const { signed, loading } = useAuth();
  
  if (loading) return <div>Carregando...</div>;
  
  return signed ? children : <Navigate to="/login" />;
}

function MainLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
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
