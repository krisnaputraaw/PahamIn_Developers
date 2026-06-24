import { useState, useEffect, useRef } from 'react';
import '../App.css';
import './matrix.css';
import api from '../api';
import { Link, useNavigate } from 'react-router-dom';

import { BsExclamationLg } from "react-icons/bs";
import { FiCalendar, FiMic } from "react-icons/fi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { RiDeleteBinLine } from "react-icons/ri";

const Icon = ({ name, size = 20, className = "" }) => {
  const icons = {
    panel_left_close: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><path d="M9 3v18" /><path d="M16 15l-3-3 3-3" /></>,
    grid: <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />,
    matrix: <path d="M3 3h18v18H3zM3 9h18M9 21V9" />,
    settings: <><path d="M12 15a3 3 0 100-6 3 3 0 000 6z" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" /></>,
    bell: <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    user: <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
    logout: <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {icons[name]}
    </svg>
  );
};

// Sidebar
const Sidebar = ({ isCollapsed, toggleSidebar, chatSessions = [] }) => {
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
          <button className="nav-item active" style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}>
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

        {/* Chat sessions */}
        {chatSessions.length > 0 && (
          <div className="nav-section" style={{ marginTop: '1rem' }}>
            <div className="nav-section-title">Percakapan</div>
            {chatSessions.map((session) => (
              <a
                key={session.id}
                href="#"
                className="nav-item history-item"
                onClick={(e) => { e.preventDefault(); navigate('/'); }}
              >
                <span className="history-text">{session.title}</span>
              </a>
            ))}
          </div>
        )}
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

// Header with profile + notification dropdown
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
            onClick={() => setShowDropdown(!showDropdown)}
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
            <div className="header-profile-dropdown" style={{
              position: 'absolute', top: 'calc(100% + 8px)', right: 0,
              background: 'white', borderRadius: '12px',
              boxShadow: '0 10px 40px -10px rgba(0,0,0,0.18)',
              border: '1px solid var(--border)', padding: '0.35rem',
              minWidth: '160px', zIndex: 100, animation: 'fadeIn 0.15s ease-out forwards'
            }}>
              <button
                onClick={() => { setShowDropdown(false); navigate('/profile'); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                  background: 'transparent', border: 'none', width: '100%',
                  padding: '0.6rem 0.85rem', borderRadius: '8px',
                  color: 'var(--text-muted)', fontSize: '0.88rem',
                  fontFamily: 'inherit', fontWeight: 500, cursor: 'pointer',
                  textAlign: 'left', transition: 'all 0.15s'
                }}
                onMouseEnter={(e) => { e.target.style.backgroundColor = 'var(--bg-main)'; e.target.style.color = 'var(--text-dark)'; }}
                onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'var(--text-muted)'; }}
              >
                <Icon name="user" size={16} />
                Profil
              </button>
              <div style={{ height: '1px', backgroundColor: 'var(--border)', margin: '0.25rem 0.5rem' }}></div>
              <button
                onClick={handleLogout}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                  background: 'transparent', border: 'none', width: '100%',
                  padding: '0.6rem 0.85rem', borderRadius: '8px',
                  color: 'var(--text-muted)', fontSize: '0.88rem',
                  fontFamily: 'inherit', fontWeight: 500, cursor: 'pointer',
                  textAlign: 'left', transition: 'all 0.15s'
                }}
                onMouseEnter={(e) => { e.target.style.backgroundColor = '#FEF2F2'; e.target.style.color = '#EF4444'; }}
                onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'var(--text-muted)'; }}
              >
                <Icon name="logout" size={16} />
                Keluar
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// Checkmark SVG for checked state
const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Quadrant config
const QUADRANTS = [
  { key: 'DO', label: 'Do', desc: 'URGENT & IMPORTANT', icon: <BsExclamationLg />, className: 'do', badgeClass: 'do-badge', iconClass: 'do-icon' },
  { key: 'DECIDE', label: 'Decide', desc: 'IMPORTANT, NOT URGENT', icon: <FiCalendar />, className: 'decide', badgeClass: 'decide-badge', iconClass: 'decide-icon' },
  { key: 'DELEGATE', label: 'Delegate', desc: 'URGENT, NOT IMPORTANT', icon: <HiMiniUserGroup />, className: 'delegate', badgeClass: 'delegate-badge', iconClass: 'delegate-icon' },
  { key: 'DELETE', label: 'Delete', desc: 'NEITHER', icon: <RiDeleteBinLine />, className: 'delete', badgeClass: 'delete-badge', iconClass: 'delete-icon' },
];

function Matrix() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [tasks, setTasks] = useState({ DO: [], DECIDE: [], DELEGATE: [], DELETE: [] });
  const [inputText, setInputText] = useState('');
  const [chatSessions, setChatSessions] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/api/tasks');
      setTasks({
        DO: res.data.DO || [],
        DECIDE: res.data.DECIDE || [],
        DELEGATE: res.data.DELEGATE || [],
        DELETE: res.data.DELETE || [],
      });
    } catch (err) {
      console.error('Gagal load tasks:', err);
    }
  };

  const fetchSessions = async () => {
    try {
      const res = await api.get('/api/chat/sessions');
      setChatSessions(res.data);
    } catch (err) {
      console.error('Gagal load sessions:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchSessions();
    const fetchProfile = async () => {
      try {
        const res = await api.get('/api/user/profile');
        localStorage.setItem('userProfile', JSON.stringify(res.data));
      } catch (err) {
        console.error('Gagal load profile:', err);
      }
    };
    fetchProfile();
  }, []);

  const handleAddTask = async () => {
    if (!inputText.trim()) return;
    try {
      await api.post('/api/tasks', {
        title: inputText,
        urgent: true,
        important: true
      });
      setInputText('');
      fetchTasks();
    } catch (err) {
      console.error('Gagal tambah task:', err);
    }
  };

  const handleDone = async (taskId) => {
    try {
      await api.patch(`/api/tasks/${taskId}/done`);
      fetchTasks();
    } catch (err) {
      console.error('Gagal mark done:', err);
    }
  };

  return (
    <div className="layout-container">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        chatSessions={chatSessions}
      />
      <div className="main-content">
        <Header />

        {/* Full-size 2x2 Eisenhower Grid */}
        <div className="matrix-grid">
          {QUADRANTS.map(q => {
            const quadrantTasks = tasks[q.key] || [];
            return (
              <div key={q.key} className={`matrix-card ${q.className}`}>
                <div className="matrix-card-header">
                  <div className="matrix-info">
                    <div className={`matrix-icon ${q.iconClass}`}>{q.icon}</div>
                    <div>
                      <h3>{q.label}</h3>
                      <p>{q.desc}</p>
                    </div>
                  </div>
                  <span className={`task-badge ${q.badgeClass}`}>
                    {quadrantTasks.length} Tasks
                  </span>
                </div>

                <div className="matrix-task-list">
                  {quadrantTasks.length === 0 ? (
                    <div className="matrix-empty">Belum ada tugas</div>
                  ) : (
                    quadrantTasks.map(task => (
                      <div
                        key={task.id}
                        className={`task-item ${q.key === 'DELETE' ? 'delete-task' : ''}`}
                      >
                        <div
                          className={`task-checkbox ${task.done ? 'checked' : ''}`}
                          onClick={() => !task.done && handleDone(task.id)}
                        >
                          <CheckIcon />
                        </div>
                        <span>{task.title}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input bar — fixed bottom center */}
        <div className="matrix-input-bar">
          <input
            type="text"
            placeholder="Materi apa hari ini..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <button className="matrix-add-btn" onClick={handleAddTask}>Add +</button>
          <button className="matrix-mic-btn"><FiMic /></button>
        </div>
      </div>
    </div>
  );
}

export default Matrix;