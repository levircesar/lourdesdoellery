import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    // Se não estiver na página inicial, navegar para lá primeiro
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
      return;
    }

    // Se já estiver na página inicial, fazer scroll
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg -translate-y-full' : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-church-gold rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">✝</span>
              </div>
              <div className="text-center">
                <h1 className="text-xl font-bold text-church-blue leading-tight">Lourdes do Ellery</h1>
                <p className="text-xs text-gray-600 leading-tight">Paróquia Nossa Senhora de Lourdes</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('news')}
              className="text-gray-700 hover:text-church-blue transition-colors font-medium"
            >
              Notícias
            </button>
            <button
              onClick={() => scrollToSection('announcements')}
              className="text-gray-700 hover:text-church-blue transition-colors font-medium"
            >
              Avisos
            </button>
            <button
              onClick={() => scrollToSection('mass-schedule')}
              className="text-gray-700 hover:text-church-blue transition-colors font-medium"
            >
              Horários
            </button>
            <Link
              to="/communities"
              className="text-gray-700 hover:text-church-blue transition-colors font-medium"
            >
              Comunidades
            </Link>
            <Link
              to="/parish"
              className="text-gray-700 hover:text-church-blue transition-colors font-medium"
            >
              Conheça a Paróquia
            </Link>
            <button
              onClick={() => navigate('/login')}
              className="btn-primary px-6 py-2"
            >
              Área Restrita
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-church-blue"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection('news')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-church-blue hover:bg-gray-50 rounded-md font-medium"
              >
                Notícias
              </button>
              <button
                onClick={() => scrollToSection('announcements')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-church-blue hover:bg-gray-50 rounded-md font-medium"
              >
                Avisos
              </button>
              <button
                onClick={() => scrollToSection('mass-schedule')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-church-blue hover:bg-gray-50 rounded-md font-medium"
              >
                Horários
              </button>
              <Link
                to="/communities"
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-church-blue hover:bg-gray-50 rounded-md font-medium"
              >
                Comunidades
              </Link>
              <Link
                to="/parish"
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-church-blue hover:bg-gray-50 rounded-md font-medium"
              >
                Conheça a Paróquia
              </Link>
              <button
                onClick={() => navigate('/login')}
                className="block w-full text-left px-3 py-2 btn-primary font-medium"
              >
                Área Restrita
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 