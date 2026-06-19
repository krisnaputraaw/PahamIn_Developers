import { useState, useEffect } from 'react';
import '../App.css';
import './admin.css';
import api from '../api';
import { Link, useNavigate } from 'react-router-dom';

const Icon = ({ name, size = 20, className = "" }) => {
  const icons = {
    panel_left_close: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><path d="M9 3v18" /><path d="M16 15l-3-3 3-3" /></>,
    grid: <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />,
    matrix: <path d="M3 3h18v18H3zM3 9h18M9 21V9" />,
    settings: <><path d="M12 15a3 3 0 100-6 3 3 0 000 6z" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" /></>,
    bell: <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    plus: <path d="M12 5v14M5 12h14" />,
    trash: <><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></>,
    edit: <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" /></>
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {icons[name]}
    </svg>
  );
};

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const navigate = useNavigate();

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
            className="nav-item"
            onClick={() => navigate('/matrix')}
            style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
          >
            <Icon name="matrix" />
            <span>Matriks Tugas</span>
          </button>
          <button
            className="nav-item active"
            style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
          >
            <Icon name="shield" />
            <span>Admin Panel</span>
          </button>
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

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="header-title">Admin Panel</div>
      </div>
      <div className="header-actions">
        <button className="notification-btn">
          <Icon name="bell" />
          <span className="notification-dot"></span>
        </button>
        <div className="user-profile" onClick={handleLogout} title="Logout" style={{ cursor: 'pointer' }}>
          <img src="https://ui-avatars.com/api/?name=Admin&background=2563EB&color=fff" alt="User Profile" />
        </div>
      </div>
    </header>
  );
};

function Admin() {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('analytics');

  // RBAC protection in client side
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/login');
      return;
    }
    const user = JSON.parse(userStr);
    if (user.role !== 'ADMIN') {
      navigate('/');
    }
  }, [navigate]);

  // Analytics State
  const [analytics, setAnalytics] = useState({
    totalUsers: 0,
    totalChats: 0,
    totalTasks: 0,
    dailyStats: []
  });
  const [analyticsLoading, setAnalyticsLoading] = useState(true);

  // Users Management State
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [usersLoading, setUsersLoading] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Form State
  const [formUsername, setFormUsername] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPassword, setFormPassword] = useState('');
  const [formRole, setFormRole] = useState('USER');
  const [formError, setFormError] = useState('');

  const fetchAnalytics = async () => {
    try {
      setAnalyticsLoading(true);
      const res = await api.get('/api/admin/analytics');
      setAnalytics(res.data);
    } catch (err) {
      console.error('Gagal mengambil data analytics:', err);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setUsersLoading(true);
      const res = await api.get('/api/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Gagal mengambil data user:', err);
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAnalytics();
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.put(`/api/admin/users/${userId}/role`, newRole, {
        headers: { 'Content-Type': 'text/plain' }
      });
      fetchUsers();
      fetchAnalytics();
    } catch (err) {
      console.error('Gagal mengganti role:', err);
      alert('Gagal mengganti role user');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm('Apakah Anda yakin ingin menghapus user ini?')) return;
    try {
      await api.delete(`/api/admin/users/${userId}`);
      fetchUsers();
      fetchAnalytics();
    } catch (err) {
      console.error('Gagal menghapus user:', err);
      alert('Gagal menghapus user');
    }
  };

  const openAddModal = () => {
    setEditingUser(null);
    setFormUsername('');
    setFormEmail('');
    setFormPassword('');
    setFormRole('USER');
    setFormError('');
    setUserModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setFormUsername(user.username);
    setFormEmail(user.email);
    setFormPassword(''); // leave blank if no password update
    setFormRole(user.role);
    setFormError('');
    setUserModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formUsername.trim() || !formEmail.trim()) {
      setFormError('Username dan Email wajib diisi');
      return;
    }

    const payload = {
      username: formUsername,
      email: formEmail,
      role: formRole
    };

    if (formPassword) {
      payload.password = formPassword;
    }

    try {
      if (editingUser) {
        await api.put(`/api/admin/users/${editingUser.id}`, payload);
      } else {
        if (!formPassword) {
          setFormError('Password wajib diisi untuk user baru');
          return;
        }
        await api.post('/api/admin/users', payload);
      }
      setUserModalOpen(false);
      fetchUsers();
      fetchAnalytics();
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Gagal menyimpan data user';
      setFormError(errMsg);
    }
  };

  const filteredUsers = users.filter(u =>
    u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // SVG Chart Calculation Helpers
  const renderSVGChart = () => {
    if (!analytics.dailyStats || analytics.dailyStats.length === 0) return null;

    const maxVal = Math.max(...analytics.dailyStats.map(d => Math.max(d.users || 0, d.chats || 0, d.tasks || 0, 1)));
    const width = 600;
    const height = 240;
    const paddingLeft = 40;
    const paddingRight = 20;
    const paddingTop = 20;
    const paddingBottom = 40;
    const chartWidth = width - paddingLeft - paddingRight;
    const chartHeight = height - paddingTop - paddingBottom;

    const getPoints = (key) => {
      return analytics.dailyStats.map((d, idx) => {
        const x = paddingLeft + (idx * chartWidth) / (analytics.dailyStats.length - 1 || 1);
        const val = d[key] || 0;
        const y = paddingTop + chartHeight - (val * chartHeight) / maxVal;
        return `${x},${y}`;
      }).join(' ');
    };

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="analytics-svg">
        {/* Y Axis Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
          const y = paddingTop + chartHeight * (1 - ratio);
          const val = Math.round(maxVal * ratio);
          return (
            <g key={i}>
              <line x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="var(--border)" strokeDasharray="4 4" />
              <text x={paddingLeft - 10} y={y + 4} textAnchor="end" fontSize="10" fill="var(--text-muted)">{val}</text>
            </g>
          );
        })}

        {/* X Axis Labels */}
        {analytics.dailyStats.map((d, idx) => {
          const x = paddingLeft + (idx * chartWidth) / (analytics.dailyStats.length - 1 || 1);
          // Format date from YYYY-MM-DD to DD/MM
          const rawDate = d.date || '';
          const formattedDate = rawDate.substring(5).replace('-', '/');
          return (
            <text key={idx} x={x} y={height - 15} textAnchor="middle" fontSize="10" fill="var(--text-muted)">{formattedDate}</text>
          );
        })}

        {/* Lines */}
        <polyline fill="none" stroke="var(--primary)" strokeWidth="3" points={getPoints('users')} strokeLinecap="round" strokeLinejoin="round" />
        <polyline fill="none" stroke="#10B981" strokeWidth="3" points={getPoints('chats')} strokeLinecap="round" strokeLinejoin="round" />
        <polyline fill="none" stroke="#F59E0B" strokeWidth="3" points={getPoints('tasks')} strokeLinecap="round" strokeLinejoin="round" />

        {/* Points */}
        {analytics.dailyStats.map((d, idx) => {
          const x = paddingLeft + (idx * chartWidth) / (analytics.dailyStats.length - 1 || 1);
          return (
            <g key={idx}>
              <circle cx={x} cy={paddingTop + chartHeight - ((d.users || 0) * chartHeight) / maxVal} r="4" fill="var(--primary)" />
              <circle cx={x} cy={paddingTop + chartHeight - ((d.chats || 0) * chartHeight) / maxVal} r="4" fill="#10B981" />
              <circle cx={x} cy={paddingTop + chartHeight - ((d.tasks || 0) * chartHeight) / maxVal} r="4" fill="#F59E0B" />
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <div className="layout-container">
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />

      <div className="main-content">
        <Header />

        <div className="admin-container animate-fade-in">
          {/* Tabs bar */}
          <div className="admin-tabs">
            <button
              className={`admin-tab ${activeTab === 'analytics' ? 'active' : ''}`}
              onClick={() => { setActiveTab('analytics'); fetchAnalytics(); }}
            >
              Analytics Dashboard
            </button>
            <button
              className={`admin-tab ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => { setActiveTab('users'); fetchUsers(); }}
            >
              User Management
            </button>
          </div>

          <div className="admin-tab-content">
            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="analytics-view">
                {analyticsLoading ? (
                  <div className="loading-state">Memuat data analisis...</div>
                ) : (
                  <>
                    {/* Summary Cards */}
                    <div className="summary-cards">
                      <div className="summary-card card-blue">
                        <div className="summary-title">Total User Terdaftar</div>
                        <div className="summary-value">{analytics.totalUsers}</div>
                      </div>
                      <div className="summary-card card-green">
                        <div className="summary-title">Total Pesan Chatbot</div>
                        <div className="summary-value">{analytics.totalChats}</div>
                      </div>
                      <div className="summary-card card-yellow">
                        <div className="summary-title">Total Matriks Tugas</div>
                        <div className="summary-value">{analytics.totalTasks}</div>
                      </div>
                    </div>

                    {/* Chart Container */}
                    <div className="chart-container">
                      <h3 className="chart-title">Aktivitas Harian (7 Hari Terakhir)</h3>
                      <div className="chart-legend">
                        <span className="legend-item"><span className="legend-color color-blue"></span>User Baru</span>
                        <span className="legend-item"><span className="legend-color color-green"></span>Pesan Chat</span>
                        <span className="legend-item"><span className="legend-color color-yellow"></span>Tugas Baru</span>
                      </div>
                      <div className="chart-wrapper">
                        {renderSVGChart()}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Users CRUD Tab */}
            {activeTab === 'users' && (
              <div className="users-view">
                <div className="users-header-row">
                  <div className="search-box">
                    <input
                      type="text"
                      placeholder="Cari email atau username..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button className="btn-add-user" onClick={openAddModal}>
                    <Icon name="plus" size={16} />
                    <span>Tambah User</span>
                  </button>
                </div>

                {usersLoading ? (
                  <div className="loading-state">Memuat data user...</div>
                ) : (
                  <div className="table-responsive">
                    <table className="users-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Username</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Dibuat Pada</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map(u => (
                          <tr key={u.id}>
                            <td>{u.id}</td>
                            <td className="font-semibold">{u.username}</td>
                            <td>{u.email}</td>
                            <td>
                              <select
                                value={u.role}
                                onChange={(e) => handleRoleChange(u.id, e.target.value)}
                                className="role-dropdown"
                              >
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                              </select>
                            </td>
                            <td className="text-xs text-muted">
                              {u.createdAt ? new Date(u.createdAt).toLocaleDateString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '-'}
                            </td>
                            <td>
                              <div className="action-buttons">
                                <button className="action-btn edit" onClick={() => openEditModal(u)} title="Edit User">
                                  <Icon name="edit" size={16} />
                                </button>
                                <button className="action-btn delete" onClick={() => handleDeleteUser(u.id)} title="Hapus User">
                                  <Icon name="trash" size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {filteredUsers.length === 0 && (
                          <tr>
                            <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                              Tidak ada user ditemukan.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* User Modal Form */}
        {userModalOpen && (
          <div className="modal-backdrop">
            <div className="modal-content animate-fade-in">
              <div className="modal-header">
                <h3>{editingUser ? 'Edit User' : 'Tambah User Baru'}</h3>
                <button className="btn-close-modal" onClick={() => setUserModalOpen(false)}>×</button>
              </div>
              <form onSubmit={handleFormSubmit}>
                {formError && <div className="form-error-message">{formError}</div>}
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    value={formUsername}
                    onChange={(e) => setFormUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password {editingUser && <span className="text-xs text-muted">(Kosongkan jika tidak ingin diubah)</span>}</label>
                  <input
                    type="password"
                    value={formPassword}
                    onChange={(e) => setFormPassword(e.target.value)}
                    placeholder={editingUser ? "••••••••" : ""}
                    required={!editingUser}
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn-cancel" onClick={() => setUserModalOpen(false)}>Batal</button>
                  <button type="submit" className="btn-submit">{editingUser ? 'Simpan' : 'Tambah'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
