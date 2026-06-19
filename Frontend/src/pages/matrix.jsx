import { useState, useEffect } from 'react';
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
    users: <><circle cx="9" cy="7" r="4" /><path d="M17 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /><path d="M21 21v-2a4 4 0 00-3-3.87" /><path d="M9 21v-2a4 4 0 00-8 0v2" /></>
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {icons[name]}
    </svg>
  );
};

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
          <button
            className="nav-item"
            onClick={() => navigate('/')}
            style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
          >
            <Icon name="grid" />
            <span>Ruang Paham</span>
          </button>
          <button
            className="nav-item active"
            style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
          >
            <Icon name="matrix" />
            <span>Matriks Tugas</span>
          </button>
          {isAdmin && (
            <button
              className="nav-item"
              onClick={() => navigate('/admin')}
              style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
            >
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

// Header Component
const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="header-title">PahamIn</div>
      </div>
      <div className="header-actions">
        <button className="notification-btn">
          <Icon name="bell" />
          <span className="notification-dot"></span>
        </button>
        <div className="user-profile">
          <img src="https://ui-avatars.com/api/?name=User&background=2563EB&color=fff" alt="User Profile" />
        </div>
      </div>
    </header>
  );
};

function MatrixArea({ tasks, onDone, inputText, setInputText, onAddTask }) {
  const quadrants = [
    { key: 'DO', label: 'Do', desc: 'URGENT & IMPORTANT', icon: <BsExclamationLg />, className: 'do', badgeClass: 'do-badge', iconClass: 'do-icon' },
    { key: 'DECIDE', label: 'Decide', desc: 'IMPORTANT, NOT URGENT', icon: <FiCalendar />, className: 'decide', badgeClass: 'decide-badge', iconClass: 'decide-icon' },
    { key: 'DELEGATE', label: 'Delegate', desc: 'URGENT, NOT IMPORTANT', icon: <HiMiniUserGroup />, className: 'delegate', badgeClass: 'delegate-badge', iconClass: 'delegate-icon' },
    { key: 'DELETE', label: 'Delete', desc: 'NEITHER', icon: <RiDeleteBinLine />, className: 'delete', badgeClass: 'delete-badge', iconClass: 'delete-icon' },
  ];

  return (
    <div className="dashboard-area">
      <div className="bg-glow-container">
        <div className="glow-blob glow-1"></div>
        <div className="glow-blob glow-2"></div>
      </div>
      <div className="matrix-wrapper">
        <div className="matrix-grid">
          {quadrants.map(q => (
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
                  {tasks[q.key].length} Tasks
                </span>
              </div>
              {tasks[q.key].map(task => (
                <div key={task.id} className="task-item">
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => !task.done && onDone(task.id)}
                  />
                  <span style={{ textDecoration: task.done ? 'line-through' : 'none', color: task.done ? 'var(--text-muted)' : 'inherit' }}>
                    {task.title}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="matrix-input-section">
          <div className="matrix-input">
            <input
              type="text"
              placeholder="Tambah tugas baru..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onAddTask()}
            />
            <button className="matrix-add-btn" onClick={onAddTask}>Add +</button>
            <button className="matrix-mic-btn"><FiMic /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Matrix() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [tasks, setTasks] = useState({ DO: [], DECIDE: [], DELEGATE: [], DELETE: [] });
  const [inputText, setInputText] = useState('');

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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTasks();
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
      />
      <div className="main-content">
        <Header />
        <MatrixArea
          tasks={tasks}
          onDone={handleDone}
          inputText={inputText}
          setInputText={setInputText}
          onAddTask={handleAddTask}
        />
      </div>
    </div>
  );
}

export default Matrix;