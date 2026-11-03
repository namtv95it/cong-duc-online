import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', height: '100vh', background: '#1D2525', gap: '1.5rem'
    }}>
      <h1 style={{ fontSize: '2.5rem', color: '#E7BF6C', fontWeight: 700 }}>🏯 Chùa An Nhiên</h1>
      <p style={{ color: '#aaa', maxWidth: 360, textAlign: 'center' }}>
        Ghé thăm ngôi chùa yên tĩnh, lễ Phật, thắp hương, ngồi thiền và chăm sóc bể cá thủy cảnh.
      </p>
      <button
        onClick={() => navigate('/game')}
        style={{
          padding: '0.75rem 2rem', fontSize: '1.1rem',
          background: '#E7BF6C', color: '#1D2525', border: 'none',
          borderRadius: 8, cursor: 'pointer', fontWeight: 600
        }}
      >
        Vào chùa
      </button>
    </div>
  );
}
