# PahamIn — Aplikasi Asisten Virtual Pembelajaran & Manajemen Tugas

Aplikasi web berbasis **Client-Server Architecture** yang mengintegrasikan chatbot pembelajaran adaptif dan sistem manajemen tugas berbasis Eisenhower Matrix.

## Informasi Proyek

| Komponen | Detail |
|---|---|
| Nama Aplikasi | PahamIn |
| Platform | Web Application |
| Versi | v1.0 |
| Dosen Pengampu | Ardian Yusuf Wicaksono, S.Kom., M.Kom. |
| Mata Kuliah | Pemrograman Berorientasi Objek |

## Tim Pengembang (INTERCORP)

| Nama | NIM | Role |
|---|---|---|
| Calvin Immanuel Lado | 103072400158 | Backend — Chat & AI Module + Deployment |
| Krisna Putra Wicaksana | 103072400079 | Frontend |
| Ibrahimovich Paradise | 103072400122 | Backend — Auth & Eisenhower Module |
| Neista Arsha Javana | 103072400067 | Frontend |

---

## Tech Stack

### Frontend
- React JS + Vite
- Tailwind CSS

### Backend
- Java + Spring Boot 4.0.6
- Spring Security + JWT
- Spring Data JPA + Hibernate

### Database
- PostgreSQL (hosted on Railway)

### Deployment
- Database: Railway.app
- Backend: Local / Railway (TBD)
- Frontend: TBD

---

## Arsitektur Sistem

```
Frontend (React)
      ↓ REST API (JSON)
Backend (Spring Boot)
      ↓ JPA / Hibernate
Database (PostgreSQL - Railway)
```

---

## Fitur Utama

### 1. Ruang Paham (Learning Chatbot)
Chatbot adaptif yang menyederhanakan materi akademik ke dalam 3 gaya bahasa:
- **Casual Style** — Bahasa percakapan santai
- **Analogy Style** — Menggunakan perumpamaan dunia nyata
- **Step-by-Step Style** — Memecah materi menjadi urutan langkah terstruktur

### 2. Matriks Tugas (Eisenhower Scheduler)
Sistem manajemen waktu yang mengklasifikasikan tugas ke 4 kuadran:
- **DO** — Penting & Mendesak (kerjakan sekarang)
- **DECIDE** — Penting & Tidak Mendesak (jadwalkan)
- **DELEGATE** — Tidak Penting & Mendesak (delegasikan)
- **DELETE** — Tidak Penting & Tidak Mendesak (eliminasi)

---

## Implementasi OOP

| Prinsip | Implementasi |
|---|---|
| **Inheritance** | `LearningChatbot` & `SchedulerBot` extends `PahamInBot`. `EisenhowerTask` extends `Task` |
| **Abstract Class** | `PahamInBot` (abstract `respond()`), `Task` (abstract `determineQuadrant()`) |
| **Interface** | `ExplanationStyle` dengan method `generateExplanation()` |
| **Polymorphism** | `MaterialProcessor` mengeksekusi `CasualStyle`, `AnalogyStyle`, atau `StepByStepStyle` secara dinamis |
| **Encapsulation** | Access modifier `private` pada atribut sensitif, akses via getter/setter |

---

## REST API Endpoints

### Auth
| Method | Endpoint | Deskripsi |
|---|---|---|
| POST | `/api/auth/register` | Registrasi user baru |
| POST | `/api/auth/login` | Login & mendapatkan JWT token |

### Task (Eisenhower)
| Method | Endpoint | Deskripsi |
|---|---|---|
| POST | `/api/tasks` | Tambah task baru |
| GET | `/api/tasks` | Ambil semua task (per kuadran) |
| PUT | `/api/tasks/{id}` | Update task |
| DELETE | `/api/tasks/{id}` | Hapus task |
| PATCH | `/api/tasks/{id}/done` | Mark task sebagai selesai |

### Material (Personalize Explanation)
| Method | Endpoint | Deskripsi |
|---|---|---|
| POST | `/api/material/process` | Proses teks dengan gaya bahasa tertentu |

### User
| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/api/user/profile` | Ambil profil user |
| PUT | `/api/user/profile` | Update profil user |

### Chat (Calvin)
| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/api/chat/sessions` | Ambil semua sesi chat |
| POST | `/api/chat/sessions` | Buat sesi chat baru |
| DELETE | `/api/chat/sessions/{id}` | Hapus sesi chat |
| GET | `/api/chat/sessions/{id}/messages` | Ambil pesan dalam sesi |
| POST | `/api/chat/sessions/{id}/messages` | Kirim pesan |

---

## Struktur Project Backend

```
src/main/java/com/intercorp/pahamin/
├── auth/
│   ├── AuthController.java
│   ├── AuthService.java
│   └── dto/
│       ├── RegisterRequest.java
│       ├── LoginRequest.java
│       └── AuthResponse.java
├── user/
│   ├── User.java
│   ├── UserRepository.java
│   ├── UserController.java
│   └── UserService.java
├── task/
│   ├── EisenhowerTask.java
│   ├── TaskRepository.java
│   ├── TaskController.java
│   └── TaskService.java
├── chat/               ← Calvin
├── config/
│   ├── SecurityConfig.java
│   ├── JwtUtil.java
│   └── JwtAuthFilter.java
└── PahaminApplication.java
```

---

## Setup & Menjalankan Project

### Prerequisites
- Java 21+
- Maven
- PostgreSQL (atau koneksi Railway)

### Langkah-langkah

1. Clone repository
```bash
git clone <repo-url>
cd pahamin
```

2. Konfigurasi `application.properties`
```properties
spring.datasource.url=jdbc:postgresql://<host>:<port>/railway
spring.datasource.username=postgres
spring.datasource.password=<password>
jwt.secret=<secret-key-minimal-256-bits>
jwt.expiration=86400000
```

3. Jalankan aplikasi
```bash
# Windows
.\mvnw.cmd spring-boot:run

# Linux/Mac
./mvnw spring-boot:run
```

4. Server berjalan di `http://localhost:8080`

---

## Contoh Request API

### Register
```json
POST /api/auth/register
{
  "username": "ibra",
  "email": "ibra@example.com",
  "password": "password123"
}
```

### Login
```json
POST /api/auth/login
{
  "email": "ibra@example.com",
  "password": "password123"
}
```

### Response (Auth)
```json
{
  "token": "eyJhbGciOiJIUzM4NCJ9...",
  "email": "ibra@example.com",
  "username": "ibra"
}
```

### Request Authenticated (gunakan token)
```
Authorization: Bearer <token>
```

---

## Progress Development

- [x] Project setup (Spring Boot + PostgreSQL + JWT)
- [x] Auth module (Register & Login)
- [ ] Eisenhower Task module
- [ ] User Profile module
- [ ] Chat module (Calvin)
- [ ] Personalize Explanation module (Calvin)
- [ ] Frontend integration
- [ ] Deployment