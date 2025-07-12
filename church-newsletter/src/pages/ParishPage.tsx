import { useState } from 'react';
import ImageModal from '../components/ImageModal';

const ParishPage = () => {
  const [selectedImage, setSelectedImage] = useState<{ images: string[], index: number, title: string } | null>(null);

  const priests = [
    {
      id: 1,
      name: "Pe. Bruno Moreira",
      role: "Pároco",
      image: "https://firebasestorage.googleapis.com/v0/b/clone-driver-fcb47.appspot.com/o/igreja%2Fpadres%2FCaptura%20de%20tela%202025-07-12%20172654.png?alt=media&token=a98f7961-19b9-4dae-8a08-123dee49a3cd",
      description: "Dedica-se ao ministério paroquial com amor e dedicação. Especialista em teologia pastoral e apaixonado pela juventude.",
      specialties: ["Pastoral Juvenil", "Teologia", "Aconselhamento"]
    },
    {
      id: 2,
      name: "Pe. Abel Jakson",
      role: "Padre Emérito",
      image: "https://firebasestorage.googleapis.com/v0/b/clone-driver-fcb47.appspot.com/o/igreja%2Fpadres%2FCaptura%20de%20tela%202025-07-12%20172931.png?alt=media&token=9a79b262-d010-4893-9a2a-93f8494a3917",
      description: "Missionário por vocação, trabalha incansavelmente pela evangelização e formação de líderes comunitários.",
      specialties: ["Missões", "Formação", "Comunidade"]
    }
  ];

  const deacons = [
    {
      id: 1,
      name: "Diácono Francisco Rodrigues",
      role: "Diácono Permanente",
      image: "https://firebasestorage.googleapis.com/v0/b/clone-driver-fcb47.appspot.com/o/igreja%2Fpadres%2FCaptura%20de%20tela%202025-07-12%20172920.png?alt=media&token=43e5b9ae-42de-4c46-a463-6cc70610e445",
      description: "Servidor dedicado da comunidade, coordena ações sociais e ministra o batismo e matrimônio.",
      specialties: ["Ação Social", "Liturgia", "Família"]
    }
  ];

  const projects = [
    {
      id: 1,
      name: "Coroinhas",
      icon: "🕯️",
      description: "Grupo de crianças e adolescentes que servem na liturgia, aprendendo sobre fé e responsabilidade.",
      activities: ["Serviço na Missa", "Formação Espiritual", "Retiros", "Atividades Recreativas"]
    },
    {
      id: 2,
      name: "Pastoral da Criança",
      icon: "👶",
      description: "Dedica-se ao cuidado e desenvolvimento integral das crianças e suas famílias.",
      activities: ["Visitas Domiciliares", "Celebração da Vida", "Orientação Nutricional", "Acompanhamento"]
    },
    {
      id: 3,
      name: "Pastoral da Juventude",
      icon: "🙋‍♂️",
      description: "Espaço de formação e evangelização para jovens, promovendo protagonismo juvenil.",
      activities: ["Encontros Semanais", "Retiros", "Missões", "Ações Sociais"]
    },
    {
      id: 4,
      name: "Pastoral da Família",
      icon: "👨‍👩‍👧‍👦",
      description: "Apoia e fortalece as famílias através de encontros, formações e aconselhamento.",
      activities: ["Encontros de Casais", "Formação", "Aconselhamento", "Celebrações"]
    },
    {
      id: 5,
      name: "Pastoral da Caridade",
      icon: "❤️",
      description: "Promove ações de caridade e solidariedade, atendendo aos mais necessitados.",
      activities: ["Distribuição de Alimentos", "Visitas aos Enfermos", "Campanhas", "Apoio Social"]
    },
    {
      id: 6,
      name: "Coral Paroquial",
      icon: "🎵",
      description: "Ministério de música que anima as celebrações e forma músicos para a liturgia.",
      activities: ["Ensaios Semanais", "Apresentações", "Formação Musical", "Festivais"]
    }
  ];

  const openImageModal = (image: string, title: string) => {
    setSelectedImage({ images: [image], index: 0, title });
  };

  const openGalleryModal = (images: string[], startIndex: number, title: string) => {
    setSelectedImage({ images, index: startIndex, title });
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  // Galeria de fotos da paróquia
  const parishPhotos = [
    {
      id: 1,
      title: "Fachada da Igreja",
      image: "https://firebasestorage.googleapis.com/v0/b/clone-driver-fcb47.appspot.com/o/igreja%2Fpadres%2FCaptura%20de%20tela%202025-07-12%20173121.png?alt=media&token=d1c417e9-5370-4d0d-9a7c-4b031627066d",
      category: "Igreja"
    },
    {
      id: 2,
      title: "Altar Principal",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      category: "Igreja"
    },
    {
      id: 3,
      title: "Celebração de Missa",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      category: "Liturgia"
    },
    {
      id: 4,
      title: "Batismo",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      category: "Sacramentos"
    },
    {
      id: 5,
      title: "Coral Paroquial",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
      category: "Música"
    },
    {
      id: 6,
      title: "Pastoral da Juventude",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
      category: "Pastoral"
    },
    {
      id: 7,
      title: "Ação Social",
      image: "https://images.unsplash.com/photo-1532629345422-7515f3d16c76?w=800&h=600&fit=crop",
      category: "Caridade"
    },
    {
      id: 8,
      title: "Retiro Espiritual",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      category: "Formação"
    },
    {
      id: 9,
      title: "Festa da Padroeira",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      category: "Eventos"
    },
    {
      id: 10,
      title: "Jardim da Igreja",
      image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&h=600&fit=crop",
      category: "Igreja"
    },
    {
      id: 11,
      title: "Catequese",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
      category: "Formação"
    },
    {
      id: 12,
      title: "Celebração de Casamento",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
      category: "Sacramentos"
    }
  ];

  const categories = ["Todas", "Igreja", "Liturgia", "Sacramentos", "Música", "Pastoral", "Caridade", "Formação", "Eventos"];
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  const filteredPhotos = selectedCategory === "Todas" 
    ? parishPhotos 
    : parishPhotos.filter(photo => photo.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-700 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white z-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
              Conhecendo a Paróquia
            </h1>
            <p className="text-xl md:text-2xl font-light animate-fade-in-delay">
              Nossa Senhora de Lourdes - Ellery
            </p>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 text-white text-6xl opacity-20">✝️</div>
        <div className="absolute bottom-10 right-10 text-white text-6xl opacity-20">🙏</div>
      </div>

      {/* Introduction Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
            Bem-vindo à Nossa Comunidade
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Fundada em 1960, nossa paróquia é uma comunidade de fé dedicada ao serviço, 
              à evangelização e à promoção dos valores cristãos. Inspirados por Nossa Senhora de Lourdes, 
              buscamos acolher, evangelizar e servir a todos, promovendo a comunhão e o crescimento espiritual.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Nossa missão é ser uma igreja acolhedora, missionária e comprometida com a transformação social, 
              sempre guiada pelos ensinamentos de Cristo e pela intercessão de Maria.
            </p>
          </div>
        </div>

        {/* Nossa Senhora de Lourdes Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16 transform hover:scale-105 transition-transform duration-300 border border-gray-200 dark:border-gray-700">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                Nossa Senhora de Lourdes
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                Nossa padroeira, que apareceu a Santa Bernadette em 1858, nos inspira com sua mensagem 
                de conversão, penitência e oração. Sua intercessão fortalece nossa comunidade e nos 
                guia no caminho da fé.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                "Eu sou a Imaculada Conceição" - estas palavras ecoam em nossos corações e nos 
                lembram da pureza e graça que devemos buscar em nossas vidas.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center text-white text-8xl shadow-2xl">
                  ⛪
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-2xl animate-pulse">
                  ✨
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clergy Section */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Nossa Equipe Pastoral
          </h2>
          
          {/* Priests */}
          <div className="mb-12">
            <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400 text-center mb-8">
              Padres
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {priests.map((priest) => (
                <div key={priest.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="relative">
                      <div 
                        className="cursor-pointer transform hover:scale-105 transition-transform duration-300"
                        onClick={() => openImageModal(priest.image, priest.name)}
                      >
                        <img 
                          src={priest.image} 
                          alt={priest.name}
                          className="w-32 h-40 object-cover rounded-xl shadow-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 rounded-xl flex items-center justify-center">
                          <span className="text-white text-2xl opacity-0 hover:opacity-100 transition-opacity duration-300">🔍</span>
                        </div>
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        ✝️
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{priest.name}</h4>
                      <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3">{priest.role}</p>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{priest.description}</p>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {priest.specialties.map((specialty, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Deacons */}
          <div>
            <h3 className="text-3xl font-bold text-purple-600 dark:text-purple-400 text-center mb-8">
              Diáconos
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {deacons.map((deacon) => (
                <div key={deacon.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <div className="relative">
                      <div 
                        className="cursor-pointer transform hover:scale-105 transition-transform duration-300"
                        onClick={() => openImageModal(deacon.image, deacon.name)}
                      >
                        <img 
                          src={deacon.image} 
                          alt={deacon.name}
                          className="w-32 h-40 object-cover rounded-xl shadow-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 rounded-xl flex items-center justify-center">
                          <span className="text-white text-2xl opacity-0 hover:opacity-100 transition-opacity duration-300">🔍</span>
                        </div>
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        🔷
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h4 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{deacon.name}</h4>
                      <p className="text-purple-600 dark:text-purple-400 font-semibold mb-3">{deacon.role}</p>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{deacon.description}</p>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {deacon.specialties.map((specialty, index) => (
                          <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div>
          <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Nossos Projetos e Pastorais
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-xl border border-gray-200 dark:border-gray-700">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">{project.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{project.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{project.description}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 text-sm">Atividades:</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {project.activities.map((activity, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Galeria de Fotos */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
              Galeria de Fotos
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Conheça nossa paróquia através de imagens que capturam a beleza da nossa comunidade e as atividades que realizamos
            </p>
          </div>
          
          {/* Filtros de Categoria Simplificados */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.slice(0, 6).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 text-sm ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 hover:text-blue-600 shadow-md border border-gray-200 dark:border-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grid de Fotos Melhorado */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPhotos.map((photo, index) => (
              <div
                key={photo.id}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-500 cursor-pointer hover:shadow-2xl border border-gray-200 dark:border-gray-700"
                onClick={() => openGalleryModal(
                  filteredPhotos.map(p => p.image), 
                  index, 
                  `Galeria - ${photo.category}`
                )}
              >
                <div className="aspect-w-4 aspect-h-3">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-bold text-xl mb-2">{photo.title}</h3>
                    <p className="text-sm opacity-90 bg-black/30 px-3 py-1 rounded-full inline-block">{photo.category}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="w-10 h-10 bg-white/95 rounded-full flex items-center justify-center text-gray-700 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-lg">
                    <span className="text-lg">🔍</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPhotos.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📷</div>
              <p className="text-gray-500 dark:text-gray-400 text-lg">Nenhuma foto encontrada para esta categoria.</p>
              <button 
                onClick={() => setSelectedCategory("Todas")}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              >
                Ver todas as fotos
              </button>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Venha Fazer Parte da Nossa Família!
            </h3>
            <p className="text-xl mb-6">
              Junte-se a nós e descubra como sua fé pode florescer em comunidade
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
              Entre em Contato
            </button>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          images={selectedImage.images}
          currentIndex={selectedImage.index}
          title={selectedImage.title}
          onClose={closeImageModal}
        />
      )}

      {/* CSS for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 1s ease-out;
          }
          .animate-fade-in-delay {
            animation: fade-in 1s ease-out 0.3s both;
          }
        `
      }} />
    </div>
  );
};

export default ParishPage; 