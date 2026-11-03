# PROGRESS — Chùa An Nhiên (Temple Online)

## M0 — Bootstrap & Hosting Nền Tảng (Hoàn thành: 03/11/2026)
- [x] Khởi tạo Vite + React 18 + TypeScript strict
- [x] Cài đặt dependencies 3D & Physics: `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/rapier`
- [x] State management & Routing: `zustand`, `react-router-dom` (HashRouter)
- [x] Firebase SDK modular: `firebase` (Auth Anonymous + Firestore)
- [x] Unit test framework: `vitest`, `@testing-library/react`, `jsdom`
- [x] File cấu hình: `vite.config.ts` (base path GitHub Pages), `tsconfig.json`, `tsconfig.node.json`, `package.json`
- [x] Bảo vệ dữ liệu: `firestore.rules` (chặn UID khác, kiểm tra schema/bounds), `firebase.json` (Emulators: Auth 9099, Firestore 8080)
- [x] CI/CD Workflow: `.github/workflows/deploy.yml` tự động build và deploy lên GitHub Pages
- [x] Hướng dẫn: `docs/FIREBASE_SETUP.md`, `.env.example`, `.gitignore`
- [x] Kết quả test: 14/14 unit tests pass (XP formula, múi giờ Việt Nam Asia/Ho_Chi_Minh, Aquarium Decay)

## M1 — Scene Chùa 3D & Điều Khiển Nhân Vật (Hoàn thành: 03/11/2026)
- [x] **Cổng Tam Quan (`TempleGate.tsx`)**: 2 cột chính lớn, 2 cột phụ, xà ngang, 2 tầng mái ngói, biển hiệu "Chùa An Nhiên", Rapier colliders.
- [x] **Chính Điện (`MainHall.tsx`)**: Sàn gỗ tối `#352A25`, hàng cột gỗ `#4B2E22`, tường kem `#D1C6AD`, 2 tầng mái uốn cong, tượng Phật đài sen dát vàng `#CBA45B`, bàn thờ, lư hương đồng, chân nến lung linh và 15 đệm ngồi thiền xếp hàng lối.
- [x] **Sân Chùa & Cảnh Quan (`Courtyard.tsx`)**: Đường lát đá, hàng cây xanh thông low-poly, dãy lồng đèn đỏ ấm áp, ghế đá nghỉ chân, biển thông báo nhiệm vụ.
- [x] **Hồ Sen (`LotusGarden.tsx`)**: Mặt nước xanh ngọc trong suốt, thành hồ đá bo tròn, các đóa hoa sen hồng phấn bập bềnh theo thời gian (`useFrame`).
- [x] **Tháp Chuông (`BellTower.tsx`)**: Bệ đá, 4 cột chịu lực, 2 tầng mái nón nhọn và quả chuông Đại Hồng Chung mạ đồng.
- [x] **Bể Cá Thủy Cảnh 3D (`AquariumArea.tsx`)**: Bể nước ngọt kích thước 3.6x1.65m độc lập với hồ sen, bệ gỗ, 4 vách kính trong suốt phản quang nhẹ, nước xanh ngọc, đáy sỏi, 3 cụm cây thủy sinh đung đưa, **5 con cá nhỏ bơi theo quỹ đạo elip mượt mà bên trong thành kính** (không xuyên kính).
- [x] **Nhân vật Chú Tiểu Chibi (`ChibiCharacter.tsx`)**: Đầu tròn, thân áo nâu vàng `#E3BF72`, điều khiển mượt mà bằng WASD / phím mũi tên, Shift để chạy, animation chân tay vẫy khi di chuyển, xoay người theo hướng đi, capsule collider Rapier chống xuyên tường.
- [x] **Camera Góc Nhìn Thứ Ba (`ThirdPersonCamera.tsx`)**: Bám sát nhân vật với damping mượt mà, hỗ trợ kéo chuột / cảm ứng điện thoại xoay góc nhìn, không rung giật.
- [x] **Giao Diện HUD (`PlayerHud.tsx`) & Loading (`LoadingOverlay.tsx`)**: Thanh trạng thái Chùa An Nhiên, nhãn cảnh báo chế độ demo 3D khi chưa nối Firebase, bảng chỉ dẫn phím điều khiển.

---

### Kết quả kiểm định tự động:
- `npm run typecheck`: **PASSED (0 lỗi)**
- `npm test`: **14/14 tests PASSED**
- `npm run build`: **PASSED (tạo thành công static dist/ cho GitHub Pages)**

---

## Kế hoạch tiếp theo (M2 & M3)
- **M2**: Bổ sung hệ thống tương tác cự ly (`InteractionTrigger`): hiển thị phím `[E]` khi đến gần Bàn thờ (Lễ Phật), Lư hương (Thắp hương), Đệm thiền (Ngồi thiền) và Bể cá (Menu 4 lựa chọn: ngắm bể, cho ăn, vệ sinh, chăm cây).
- **M3**: Tích hợp Firebase Auth Anonymous và Cloud Firestore `runTransaction` cho 6 hoạt động tích lũy XP.
