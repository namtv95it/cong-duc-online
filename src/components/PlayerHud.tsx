import { useAppStore } from '../state/appStore';

export default function PlayerHud() {
  const status = useAppStore(s => s.status);
  const gameState = useAppStore(s => s.gameState);

  return (
    <>
      {/* Top-left info */}
      <div style={{
        position: 'fixed',
        top: 14,
        left: 14,
        background: 'rgba(29, 37, 37, 0.85)',
        borderRadius: 10,
        padding: '8px 16px',
        color: '#E7BF6C',
        fontWeight: 700,
        fontSize: 15,
        userSelect: 'none',
        pointerEvents: 'none',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(231, 191, 108, 0.25)',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        zIndex: 50,
      }}>
        <span>🏯 Chùa An Nhiên</span>
        {gameState && (
          <span style={{ color: '#75C6A0', fontSize: 13, background: 'rgba(117,198,160,0.15)', padding: '2px 8px', borderRadius: 6 }}>
            XP: {gameState.totalXp}
          </span>
        )}
      </div>

      {/* Config required notice */}
      {status === 'CONFIG_REQUIRED' && (
        <div style={{
          position: 'fixed',
          top: 60,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(217, 119, 6, 0.92)',
          borderRadius: 8,
          padding: '6px 16px',
          color: '#FFF',
          fontSize: 13,
          textAlign: 'center',
          maxWidth: 420,
          pointerEvents: 'none',
          zIndex: 50,
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
          ⚠️ Chế độ demo 3D — chưa kết nối Firebase config.
        </div>
      )}

      {/* Bottom controls guide */}
      <div style={{
        position: 'fixed',
        bottom: 16,
        left: 16,
        background: 'rgba(29, 37, 37, 0.75)',
        borderRadius: 8,
        padding: '6px 14px',
        color: '#D1C6AD',
        fontSize: 12,
        userSelect: 'none',
        pointerEvents: 'none',
        border: '1px solid rgba(255,255,255,0.08)',
        zIndex: 50,
      }}>
        <kbd style={{ background: '#352A25', padding: '2px 6px', borderRadius: 4, color: '#E7BF6C' }}>W A S D</kbd> Di chuyển &nbsp;•&nbsp; 
        <kbd style={{ background: '#352A25', padding: '2px 6px', borderRadius: 4, color: '#E7BF6C' }}>Shift</kbd> Chạy nhanh &nbsp;•&nbsp; 
        <kbd style={{ background: '#352A25', padding: '2px 6px', borderRadius: 4, color: '#E7BF6C' }}>Kéo chuột</kbd> Xoay góc nhìn
      </div>
    </>
  );
}

