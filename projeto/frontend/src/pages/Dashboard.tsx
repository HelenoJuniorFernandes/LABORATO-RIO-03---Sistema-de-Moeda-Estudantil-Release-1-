import { useEffect, useState } from 'react';
import { alunoService, empresaService, instituicaoService } from '../services/api';

export default function Dashboard() {
  const [counts, setCounts] = useState({ alunos: 0, empresas: 0, instituicoes: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      alunoService.listar(),
      empresaService.listar(),
      instituicaoService.listar(),
    ]).then(([alunos, empresas, instituicoes]) => {
      setCounts({
        alunos: alunos.length,
        empresas: empresas.length,
        instituicoes: instituicoes.length,
      });
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: "'Inter', sans-serif" }}>
      <div style={{
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        borderRadius: '16px',
        padding: '40px',
        color: '#fff',
        marginBottom: '30px',
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Bem-vindo ao Sistema de Mérito! 🏆</h2>
        <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>Reconhecendo o esforço e transformando dedicação em recompensas reais.</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>Carregando estatísticas...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #FF6B6B 0%, #EE5253 100%)',
            padding: '25px', borderRadius: '16px', color: '#fff',
            boxShadow: '0 8px 15px rgba(238, 82, 83, 0.3)',
            display: 'flex', alignItems: 'center', gap: '20px',
            transition: 'transform 0.2s ease'
          }}>
            <div style={{ fontSize: '3rem' }}>🎓</div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{counts.alunos}</div>
              <div style={{ fontSize: '1rem', opacity: 0.9 }}>Alunos</div>
            </div>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #10AC84 0%, #1DD1A1 100%)',
            padding: '25px', borderRadius: '16px', color: '#fff',
            boxShadow: '0 8px 15px rgba(29, 209, 161, 0.3)',
            display: 'flex', alignItems: 'center', gap: '20px'
          }}>
            <div style={{ fontSize: '3rem' }}>🏢</div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{counts.empresas}</div>
              <div style={{ fontSize: '1rem', opacity: 0.9 }}>Empresas</div>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #5F27CD 0%, #341F97 100%)',
            padding: '25px', borderRadius: '16px', color: '#fff',
            boxShadow: '0 8px 15px rgba(95, 39, 205, 0.3)',
            display: 'flex', alignItems: 'center', gap: '20px'
          }}>
            <div style={{ fontSize: '3rem' }}>🏫</div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{counts.instituicoes}</div>
              <div style={{ fontSize: '1rem', opacity: 0.9 }}>Instituições</div>
            </div>
          </div>
        </div>
      )}

      <div style={{
        background: '#fff',
        borderRadius: '16px',
        padding: '30px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        border: '1px solid #f0f0f0'
      }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#333' }}>Sobre a Plataforma</h3>
        <p style={{ color: '#666', fontSize: '1rem', lineHeight: '1.8' }}>
          O <strong>Sistema de Moeda Estudantil</strong> permite que professores reconheçam o mérito de seus alunos através de uma moeda virtual. 
          Os alunos podem acumular moedas pelo seu desempenho e trocá-las por vantagens exclusivas em empresas parceiras, 
          como descontos em restaurantes, cursos, livros e materiais.
        </p>
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {['🚀 React', '💎 Spring Boot', '🔒 JWT Auth', '✨ Glassmorphism', '🪙 Render'].map(tag => (
            <span key={tag} style={{ background: '#f0f2f5', padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', color: '#333', fontWeight: '500' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
