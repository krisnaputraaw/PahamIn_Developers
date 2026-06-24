import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import api from './api';

// Reusable Icon Component
const Icon = ({ name, size = 20, className = "" }) => {
  const icons = {
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    panel_left_close: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><path d="M9 3v18" /><path d="M16 15l-3-3 3-3" /></>,
    grid: <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />,
    matrix: <path d="M3 3h18v18H3zM3 9h18M9 21V9" />,
    chat: <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />,
    settings: <><path d="M12 15a3 3 0 100-6 3 3 0 000 6z" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" /></>,
    bell: <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
    send: <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" fill="currentColor" stroke="none" />,
    file: <><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" /><path d="M13 2v7h7" /></>,
    close: <path d="M18 6L6 18M6 6l12 12" />,
    image: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></>,
    download: <><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1" /><path d="M12 4v12" /><path d="M8 12l4 4 4-4" /></>,
    sparkles: <><path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" fill="currentColor" stroke="none" /></>,
    plus_circle: <><circle cx="12" cy="12" r="10" fill="currentColor" stroke="none" /><path d="M12 8v8M8 12h8" stroke="white" strokeWidth="2" strokeLinecap="round" /></>,
    trash: <><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    users: <><circle cx="9" cy="7" r="4" /><path d="M17 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /><path d="M21 21v-2a4 4 0 00-3-3.87" /><path d="M9 21v-2a4 4 0 00-8 0v2" /></>
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {icons[name]}
    </svg>
  );
};

// Sidebar Component
const Sidebar = ({ isCollapsed, toggleSidebar, chatSessions, activeChatId, onSelectChat, onNewChat, onDeleteChat }) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 'ADMIN';

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div
          className="sidebar-logo-group"
          onClick={isCollapsed ? toggleSidebar : undefined}
          style={{ cursor: isCollapsed ? 'pointer' : 'default', width: isCollapsed ? '100%' : 'auto', justifyContent: isCollapsed ? 'center' : 'flex-start' }}
          title={isCollapsed ? "Expand Sidebar" : ""}
        >
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
          <Link
            to="/"
            className={`nav-item ${!activeChatId ? 'active' : ''}`}
            title={isCollapsed ? 'Ruang Paham' : ''}
            onClick={onNewChat}
          >
            <Icon name="grid" />
            <span>Ruang Paham</span>
          </Link>
          <Link to="/matrix" className="nav-item" title={isCollapsed ? 'Matriks Tugas' : ''}>
            <Icon name="matrix" />
            <span>Matriks Tugas</span>
          </Link>
          {isAdmin && (
            <Link to="/admin" className="nav-item" title={isCollapsed ? 'Admin Panel' : ''}>
              <Icon name="shield" />
              <span>Admin Panel</span>
            </Link>
          )}
        </div>

        {chatSessions.length > 0 && (
          <div className="nav-section" style={{ marginTop: '1rem' }}>
            <div className="nav-section-title">Percakapan</div>
            {chatSessions.map((session) => (
              <a
                key={session.id}
                href="#"
                className={`nav-item history-item ${session.id == activeChatId ? 'active' : ''}`}
                title={isCollapsed ? session.title : ''}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectChat(session.id);
                }}
              >
                <span className="history-text">{session.title}</span>
                {!isCollapsed && (
                  <button
                    className="delete-history-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onDeleteChat(session.id);
                    }}
                    title="Hapus percakapan"
                  >
                    <Icon name="trash" size={14} />
                  </button>
                )}
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="sidebar-footer">
        <a href="#" className="nav-item" title={isCollapsed ? "Setelan & bantuan" : ""}>
          <Icon name="settings" />
          <span>Setelan & bantuan</span>
        </a>
      </div>
    </aside>
  );
};

// Mock notifications data
const MOCK_NOTIFICATIONS = [
  { id: 1, type: 'task', icon: '📋', title: 'Tugas baru ditambahkan', desc: '"Finalize Chemistry Lab Report" masuk ke kuadran Do', time: '2 menit lalu', read: false },
  { id: 2, type: 'streak', icon: '🔥', title: 'Streak 3 hari!', desc: 'Keren! Kamu sudah belajar 3 hari berturut-turut', time: '1 jam lalu', read: false },
  { id: 3, type: 'upload', icon: '📄', title: 'File berhasil diunggah', desc: 'Materi_Fisika_Bab5.pdf sudah siap diproses', time: '3 jam lalu', read: false },
  { id: 4, type: 'ai', icon: '✨', title: 'Ringkasan materi siap', desc: 'PahamIn sudah merangkum materi Kalkulus II untukmu', time: '5 jam lalu', read: true },
  { id: 5, type: 'reminder', icon: '⏰', title: 'Pengingat deadline', desc: '"Submit Scholarship Application" jatuh tempo besok', time: '6 jam lalu', read: true },
  { id: 6, type: 'quiz', icon: '🎯', title: 'Kuis selesai!', desc: 'Skor kamu 85/100 untuk kuis Struktur Data', time: '1 hari lalu', read: true },
  { id: 7, type: 'welcome', icon: '👋', title: 'Selamat datang di PahamIn!', desc: 'Mulai upload materi dan biarkan AI membantumu belajar', time: '2 hari lalu', read: true },
];

// Header Component
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
            <div className="header-profile-dropdown" style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 10px 40px -10px rgba(0,0,0,0.18)',
              border: '1px solid var(--border)',
              padding: '0.35rem',
              minWidth: '160px',
              zIndex: 100,
              animation: 'fadeIn 0.15s ease-out forwards'
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Keluar
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// Main Chat Area Component
const MainArea = ({ messages, onSendMessage, loading }) => {
  const [inputText, setInputText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [showAddMenu, setShowAddMenu] = useState(false);

  const fileInputRef = useRef(null);
  const photoInputRef = useRef(null);
  const addMenuRef = useRef(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (addMenuRef.current && !addMenuRef.current.contains(event.target)) {
        setShowAddMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files);
      setFiles([...files, ...newFiles]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const newFiles = Array.from(e.target.files);
      setFiles([...files, ...newFiles]);
    }
  };

  const removeFile = (indexToRemove) => {
    setFiles(files.filter((_, index) => index !== indexToRemove));
  };

  const handleSendMessage = () => {
    if (!inputText.trim() && files.length === 0) return;

    onSendMessage(inputText, [...files]);
    setInputText('');
    setFiles([]);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const isChatMode = messages.length > 0;

  return (
    <div
      className={`dashboard-area ${dragActive ? 'drag-active' : ''}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      {dragActive && (
        <div className="drag-overlay animate-fade-in">
          <div className="drag-content">
            <Icon name="file" size={48} />
            <h2>Lepaskan file di sini untuk upload</h2>
          </div>
        </div>
      )}

      {/* Glow Effect */}
      <div className="bg-glow-container">
        <div className="glow-blob glow-1"></div>
        <div className="glow-blob glow-2"></div>
      </div>

      <div className={`dashboard-content ${isChatMode ? 'chat-mode' : 'welcome-mode'}`}>

        {!isChatMode ? (
          <div className="welcome-info animate-fade-in">
            <h1 className="welcome-title">Sederhanakan Materimu</h1>
            <p className="welcome-subtitle">Semua materi jadi lebih mudah dipahami di sini</p>
          </div>
        ) : (
          <div className="messages-container animate-fade-in">
            {messages.map(msg => (
              <div key={msg.id} className={`message-wrapper ${msg.sender === 'USER' ? 'msg-user' : 'msg-ai'}`}>
                {msg.sender === 'BOT' && (
                  <div className="ai-avatar">
                    <Icon name="sparkles" size={16} />
                  </div>
                )}
                <div className="message-content">
                  {msg.files && msg.files.length > 0 && (
                    <div className="message-files">
                      {msg.files.map((f, i) => {
                        const fileName = f && f.name ? f.name : 'Dokumen';
                        return (
                          <div key={i} className="msg-file-pill">
                            <Icon name="file" size={12} />
                            <span>{fileName.length > 20 ? fileName.substring(0, 20) + '...' : fileName}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {msg.content && (
                    <div className="message-text" style={{ whiteSpace: 'pre-wrap' }}>
                      {msg.content}
                    </div>
                  )}
                  <div className="message-time">
                    {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="message-wrapper msg-ai">
                <div className="ai-avatar">
                  <Icon name="sparkles" size={16} />
                </div>
                <div className="message-content">
                  <div className="message-text" style={{ color: 'var(--text-muted)' }}>
                    Sedang memproses...
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} style={{ height: 1 }} />
          </div>
        )}

        <div className="input-section animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className={`input-container ${isFocused ? 'focused' : ''}`}>

            {files.length > 0 && (
              <div className="attachments-list">
                {files.map((file, index) => (
                  <div key={index} className="attachment-pill">
                    <Icon name="file" size={14} />
                    <div className="attachment-text">
                      <span className="attachment-name">{file.name.length > 20 ? file.name.substring(0, 20) + '...' : file.name}</span>
                    </div>
                    <button className="btn-remove-file" onClick={() => removeFile(index)}>
                      <Icon name="close" size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="input-row" style={{ alignItems: (!inputText && files.length === 0) ? 'center' : 'flex-end' }}>
              {/* Plus Button with Menu */}
              <div className="input-actions-left" ref={addMenuRef} style={{ position: 'relative' }}>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                  multiple
                />
                <input
                  type="file"
                  ref={photoInputRef}
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={handleFileChange}
                  multiple
                />
                <button
                  className={`btn-icon-simple ${isChatMode ? 'chat-mode-add' : ''}`}
                  onClick={() => setShowAddMenu(!showAddMenu)}
                  title="Add attachment"
                >
                  <Icon name="plus" size={isChatMode ? 16 : 22} />
                </button>

                {showAddMenu && (
                  <div className="add-menu-popover" style={{ bottom: 'calc(100% + 15px)', left: 0, right: 'auto' }}>
                    <button className="add-menu-item" onClick={() => {
                      fileInputRef.current.click();
                      setShowAddMenu(false);
                    }}>
                      <Icon name="download" size={20} />
                      <span>Upload File</span>
                    </button>
                    <button className="add-menu-item" onClick={() => {
                      photoInputRef.current.click();
                      setShowAddMenu(false);
                    }}>
                      <Icon name="image" size={20} />
                      <span>Foto</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Dynamic Textarea */}
              <textarea
                ref={textareaRef}
                className="task-input-textarea"
                placeholder={isChatMode ? "Ketik pesan atau tambahkan file..." : "Materi apa hari ini?"}
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = (e.target.scrollHeight) + 'px';
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />

              {/* Send Button */}
              <button
                className="btn-send-primary"
                onClick={handleSendMessage}
                disabled={!inputText.trim() && files.length === 0}
              >
                <Icon name="send" size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Layout
function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [chatSessions, setChatSessions] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSessions = async () => {
    try {
      const res = await api.get('/api/chat/sessions');
      setChatSessions(res.data);
    } catch (err) {
      console.error('Gagal load sessions:', err);
    }
  };

  // Load semua sesi chat dan profil dari backend waktu pertama kali buka
  useEffect(() => {
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

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleNewChat = () => {
    setActiveChatId(null);
  };

  const handleDeleteChat = async (chatId) => {
    try {
      await api.delete(`/api/chat/sessions/${chatId}`);
      setChatSessions(prev => prev.filter(s => s.id != chatId));
      if (activeChatId == chatId) {
        setActiveChatId(null);
      }
    } catch (err) {
      console.error('Gagal hapus session:', err);
    }
  };

  const handleSelectChat = async (sessionId) => {
    setActiveChatId(sessionId);
    try {
      const res = await api.get(`/api/chat/sessions/${sessionId}/messages`);
      setChatSessions(prev => prev.map(s =>
        s.id === sessionId ? { ...s, messages: res.data } : s
      ));
    } catch (err) {
      console.error('Gagal load messages:', err);
    }
  };

  const handleSendMessage = async (text, files) => {
    let sessionId = activeChatId;

    // Update filesUploaded count if files were attached
    if (files && files.length > 0) {
      try {
        const savedProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
        const updatedFilesCount = (savedProfile.filesUploaded || 0) + files.length;
        
        const profileData = {
          ...savedProfile,
          filesUploaded: updatedFilesCount
        };

        const profileRes = await api.put('/api/user/profile', profileData);
        localStorage.setItem('userProfile', JSON.stringify(profileRes.data));
      } catch (err) {
        console.error('Gagal memperbarui metrik file di server:', err);
      }
    }

    // Kalau belum ada sesi aktif, buat sesi baru
    if (!sessionId) {
      try {
        const title = text.trim()
          ? (text.length > 30 ? text.substring(0, 30) + '...' : text)
          : (files.length > 0 ? files[0].name : 'Chat Baru');

        const res = await api.post('/api/chat/sessions', { title });
        const newSession = { ...res.data, messages: [] };
        setChatSessions(prev => [newSession, ...prev]);
        sessionId = newSession.id;
        setActiveChatId(sessionId);
      } catch (err) {
        console.error('Gagal buat session:', err);
        return;
      }
    }

    const serializedFiles = files ? files.map(f => ({
      name: f.name || 'Dokumen',
      size: f.size || 0
    })) : [];

    const userMsg = {
      id: Date.now(),
      sender: 'USER',
      content: text,
      files: serializedFiles,
      createdAt: new Date().toISOString()
    };

    setChatSessions(prev => prev.map(s =>
      s.id === sessionId
        ? { ...s, messages: [...(s.messages || []), userMsg] }
        : s
    ));

    // Kirim ke backend
    setLoading(true);
    try {
      const res = await api.post(`/api/chat/sessions/${sessionId}/messages`, { content: text });
      const botMsg = res.data;
      setChatSessions(prev => prev.map(s =>
        s.id === sessionId
          ? {
            ...s, messages: [...(s.messages || []).filter(m => m.id !== userMsg.id),
            { ...userMsg, id: Date.now() - 1 }, botMsg]
          }
          : s
      ));
    } catch (err) {
      console.error('Gagal kirim pesan:', err);
    } finally {
      setLoading(false);
    }
  };

  const activeMessages = (chatSessions.find(s => s.id == activeChatId) || {}).messages || [];

  return (
    <div className="layout-container">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
        chatSessions={chatSessions}
        activeChatId={activeChatId}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
      />
      <div className="main-content">
        <Header />
        <MainArea
          messages={activeMessages}
          onSendMessage={handleSendMessage}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;
