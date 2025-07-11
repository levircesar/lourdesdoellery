import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import NewsSection from '../components/NewsSection';
import AnnouncementsSection from '../components/AnnouncementsSection';
import MassScheduleSection from '../components/MassScheduleSection';

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    // Verificar se há um scrollTo no state (quando vem de outra página)
    if (location.state?.scrollTo) {
      const sectionId = location.state.scrollTo;
      
      // Aguardar um pouco para a página carregar completamente
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen">
      <Hero />
      <NewsSection />
      <AnnouncementsSection />
      <MassScheduleSection />
      
      {/* Footer */}
      <footer className="bg-church-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-church-gold rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">✝</span>
                </div>
                <h3 className="text-xl font-bold">Paróquia Nossa Senhora de Lourdes - Ellery</h3>
              </div>
              <p className="text-white/80">
                Uma comunidade de fé dedicada ao serviço e à evangelização.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <div className="space-y-2 text-white/80">
                <p>Rua das Flores, 123</p>
                <p>Centro - São Paulo, SP</p>
                <p>(11) 1234-5678</p>
                <p>secretaria@paroquia.com</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Horário de Atendimento</h4>
              <div className="space-y-2 text-white/80">
                <p>Segunda a Sexta: 8h às 18h</p>
                <p>Sábado: 8h às 12h</p>
                <p>Domingo: 7h às 12h</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>&copy; 2024 Paróquia Santa Maria. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 