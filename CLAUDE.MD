# PRODUCT REQUIREMENTS DOCUMENT (PRD)

Aplikasi Asisten Virtual Pembelajaran dan Manajemen Tugas: **PahamIn**

## Informasi Proyek

| **Komponen**    | **Detail**                                                                               |
| --------------- | ---------------------------------------------------------------------------------------- |
| Nama Aplikasi   | PahamIn                                                                                  |
| Platform Target | Web Application (React Frontend & Java Native Backend)                                   |
| Versi Dokumen   | v1.0                                                                                     |
| Tim Pengembang  | Calvin Immanuel Lado, Krisna Putra Wicaksana, Ibrahimovich Paradise, Neista Arsha Javana |
| Dosen Pengampu  | Ardian Yusuf Wicaksono, S.Kom., M.Kom.                                                   |

## Latar Belakang dan Tujuan

Mahasiswa sering kali menghadapi kesulitan dalam memahami materi perkuliahan yang padat serta mengelola tumpukan tugas akademik secara efektif. PahamIn hadir sebagai platform asisten virtual berbasis kecerdasan sistem untuk menyelesaikan dua masalah utama tersebut melalui pendekatan personalisasi gaya belajar dan manajemen tugas terstruktur menggunakan prinsip matriks prioritas.

Tujuan utama pengembangan produk ini meliputi:

- Menyediakan asisten chatbot ("Ruang Paham") yang mampu menyederhanakan teks materi akademik yang rumit ke dalam beberapa gaya bahasa alternatif (Kasual, Analogi,

Bertahap).

- Menyediakan modul manajemen tugas ("Matriks Tugas") otomatis berbasis Kuadran Eisenhower untuk membantu menentukan prioritas aktivitas harian mahasiswa.
- Mengimplementasikan arsitektur berorientasi objek (OOP) murni menggunakan Java pada sisi backend guna menjamin skalabilitas, modularitas, dan pemeliharaan kode yang optimal.

## Arsitektur dan Teknologi

Sistem ini dikembangkan dengan memisahkan tanggung jawab antarmuka pengguna dan logika pemrosesan data (Client-Server Architecture):

- **Frontend:** React JS. Bertanggung jawab atas rendering antarmuka pengguna (UI/UX) yang dinamis, interaktif, dan responsif. Mengonsumsi data dari backend menggunakan pemanggilan REST API dalam format JSON.
- **Backend:** Native Java SE & Java Servlet. Mengimplementasikan seluruh logika bisnis utama, manajemen objek, penanganan sesi chat, dan pengolahan teks materi tanpa framework eksternal berat seperti Spring Boot.
- **Database & Konektivitas:** Relational Database (MySQL) yang dihubungkan melalui Java Database Connectivity (JDBC) untuk penyimpanan data pengguna secara persisten.

## Spesifikasi Modul Fungsional Utama

### Modul Autentikasi dan Manajemen Pengguna

Mengelola akses keamanan serta penyimpanan profil belajar mahasiswa secara personal.

- - - **Registrasi & Login:** Mendukung pendaftaran menggunakan email dan password unik, dilengkapi dengan pengelolaan sesi token.
      - **Profil Pengguna (UserProfile):** Menyimpan data statistik akademik seperti nama lengkap, username, email, institusi, jurusan, semester, total durasi belajar, jumlah tugas selesai, serta jumlah hari beruntun aktif belajar (learning streak).
      - **Preferensi Pengguna (UserPreferences):** Menyimpan konfigurasi antarmuka seperti pilihan tema (gelap/terang), ukuran font, bahasa aplikasi, serta status aktif/tidaknya notifikasi pengingat tugas atau streak harian.

### Modul Ruang Paham (Learning Chatbot)

Fitur utama yang bertindak sebagai tutor virtual adaptif guna memproses penyederhanaan teks materi perkuliahan.

- - - **Input Teks & Dokumen:** Pengguna dapat menyalin teks mentah secara langsung ke kolom obrolan atau mengunggah lampiran file dokumen materi perkuliahan.
      - **Pemilihan Gaya Penjelasan (ExplanationStyle):** Sistem menyediakan opsi pengubahan gaya bahasa secara real-time:
        - _Casual Style:_ Mengubah penjelasan teks baku akademik menjadi bahasa percakapan sehari-hari yang santai.
        - _Analogy Style:_ Menyisipkan contoh perumpamaan riil di dunia nyata untuk memudahkan konsep abstrak.
        - _Step-by-Step Style:_ Memecah susunan paragraf materi yang panjang menjadi urutan langkah logis yang ringkas dan terstruktur.

### Modul Matriks Tugas (Scheduler Bot)

Sistem manajemen waktu berbasis Eisenhower Matrix untuk pengorganisasian tugas kuliah.

- - - **Input Komponen Tugas:** Pengguna memasukkan judul tugas, deskripsi, tingkat kepentingan (important), tingkat kegentingan (urgent), dan tenggat waktu (deadline).
      - **Klasifikasi Otomatis Kuadran:** Sistem memetakan tugas ke dalam empat kelompok aksi:
        - _Kuadran DO:_ Penting dan Mendesak (Harus segera diselesaikan langsung).
        - _Kuadran DECIDE:_ Penting tetapi Tidak Mendesak (Dibuatkan jadwal rencana pengerjaan).
        - _Kuadran DELEGATE:_ Tidak Penting tetapi Mendesak (Didelegasikan atau dicari alternatif penyelesaian cepat).
        - _Kuadran DELETE:_ Tidak Penting dan Tidak Mendesak (Dieliminasi dari daftar prioritas utama).

## Pemetaan Arsitektur Backend Berorientasi Objek (OOP)

Implementasi backend menggunakan bahasa Java murni diwajibkan memenuhi standar modul perkuliahan Pemrograman Berorientasi Objek berikut:

| **Prinsip OOP**    | **Penerapan Kelas dalam Sistem PahamIn**                                        |
| ------------------ | ------------------------------------------------------------------------------- |
| **Class & Object** | Inisialisasi cetak biru entitas nyata aplikasi seperti kelas User, ChatSession, |

| **Prinsip OOP**              | **Penerapan Kelas dalam Sistem PahamIn**                                                                                                                                                                                                                                                                                                                                                            |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                              | ChatMessage, dan FileAttachment.                                                                                                                                                                                                                                                                                                                                                                    |
| **Encapsulation**            | Penggunaan access modifier private pada atribut sensitif (seperti data nilai, password, dan field profil di UserProfile) serta pembatasan akses data langsung melalui fungsi public pembaca (Getter) dan pengubah (Setter).                                                                                                                                                                         |
| **Inheritance**              | Kelas LearningChatbot dan SchedulerBot bertindak sebagai Subclass yang mewarisi seluruh karakteristik dasar dari Superclass yaitu PahamInBot. Atribut tugas bertingkat juga diwariskan dari kelas induk Task ke EisenhowerTask.                                                                                                                                                                     |
| **Abstract Class**           | Kelas PahamInBot dideklarasikan sebagai abstract class yang mengunci deklarasi fungsi utama yaitu public abstract String respond(String input). Kelas ini tidak dapat diinstansiasi langsung tanpa diimplementasikan kodenya oleh kelas anak.                                                                                                                                                       |
| **Interface & Polymorphism** | Komponen ExplanationStyle dibangun sebagai rancangan antarmuka (Interface) yang mendefinisikan fungsi bersama berupa generateExplanation(String text). Kelas MaterialProcessor memanfaatkan polimorfisme dengan menyimpan tipe data interface tersebut, sehingga mampu mengeksekusi metode dinamis milik objek konkrit CasualStyle, AnalogyStyle, atau StepByStepStyle saat aplikasi berjalan tanpa |

| **Prinsip OOP** | **Penerapan Kelas dalam Sistem PahamIn** |
| --------------- | ---------------------------------------- |
|                 | ketergantungan kode yang kaku.           |

## Spesifikasi Kontrak REST API

Backend bertindak sebagai penyedia layanan stateless endpoint yang merespon permintaan dalam bentuk format enkapsulasi JSON data.

| **Endpoint URL**      | **HTTP Method** | **Fungsi Utama**                                                                                                    | **Payload/Respons Utama**                                      |
| --------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| /api/auth/login       | POST            | Melakukan verifikasi login pengguna ke database melalui JDBC.                                                       | Request: Email, Password.<br><br>Response: Token & Data User.  |
| /api/material/process | POST            | Mengirimkan teks materi akademik mentah untuk diubah polanya sesuai gaya belajar yang dipilih.                      | Request: rawText, targetStyle.<br><br>Response: processedText. |
| /api/tasks/classify   | GET             | Mengambil seluruh daftar tugas aktif yang telah terkelompok otomatis berdasarkan struktur empat kuadran Eisenhower. | Response: Array data objek tugas per kuadran.                  |

| **Endpoint URL**  | **HTTP Method** | **Fungsi Utama**                                                                | **Payload/Respons Utama**                                              |
| ----------------- | --------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| /api/user/profile | PUT             | Memperbarui preferensi tampilan, konfigurasi sistem, atau profil bio mahasiswa. | Request: Data properti profil baru. Response: Status sukses pembaruan. |