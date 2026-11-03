import { useAppStore } from '../state/appStore';

export default function LoadingOverlay() {
  const status = useAppStore(s => s.status);
  if (status !== 'BOOTING') return null;
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#1D2525',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 16,
      zIndex: 100,
    }}>
      <div style={{ fontSize: 48 }}>🏯</div>
      <p style={{ color: '#E7BF6C', fontSize: 18, fontWeight: 600 }}>Đang tải Chùa An Nhiên...</p>
    </div>
  );
}

