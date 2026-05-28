import React, { useState, useRef, useEffect } from 'react';
import './App.css';

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
    plus_circle: <><circle cx="12" cy="12" r="10" fill="currentColor" stroke="none" /><path d="M12 8v8M8 12h8" stroke="white" strokeWidth="2" strokeLinecap="round" /></>
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
const Sidebar = ({ isCollapsed, toggleSidebar, chatSessions, activeChatId, onSelectChat, onNewChat }) => {
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
          <a
            href="#"
            className={`nav-item ${!activeChatId ? 'active' : ''}`}
            title={isCollapsed ? 'Ruang Paham' : ''}
            onClick={(e) => { e.preventDefault(); onNewChat(); }}
          >
            <Icon name="grid" />
            <span>Ruang Paham</span>
          </a>
          <a href="#" className="nav-item" title={isCollapsed ? 'Matriks Tugas' : ''}>
            <Icon name="matrix" />
            <span>Matriks Tugas</span>
          </a>
        </div>

        {chatSessions.length > 0 && (
          <div className="nav-section" style={{ marginTop: '1rem' }}>
            <div className="nav-section-title">Percakapan</div>
            {chatSessions.map((session) => (
              <a
                key={session.id}
                href="#"
                className={`nav-item history-item ${session.id === activeChatId ? 'active' : ''}`}
                title={isCollapsed ? session.title : ''}
                onClick={(e) => { e.preventDefault(); onSelectChat(session.id); }}
              >
                <span className="history-text">{session.title}</span>
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

// Main Chat Area Component
const MainArea = ({ messages, onSendMessage }) => {
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
              <div key={msg.id} className={`message-wrapper ${msg.sender === 'user' ? 'msg-user' : 'msg-ai'}`}>
                {msg.sender === 'ai' && (
                  <div className="ai-avatar">
                    <Icon name="sparkles" size={16} />
                  </div>
                )}
                <div className="message-content">
                  {msg.files && msg.files.length > 0 && (
                    <div className="message-files">
                      {msg.files.map((f, i) => (
                        <div key={i} className="msg-file-pill">
                          <Icon name="file" size={12} />
                          <span>{f.name.length > 20 ? f.name.substring(0, 20) + '...' : f.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {msg.text && (
                    <div className="message-text" style={{ whiteSpace: 'pre-wrap' }}>
                      {msg.text}
                    </div>
                  )}
                  <div className="message-time">{msg.time}</div>
                </div>
              </div>
            ))}
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
  const [chatSessions, setChatSessions] = useState(() => {
    try {
      const saved = localStorage.getItem('pahamin_chats');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [activeChatId, setActiveChatId] = useState(null);

  // Persist to localStorage whenever chatSessions change
  useEffect(() => {
    localStorage.setItem('pahamin_chats', JSON.stringify(chatSessions));
  }, [chatSessions]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleNewChat = () => {
    setActiveChatId(null);
  };

  const handleSendMessage = (text, files) => {
    let chatId = activeChatId;

    // If no active chat, create a new session
    if (!chatId) {
      chatId = Date.now();
      const title = text.trim()
        ? (text.length > 30 ? text.substring(0, 30) + '...' : text)
        : (files.length > 0 ? files[0].name : 'Chat Baru');

      setChatSessions(prev => [
        { id: chatId, title, messages: [] },
        ...prev
      ]);
      setActiveChatId(chatId);
    }

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text,
      files,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Append user message to the correct session
    setChatSessions(prev => prev.map(s =>
      s.id === chatId ? { ...s, messages: [...s.messages, userMsg] } : s
    ));

    // Simulate AI response after 1s
    const targetChatId = chatId;
    setTimeout(() => {
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: 'Berikut contoh beberapa poin penting dari hasil resume kuliah tamu:\n\n• Topik utama membahas tentang pentingnya adaptasi teknologi di dunia kerja.\n• Disampaikan juga berbagai tantangan yang dihadapi dalam transformasi digital.\n• Tips praktis untuk meningkatkan keterampilan yang relevan dengan industri saat ini.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatSessions(prev => prev.map(s =>
        s.id === targetChatId ? { ...s, messages: [...s.messages, aiMsg] } : s
      ));
    }, 1000);
  };

  const activeMessages = (chatSessions.find(s => s.id === activeChatId) || {}).messages || [];

  return (
    <div className="layout-container">
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
        chatSessions={chatSessions}
        activeChatId={activeChatId}
        onSelectChat={setActiveChatId}
        onNewChat={handleNewChat}
      />
      <div className="main-content">
        <Header />
        <MainArea
          messages={activeMessages}
          onSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}

export default App;
