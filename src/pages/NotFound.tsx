import { useNavigate } from 'react-router-dom';
export default function NotFound() {
  const nav = useNavigate();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '1rem' }}>
      <h2 style={{ color: '#E7BF6C' }}>404 — Không tìm thấy trang</h2>
      <button onClick={() => nav('/')} style={{ padding: '0.5rem 1.5rem', background: '#E7BF6C', color: '#1D2525', border: 'none', borderRadius: 6, cursor: 'pointer' }}>Về trang chủ</button>
    </div>
  );
}
