import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import './profile.css';
import api from '../api';

// ===== Icon Component (same pattern as the rest of the app) =====
const Icon = ({ name, size = 20, className = "" }) => {
  const icons = {
    panel_left_close: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><path d="M9 3v18" /><path d="M16 15l-3-3 3-3" /></>,
    grid: <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />,
    matrix: <path d="M3 3h18v18H3zM3 9h18M9 21V9" />,
    settings: <><path d="M12 15a3 3 0 100-6 3 3 0 000 6z" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" /></>,
    bell: <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    close: <path d="M18 6L6 18M6 6l12 12" />,
    camera: <><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" /><circle cx="12" cy="13" r="4" /></>,
    lock: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></>,
    fire: <><path d="M12 22c4.97 0 8-3.58 8-8 0-3.07-2.27-6.64-4-8.5-.52-.56-1.48-.56-2 0-.34.37-.73.86-1.07 1.43C12.59 7.52 12.3 8 12 8c-.3 0-.59-.48-.93-1.07-.34-.57-.73-1.06-1.07-1.43-.52-.56-1.48-.56-2 0C6.27 7.36 4 10.93 4 14c0 4.42 3.03 8 8 8z" fill="currentColor" stroke="none" /></>,
    logout: <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></>,
    user: <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {icons[name]}
    </svg>
  );
};

// ===== Sidebar (reusable, profile-aware) =====
const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 'ADMIN';

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo-group" onClick={isCollapsed ? toggleSidebar : undefined} style={{ cursor: isCollapsed ? 'pointer' : 'default', width: isCollapsed ? '100%' : 'auto', justifyContent: isCollapsed ? 'center' : 'flex-start' }}>
          <div className="logo-icon" style={{ background: 'transparent' }}>
            <img src="/logo_pahamin.png" alt="PahamIn Logo" style={{ width: '100%', height: '100%', borderRadius: 'inherit', objectFit: 'contain' }} />
          </div>
        </div>
        {!isCollapsed && (
          <button className="btn-icon sidebar-toggle" onClick={toggleSidebar}>
            <Icon name="panel_left_close" size={20} />
          </button>
        )}
      </div>
      <div className="sidebar-content">
        <div className="nav-section">
          <button className="nav-item" onClick={() => navigate('/')} style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}>
            <Icon name="grid" />
            <span>Ruang Paham</span>
          </button>
          <button className="nav-item" onClick={() => navigate('/matrix')} style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}>
            <Icon name="matrix" />
            <span>Matriks Tugas</span>
          </button>
          {isAdmin && (
            <button className="nav-item" onClick={() => navigate('/admin')} style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}>
              <Icon name="shield" />
              <span>Admin Panel</span>
            </button>
          )}
        </div>
      </div>
      <div className="sidebar-footer">
        <Link to="/settings" className="nav-item" title={isCollapsed ? "Setelan & bantuan" : ""}>
          <Icon name="settings" />
          <span>Setelan & bantuan</span>
        </Link>
      </div>
    </aside>
  );
};

// Mock notifications
const MOCK_NOTIFICATIONS = [
  { id: 1, type: 'task', icon: '📋', title: 'Tugas baru ditambahkan', desc: '"Finalize Chemistry Lab Report" masuk ke kuadran Do', time: '2 menit lalu', read: false },
  { id: 2, type: 'streak', icon: '🔥', title: 'Streak 3 hari!', desc: 'Keren! Kamu sudah belajar 3 hari berturut-turut', time: '1 jam lalu', read: false },
  { id: 3, type: 'upload', icon: '📄', title: 'File berhasil diunggah', desc: 'Materi_Fisika_Bab5.pdf sudah siap diproses', time: '3 jam lalu', read: false },
  { id: 4, type: 'ai', icon: '✨', title: 'Ringkasan materi siap', desc: 'PahamIn sudah merangkum materi Kalkulus II untukmu', time: '5 jam lalu', read: true },
  { id: 5, type: 'reminder', icon: '⏰', title: 'Pengingat deadline', desc: '"Submit Scholarship Application" jatuh tempo besok', time: '6 jam lalu', read: true },
  { id: 6, type: 'quiz', icon: '🎯', title: 'Kuis selesai!', desc: 'Skor kamu 85/100 untuk kuis Struktur Data', time: '1 hari lalu', read: true },
  { id: 7, type: 'welcome', icon: '👋', title: 'Selamat datang di PahamIn!', desc: 'Mulai upload materi dan biarkan AI membantumu belajar', time: '2 hari lalu', read: true },
];

// ===== Header (with notification + profile dropdown) =====
const Header = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
  const avatarUrl = profile.avatarUrl || null;
  const displayName = user.username || user.email || 'User';

  const unreadCount = notifications.filter(n => !n.read).length;

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/api/notifications');
      setNotifications(res.data || []);
    } catch (err) {
      console.error('Gagal memuat notifikasi:', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const markAsRead = async (id) => {
    try {
      await api.patch(`/api/notifications/${id}/read`);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (err) {
      console.error('Gagal menandai dibaca:', err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.patch('/api/notifications/read-all');
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (err) {
      console.error('Gagal menandai semua dibaca:', err);
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="header-title">PahamIn</div>
      </div>
      <div className="header-actions">
        <div style={{ position: 'relative' }} ref={notifRef}>
          <button
            className="notification-btn"
            onClick={() => { setShowNotifications(!showNotifications); setShowDropdown(false); }}
          >
            <Icon name="bell" />
            {unreadCount > 0 && <span className="notification-dot"></span>}
          </button>
          {showNotifications && (
            <div className="notif-dropdown">
              <div className="notif-dropdown-header">
                <span className="notif-dropdown-title">Notifikasi</span>
                {unreadCount > 0 && (
                  <button className="notif-mark-all" onClick={markAllAsRead}>
                    Tandai semua dibaca
                  </button>
                )}
              </div>
              <div className="notif-dropdown-list">
                {notifications.map(n => (
                  <div
                    key={n.id}
                    className={`notif-item ${n.read ? '' : 'unread'}`}
                    onClick={() => markAsRead(n.id)}
                  >
                    <div className="notif-item-icon">{n.icon}</div>
                    <div className="notif-item-content">
                      <div className="notif-item-title">{n.title}</div>
                      <div className="notif-item-desc">{n.description || n.desc}</div>
                      <div className="notif-item-time">{n.time || (n.createdAt ? new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '')}</div>
                    </div>
                    {!n.read && <div className="notif-unread-dot"></div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <div
            className="user-profile"
            onClick={() => { setShowDropdown(!showDropdown); setShowNotifications(false); }}
            title="Profil"
            style={{ cursor: 'pointer' }}
          >
            {avatarUrl ? (
              <img src={avatarUrl} alt="User Profile" />
            ) : (
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=2563EB&color=fff`}
                alt="User Profile"
              />
            )}
          </div>
          {showDropdown && (
            <div className="header-profile-dropdown">
              <button className="header-dropdown-item" onClick={() => { setShowDropdown(false); navigate('/profile'); }}>
                <Icon name="user" size={16} />
                <span>Profil</span>
              </button>
              <div className="header-dropdown-divider"></div>
              <button className="header-dropdown-item danger" onClick={handleLogout}>
                <Icon name="logout" size={16} />
                <span>Keluar</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// ===== Streak Component =====
const StreakComponent = ({ streakCount, isActive }) => {
  const [shouldPulse, setShouldPulse] = useState(false);

  useEffect(() => {
    if (isActive) {
      setShouldPulse(true);
      const timer = setTimeout(() => setShouldPulse(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  return (
    <div className={`profile-streak ${isActive ? 'active' : 'dim'}`}>
      <div className={`streak-icon ${shouldPulse ? 'pulse' : ''}`}>
        <Icon name="fire" size={16} />
      </div>
      <div className="streak-text">
        <span className="streak-main">
          {isActive ? `${streakCount} streak belajar!` : 'Streak belum dimulai'}
        </span>
        <span className="streak-sub">
          {isActive
            ? 'Pertahankan ritme belajarmu hari ini!'
            : 'Mulai chat untuk menyalakan streakmu!'}
        </span>
      </div>
    </div>
  );
};

// ===== Main Profile Page =====
function Profile() {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const avatarInputRef = useRef(null);
  const [toast, setToast] = useState('');

  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Profile states
  const [fullName, setFullName] = useState('');
  const [emailField, setEmailField] = useState('');
  const [nickname, setNickname] = useState('');
  const [major, setMajor] = useState('');
  const [bio, setBio] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(null);

  // Metrics & Streak states
  const [streakCount, setStreakCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [filesUploaded, setFilesUploaded] = useState(0);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(0);
  const [avgPerDay, setAvgPerDay] = useState('2 J');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/api/user/profile');
        const data = res.data;
        if (data) {
          setFullName(data.fullName || '');
          setNickname(data.nickname || '');
          setEmailField(data.user?.email || data.email || user.email || '');
          setMajor(data.major || '');
          setBio(data.bio || '');
          setAvatarUrl(data.avatarUrl || null);
          
          setStreakCount(data.streakCount || 0);
          setFilesUploaded(data.filesUploaded || 0);
          setTasksCompleted(data.tasksCompleted || 0);
          setQuizCompleted(data.quizCompleted || 0);
          setAvgPerDay(data.avgPerDay || '2 J');

          if (data.lastChatAt) {
            const lastActive = new Date(data.lastChatAt);
            const now = new Date();
            const diffHours = (now - lastActive) / (1000 * 60 * 60);
            setIsActive(diffHours < 24);
          } else {
            setIsActive(false);
          }

          localStorage.setItem('userProfile', JSON.stringify(data));
        }
      } catch (err) {
        console.error('Gagal memuat profil dari server:', err);
      }
    };
    fetchProfile();
  }, [user.email]);

  const metrics = {
    filesUploaded,
    tasksCompleted,
    quizCompleted,
    avgPerDay,
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  const handleSave = async () => {
    const profileData = {
      fullName,
      email: emailField,
      nickname,
      major,
      bio,
      avatarUrl,
      filesUploaded,
      quizCompleted,
      avgPerDay,
    };
    try {
      const res = await api.put('/api/user/profile', profileData);
      const data = res.data;
      localStorage.setItem('userProfile', JSON.stringify(data));

      // Update local user cache
      const localUser = JSON.parse(localStorage.getItem('user') || '{}');
      localUser.email = emailField;
      localUser.username = nickname || fullName || localUser.username;
      localStorage.setItem('user', JSON.stringify(localUser));

      showToast('Profil berhasil disimpan!');
    } catch (err) {
      console.error('Gagal menyimpan profil:', err);
      const detailedError = err.response?.data?.message || err.response?.data || err.message || 'Unknown error';
      showToast('Gagal menyimpan profil: ' + (typeof detailedError === 'object' ? JSON.stringify(detailedError) : detailedError));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result;
      setAvatarUrl(dataUrl);

      const profileData = {
        fullName,
        email: emailField,
        nickname,
        major,
        bio,
        avatarUrl: dataUrl,
        filesUploaded,
        quizCompleted,
        avgPerDay,
      };

      try {
        const res = await api.put('/api/user/profile', profileData);
        localStorage.setItem('userProfile', JSON.stringify(res.data));
        showToast('Foto profil diperbarui!');
      } catch (err) {
        console.error('Gagal menyimpan foto profil ke server:', err);
        const detailedError = err.response?.data?.message || err.response?.data || err.message || 'Unknown error';
        showToast('Gagal menyimpan foto profil: ' + (typeof detailedError === 'object' ? JSON.stringify(detailedError) : detailedError));
      }
    };
    reader.readAsDataURL(file);
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleDeleteAccount = () => {
    if (confirm('Apakah Anda yakin ingin menghapus akun? Tindakan ini tidak bisa dibatalkan.')) {
      localStorage.clear();
      navigate('/login');
    }
  };

  return (
    <div className="layout-container">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <div className="main-content">
        <Header />

        <div className="profile-page animate-fade-in">
          {/* Page Header */}
          <div className="profile-page-header">
            <div className="profile-page-header-info">
              <h1>Profil</h1>
              <p>Kelola informasi akun dan preferensi belajarmu</p>
            </div>
            <button className="profile-close-btn" onClick={() => navigate('/')} title="Tutup">
              <Icon name="close" size={22} />
            </button>
          </div>

          {/* Two-Panel Layout */}
          <div className="profile-panels">
            {/* ===== PANEL KIRI — Edit Profile ===== */}
            <div className="profile-card profile-edit-card">
              <div className="profile-edit-title">Edit Profile</div>

              {/* Avatar */}
              <div className="profile-avatar-section">
                <span className="profile-avatar-label">Avatar</span>
                <div className="profile-avatar-wrapper" onClick={() => avatarInputRef.current?.click()}>
                  <div className="profile-avatar-circle">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Avatar" />
                    ) : (
                      <span className="profile-avatar-initials">{getInitials(fullName)}</span>
                    )}
                  </div>
                  <div className="profile-avatar-camera">
                    <Icon name="camera" size={18} />
                  </div>
                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleAvatarChange}
                  />
                </div>
              </div>

              {/* Nama Lengkap */}
              <div className="profile-form-group">
                <label>Nama Lengkap</label>
                <div className="profile-input-wrapper">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Masukkan nama lengkap..."
                  />
                </div>
              </div>

              {/* Nama Panggilan (editable) */}
              <div className="profile-form-group">
                <label>Bagaimana Pahamin memanggil anda?</label>
                <div className="profile-input-wrapper">
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="Masukkan nama panggilan..."
                  />
                </div>
              </div>

              {/* Email */}
              <div className="profile-form-group">
                <label>Email</label>
                <div className="profile-input-wrapper">
                  <input
                    type="email"
                    value={emailField}
                    onChange={(e) => setEmailField(e.target.value)}
                    placeholder="Masukkan email..."
                  />
                </div>
              </div>

              {/* Jurusan (editable) */}
              <div className="profile-form-group">
                <label>Apa yang menggambarkan Jurusan anda?</label>
                <div className="profile-input-wrapper">
                  <input
                    type="text"
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    placeholder="Informatika"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="profile-form-group-bio">
                <label>Bio</label>
                <span className="profile-bio-sublabel">Maximal 120 karakter</span>
                <div className="profile-input-wrapper">
                  <textarea
                    value={bio}
                    onChange={(e) => {
                      if (e.target.value.length <= 120) setBio(e.target.value);
                    }}
                    placeholder="masukan informasi tentang anda..."
                    maxLength={120}
                  />
                </div>
              </div>

              {/* Save Button */}
              <button className="profile-save-btn" onClick={handleSave}>
                Simpan Perubahan
              </button>
            </div>

            {/* ===== PANEL KANAN — Aktivitas Belajar + Actions ===== */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="profile-card profile-activity-card">
                <div className="profile-activity-title">Aktivitas Belajar</div>

                {/* Metrics Grid */}
                <div className="profile-metrics-grid">
                  <div className="profile-metric-card">
                    <div className="profile-metric-value">{metrics.filesUploaded}</div>
                    <div className="profile-metric-label">File diunggah</div>
                  </div>
                  <div className="profile-metric-card">
                    <div className="profile-metric-value">{metrics.tasksCompleted}</div>
                    <div className="profile-metric-label">Tugas Dikerjakan</div>
                  </div>
                  <div className="profile-metric-card">
                    <div className="profile-metric-value">{metrics.quizCompleted}</div>
                    <div className="profile-metric-label">Quis Dikerjakan</div>
                  </div>
                  <div className="profile-metric-card">
                    <div className="profile-metric-value">{metrics.avgPerDay}</div>
                    <div className="profile-metric-label">Rata-rata perhari</div>
                  </div>
                </div>

                {/* Streak */}
                <StreakComponent streakCount={streakCount} isActive={isActive} />
              </div>

              {/* Bottom Actions */}
              <div className="profile-bottom-actions">
                <div className="profile-action-row">
                  <span>Keluar dari perangkat</span>
                  <button className="profile-btn-logout" onClick={handleLogout}>Keluar</button>
                </div>
                <div className="profile-action-row">
                  <span>Hapus akun anda</span>
                  <button className="profile-btn-delete" onClick={handleDeleteAccount}>Hapus</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Toast */}
        <div className={`profile-toast ${toast ? 'visible' : ''}`}>{toast}</div>
      </div>
    </div>
  );
}

export default Profile;
