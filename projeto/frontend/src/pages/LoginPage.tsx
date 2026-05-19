import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, senha });
    } catch (error) {
      alert('Erro ao realizar login. Verifique suas credenciais.');
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      background: '#f8fafc',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Lado da Imagem */}
      <div style={{
        flex: 1,
        backgroundImage: 'url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(135deg, rgba(30,60,114,0.8) 0%, rgba(42,82,152,0.8) 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          padding: '40px',
          textAlign: 'center'
        }}>
          <img src="/logo.png" alt="Logo Moeda Estudantil" style={{ width: '120px', height: '120px', borderRadius: '24px', marginBottom: '20px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)', objectFit: 'cover' }} />
          <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '20px', textShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>Moeda Estudantil</h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '500px', lineHeight: '1.6' }}>
            Transformando o mérito acadêmico em recompensas reais. Reconheça, ganhe e troque por vantagens exclusivas.
          </p>
        </div>
      </div>

      {/* Lado do Formulário */}
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#fff'
      }}>
        <div style={{ 
          width: '100%',
          maxWidth: '400px',
          padding: '40px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2rem', color: '#1e293b', marginBottom: '10px' }}>Bem-vindo de volta! 👋</h2>
            <p style={{ color: '#64748b' }}>Insira suas credenciais para acessar sua conta</p>
          </div>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600', color: '#334155' }}>E-mail</label>
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
                placeholder="nome@email.com"
                style={{ 
                  width: '100%', 
                  padding: '12px 15px', 
                  boxSizing: 'border-box',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  background: '#f8fafc',
                  color: '#334155',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '600', color: '#334155' }}>Senha</label>
              <input 
                type="password" 
                value={senha} 
                onChange={e => setSenha(e.target.value)} 
                required 
                placeholder="••••••••"
                style={{ 
                  width: '100%', 
                  padding: '12px 15px', 
                  boxSizing: 'border-box',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  background: '#f8fafc',
                  color: '#334155',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
              />
            </div>
            <button 
              type="submit" 
              style={{ 
                padding: '14px', 
                background: 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '8px', 
                cursor: 'pointer', 
                marginTop: '10px',
                fontSize: '1rem',
                fontWeight: 'bold',
                boxShadow: '0 4px 10px rgba(37, 99, 235, 0.3)',
                transition: 'transform 0.2s ease, filter 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
              onMouseOut={(e) => e.currentTarget.style.filter = 'brightness(1)'}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Entrar
            </button>
          </form>

          <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '0.9rem', color: '#64748b' }}>
            Contas de teste padrão:<br />
            <strong>aluno@teste.com</strong> | <strong>professor@teste.com</strong><br />
            Senha para todos: <strong>123456</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
