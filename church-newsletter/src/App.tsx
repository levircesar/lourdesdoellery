import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ParishPage from './pages/ParishPage';
import NewsDetailPage from './pages/NewsDetailPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Páginas públicas */}
            <Route path="/" element={
              <>
                <Header />
                <HomePage />
              </>
            } />
            
            <Route path="/parish" element={
              <>
                <Header />
                <ParishPage />
              </>
            } />
            
            <Route path="/noticia/:slug" element={
              <>
                <Header />
                <NewsDetailPage />
              </>
            } />
            
            <Route path="/login" element={<LoginPage />} />
            
            {/* Páginas protegidas */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App; 