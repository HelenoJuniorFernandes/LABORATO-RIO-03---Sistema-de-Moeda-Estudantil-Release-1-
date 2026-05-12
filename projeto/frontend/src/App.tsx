import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AlunosPage from './pages/AlunosPage';
import EmpresasPage from './pages/EmpresasPage';
import InstituicoesPage from './pages/InstituicoesPage';

function Sidebar() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '🏠' },
  ];

  const alunosItems = [
    { path: '/alunos', label: 'Alunos', icon: '🎓' },
    { path: '/empresas', label: 'Empresas Parceiras', icon: '🏢' },
    { path: '/instituicoes', label: 'Instituições', icon: '🏫' },
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
        <div className="nav-section">
          <div className="nav-label">Cadastros</div>
          {alunosItems.map(item => (
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
      </nav>
    </aside>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/alunos" element={<AlunosPage />} />
            <Route path="/empresas" element={<EmpresasPage />} />
            <Route path="/instituicoes" element={<InstituicoesPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
