# Firebase Setup Guide

## Bước 1 — Tạo Firebase Project
1. Truy cập https://console.firebase.google.com
2. Tạo project mới, chọn gói Spark (miễn phí)

## Bước 2 — Thêm Web App
1. Project Settings → Add app → Web
2. Sao chép `firebaseConfig` (apiKey, authDomain, projectId, appId, messagingSenderId)

## Bước 3 — Bật Anonymous Auth
Authentication → Sign-in method → Anonymous → Enable

## Bước 4 — Tạo Firestore
Cloud Firestore → Create database → Chọn region (asia-east1 gần VN)

## Bước 5 — Cấu hình local
```bash
cp .env.example .env.local
# Điền các giá trị VITE_FIREBASE_* vào .env.local
```

## Bước 6 — Deploy Rules
```bash
npx firebase-tools login
npx firebase-tools use --add   # chọn project của bạn
npx firebase-tools deploy --only firestore:rules
```

## Kiểm tra kết nối
Mở DevTools → Console, khi đăng nhập thành công sẽ thấy: `[Auth] Signed in: uid=...`

## Lỗi phổ biến
- `permission-denied`: deploy firestore.rules trước
- `auth/operation-not-allowed`: bật Anonymous auth trong Console
- Không thấy data: kiểm tra projectId đúng chưa
