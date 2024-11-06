import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext';
import { RoomProvider } from './contexts/RoomContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { db } from './db/config';
import './index.css';

const renderApp = () => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <SettingsProvider>
              <RoomProvider>
                <TaskProvider>
                  <App />
                </TaskProvider>
              </RoomProvider>
            </SettingsProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </StrictMode>
  );
};

// Initialize application
const initializeApp = async () => {
  try {
    await db.open();
    renderApp();
  } catch (error) {
    console.error('Failed to initialize application:', error);
    
    const root = document.getElementById('root');
    if (root) {
      root.innerHTML = `
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          color: white;
          background: #1a1a1a;
          text-align: center;
          padding: 20px;
        ">
          <h1 style="margin-bottom: 20px;">Error Initializing Application</h1>
          <p>Please refresh the page to try again.</p>
          <button onclick="window.location.reload()" style="
            margin-top: 20px;
            padding: 10px 20px;
            background: #3b82f6;
            border: none;
            border-radius: 6px;
            color: white;
            cursor: pointer;
          ">
            Retry
          </button>
        </div>
      `;
    }
  }
};

initializeApp();