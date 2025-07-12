import { Link } from 'react-router-dom';
import { useNews } from '../hooks/useNews';
import { News } from '../types';

const NewsSection = () => {
  const { news, loading, error } = useNews();
  
  // Defensive: always treat news as array
  const newsArray: News[] = Array.isArray(news) ? news : [];
  // Mostrar apenas as 6 notícias mais recentes
  const recentNews = newsArray.slice(0, 6);

  if (loading) {
    return (
      <section id="news" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-church-blue mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Carregando notícias...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="news" className="py-20 bg-white dark:bg-gray-900">
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
    <section id="news" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Últimas Notícias</h2>
          <p className="section-subtitle">
            Fique por dentro das novidades e acontecimentos da nossa paróquia
          </p>
        </div>

        {newsArray.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">Nenhuma notícia publicada ainda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentNews.map((news: News) => (
              <Link key={news.id} to={`/noticia/${news.slug}`} className="card overflow-hidden group">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(news.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                    {news.author && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">Por {news.author.name}</span>
                    )}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-church-blue dark:group-hover:text-blue-400 transition-colors">
                    {news.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {news.excerpt || (news.content.length > 150 
                      ? `${news.content.substring(0, 150)}...` 
                      : news.content
                    )}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    {!news.is_published && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300">
                        Rascunho
                      </span>
                    )}
                    <span className="text-church-blue dark:text-blue-400 text-sm font-medium group-hover:underline">
                      Ler mais →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {newsArray.length > 6 && (
          <div className="text-center mt-12">
            <Link to="/noticias" className="btn-primary">
              Ver todas as notícias
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsSection; 