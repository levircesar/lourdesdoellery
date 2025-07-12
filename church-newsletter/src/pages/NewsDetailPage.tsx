import { useParams, Link } from 'react-router-dom';
import { useNews } from '../hooks/useNews';
import { News } from '../types';
import { useState, useEffect } from 'react';

const NewsDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { news: allNews, loading: newsLoading } = useNews();

  useEffect(() => {
    if (!newsLoading && slug) {
      const foundNews = allNews.find(n => n.slug === slug);
      if (foundNews) {
        setNews(foundNews);
        setError(null);
      } else {
        setError('Notícia não encontrada');
      }
      setLoading(false);
    }
  }, [slug, allNews, newsLoading]);

  if (loading || newsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-church-blue mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Carregando notícia...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Notícia não encontrada</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">A notícia que você está procurando não existe ou foi removida.</p>
            <Link to="/" className="btn-primary">
              Voltar para a página inicial
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                  Início
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="flex-shrink-0 h-5 w-5 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <Link to="/#news" className="ml-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                    Notícias
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="flex-shrink-0 h-5 w-5 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-4 text-gray-900 dark:text-white font-medium">{news.title}</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                news.is_published ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300' : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300'
              }`}>
                {news.is_published ? 'Publicada' : 'Rascunho'}
              </span>
              <time className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(news.createdAt).toLocaleDateString('pt-BR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {news.title}
            </h1>
            
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <span>Por {news.author?.name || 'Autor não informado'}</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <div 
                className="news-content dark:text-gray-100"
                dangerouslySetInnerHTML={{ __html: news.content }}
              />
            </div>

            {/* Share buttons */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Compartilhar:</h3>
              <div className="flex space-x-4">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(news.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
                >
                  Twitter
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${news.title} - ${window.location.href}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related news */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Outras Notícias</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allNews
              .filter((n: News) => n.id !== news.id)
              .slice(0, 4)
              .map((relatedNews: News) => (
                <Link
                  key={relatedNews.id}
                  to={`/noticia/${relatedNews.slug}`}
                  className="card overflow-hidden group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        relatedNews.is_published ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300' : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300'
                      }`}>
                        {relatedNews.is_published ? 'Publicada' : 'Rascunho'}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(relatedNews.createdAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-church-blue dark:group-hover:text-blue-400 transition-colors">
                      {relatedNews.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {relatedNews.excerpt || (relatedNews.content.length > 120 
                        ? `${relatedNews.content.substring(0, 120)}...` 
                        : relatedNews.content)}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default NewsDetailPage; 