# TEMPLE ONLINE — ĐẶC TẢ AI CODING AGENT (FIREBASE + GITHUB PAGES)

> **Tên tạm:** Chùa An Nhiên / Temple Online  
> **Phiên bản:** 2.0 — 03/11/2026  
> **Trạng thái:** Đặc tả MVP nhỏ, một người chơi  
> **Frontend và game 3D:** React + Vite + TypeScript + React Three Fiber / Three.js  
> **Dữ liệu:** Firebase Authentication (Anonymous) + Cloud Firestore  
> **Triển khai:** GitHub Pages qua GitHub Actions  
> **Máy chủ riêng:** KHÔNG CÓ trong MVP; KHÔNG dùng Node.js backend, Fastify, Prisma, PostgreSQL, Supabase, Docker DB hay VPS.  
> **Tài nguyên:** `.glb`, texture, audio phục vụ dưới `public/` của Vite/GitHub Pages; không dùng Firebase Cloud Storage trong MVP.  
> **Ảnh tham chiếu:** `reference-temple.png` cùng thư mục với file đặc tả.

**Quy tắc ưu tiên:** Tài liệu v2.0 này **thay thế v1.1**. Nếu trong mã nguồn cũ hoặc ghi chú cũ xuất hiện API REST, server-authoritative XP, PostgreSQL, Prisma, session cookie, Colyseus, Firebase Hosting, Cloud Storage hoặc VPS, hãy dùng **Firebase + GitHub Pages** theo tài liệu này cho MVP. Không tự thêm backend vì thấy hướng cũ có ghi.

---

## 0. LỆNH BẮT BUỘC CHO AI LẬP TRÌNH

Bạn là senior TypeScript engineer và web 3D game developer. **Viết dự án thật, chạy được; không chỉ thuyết minh, mockup hoặc pseudocode.**

1. Đọc toàn bộ file này và ảnh tham chiếu nếu có. Ưu tiên mốc M0 → M6 ở Mục 18.
2. Nếu repository đã tồn tại, kiểm tra và tận dụng phần hợp lệ; loại bỏ sự phụ thuộc vào backend Node/Prisma/Postgres trong phạm vi MVP. Nếu chưa có repo, tạo React + Vite TypeScript đơn giản, không tạo monorepo thừa.
3. Bắt đầu ngay bằng scene chùa 3D, nhân vật di chuyển và camera. Khi chưa có mô hình `.glb` thật, dùng primitive/procedural meshes 3D thay thế; không được thay bằng ảnh tĩnh.
4. Phải có bể cá thủy cảnh 3D tương tác được: cá bơi, ngắm cá, cho cá ăn, làm sạch bể và chăm cây thủy sinh. Không gộp bể cá vào hồ sen.
5. **Mọi dữ liệu người chơi** gồm tên, XP, nhiệm vụ, trạng thái bể cá phải lưu qua Firestore và phục hồi sau tải lại; mọi logic hiển thị, animation, camera chỉ chạy trên browser.
6. **Không yêu cầu người dùng nhập khóa bí mật hay service-account JSON vào source code.** Firebase Web API config là cấu hình client công khai; bảo mật bằng Firebase Auth + Firestore Security Rules, không bằng cách giấu API key.
7. Giữ giới hạn thực tế: Firestore transaction và Security Rules giảm lỗi cập nhật và truy cập trái phép, nhưng **không biến trình duyệt thành nguồn xác thực tin cậy cho XP**. MVP không có leaderboard cạnh tranh, tiền thật hay phần thưởng có giá trị.
8. Sau mỗi mốc: chạy được `npm run dev`, `npm run typecheck`, `npm run build`, test khả thi; cập nhật `docs/PROGRESS.md` và nêu chính xác những gì đã hoàn thành.
9. Khi chưa được cung cấp Firebase config, tạo `.env.example`, chỉ dẫn cấu hình và **chế độ demo 3D xem được**; không giả vờ dữ liệu đã lưu cloud. Khi có config thì yêu cầu các thao tác có điểm phải đọc/ghi Firestore thật.
10. Cấu hình sẵn workflow GitHub Actions deploy Pages; không yêu cầu chạy server Node.js liên tục cho production. Node.js chỉ cần khi phát triển/build.
11. Tránh phụ thuộc không cần thiết, không thêm tính năng ngoài MVP trước khi checklist nghiệm thu đạt.

**Định nghĩa MVP nhỏ:** một ngôi chùa stylized 3D + một nhân vật chibi + camera góc nhìn thứ ba + WASD/joystick + **3 hoạt động chùa** (lễ Phật, thắp hương, ngồi thiền) + bể cá với **3 hoạt động chăm bể** + 1 chế độ ngắm bể không thưởng + XP/level + nhiệm vụ ngày đơn giản + Firestore persistence + GitHub Pages deployment. **Quét sân, tưới sen, đánh chuông chuyển sang V1.1**, không phải điều kiện để ra mắt MVP.

**Ưu tiên chất lượng:** Gameplay chạy thật → ổn trên mobile → lưu dữ liệu đúng → an toàn truy cập Firebase → hình ảnh đẹp → tính năng mở rộng.

---
## 1. TỔNG QUAN SẢN PHẨM

### 1.1. Ý tưởng

Người chơi truy cập website và hóa thân thành nhân vật chú tiểu/phật tử phong cách hoạt hình 3D. Họ có thể đi lại trong khuôn viên chùa, bước vào chính điện, lễ Phật, thắp hương, ngồi thiền và **chăm sóc bể cá thủy cảnh** (cho cá ăn, làm sạch bể, chăm cây thủy sinh, ngắm cá). Mỗi hoạt động tạo hoạt ảnh và âm thanh, hoàn thành nhiệm vụ giúp tăng điểm kinh nghiệm (XP), lên cấp và mở khóa trang trí.

Trò chơi hướng đến **thư giãn, khám phá, tương tác nhẹ nhàng và chia sẻ**, không hướng đến đối kháng, cờ bạc hay giao dịch tài sản ảo. Điểm XP là thành tích **trong game**, tuyệt đối không tuyên bố có giá trị tâm linh hoặc thay thế thực hành tôn giáo ngoài đời.

### 1.2. Người dùng mục tiêu

- Người chơi casual thích thử game lạ trên mạng xã hội.
- Người dùng desktop và điện thoại, kể cả chưa từng chơi game 3D.
- Phiên chơi ngắn khoảng 5–10 phút; không yêu cầu cài ứng dụng.

### 1.3. Cảm xúc thiết kế

- Yên bình, ấm áp, nhẹ nhàng, hơi đáng yêu.
- Hoạt hình 3D low-poly / stylized, không cần photorealistic.
- Có điểm nhấn vui nhộn ở biểu cảm nhân vật nhưng vẫn tôn trọng không gian tôn giáo.
- Tránh giật mình, hiệu ứng nhấp nháy mạnh, chuyển động camera quá nhanh.

### 1.4. Phạm vi ngoài MVP

Không triển khai ở V1: đăng nhập Google/Facebook, chat tự do, sàn giao dịch, thanh toán, bảng xếp hạng cạnh tranh, PVP, blockchain, NFT, dữ liệu trò chuyện, hệ thống bang hội, thế giới mở lớn, AI NPC trò chuyện bằng mô hình ngôn ngữ.

---
## 2. THAM CHIẾU HÌNH ẢNH VÀ HƯỚNG MỸ THUẬT

**Ảnh tham chiếu được cung cấp:** `./reference-temple.png` (đi kèm gói bàn giao, chỉ là tài liệu tham chiếu; không bắt buộc đưa lên website production). Nếu không tìm thấy file, vẫn phải triển khai theo mô tả phía dưới.

![Ảnh tham chiếu bố cục chùa 3D](./reference-temple.png)

### 2.1. Phân tích bố cục ảnh

Ảnh mô tả khu vực **chính điện nhìn từ phía sau những người đang lễ Phật**:

- Chính giữa phía trước là tượng Phật màu vàng, ngồi trên tòa sen/bệ cao.
- Sau tượng là bức nền trang trí hoa văn nhiều màu, bố cục đối xứng và có hai hình người trong tranh hai bên.
- Trước tượng là bàn thờ/bàn nhỏ, bình hoa, chân nến, lư hương và đồ lễ trang trí.
- Nền là ván gỗ tối màu, có các tấm đệm xếp theo hàng để các nhân vật ngồi.
- Nhân vật đầu tròn, dáng chibi tối giản, nhìn từ sau, mặc áo màu vàng/trắng.
- Camera ở độ cao tương đối thấp, nhìn theo trục giữa lên bàn thờ; ánh sáng ấm, không gian thanh tịnh.

**Yêu cầu sáng tạo lại, không sao chép nguyên xi:** dựng một chính điện mới có cảm giác tương tự. Đối tượng tượng Phật, hình họa và lời kinh cần được thể hiện trang trọng, không bóp méo hoặc biến thành vật phẩm mua bán.

### 2.2. Bảng màu định hướng

| Thành phần | Gợi ý màu | Ghi chú |
|---|---|---|
| Sàn gỗ | `#352A25` | Có thớ gỗ hoặc vân nhẹ |
| Khung cột | `#4B2E22` | Gỗ nâu ấm |
| Tường | `#D1C6AD` | Kem vàng dịu |
| Tượng chính | `#CBA45B` | Vàng đồng không lóa |
| Đệm ngồi | `#777B70` | Xanh xám trung tính |
| Áo nhân vật | `#E3BF72` | Vàng nhạt |
| UI nền | `#1D2525` | Tối trong suốt |
| Accent UI | `#E7BF6C` | Vàng ấm |
| XP accent | `#75C6A0` | Xanh ngọc dịu |
| Nước bể thủy cảnh | `#68B5B9` | Xanh ngọc trong, có gradient nhẹ |
| Cây thủy sinh | `#427F51` | Xanh lá dịu, nổi trên nền đá/sỏi |
| Cá cảnh | `#E6A65C` / `#5DB7D5` | Màu cá tương phản, không chói |

### 2.3. Phong cách mô hình

- Tỷ lệ đầu nhân vật khoảng 35–45% chiều cao tổng, không quá nhiều chi tiết gương mặt.
- Các khối của kiến trúc rõ ràng, hình dáng dễ nhận biết.
- Tượng chính có silhouette trang trọng; **không dùng hình khối thô gây phản cảm trong bản public**. Khi chưa có tượng đủ chất lượng, dùng một không gian thờ trang nhã/biểu tượng hoa sen trung tính, ghi rõ asset cần thay.
- Mọi tương tác có thể nhận diện qua ánh sáng viền nhẹ, icon và nhãn tên.
- Tránh chèn nhiều emoji vào giữa không gian 3D.
- Bể cá thủy cảnh **nước ngọt** đặt trong một tiểu cảnh/mái che ở sân chùa; không dùng san hô biển hoặc cá lớn không phù hợp với bể nhỏ. Nước, cây, đá, lũa và cá có phong cách stylized đồng bộ với ngôi chùa.

---
## 3. LUỒNG NGƯỜI CHƠI (FIREBASE AUTHENTICATION)

### 3.1. Truy cập lần đầu

1. Mở `/#/` hoặc landing page trên GitHub Pages, chọn **Vào chùa**.
2. Nếu Firebase đã cấu hình: gọi `onAuthStateChanged`; khi chưa có user thì `signInAnonymously(auth)`; **không tự xây cookie/session server**.
3. Tạo tài liệu `/players/{uid}` và `/players/{uid}/game/state` nếu chưa tồn tại, bằng giao dịch/logic khởi tạo idempotent. Không ghi đè khi người chơi cũ trở lại.
4. Nếu tên chưa đặt: hiện dialog biệt danh 2–20 ký tự và chọn 1 trong 3–4 màu áo.
5. Vào scene 3D ở cổng chùa, hướng dẫn điều khiển; nhiệm vụ đầu tiên là lễ Phật tại chính điện.
6. Hoàn thành hành động, xác nhận ghi Firestore thành công rồi mới hiện toast cộng XP.
7. Đóng/mở trang cùng trình duyệt: Firebase Auth phục hồi phiên ẩn danh (nếu trạng thái đăng nhập của trình duyệt chưa bị xóa), đọc lại dữ liệu Firestore.

**Lưu ý mất dữ liệu:** đăng nhập ẩn danh **không bảo đảm khôi phục tài khoản** sau khi xóa storage, chuyển thiết bị hoặc dùng trình duyệt khác. Hiển thị lưu ý trong hướng dẫn/cài đặt. Nâng cấp tài khoản email/Google bằng `linkWithCredential` là hạng mục sau MVP.

### 3.2. Các trạng thái ứng dụng

- `BOOTING`: kiểm tra WebGL, tải assets, khởi tạo Firebase (nếu có).
- `SIGNED_IN`: đã có Firebase `uid`, đang tải dữ liệu người chơi.
- `READY`: vào game và sử dụng điểm/nhiệm vụ lưu cloud thật.
- `INTERACTING`: khóa movement phù hợp, hiện animation và progress.
- `SAVING`: hoàn thành timer, đang chạy Firestore transaction, khóa bấm lặp.
- `REWARD`: chỉ hiển thị sau khi transaction commit thành công.
- `OFFLINE`: vẫn được tham quan và ngắm cá, nhưng **không phát thưởng XP/claim nhiệm vụ**; không xếp hàng ghi thưởng offline để tránh cộng lặp khó kiểm soát.
- `CONFIG_REQUIRED`: thiếu Firebase env; chỉ cho phép chơi demo 3D, có thông báo rõ chưa lưu tiến trình, không hiển thị XP giả.
- `ERROR`: lỗi quyền Firestore/mạng, hiện thông báo tiếng Việt có nút thử lại.

### 3.3. Nhiệm vụ ngày và thời gian

- Ngày mới theo `Asia/Ho_Chi_Minh`, `YYYY-MM-DD`, không dựa vào timezone máy người dùng.
- Không reset `totalXp`; chỉ reset bộ đếm hoạt động và tiến độ nhiệm vụ trong `daily`.
- Không cần scheduled job: khi người chơi vào game hoặc hoàn thành hành động, nếu `dateKey` cũ thì khởi tạo ngày mới trong transaction.
- Không nên bật đồng bộ realtime diện rộng; MVP chỉ đọc state của chính người chơi.

---
## 4. BẢN ĐỒ GAME 3D — PHẠM VI MVP

Dùng một scene tổng thể kích thước thiết kế khoảng **70 × 70 đơn vị** (1 đơn vị ≈ 1 mét để dễ làm collision). Không bắt buộc đúng kích thước thật; AI được điều chỉnh nếu cải thiện gameplay.

### 4.1. Các khu vực

| Khu vực | Vai trò | Tương tác V1 |
|---|---|---|
| Cổng tam quan | Spawn, biển hướng dẫn | Đi vào chùa |
| Sân chùa | Không gian trung tâm | Đi lại, khám phá (quét sân bổ sung V1.1) |
| Chính điện | Phòng chính, trọng tâm ảnh tham chiếu | Lễ Phật, thắp hương, ngồi thiền |
| Tháp chuông nhỏ | Cảnh quan (V1.1 bổ sung đánh chuông) | Chưa có hoạt động thưởng ở MVP |
| Hồ sen | Cảnh quan/điểm nghỉ | Ngắm cảnh (V1.1 bổ sung tưới sen) |
| **Bể cá thủy cảnh** | Tiểu cảnh nước ngọt gần vườn/hồ sen | Ngắm cá, cho cá ăn, vệ sinh bể, chăm cây thủy sinh |
| Khu bảng nhiệm vụ | NPC hoặc biển gỗ | Mở bảng nhiệm vụ |

### 4.2. Ví dụ bố trí logic (sơ đồ không theo tỷ lệ)

```text
                   [ PHÍA BẮC ]
  ┌────────────────────────────────────┐
  │          CHÍNH ĐIỆN                 │
  │  ┌──────────────────────────────┐  │
  │  │   BÀN THỜ + TƯỢNG PHẬT       │  │
  │  │   ĐỆM NGỒI / LƯ HƯƠNG        │  │
  │  └─────────────┬────────────────┘  │
  │                │                   │
  │  [THÁP CHUÔNG] │     [HỒ SEN]      │
  │                │   [BỂ CÁ THỦY CẢNH]│
  │                │                   │
  │          [SÂN CHÙA]                │
  │         [BẢNG NHIỆM VỤ]            │
  │                │                   │
  │           [CỔNG CHÙA]              │
  └────────────────────────────────────┘
                   [ PHÍA NAM ]
```

### 4.3. Yêu cầu scene

- Sàn và đường đi rõ, không có khu vực rơi vô hạn.
- Có collider cho sàn, cột, tường, bệ thờ, hàng rào hồ sen.
- Không cho người chơi đi xuyên vật thể hoặc đi vào phần không thuộc map.
- Khu vực tương tác có **tọa độ cố định, radius**, có ánh sáng/viền khi ở gần.
- Chính điện có thể là một phần trong scene lớn; chưa bắt buộc scene loading riêng.
- Dùng `InstancedMesh` cho vật thể lặp lại nhiều (đệm, đèn nhỏ, cây) nếu cần.
- Không để ánh sáng động, shadow texture và vật liệu đắt khiến mobile yếu bị giật.
- Bể cá thủy cảnh là **bể riêng**, không gộp với hồ sen. Có bục/bệ gỗ, kính bể, nước, sỏi, cây thủy sinh, 3–6 cá nhỏ, vùng tương tác và collider bên ngoài; camera không xuyên kính/bể.
- Khi không ở gần bể, dừng/giảm cập nhật hiệu ứng cá và bong bóng để tiết kiệm tài nguyên.

### 4.4. Ví dụ tọa độ (có thể thay khi dựng thực tế)

Dùng hệ tọa độ Three.js: Y là trục đứng, Z dương hướng về cổng chùa.

```ts
export const WORLD_LOCATIONS = {
  spawn:        { x: 0, y: 0, z: 26 },
  courtyard:    { x: 0, y: 0, z: 12 },
  mainHall:     { x: 0, y: 0, z: -10 },
  prayerSpot:   { x: 0, y: 0, z: -6 },
  incenseSpot:  { x: 4, y: 0, z: -6 },
  meditateSpot: { x: -4, y: 0, z: -6 },
  bellSpot:     { x: -21, y: 0, z: -3 },
  lotusSpot:    { x: 21, y: 0, z: 3 },
  aquariumSpot: { x: 23, y: 0, z: -12 }, // tâm bể cá thủy cảnh
  aquariumViewSpot:  { x: 23, y: 0, z: -9 },
  aquariumFeedSpot:  { x: 21.5, y: 0, z: -9 },
  aquariumCleanSpot: { x: 24.5, y: 0, z: -9 },
  aquariumPlantSpot: { x: 26, y: 0, z: -11 },
  sweepSpot:    { x: -7, y: 0, z: 13 },
} as const;
```

**Lưu ý:** tọa độ là khởi điểm cho AI, không phải yêu cầu bất di bất dịch. Trigger tương tác và camera phải bám đúng cảnh thực tế. Các điểm quanh bể cá phải có lối tiếp cận không chồng collider; nếu scene thay đổi kích thước hãy chỉnh các `aquarium*Spot` tương ứng.

---
## 5. NHÂN VẬT, CAMERA, DI CHUYỂN

### 5.1. Nhân vật

- Nhân vật mặc định: chú tiểu/phật tử chibi, đầu tròn, áo vàng/trắng, không vũ khí.
- Các bộ phận cơ thể được tách để tạo animation bằng xương hoặc animation code.
- Nếu có GLB: dùng GLTFLoader / `useGLTF`, AnimationMixer / `useAnimations`.
- Nếu chưa có GLB: tạo nhân vật bằng `SphereGeometry` và `CapsuleGeometry`/khối đơn giản, vẫn có animation di chuyển/thở/cúi chào bằng transform.
- Thiết lập `CharacterController` độc lập với model, tránh phụ thuộc asset.

### 5.2. Hoạt ảnh V1

| Tên chuẩn | Cách kích hoạt | Ghi chú |
|---|---|---|
| `idle` | Không di chuyển | Loop |
| `walk` | Di chuyển bình thường | Loop, chân tay nhịp nhàng |
| `run` | Giữ Shift/nút chạy | Loop |
| `pray` | Lễ Phật | Chắp tay + cúi, hoàn thành sau thời lượng cấu hình |
| `incense` | Thắp hương | Đưa tay lên/nghi thức nhẹ |
| `meditate` | Ngồi thiền | Giữ tư thế và vòng thời gian |
| `sweep` | Quét sân (V1.1) | Tay đưa chổi theo nhịp |
| `water` | Tưới sen (V1.1) | Tưới bằng bình nhỏ |
| `bell` | Đánh chuông (V1.1) | Cử động tay và phát âm thanh |
| `fish_feed` | Cho cá ăn | Nhân vật rắc một lượng thức ăn nhỏ, cá bơi lại |
| `aquarium_clean` | Vệ sinh bể | Lau kính/vớt mảnh rác trang trí bằng dụng cụ mềm |
| `plant_care` | Chăm cây thủy sinh | Dùng dụng cụ cắt tỉa/chăm cây, cây khẽ đung đưa |
| `aquarium_view` | Quan sát bể (không XP) | Camera tiến gần, hiển thị trạng thái bể; không tạo `ActivityAttempt` |

Nếu thiếu clip, có thể xây animation procedural. **Không được gọi một tư thế tĩnh là hoàn thành hoạt ảnh `pray`** nếu thiếu chuyển động tối thiểu.

### 5.3. Camera

- Góc nhìn third-person: camera ở phía sau nhân vật, hơi cao, nhìn xuống nhẹ.
- Camera có damping, không rung và không xuyên tường.
- Có thể xoay ngang/dọc trong giới hạn để tránh lật camera.
- Khi vào chính điện và tiếp cận tượng, cho phép cảm giác khung hình đối xứng như ảnh tham chiếu nhưng không làm mất quyền điều khiển.
- Có cơ chế đặt lại hướng camera nếu người chơi bị kẹt.

### 5.4. Điều khiển desktop

| Thao tác | Phím |
|---|---|
| Di chuyển | `W A S D` hoặc phím mũi tên |
| Chạy | `Shift` |
| Tương tác | `E` |
| Mở nhiệm vụ | `Q` |
| Tạm dừng/cài đặt | `Esc` |
| Xoay camera | Kéo chuột / pointer lock tùy chế độ phù hợp |

- Không để phím điều khiển game cuộn trang browser khi scene đang focus.
- Khi mở modal hoặc nhập tên, dừng điều khiển nhân vật và không bắt phím vào game.

### 5.5. Điều khiển mobile

- Joystick ảo nằm góc dưới bên trái, thao tác bằng một ngón.
- Khu kéo xoay camera nằm bên phải, không đụng nút `Tương tác`.
- Nút `Chạy` và `Tương tác` nằm dưới bên phải; kích thước chạm tối thiểu khoảng 44 CSS px.
- Thiết bị xoay dọc vẫn hiển thị giao diện có thể sử dụng; khuyến nghị chế độ ngang nhưng **không bắt buộc khóa cứng**.
- Không cần gamepad ở V1.
- Xử lý mất focus, chạm nhiều ngón, tự hủy joystick khi ngón nhấc khỏi vùng điều khiển.

### 5.6. Vật lý

- Dùng `@react-three/rapier` (hoặc bản tương thích với phiên bản React Three Fiber đã chọn).
- Character collider dạng capsule, tách visual model khỏi physics body.
- Camera được update sau physics step hoặc với interpolation để giảm giật.
- Đặt tốc độ mục tiêu: đi ~2.5 units/s, chạy ~4.2 units/s; chỉnh sau kiểm thử.
- Không nhảy trong MVP; đừng làm nút nhảy nếu không có gameplay cần đến.

---
## 6. HỆ THỐNG TƯƠNG TÁC VÀ GAMEPLAY

### 6.1. Hợp đồng tương tác

```ts
type RewardActionId =
  | 'pray' | 'incense' | 'meditate'
  | 'fish_feed' | 'aquarium_clean' | 'plant_care';

type ActionId = RewardActionId | 'aquarium_view';

interface InteractionDefinition {
  id: ActionId;
  label: string;
  position: [number, number, number];
  radius: number;
  durationSeconds: number;
  cooldownSeconds: number;
  xpReward: number;
  dailyRewardLimit: number;
  animation: string;
}
```

**Nguồn cấu hình:** `src/game/config/activities.ts` là registry duy nhất cho 6 hoạt động thưởng thuộc MVP. UI, animation, tiến độ và Firestore service dùng chung registry; không để component tự viết giá trị XP khác nhau. `aquarium_view` có `xpReward=0` và không tạo transaction thưởng.

**Luồng thực thi:**

1. Nhân vật ở trong radius, nhấn `E` hoặc nút mobile → mở prompt/menu.
2. Kiểm tra trạng thái đăng nhập và mạng. Hoạt động thưởng không chạy khi `CONFIG_REQUIRED` hoặc `OFFLINE`.
3. Khóa bấm trùng, chạy animation và timer cục bộ. Hủy giữa chừng thì không thưởng.
4. Khi timer xong, tạo `actionIdempotencyKey = crypto.randomUUID()` **một lần cho tương tác** rồi gọi `completeActivity({ type, key })`.
5. `completeActivity` chạy **Firestore `runTransaction`**: đọc state, xác định `dateKey`, kiểm tra cooldown/quota, kiểm tra key đã xử lý, tính XP/quest (level suy ra từ totalXp), tính suy giảm tình trạng bể và tác động nếu chăm bể, cập nhật tất cả **trong cùng một tài liệu `/players/{uid}/game/state`**.
6. Chỉ sau commit thành công: cập nhật UI, hiển thị `+XP`, quest progress và trạng thái bể. Nếu lỗi mạng, không hiện thưởng; giữ nút thử lại với cùng `key` để không cộng lặp.
7. Không có endpoint REST `/activities/start` hay `/activities/complete`, không gọi `fetch('/api/...')`.

**Giới hạn an toàn:** timer, tọa độ và logic cộng điểm đều ở frontend, người dùng có thể giả mạo. Transaction bảo đảm tính nhất quán khi ghi đồng thời, **không bảo đảm chống gian lận**. Security Rules phải giới hạn quyền ghi/phạm vi/kiểu dữ liệu, nhưng không được quảng cáo là chống cheat tuyệt đối. Không có bảng xếp hạng cạnh tranh trong MVP.

### 6.2. Sáu hoạt động có thưởng của MVP

| ID | Hoạt động | Thời gian | Cooldown | XP | Số lần nhận thưởng tối đa/ngày |
|---|---|---:|---:|---:|---:|
| `pray` | Lễ Phật | 5 giây | 60 giây | 10 | 10 |
| `incense` | Thắp hương | 4 giây | 120 giây | 5 | 5 |
| `meditate` | Ngồi thiền | 30 giây | 60 giây | 15 | 8 |
| `fish_feed` | Cho cá ăn | 6 giây | 180 giây | 10 | 5 |
| `aquarium_clean` | Vệ sinh bể | 12 giây | 600 giây | 20 | 3 |
| `plant_care` | Chăm cây thủy sinh | 10 giây | 300 giây | 15 | 4 |

**Để dành V1.1 (KHÔNG bắt buộc MVP):** `sweep` quét sân (+20 XP, 12s), `water` tưới sen (+10 XP, 8s), `bell` đánh chuông (+5 XP, 5s). Các mô hình liên quan có thể hiện trong scene như cảnh quan nhưng không cần trigger và lưu XP ở bản đầu. Khi bổ sung phải cập nhật registry, quest và tests.

- `pray`: chắp tay, cúi/lễ Phật trang trọng.
- `incense`: cầm hương; có hiệu ứng khói nhẹ.
- `meditate`: nhân vật ngồi thiền, progress 30s, có thể hủy.
- `fish_feed`: rắc thức ăn, đàn cá tụ tới, cải thiện độ no.
- `aquarium_clean`: lau kính/vớt vụn, tăng độ trong.
- `plant_care`: chăm/cắt tỉa cây thủy sinh, tăng sức sống.
- `aquarium_view`: chế độ quan sát không XP, không cooldown, không ghi thưởng.

### 6.3. Cooldown, quota và thao tác lặp

- `daily.activityCounts[type]` lưu số lần được thưởng trong ngày; `daily.lastCompletedAt[type]` lưu timestamp Firestore.
- Nếu chưa hết cooldown hoặc vượt quota: không ghi gì và trả lỗi nghiệp vụ rõ ràng.
- `recentActionIds` lưu danh sách tối đa 30 UUID gần nhất (FIFO); nếu key đã có, trả trạng thái đã xử lý, không cộng lại. Không sinh key mới mỗi lần retry.
- Khoảng chờ có thể hiển thị bằng thời gian tương đối; không dùng client clock làm bảo đảm an ninh.
- Mọi `runTransaction` có thể chạy callback nhiều lần, **không phát âm thanh, setState hoặc tạo UUID trong callback**.
- Firestore client offline/permission denied → xử lý lỗi, không báo đã cộng điểm.

### 6.4. BỂ CÁ THỦY CẢNH — YÊU CẦU BẮT BUỘC

#### 6.4.1. Bể cá 3D

- Một **bể cá nước ngọt** nằm gần khu vườn/hồ sen, nhưng là mô hình và khu vực tương tác **riêng biệt**.
- Kích thước tham khảo 3.5 × 1.6 × 1.3 đơn vị, chân/bệ gỗ, kính, nước, nền sỏi, đá/lũa, 3 cụm cây thủy sinh, **3–6 con cá** có chuyển động rõ.
- Chuyển động cá theo quỹ đạo/waypoints, nội suy hướng và vẫy đuôi; luôn nằm bên trong thể tích nước. Không dùng AI pathfinding, mạng hoặc Firestore để cập nhật vị trí từng cá.
- Có collider chặn nhân vật xuyên bể. Dùng vật liệu mặt nước/kính nhẹ; chế độ LOW tắt reflection/refraction đắt đỏ, giảm bong bóng/particles.
- Nếu thiếu GLB: tạo cá low-poly bằng meshes, sử dụng chuyển động procedural. Không dùng ảnh bể cá tĩnh thay cho 3D.

#### 6.4.2. Bốn tương tác

| Tương tác | Cơ chế 3D | Điểm và dữ liệu |
|---|---|---|
| **Ngắm bể** `aquarium_view` | Camera tiến gần, xoay nhẹ, panel 3 chỉ số, nút Quay lại/Esc | 0 XP; chỉ đọc state |
| **Cho cá ăn** `fish_feed` | Nhân vật rắc hạt; cá bơi lại ăn sau 6s | +10 XP; `fishSatiety +25` |
| **Vệ sinh bể** `aquarium_clean` | Lau kính, bể trong dần sau 12s | +20 XP; `waterClarity +20` |
| **Chăm cây thủy sinh** `plant_care` | Cắt tỉa, cây đung đưa sau 10s | +15 XP; `plantHealth +20` |

Khi tới gần bể, nhấn `E`/nút tương tác mở `AquariumInteractionPanel` với bốn lựa chọn. Chế độ ngắm bể phải phục hồi camera, joystick và movement sau `Esc`/`Quay lại`. Khi đang chạy thao tác chăm bể, không thể kích hoạt thao tác khác đồng thời.

#### 6.4.3. Trạng thái bể theo từng người chơi

```ts
interface AquariumState {
  waterClarity: number;  // 0..100, mặc định 80
  fishSatiety: number;   // 0..100, mặc định 80
  plantHealth: number;   // 0..100, mặc định 80
  lastCareAt: Timestamp; // Firestore Timestamp, serverTimestamp() khi ghi
}
```

- Lưu tại **`/players/{uid}/game/state.aquarium`**; không dùng bảng SQL hoặc Cloud Storage.
- Độ trong suy giảm 5 điểm/ngày, độ no 8 điểm/ngày, cây 3 điểm/ngày; có thể cấu hình lại, không gây chết cá hoặc ép người chơi quay lại.
- Khi **chỉ đọc**: tính chỉ số hiển thị từ `lastCareAt` và số giờ đã trôi qua; **không ghi Firestore theo từng frame hoặc mỗi lần mở panel**.
- Khi chăm bể thành công: trong **cùng transaction cộng XP**, tính decay từ timestamp cũ, clamp 0..100, cộng đúng chỉ số tương ứng, lưu các số mới và `lastCareAt: serverTimestamp()`; tránh sai số tích lũy do làm tròn mỗi lần đọc.
- UI cập nhật 3 thanh tình trạng: **Độ trong nước**, **Độ no của cá**, **Sức sống cây**; trạng thái `Tốt / Ổn / Cần chăm sóc` kèm chữ, không chỉ dùng màu.
- Bể ngoài vùng quan sát: hạn chế tick animation cá để giảm render trên mobile.
- Khi chỉ số thấp, hiển thị nước hơi đục/cá bơi chậm hơn/lá hơi xỉn, **không có cá chết**.

#### 6.4.4. Điều kiện nghiệm thu riêng

1. Cá bơi trong bể, không xuyên kính, không có vấn đề camera xuyên bể.
2. Có cây nước, đá, sỏi, bệ, thể tích nước và 4 nút tương tác thật.
3. Ngắm bể có camera riêng, bảng thông số và nút quay lại hoạt động trên PC/mobile.
4. Ba hành động chăm bể có ba animation/hiệu ứng khác nhau.
5. Ghi Firestore thành công mới tăng XP và chỉ số bể; refresh và mở lại vẫn giữ kết quả.
6. Retry cùng `actionIdempotencyKey` không nhận thưởng hai lần; đồng thời chạy hai transaction không làm mất cập nhật.
7. Khi mất mạng/không có Firebase, vẫn ngắm được cá nhưng không nhận thưởng giả.
8. Nhiệm vụ ngày `daily_aquarium` ghi tiến độ và chỉ nhận thưởng một lần.

---
## 7. XP, LEVEL, NHIỆM VỤ, VẬT PHẨM

### 7.1. Level

```ts
export function totalXpToReachLevel(level: number): number {
  return level <= 1 ? 0 : (100 * (level - 1) * level) / 2;
}
```

- Level 2: 100 XP; Level 3: 300 XP; Level 4: 600 XP. Lưu `totalXp` là số nguyên không âm trong Firestore, **tính `level` từ XP** để tránh lệch đồng bộ.
- Tiến độ level trên HUD phản ánh tổng XP thật đã load từ Firestore; không hiển thị số thưởng trên client trước khi commit.
- XP chỉ là điểm thưởng trong game, không phải thước đo công đức thực.

### 7.2. Nhiệm vụ ngày

| ID | Điều kiện | XP khi bấm nhận |
|---|---|---:|
| `daily_pray` | `pray` 1 lần | 20 |
| `daily_meditate` | `meditate` 1 lần | 20 |
| `daily_complete` | Đã hoàn thành `daily_pray`, `daily_meditate` và `daily_aquarium` | 50 |
| `daily_aquarium` | Bất kỳ hoạt động chăm bể một lần | 30 |

- Hoàn thành điều kiện **khác** với nhận thưởng: UI hiển thị nút `Nhận thưởng`.
- Nút nhận thưởng gọi `claimDailyQuest` qua Firestore transaction, kiểm tra đủ điều kiện và `daily.questClaimed[questId] == false`; update `totalXp`, `daily.questClaimed` atomically.
- Sau khi claim, tải lại trang không nhận lại được cùng nhiệm vụ/ngày. Không cộng XP khi Firestore write thất bại.
- `daily_complete` là nhiệm vụ tổng hợp từ **3 nhiệm vụ MVP** kể trên; chỉ nhận sau khi cả ba đã hoàn thành. Không cần thực hiện các hoạt động V1.1.

### 7.3. Ngoại hình

- Mặc định tối thiểu 3 màu áo; lưu `robeColor` trong hồ sơ Firestore.
- Level 3/5/10 mở các màu áo/hiệu ứng trang trí nếu có thời gian. Tránh vật phẩm giao dịch, nạp tiền, sàn giao dịch trong MVP.

---
## 8. CÔNG NGHỆ VÀ CẤU TRÚC SOURCE CODE — KHÔNG BACKEND RIÊNG

### 8.1. Stack bắt buộc

| Nhóm | Công nghệ | Ghi chú |
|---|---|---|
| Framework | React + Vite + TypeScript strict | SPA tạo static `dist/` |
| 3D | Three.js + `@react-three/fiber` + `@react-three/drei` | Dùng phiên bản tương thích, khóa lockfile |
| Vật lý | `@react-three/rapier` | Collider sàn, tường, bể cá |
| UI | React + CSS modules/Tailwind (chọn một) | Có desktop/mobile |
| Trạng thái game local | Zustand | Không cập nhật React state mỗi frame |
| Firebase Auth | Firebase JS SDK modular `firebase/auth` | Anonymous sign-in |
| Lưu cloud | `firebase/firestore` | `getDoc`, `onSnapshot` phù hợp, `runTransaction` |
| Test | Vitest + Testing Library | Test logic; Emulator Suite cho rules |
| Hosting | GitHub Pages | GitHub Actions tự động build/deploy |
| Assets | `/public/models`, `/public/textures`, `/public/audio` | Không Firebase Cloud Storage |

**Không tạo** `/api`, Prisma schema, SQL migrations, `docker-compose.yml` database, Fastify, NestJS, Colyseus, Redis, Supabase, Firebase Functions hoặc Firebase Hosting để triển khai MVP. Đây là SPA tĩnh, Firebase là dịch vụ backend quản lý dữ liệu.

### 8.2. Cây thư mục đề xuất

```text
temple-online/
├── .github/
│   └── workflows/deploy.yml
├── public/
│   ├── models/
│   ├── textures/
│   └── audio/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── pages/                 # landing, game, not-found
│   ├── game/
│   │   ├── world/             # courtyard, hall, lotus pond, aquarium
│   │   ├── characters/        # avatar, animations
│   │   ├── controls/          # desktop + virtual joystick
│   │   ├── camera/
│   │   ├── interactions/      # triggers, animation, action progress
│   │   ├── aquarium/          # Tank, FishSchool, Plants, InspectCamera
│   │   └── config/           # activities, positions, XP, assets
│   ├── components/            # HUD, panels, dialogs
│   ├── firebase/
│   │   ├── client.ts          # initializeApp, getAuth, getFirestore
│   │   ├── auth.ts            # signInAnonymously, onAuthStateChanged
│   │   ├── playerRepository.ts
│   │   └── gameRepository.ts  # runTransaction cho XP/quest/bể
│   ├── state/                 # Zustand, local view state
│   ├── lib/                   # dateKey, XP formula, aquarium decay
│   ├── types/
│   └── styles/
├── tests/
├── docs/
│   ├── PROGRESS.md
│   ├── FIREBASE_SETUP.md
│   ├── DATA_MODEL.md
│   ├── GAMEPLAY.md
│   ├── ASSET_GUIDE.md
│   └── DEPLOY_GITHUB_PAGES.md
├── firestore.rules
├── firestore.indexes.json
├── firebase.json             # Emulator / Rules, KHÔNG cấu hình Firebase Hosting
├── .env.example
├── .gitignore
├── index.html
├── vite.config.ts
├── package.json
├── package-lock.json
└── README.md
```

### 8.3. Nguyên tắc coding

- Scene 3D không trực tiếp thực hiện transaction; dùng service functions trong `firebase/gameRepository.ts`.
- Firebase `app`, `auth`, `db` chỉ khởi tạo một lần; dọn listener của `onAuthStateChanged`, `onSnapshot` khi unmount.
- Mô hình `AquariumTank`, `FishSchool`, `AquaticPlants`, `AquariumInteractionPanel`, `AquariumInspectCamera` tách riêng.
- Tất cả URL assets dưới `public/` phải nối từ `import.meta.env.BASE_URL` để hoạt động ở đường dẫn con GitHub Pages.
- Tái sử dụng cấu hình hoạt động và enums; tránh hardcode điểm thưởng nhiều chỗ.
- Dùng `HashRouter` hoặc route nội bộ đơn giản; tránh 404 khi refresh URL nested trên GitHub Pages.

---
## 9. FIRESTORE DATA MODEL VÀ SECURITY RULES

### 9.1. Collections / documents

**BẮT BUỘC:** dữ liệu của mỗi người chơi được bảo vệ theo Firebase Auth `uid`; không tạo một collection công khai cho mọi người sửa XP của nhau.

```text
players/{uid}                 # profile, tạo 1 lần
  nickname: string
  robeColor: 'saffron' | 'cream' | 'brown'
  createdAt: Timestamp
  updatedAt: Timestamp

players/{uid}/game/state      # một doc game state cho MVP
  schemaVersion: 1
  totalXp: number              # integer >= 0
  daily:
    dateKey: 'YYYY-MM-DD'      # theo Asia/Ho_Chi_Minh
    activityCounts: { [id]: number }
    lastCompletedAt: { [id]: Timestamp | null }
    questClaimed: { [questId]: boolean }
  aquarium:
    waterClarity: number       # 0..100
    fishSatiety: number        # 0..100
    plantHealth: number        # 0..100
    lastCareAt: Timestamp
  recentActionIds: string[]   # tối đa 30 id gần nhất
  updatedAt: Timestamp
```

- Khi đăng nhập lần đầu: tạo profile và state với defaults `totalXp=0`, bể `80/80/80`, bộ đếm ngày trống. Dùng `serverTimestamp()` cho timestamps tạo/cập nhật.
- Firestore document giới hạn dung lượng; **không lưu lịch sử vô hạn trong `recentActionIds`** và không lưu từng frame/chuyển động cá.
- Không cần tạo index tùy biến cho MVP vì chỉ đọc/ghi theo path tài liệu, không query toàn bộ người dùng.
- Nếu sau này tách activity log riêng, phải thiết kế lại atomicity và rules trước khi triển khai.

### 9.2. Nhiệm vụ và thao tác bằng Firestore transaction

- `completeActivity` phải đọc `/players/{uid}/game/state` bằng `transaction.get(ref)` trước khi ghi.
- Mỗi lần hoàn thành: kiểm tra cooldown, quota, `recentActionIds`, tự reset cấu trúc `daily` khi qua ngày, tính XP và trạng thái bể, rồi `transaction.update(ref, {...})` đúng **một lần**.
- Các cập nhật `totalXp`, `daily`, `aquarium`, `recentActionIds`, `updatedAt` là **một transaction** trên cùng doc. Đối với hành động thường, phần aquarium giữ nguyên hoặc chỉ phản ánh sự suy giảm đã tích lũy nếu có; không tự cộng chỉ số chăm bể.
- `claimDailyQuest` tương tự: đọc state, xác định điều kiện từ counts/claimed, ghi XP + dấu claimed atomically; khi retry cùng claim không thưởng lần hai.
- Đặt `serverTimestamp()` ở `updatedAt`/`aquarium.lastCareAt` lúc ghi; không dùng `Date.now()` để làm bằng chứng thời gian đáng tin cậy.
- Không dùng trực tiếp `setDoc` từ UI để cộng XP hoặc tăng chỉ số bể.
- Firestore transaction được chạy lại khi có cạnh tranh cập nhật; callback phải thuần (không effect ngoài).

### 9.3. File `firestore.rules` — chuẩn bảo vệ dữ liệu tối thiểu

AI phải tạo `firestore.rules` và kiểm thử bằng Firebase Emulator; không dùng `allow read, write: if true`. Ví dụ nền tảng sau, có thể mở rộng kiểm tra `daily` chặt hơn trong triển khai:

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isOwner(uid) {
      return request.auth != null && request.auth.uid == uid;
    }
    function validColor(c) {
      return c in ['saffron', 'cream', 'brown'];
    }
    function validNickname(n) {
      return n is string && n.size() >= 2 && n.size() <= 20;
    }
    function validAquarium(a) {
      return a is map
        && a.keys().hasAll(['waterClarity','fishSatiety','plantHealth','lastCareAt'])
        && a.waterClarity is number && a.waterClarity >= 0 && a.waterClarity <= 100
        && a.fishSatiety is number && a.fishSatiety >= 0 && a.fishSatiety <= 100
        && a.plantHealth is number && a.plantHealth >= 0 && a.plantHealth <= 100
        && a.lastCareAt is timestamp;
    }

    match /players/{uid} {
      allow read: if isOwner(uid);
      allow create: if isOwner(uid)
        && request.resource.data.keys().hasOnly(['nickname','robeColor','createdAt','updatedAt'])
        && validNickname(request.resource.data.nickname)
        && validColor(request.resource.data.robeColor)
        && request.resource.data.createdAt == request.time
        && request.resource.data.updatedAt == request.time;
      allow update: if isOwner(uid)
        && request.resource.data.diff(resource.data).affectedKeys()
          .hasOnly(['nickname','robeColor','updatedAt'])
        && validNickname(request.resource.data.nickname)
        && validColor(request.resource.data.robeColor)
        && request.resource.data.updatedAt == request.time;
      allow delete: if false;

      match /game/{docId} {
        allow read: if isOwner(uid) && docId == 'state';
        allow create: if isOwner(uid) && docId == 'state'
          && request.resource.data.keys().hasAll([
            'schemaVersion','totalXp','daily','aquarium','recentActionIds','updatedAt'])
          && request.resource.data.keys().hasOnly([
            'schemaVersion','totalXp','daily','aquarium','recentActionIds','updatedAt'])
          && request.resource.data.schemaVersion == 1
          && request.resource.data.totalXp == 0
          && request.resource.data.daily is map
          && validAquarium(request.resource.data.aquarium)
          && request.resource.data.recentActionIds is list
          && request.resource.data.recentActionIds.size() == 0
          && request.resource.data.updatedAt == request.time;
        allow update: if isOwner(uid) && docId == 'state'
          && request.resource.data.keys().hasAll([
            'schemaVersion','totalXp','daily','aquarium','recentActionIds','updatedAt'])
          && request.resource.data.keys().hasOnly([
            'schemaVersion','totalXp','daily','aquarium','recentActionIds','updatedAt'])
          && request.resource.data.schemaVersion == 1
          && request.resource.data.totalXp is int
          && request.resource.data.totalXp >= resource.data.totalXp
          && request.resource.data.totalXp <= resource.data.totalXp + 50
          && request.resource.data.daily is map
          && validAquarium(request.resource.data.aquarium)
          && request.resource.data.recentActionIds is list
          && request.resource.data.recentActionIds.size() <= 30
          && request.resource.data.updatedAt == request.time;
        allow delete: if false;
      }
    }
  }
}
```

**Quan trọng:** rules trên chỉ bảo vệ quyền sở hữu và một số bất biến cơ bản; người dùng vẫn có thể giả mạo update của **chính mình**, làm nhiều giao dịch hoặc thao túng `daily`. Đừng giới thiệu là hệ thống chống hack. Có thể siết thêm rules và dùng App Check sau, nhưng muốn điểm đáng tin để cạnh tranh/phát thưởng thì cần trusted backend (Cloud Functions/server) ở phiên bản khác.

**Yêu cầu test rules:** khác `uid` không đọc/ghi được; không đăng nhập bị từ chối; tạo state có `totalXp > 0` bị từ chối; `totalXp` giảm hoặc tăng hơn 50 trong một lần ghi bị từ chối; chỉ số bể ngoài 0..100 bị từ chối; owner đọc/ghi hợp lệ được chấp nhận. Không được deploy rules nếu các test này chưa pass.

### 9.4. Firebase quota và tối ưu reads/writes

- Ưu tiên 1 tài liệu state cho MVP, không tạo listener cho từng hoạt động riêng lẻ.
- Chỉ subscribe profile/state khi game mở, hủy listener khi rời game. Hạn chế `getDoc` lặp trong animation loops.
- Một tương tác hợp lệ: mục tiêu 1 transaction, không ghi mỗi giây của timer, không ghi hoạt ảnh hay vị trí cá.
- Không dùng Firebase Cloud Storage ở gói Spark; assets nằm trong `public/` phát qua GitHub Pages.
- Đo Firestore reads/writes và thiết lập cảnh báo/quota tùy khả năng console; không cam kết miễn phí vô hạn.

---
## 10. HỢP ĐỒNG SERVICE TYPESCRIPT — THAY THẾ REST API

**Không tạo REST API.** Toàn bộ frontend gọi functions trong `src/firebase/`:

```ts
interface GameRepository {
  ensurePlayer(uid: string, nickname: string, robeColor: string): Promise<void>;
  loadPlayer(uid: string): Promise<PlayerProfile>;
  loadGameState(uid: string): Promise<GameState>;
  completeActivity(
    uid: string,
    activityType: RewardActionId,
    idempotencyKey: string
  ): Promise<ActivityResult>;
  claimDailyQuest(uid: string, questId: DailyQuestId): Promise<QuestClaimResult>;
  updateAppearance(uid: string, robeColor: RobeColor): Promise<void>;
}

interface ActivityResult {
  awardedXp: number;
  totalXp: number;
  alreadyProcessed: boolean;
  daily: DailyProgress;
  aquarium: AquariumState;
}
```

### 10.1. Chuỗi xử lý tương tác

```text
[UI E/Touch] → [kiểm tra gần đối tượng]
            → [animation/timer, có thể hủy]
            → [gameRepository.completeActivity()]
            → [runTransaction(state doc)]
            → [thành công: cập nhật Zustand, toast +XP]
            → [thất bại: báo lỗi, không cộng ảo]
```

### 10.2. Đảm bảo thao tác idempotent

- Một lần bấm tương tác có một UUID cố định; retry phải dùng lại UUID ấy.
- Nếu key đã có trong `recentActionIds`, trả trạng thái đã xử lý, không cộng thêm XP.
- `claimDailyQuest` kiểm tra `questClaimed`, một lần/ngày/quest.
- Không sử dụng cache local để quyết định quyền được thưởng nếu chưa đọc Firestore.
- Không trộn side effects vào callback của Firestore transaction.

### 10.3. Xử lý lỗi

- `permission-denied`: hiển thị hướng dẫn cấu hình rules/dự án, không reset XP.
- `unavailable`/offline: hiện thông báo mất kết nối, vẫn cho khám phá scene.
- `resource-exhausted`: báo giới hạn dịch vụ, không retry liên tục.
- Auth anonymous không bật: hiện hướng dẫn `Firebase Console > Authentication > Sign-in method > Anonymous`.
- Không có config: chuyển `CONFIG_REQUIRED`; gameplay offline chỉ là bản demo **không lưu cloud**.

---
## 11. GIAO DIỆN WEBSITE (UX/UI)

### 11.1. Các trang

- `/#/` — landing: tên game, ảnh/chất liệu nền, nút **Vào chùa**, **Hướng dẫn**, **Cài đặt âm thanh**.
- `/#/game` — WebGL canvas full viewport và các thành phần HUD.
- `NotFound` — trang không tìm thấy, có nút về trang chủ.

### 11.2. HUD trong game

**Desktop:**

```text
┌────────────────────────────────────────────────────┐
│ [Avatar] Chú tiểu An Nhiên   LV 2  XP 110/300     │
│                                      [Q Nhiệm vụ]  │
│                                                    │
│                 GAME 3D SCENE                      │
│                                                    │
│            [E — Lễ Phật]                           │
│                                                    │
│ [WASD Di chuyển]       [Âm thanh] [Cài đặt]        │
└────────────────────────────────────────────────────┘
```

**Mobile:**

```text
┌────────────────────────────────┐
│ [Avatar] LV2        [Nhiệm vụ] │
│                                │
│           3D SCENE             │
│                                │
│ [Joystick]       [Tương tác]  │
│                  [Chạy] [⚙]   │
└────────────────────────────────┘
```

### 11.3. Các UI component

1. `LandingPage` — giới thiệu + start.
2. `CharacterSetupModal` — nickname, chọn 3–4 màu áo, xác nhận.
3. `GameCanvas` — bọc renderer/scene/camera.
4. `PlayerHud` — nickname, level, XP hiện tại.
5. `InteractionPrompt` — nút gợi ý khi đến gần.
6. `InteractionProgress` — thanh tiến độ, nút hủy nếu có.
7. `QuestPanel` — danh sách nhiệm vụ, tiến độ và nhận thưởng.
8. `RewardToast` — XP thưởng, tránh hiển thị sai khi API thất bại.
9. `SettingsPanel` — âm lượng, graphics, hướng dẫn phím.
10. `VirtualJoystick` + `MobileActionButtons`.
11. `LoadingOverlay`, `ErrorNotice`, `ConnectionStatus`.
12. `AquariumInteractionPanel` — menu 4 tương tác và trạng thái bể thật từ Firestore.
13. `AquariumInspectCamera` / `AquariumStatusPanel` — góc ngắm bể, 3 thanh chỉ số, đóng khôi phục camera và điều khiển.

### 11.4. Quy tắc UX

- UI tiếng Việt chuẩn; ngắn, dễ đọc; không để text Korean từ ảnh tham chiếu.
- Mọi nút đều có hành vi thật hoặc được ẩn đến khi triển khai.
- Khi mở modal, nhân vật phải dừng di chuyển, phím `Esc` đóng modal (trừ dialog bắt buộc).
- Game canvas ưu tiên không cuộn trang, `overflow: hidden` ở route `/game`.
- Không chồng joystick lên nút hành động; thử nghiệm nhiều độ phân giải.
- Responsive cho desktop 1366×768; mobile 390×844 portrait và 844×390 landscape; tablet 768×1024.
- Panel bể cá không được che kín bể trên mobile. Khi bật chế độ ngắm bể, ẩn điều khiển di chuyển nhưng phải còn nút đóng/thoát; đồng bộ trạng thái sau khi chăm bể.
- Trợ năng: font rõ, tương phản đủ đọc, hỗ trợ giảm chuyển động (prefers-reduced-motion) đối với chuyển động UI, tắt âm thanh.

---
## 12. ÂM THANH VÀ HIỆU ỨNG

**Âm thanh MVP tối thiểu:** click UI, bước chân nhẹ, tiếng ambience nhẹ ở chùa, **tiếng nước nhẹ/bong bóng tại bể cá khi người chơi ở gần, âm thanh cho cá ăn/vệ sinh bể**, âm thanh không gian (chim/gió nhẹ). Có thể dùng âm thanh miễn phí hợp pháp hoặc tự tạo, nhưng phải lưu ghi chú nguồn/giấy phép trong `docs/ASSET_GUIDE.md`.

- Không tự phát nhạc/âm thanh trước khi người chơi có tương tác hợp lệ với trang nếu trình duyệt chặn autoplay.
- Có thanh âm lượng và nút mute chung; ghi lựa chọn của người chơi vào localStorage **chỉ cho setting không nhạy cảm**.
- Fade giữa ambience và SFX để tránh chói tai.
- Không cần nhạc nền ở bản prototype; nếu thêm phải là âm thanh có giấy phép phù hợp.
- Hiệu ứng: bụi/lá nhẹ khi quét, chút nước ở sen, ánh sáng khi nhận XP; hạn chế particle trên mobile.

---
## 13. ASSET PIPELINE VÀ TỐI ƯU HIỆU NĂNG

### 13.1. Asset 3D

- Định dạng ưu tiên `.glb` / glTF 2.0.
- Dùng texture nén (`KTX2`) khi setup pipeline phù hợp; thử Meshopt/Draco để giảm dữ liệu truyền.
- Không load toàn bộ asset vào landing page.
- Cá và cây thủy sinh dùng low-poly, tái sử dụng geometry/material, số lượng nhỏ trong MVP. Có thể ngừng update animation cá khi bể ngoài tầm nhìn; đừng dựng refraction hoặc real-time reflection đắt tiền trên mobile.
- Định nghĩa URL asset tập trung, ví dụ `ASSET_PATHS.player`, `ASSET_PATHS.mainHall`.
- Có placeholder hiển thị khi asset lỗi; không làm trắng màn hình.
- Hướng dẫn cách thay asset placeholder bằng file thật mà không đổi logic gameplay.

### 13.2. Mục tiêu hiệu năng (sẽ xác minh bằng đo đạc)

| Thiết bị | Mục tiêu |
|---|---|
| Desktop phổ thông | xấp xỉ 60 FPS ở Low/Medium |
| Điện thoại tầm trung | tối thiểu khoảng 30 FPS ở Low |
| Lần tải đầu | cố gắng giữ dưới ~8–10 MB ở MVP |
| Canvas | Tự resize theo viewport và DPR |
| GPU yếu | Tự động hạ shadow / pixel ratio / effects |

Các số liệu là **mục tiêu kỹ thuật**, không tuyên bố đạt khi chưa test thiết bị thực.

### 13.3. Graphics settings

- `LOW`: DPR tối đa 1–1.25, hạn chế shadow, tắt particle nặng, đơn giản hóa vật liệu.
- `MEDIUM`: DPR 1–1.5, bóng đơn giản, sương nhẹ nếu cần.
- `HIGH`: DPR tối đa 2 khi phần cứng đáp ứng; thêm shadow/ánh sáng trang trí.
- Cài đặt phải **thực sự thay đổi** renderer/scene; không chỉ là dropdown giả.
- Dùng `Suspense` / loader và thông báo lỗi WebGL/WebGPU phù hợp. V1 chỉ cần WebGL.

### 13.4. Kiểm tra rò rỉ

- Không gắn event listener lặp vô hạn khi React rerender.
- Dispose geometry, material, texture không còn dùng.
- Tránh setState mỗi frame khiến rerender toàn cây React; ref/imperative update là phù hợp cho transform 3D.
- Không khởi tạo nhiều renderer khi chuyển trang.

---
## 14. AN TOÀN, RIÊNG TƯ VÀ TUÂN THỦ

1. Đây là game giải trí; XP/“điểm thiện hạnh” **không phải công đức tâm linh thật**. Không khuyến khích giao dịch hay mua điểm.
2. Hình tượng Phật, nghi thức và kiến trúc phải trang trọng, không làm sai lệch nội dung văn hóa; có thể nhờ người hiểu tín ngưỡng kiểm tra khi phát hành rộng.
3. Không sao chép model, nhạc, texture hoặc ảnh từ game khác. Asset tham chiếu chỉ định hướng phong cách; ghi nguồn và giấy phép cho mọi tài nguyên sử dụng.
4. Chỉ thu thập dữ liệu tối thiểu: Firebase uid, nickname, màu áo, XP, nhiệm vụ, chỉ số bể cá và timestamps. Không cần email/địa chỉ/số điện thoại trong MVP.
5. Firebase config của Web SDK **không phải credential quản trị**. Tuyệt đối không commit service-account JSON, private keys, GitHub token cá nhân hoặc thông tin billing.
6. Firestore phải dùng Rules phân quyền theo UID, deny-by-default và thử qua Emulator. Không để `allow read, write: if true`.
7. Ẩn danh không đồng nghĩa có thể khôi phục tiến trình mọi thiết bị. Có lời nhắc rõ về giới hạn của anonymous auth.
8. Đừng bật leaderboard hoặc đổi XP lấy quà/tiền khi chưa có cơ chế tính điểm được kiểm chứng từ backend đáng tin cậy.
9. Nếu công khai game tại Việt Nam, cần xác minh nghĩa vụ pháp lý liên quan việc cung cấp trò chơi điện tử trên mạng trước phát hành; việc chạy trên GitHub Pages không tự động miễn trách nhiệm.
10. Không có chat hoặc multiplayer trong MVP, hạn chế rủi ro kiểm duyệt nội dung. Bể cá không mô phỏng chết cá hay bỏ đói cá để ép người chơi.

---
## 15. PHẠM VI SAU MVP — CHỈ ĐỂ ĐỊNH HƯỚNG

- **V1.1:** thêm hoạt động quét sân (`sweep`), tưới sen (`water`), đánh chuông (`bell`); tối ưu đồ họa, thêm outfit/ảnh chụp, cân bằng XP, liên kết tài khoản ẩn danh với phương thức đăng nhập lâu dài.
- **V2:** nếu thật sự cần nhiều người cùng lúc, bổ sung game server riêng/WebSocket/Colyseus hoặc giải pháp realtime phù hợp; GitHub Pages chỉ host frontend, không thể chạy game server.
- **V2 an toàn điểm:** đưa logic cộng thưởng sang backend đáng tin (Cloud Functions hoặc dịch vụ server) trước khi xây bảng xếp hạng/giải thưởng.
- **V3:** các chùa/tiểu cảnh khác, sự kiện cộng đồng, nhiệm vụ theo mùa.

**MVP không thực hiện:** chat, đồng bộ avatar người chơi khác, WebSocket, thanh toán, Google sign-in, tài sản ảo mua bán, game server, Firebase Cloud Functions, Firebase Cloud Storage, bảng xếp hạng cạnh tranh.

---
## 16. CẤU HÌNH FIREBASE VÀ DEPLOY GITHUB PAGES

### 16.1. Chuẩn bị Firebase Console (người dùng thực hiện một lần)

1. Tạo Firebase project mới, chọn gói phù hợp (có thể bắt đầu từ **Spark** nếu sản phẩm trong hạn mức).
2. Thêm một **Web App** để lấy `firebaseConfig` (apiKey, authDomain, projectId, appId, v.v.). Đây là cấu hình web public, không phải admin key.
3. Vào **Authentication → Sign-in method → Anonymous** và bật đăng nhập ẩn danh.
4. Vào **Cloud Firestore**, tạo database và chọn khu vực. Chọn rules hạn chế; không để test mode public trong bản triển khai.
5. Deploy `firestore.rules` sau khi qua test Emulator (Firebase CLI cần xác thực quyền quản trị để deploy rules, nhưng không dùng admin credential trong web bundle).
6. Khi cần, thêm `<USERNAME>.github.io` vào **Authentication → Settings → Authorized domains** cho các phương thức đăng nhập yêu cầu danh sách domain; không thêm `https://` hay path repository.
7. **Không bật Cloud Storage** trong MVP. Firebase Storage hiện cần dự án Blaze; mô hình GLB/audio dùng GitHub Pages `public/`.

Tài liệu AI phải tạo: `docs/FIREBASE_SETUP.md` có từng màn hình cấu hình, cách kiểm tra kết nối và xử lý `permission-denied`.

### 16.2. `.env.example`

```dotenv
VITE_FIREBASE_API_KEY=replace_with_web_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_APP_ID=1:000000000000:web:example
VITE_FIREBASE_MESSAGING_SENDER_ID=000000000000
# Nếu không có Measurement ID thì không cần Analytics trong MVP
VITE_BASE_PATH=/
```

- `.env.local` trên máy phát triển, **không commit**.
- Không cần `DATABASE_URL`, `API_BASE_URL`, `SESSION_SECRET`, Firebase Admin SDK key hay service-account JSON.
- `VITE_*` được đóng gói vào JS browser nên **không bảo mật bởi env variable**; bảo vệ dữ liệu bằng rules + Auth.
- Không dùng Firebase Analytics nếu không cần trong MVP.

### 16.3. Vite base và đường dẫn assets

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH || '/',
});
```

- Repo project site `https://USERNAME.github.io/temple-online/` → `VITE_BASE_PATH=/temple-online/`.
- Repo đặc biệt `USERNAME.github.io` hoặc custom domain tại root → `VITE_BASE_PATH=/`.
- Tài nguyên trong `public/models/monk.glb` phải load qua:

```ts
const monkUrl = `${import.meta.env.BASE_URL}models/monk.glb`;
```

Không hardcode URL `'/models/monk.glb'` vì ở GitHub Pages project site sẽ 404. URL ảnh/audio/texture cũng tuân thủ quy tắc này.

### 16.4. React Router

- Dùng `HashRouter` cho SPA deploy GitHub Pages. Ví dụ route game là `https://USERNAME.github.io/temple-online/#/game`.
- Tránh `BrowserRouter` trên project Pages trừ khi đã xử lý route fallback phù hợp.
- `index.html` luôn nằm trong `dist` output.

### 16.5. Workflow GitHub Actions — file `.github/workflows/deploy.yml`

AI phải tạo workflow có thể sử dụng thực tế, ví dụ dưới đây cho repo **`temple-online`**; nếu repository tên khác, sửa `VITE_BASE_PATH` tương ứng:

```yaml
name: Deploy Temple Online to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: github-pages
  cancel-in-progress: true

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Check types
        run: npm run typecheck
      - name: Test
        run: npm test -- --run
      - name: Build
        run: npm run build
        env:
          VITE_BASE_PATH: /temple-online/
          VITE_FIREBASE_API_KEY: ${{ vars.VITE_FIREBASE_API_KEY }}
          VITE_FIREBASE_AUTH_DOMAIN: ${{ vars.VITE_FIREBASE_AUTH_DOMAIN }}
          VITE_FIREBASE_PROJECT_ID: ${{ vars.VITE_FIREBASE_PROJECT_ID }}
          VITE_FIREBASE_APP_ID: ${{ vars.VITE_FIREBASE_APP_ID }}
          VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ vars.VITE_FIREBASE_MESSAGING_SENDER_ID }}
      - name: Configure Pages
        uses: actions/configure-pages@v5
      - name: Upload build
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v4
```

- Trong repo GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
- Vào **Settings → Secrets and variables → Actions → Variables**, tạo các biến `VITE_FIREBASE_*` tương ứng. Dùng Variables do đây là web config; nếu đặt Secrets cũng vẫn hiện trong JS sau build, không phải cách bảo mật.
- Nếu project site đổi tên repo hoặc dùng custom domain, phải cập nhật `VITE_BASE_PATH`.
- Trong repo riêng tư, kiểm tra điều kiện GitHub Pages theo loại tài khoản; muốn công khai site nhưng source private có thể phụ thuộc gói GitHub. AI không tự ý thay đổi quyền riêng tư repo.
- Chạy test + build trước deploy. Không deploy vào branch `gh-pages` trừ khi người dùng có yêu cầu riêng.
- Sau deploy, kiểm thử URL root, URL `/#/game`, tải GLB, kết nối Firebase, reload và tương tác bể cá.

### 16.6. Chạy local

```bash
npm install
cp .env.example .env.local       # Windows: copy .env.example .env.local
npm run dev
npm run typecheck
npm test -- --run
npm run build
npm run preview
```

README ghi URL localhost do Vite cung cấp. `npm run dev` là local dev server của Vite **không phải backend production**.

### 16.7. Firestore Rules deploy và local Emulator

- Thêm `firebase.json` cho Firestore rules/Emulator (không cấu hình Hosting) và `firestore.indexes.json` tối giản.
- Document lệnh `npx firebase-tools emulators:start --only auth,firestore`, phù hợp hệ điều hành và JDK khi cần.
- Document lệnh `npx firebase-tools deploy --only firestore:rules` (yêu cầu Firebase login và project được chọn).
- **Không tự deploy Firebase project chưa được người dùng cấp quyền**, không giả vờ đã làm.

---
## 17. KIỂM THỬ VÀ CHẤT LƯỢNG

### 17.1. Unit tests (Vitest)

- `totalXpToReachLevel`, tìm level theo totalXp tại các điểm biên.
- Tính `dateKey` theo Việt Nam tại 23:59 và 00:01, không dựa múi giờ máy.
- Reset `daily`, tính cooldown/quota, quy tắc claim chỉ một lần.
- `recentActionIds` FIFO 30 phần tử và retry cùng UUID.
- Aquarium decay: 0 giờ, 12 giờ, 1 ngày, thời gian âm, clamp 0..100 và tính một lần cho mỗi transaction.
- Logic phạm vi tương tác và phục hồi camera khi đóng panel bể.

### 17.2. Firebase Emulator tests

- `firestore.rules` phải có test auth/rules: owner đọc/ghi đúng; user khác và không-auth bị từ chối; XP ngoài biên, bể ngoài 0..100, key sai kiểu bị từ chối.
- Dùng Emulator hoặc mock phù hợp để test hai transaction cạnh tranh và retry idempotent; không chỉ dựa vào test UI.
- Test `ensurePlayer` không ghi đè state đã tồn tại.
- Không chạy test production để tạo hàng loạt anonymous accounts.

### 17.3. Gameplay smoke/E2E

- Truy cập website, cảnh 3D tải xong, avatar chuyển động và va chạm đúng.
- PC: WASD, Shift, E, Esc, Q; mobile: joystick, camera, nút tương tác.
- Đến chính điện, lễ Phật, sau commit Firestore có +10 XP; reload không mất XP.
- Đến bể cá: cá bơi, 4 lựa chọn, ngắm bể đóng được, 3 hoạt động chăm bể cập nhật đúng chỉ số.
- Hủy thiền giữa chừng không nhận thưởng; spam hành động trong cooldown không tăng điểm.
- Quest ngày và `daily_aquarium` claim một lần; qua ngày VN reset quota và quest.
- Mất mạng hoặc rules deny: không hiện toast thưởng giả, game không trắng màn hình.
- Deploy GitHub Pages: asset URL/SPA route/Firebase config chính xác.

### 17.4. Chỉ tiêu kỹ thuật

- TypeScript strict không lỗi, test cơ bản pass, `npm run build` tạo `dist/`.
- Desktop phổ thông mục tiêu ~60 FPS, mobile trung cấp mục tiêu >=30 FPS LOW, đo trên thiết bị thật.
- Đặt mục tiêu payload tải đầu nhỏ (~8–10 MB nếu khả thi), lazy load 3D, tối ưu texture và GLB.
- Không gọi `setState` mỗi render frame cho transform cá/nhân vật; không để listener rò rỉ.

---
## 18. KẾ HOẠCH TRIỂN KHAI THEO MỐC (M0 → M6)

### M0 — Bootstrap và nền tảng hosting

- Khởi tạo Vite React + TS strict, ESLint, test, `HashRouter`, cấu trúc thư mục, `.env.example`.
- Tạo Firebase client singleton, hướng dẫn đăng nhập anonymous, `firestore.rules` sơ bộ và Emulator config.
- Tạo workflow GitHub Pages, `vite.config.ts` base path và docs hướng dẫn setup.
- **Nghiệm thu:** `npm install`, `npm run dev`, `npm run typecheck`, `npm run build` chạy; `/` và `/#/game` hoạt động; khi chưa có Firebase vẫn có trạng thái demo rõ ràng.

### M1 — Scene chùa và điều khiển 3D (ưu tiên cao nhất)

- Dựng sân, cổng, chính điện, tượng/đệm, hồ sen, tháp chuông bằng geometry 3D thật.
- Tạo chú tiểu chibi procedural hoặc GLB, idle/walk/run, camera third-person và Rapier colliders.
- WASD, Shift, xoay camera, joystick + nút tương tác mobile; không xuyên tường.
- **Nghiệm thu:** người dùng mở web và đi quanh chùa trơn tru trên PC và điện thoại.

### M2 — Vùng tương tác và bể cá 3D

- Trigger radius cho 3 hoạt động chùa của MVP; animation và timer có thể hủy; chưa cộng XP giả.
- Bể cá thật: kính, nước, sỏi, cây, tối thiểu 3 cá bơi có bounds, collider.
- Menu 4 thao tác `aquarium_view/fish_feed/aquarium_clean/plant_care`, camera ngắm bể và khôi phục controls.
- **Nghiệm thu:** đủ các tương tác hoạt động ở mức 3D/animation, giao diện không khóa joystick/camera.

### M3 — Firebase Authentication, Firestore, XP, bể cá lưu cloud

- Kết nối Auth anonymous, `ensurePlayer`, state schema, bảo mật Rules và Emulator tests.
- Làm vertical slice **lễ Phật → animation → transaction +10 XP → reload giữ điểm**.
- Làm vertical slice **cho cá ăn → cá tụ tới → transaction XP + độ no → reload giữ bể**.
- Mở rộng đủ **6 hoạt động thưởng MVP** (3 chùa + 3 chăm bể), quota, cooldown, idempotency, xử lý offline/errors.
- **Nghiệm thu:** không có SQL/API riêng, dữ liệu thật lưu Firestore; transaction không cộng lặp với cùng key, rules khóa dữ liệu người khác.

### M4 — Nhiệm vụ và giao diện

- 4 nhiệm vụ ngày gồm `daily_aquarium` và `daily_complete`; claim thưởng qua transaction.
- XP/level, character setup, màu áo, QuestPanel, RewardToast, setting audio/graphics.
- Hoàn thiện HUD desktop/mobile, trạng thái mạng, modal, hướng dẫn.
- **Nghiệm thu:** quest reset giờ Việt Nam và lưu lại; UI điện thoại dùng được.

### M5 — Tối ưu, hình ảnh, âm thanh

- Nâng chất lượng scene/nhân vật nếu có GLB riêng; tối ưu vật liệu, instancing, lighting, DPR.
- SFX hợp pháp, setting mute, giảm hiệu ứng khi LOW, loading/error overlay.
- Tối ưu đường dẫn GLB/texture theo `import.meta.env.BASE_URL`.
- **Nghiệm thu:** không bị màn hình trắng khi thiếu asset, không tràn UI mobile, FPS đạt mục tiêu thử nghiệm hoặc báo rõ thiết bị chưa đạt.

### M6 — QA và deploy GitHub Pages

- Hoàn tất tests, kiểm tra Firestore Rules Emulator, build production.
- Cập nhật README, FIREBASE_SETUP, DATA_MODEL, GAMEPLAY, DEPLOY_GITHUB_PAGES, PROGRESS.
- Kiểm thử workflow Actions sau khi người dùng cung cấp repo và Firebase config.
- **Nghiệm thu:** bản GitHub Pages có URL public theo cấu hình repo, login ẩn danh, game chạy và XP/bể cá lưu Firestore. Nếu chưa có quyền repo/Firebase, bàn giao workflow và hướng dẫn thao tác; không tuyên bố đã deploy.

### Yêu cầu báo cáo từng mốc

Trong `docs/PROGRESS.md` phải có: ngày, milestone, file đã tạo/sửa, lệnh đã chạy, kết quả typecheck/test/build, những chức năng thật đã chạy, hạng mục còn thiếu, lỗi tồn tại và đề xuất bước tiếp theo. Không đánh dấu hoàn thành khi chỉ viết hướng dẫn mà chưa có code.

---
## 19. DEFINITION OF DONE — CHECKLIST NGHIỆM THU

- [ ] Source React + Vite + TypeScript strict, lockfile, không phụ thuộc backend/VPS.
- [ ] Scene chùa 3D chạy thật, có tượng, đệm, sân, hồ sen, tháp chuông và tương tác.
- [ ] Một chú tiểu chibi di chuyển WASD/joystick, camera theo và collider hoạt động.
- [ ] Đủ **3 hoạt động chùa và 3 hoạt động chăm bể** với animation riêng; quét sân, tưới sen và đánh chuông thuộc V1.1.
- [ ] Bể cá 3D có 3–6 cá bơi, cây, sỏi, kính, nước; menu 4 tương tác.
- [ ] `aquarium_view` quan sát camera, Esc/Quay lại khôi phục game controls.
- [ ] Firebase Auth anonymous login, tự phục hồi user cùng trình duyệt.
- [ ] Profile + XP + nhiệm vụ + aquarium state ghi và đọc từ Cloud Firestore.
- [ ] Mọi ghi thưởng thực hiện qua transaction; retry cùng key không cộng hai lần.
- [ ] Security Rules theo owner UID; Emulator tests kiểm tra truy cập khác UID và dữ liệu ngoài biên.
- [ ] Không có UI thưởng XP giả khi offline/config chưa có/lưu thất bại.
- [ ] XP và level chính xác; nhiệm vụ ngày, `daily_aquarium`, claim một lần.
- [ ] Bể cá hiển thị đúng 3 chỉ số, lưu lại sau refresh.
- [ ] `npm run dev`, `npm run typecheck`, `npm test -- --run`, `npm run build` pass.
- [ ] GitHub Actions có workflow upload `dist/` lên GitHub Pages.
- [ ] Vite `base` đúng repository, GLB/texture/audio không 404 khi deploy.
- [ ] App dùng `HashRouter` hoặc routing không 404 khi reload.
- [ ] Mobile portrait/landscape dùng được, có mute và chế độ LOW.
- [ ] Không commit secret/admin key, không sử dụng asset chưa rõ giấy phép.
- [ ] README, FIREBASE_SETUP và DEPLOY_GITHUB_PAGES đủ hướng dẫn từ máy mới.
- [ ] Liệt kê trung thực mọi giới hạn của client-only XP/anonymous account.

---
## 20. PHẠM VI, THỜI GIAN VÀ CHI PHÍ THAM KHẢO

- Đây là **prototype/MVP nhỏ**, không phải game nhiều người chơi. Làm từng phần và chốt bản playable trước khi nâng thẩm mỹ.
- Nếu đã quen React/Three.js và dùng geometry placeholder, một nhóm nhỏ có thể hoàn thiện prototype nhanh hơn đặc tả backend cũ; thời gian thực tế phụ thuộc asset và trình độ người thực hiện, **không cam kết số tuần**.
- GitHub Pages có thể cung cấp website tĩnh miễn phí trong các điều kiện/giới hạn dịch vụ. Firebase Auth/Firestore có hạn mức miễn phí; theo dõi quota đọc/ghi và cập nhật chính sách hiện hành.
- Không cần VPS, Postgres, Supabase hoặc Cloud Storage. Không thêm chi phí Cloud Functions trong bản hiện tại.
- Khi mở công khai đông người, cần theo dõi lưu lượng tải GLB/assets của GitHub Pages và số Firestore reads/writes; nếu vượt giới hạn thì đánh giá CDN/hosting khác hoặc kiến trúc mở rộng.

---
## 21. ƯU TIÊN KHI AI CHỈ CÓ THỂ THỰC HIỆN MỘT PHẦN

1. M0 + M1: site React/Vite mở được cảnh chùa 3D, nhân vật di chuyển, camera, điều khiển.
2. Một luồng `pray` end-to-end: animation → Firestore transaction → XP → refresh vẫn giữ.
3. Một luồng `fish_feed` end-to-end: cá bơi/ăn → Firestore transaction → XP + độ no → refresh vẫn giữ.
4. Mở rộng đủ 6 hoạt động thưởng của MVP và 4 tương tác bể cá; nhiệm vụ ngày; joystick/mobile.
5. Security Rules, Firebase Emulator tests, build và GitHub Pages Actions trước khi tuyên bố hoàn tất.

**Không làm thay đổi kiến trúc** khi công việc còn dang dở: không thêm Express/Fastify/SQL/Cloud Functions chỉ vì cảm thấy dễ hơn. Nếu cần backend đáng tin cậy cho chống gian lận, báo đó là giới hạn của MVP và đề xuất nâng cấp sau.

---
## 22. PROMPT DÁN THẲNG VÀO CURSOR / CODEX / CLAUDE CODE

```text
Đọc toàn bộ file temple-online-spec.md và ảnh reference-temple.png trong project.
Hãy TRIỂN KHAI CODE THỰC TẾ game Chùa An Nhiên 3D theo đúng đặc tả v2.0.

STACK BẮT BUỘC:
- React + Vite + TypeScript + Three.js/React Three Fiber + Rapier.
- Firebase Auth Anonymous + Cloud Firestore để lưu user, XP, nhiệm vụ, bể cá.
- GitHub Pages deploy qua GitHub Actions, Vite base path đúng repo và HashRouter.
- KHÔNG xây dựng backend Node/Fastify, PostgreSQL/Prisma, Supabase, VPS,
  Cloud Functions, Firebase Cloud Storage hoặc multiplayer trong MVP.

CHỨC NĂNG:
- Một chùa 3D có chính điện, sân, hồ sen, chuông, 1 nhân vật chibi.
- WASD/joystick, camera third-person, va chạm.
- 3 hoạt động chùa (lễ Phật, thắp hương, ngồi thiền) + 3 hoạt động chăm bể có animation và XP.
- Bể cá thủy cảnh 3D có cá thực sự bơi, ngắm bể, cho ăn, vệ sinh, chăm cây;
  3 trạng thái bể lưu Firestore, nhiệm vụ daily_aquarium.
- Firestore runTransaction cho điểm/quest/bể, Rules theo uid, không cộng
  thưởng trước commit. Ghi rõ giới hạn chống gian lận của frontend-only.

BẮT ĐẦU NGAY M0 và M1: tạo project, chạy build/typecheck/test rồi tạo scene
3D điều khiển được. Nếu chưa có GLB thì dựng placeholder bằng geometry 3D.
Tiếp tục lần lượt M2 → M6, cập nhật docs/PROGRESS.md sau từng mốc.
Đừng chỉ viết lại kế hoạch; phải tạo các file và source thật.
Khi thiếu Firebase config, tạo .env.example và hướng dẫn người dùng nhập,
không tạo dữ liệu cloud giả hoặc nói đã deploy nếu chưa có quyền GitHub.
```

---
## 23. QUYẾT ĐỊNH MẶC ĐỊNH VÀ TÀI LIỆU THAM KHẢO

| Vấn đề | Mặc định MVP v2.0 |
|---|---|
| Tên | Chùa An Nhiên, có thể đổi trong config |
| Ngôn ngữ | Tiếng Việt |
| Nền tảng | Web mobile + desktop |
| Đồ họa | Chibi low-poly 3D, ánh sáng ấm |
| Đăng nhập | Firebase Authentication Anonymous |
| Database | Cloud Firestore |
| Nơi deploy | GitHub Pages + GitHub Actions |
| Node.js | Chỉ dùng `npm`/Vite build local/CI, không có server production |
| Routing | HashRouter |
| GLB/texture/audio | `public/`, load qua `import.meta.env.BASE_URL` |
| Firebase Storage | Không sử dụng |
| Mô hình bể | Một bể nước ngọt, 3–6 cá, 3 chỉ số riêng per UID |
| Gameplay MVP | 6 hoạt động có XP (3 chùa + 3 chăm bể) + 1 ngắm bể không XP |
| Level | Derived từ `totalXp` |
| Quest reset | Theo ngày Asia/Ho_Chi_Minh |
| Multiplayer | Ngoài MVP |
| Anti-cheat | Không cam kết; frontend-only và rules chỉ hạn chế một phần |
| Hoàn thành sớm | Scene 3D + `pray` Firebase + `fish_feed` Firebase |

### Phân biệt hồ sen và bể cá

- **Hồ sen:** khu ngoài trời, trước mắt chỉ là cảnh quan; hành động `water` tưới sen, +10 XP nếu triển khai ở V1.1.
- **Bể cá thủy cảnh:** bể kính nước ngọt riêng, có `fish_feed`, `aquarium_clean`, `plant_care` (có thưởng), và `aquarium_view` (không thưởng). Không dùng lại một mesh/interaction cho hai khu.

### Nguồn tài liệu kỹ thuật chính thức để AI đối chiếu khi cần

- Vite GitHub Pages deployment: https://vite.dev/guide/static-deploy.html
- Firebase anonymous authentication: https://firebase.google.com/docs/auth/web/anonymous-auth
- Firestore transactions: https://firebase.google.com/docs/firestore/manage-data/transactions
- Firestore Security Rules: https://firebase.google.com/docs/firestore/security/get-started
- Firebase Security Rules testing: https://firebase.google.com/docs/rules/unit-tests
- Firebase Cloud Storage và Blaze: https://firebase.google.com/docs/storage/faqs-storage-changes-announced-sept-2024
- GitHub Pages docs: https://docs.github.com/en/pages

**KẾT THÚC ĐẶC TẢ v2.0.**
