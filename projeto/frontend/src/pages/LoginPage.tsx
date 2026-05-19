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
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.1)', 
        padding: '40px 50px', 
        borderRadius: '16px', 
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)', 
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        width: '100%',
        maxWidth: '400px',
        color: '#fff'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', fontWeight: 'bold', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>Moeda🪙</h1>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)' }}>Faça login para acessar o sistema</p>
        </div>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '500' }}>E-mail</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              required 
              placeholder="Digite seu email"
              style={{ 
                width: '100%', 
                padding: '12px 15px', 
                boxSizing: 'border-box',
                borderRadius: '8px',
                border: 'none',
                background: 'rgba(255, 255, 255, 0.9)',
                color: '#333',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', fontWeight: '500' }}>Senha</label>
            <input 
              type="password" 
              value={senha} 
              onChange={e => setSenha(e.target.value)} 
              required 
              placeholder="Digite sua senha"
              style={{ 
                width: '100%', 
                padding: '12px 15px', 
                boxSizing: 'border-box',
                borderRadius: '8px',
                border: 'none',
                background: 'rgba(255, 255, 255, 0.9)',
                color: '#333',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
            />
          </div>
          <button 
            type="submit" 
            style={{ 
              padding: '14px', 
              background: 'linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)', 
              color: '#1a1a1a', 
              border: 'none', 
              borderRadius: '8px', 
              cursor: 'pointer', 
              marginTop: '15px',
              fontSize: '1rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              boxShadow: '0 4px 15px rgba(0, 201, 255, 0.4)',
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
      </div>
    </div>
  );
};

export default LoginPage;
