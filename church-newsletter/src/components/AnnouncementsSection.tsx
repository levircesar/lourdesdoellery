import { useAnnouncements } from '../hooks/useAnnouncements';
import { Announcement } from '../types';

interface AnnouncementsSectionProps {
  showAllActive?: boolean;
}

const AnnouncementsSection = ({ showAllActive = false }: AnnouncementsSectionProps) => {
  const { announcements, loading, error } = useAnnouncements();
  // Filtrar apenas avisos ativos
  const activeAnnouncements = announcements.filter((a: Announcement) => a.is_active);
  // Se showAllActive, mostrar todos ativos, senão só os 4 mais recentes
  const displayAnnouncements = showAllActive ? activeAnnouncements : activeAnnouncements.slice(0, 4);

  if (loading) {
    return (
      <section id="announcements" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-church-blue mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Carregando anúncios...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="announcements" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 btn-primary"
            >
              Tentar novamente
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="announcements" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Avisos Importantes</h2>
          <p className="section-subtitle">
            Informações e comunicados importantes da nossa paróquia
          </p>
        </div>

        {displayAnnouncements.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">Nenhum anúncio ativo no momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayAnnouncements.map((announcement: Announcement) => (
              <div key={announcement.id} className="card border-l-4 border-church-blue dark:border-blue-400">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 dark:text-gray-500">
                        Criado em {new Date(announcement.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Período: {new Date(announcement.week_start).toLocaleDateString('pt-BR')} a {new Date(announcement.week_end).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {announcement.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                    {announcement.content.length > 200 
                      ? `${announcement.content.substring(0, 200)}...` 
                      : announcement.content
                    }
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      {announcement.author && (
                        <span>Por {announcement.author.name}</span>
                      )}
                      {announcement.expires_at && (
                        <span>
                          Expira em {new Date(announcement.expires_at).toLocaleDateString('pt-BR')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeAnnouncements.length > 4 && !showAllActive && (
          <div className="text-center mt-12">
            <button className="btn-primary">
              Ver todos os anúncios
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default AnnouncementsSection; 