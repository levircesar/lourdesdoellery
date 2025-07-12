import { useState } from 'react';
import ImageModal from '../components/ImageModal';

const CommunitiesPage = () => {
  const [selectedImage, setSelectedImage] = useState<{ images: string[], index: number, title: string } | null>(null);

  const communities = [
    {
      id: 1,
      name: "Comunidade Católica Shalom",
      location: "Fortaleza, Ceará",
      description: "A Comunidade Católica Shalom é uma associação privada de fiéis de direito pontifício, fundada em 1982, que tem como carisma a evangelização dos jovens e a promoção da paz. Nossa missão é anunciar o Evangelho com alegria e simplicidade, levando a todos a experiência do amor de Deus.",
      longDescription: "A Comunidade Católica Shalom nasceu do coração de Deus para evangelizar os jovens e promover a paz. Fundada em Fortaleza em 1982, a Comunidade tem como carisma específico a evangelização dos jovens e a promoção da paz. Nossa espiritualidade é marcada pela alegria, simplicidade e profunda intimidade com Deus. Através de encontros, retiros, missões e formações, levamos a todos a experiência transformadora do amor de Deus. A Comunidade Shalom está presente em mais de 30 países, sempre fiel ao seu carisma de evangelizar com alegria e promover a paz no mundo.",
      images: [
        "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=600&fit=crop"
      ],
      meetingPlaces: [
        {
          name: "Centro de Evangelização Shalom",
          address: "Rua das Flores, 123 - Centro, Fortaleza",
          schedule: "Terças e Quintas às 19h"
        },
        {
          name: "Igreja Nossa Senhora da Conceição",
          address: "Av. Beira Mar, 456 - Meireles, Fortaleza",
          schedule: "Domingos às 18h"
        }
      ],
      activities: [
        "Encontros de Formação",
        "Retiros Espirituais",
        "Missões Evangelizadoras",
        "Grupos de Oração",
        "Formação de Líderes",
        "Ações Sociais"
      ],
      contact: {
        phone: "(85) 99999-9999",
        email: "shalom@fortaleza.com",
        website: "www.comshalom.org"
      },
      color: "bg-blue-600",
      icon: "🕊️"
    },
    {
      id: 2,
      name: "Comunidade Católica de Missão e Adoração Fanuel",
      location: "Fortaleza, Ceará",
      description: "A Comunidade Fanuel é uma comunidade católica dedicada à missão e adoração, com foco na formação espiritual e no serviço aos mais necessitados. Nossa vocação é ser instrumentos de Deus para transformar vidas através da oração e da caridade.",
      longDescription: "A Comunidade Católica de Missão e Adoração Fanuel foi fundada com o propósito de ser um espaço de encontro com Deus através da oração, adoração e missão. Nossa espiritualidade é centrada na Eucaristia e na devoção a Maria. A comunidade tem como pilares a oração constante, a formação espiritual sólida e o serviço aos mais necessitados. Realizamos missões evangelizadoras, retiros de formação, encontros de oração e ações sociais que transformam vidas e comunidades. Nossa missão é levar a todos a experiência do amor misericordioso de Deus, especialmente aos que mais precisam de acolhimento e esperança.",
      images: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=600&fit=crop"
      ],
      meetingPlaces: [
        {
          name: "Casa de Missão Fanuel",
          address: "Rua da Paz, 789 - Aldeota, Fortaleza",
          schedule: "Segundas e Quartas às 20h"
        },
        {
          name: "Capela Nossa Senhora das Graças",
          address: "Av. Santos Dumont, 321 - Dionísio Torres, Fortaleza",
          schedule: "Sábados às 16h"
        }
      ],
      activities: [
        "Adoração Eucarística",
        "Missões Evangelizadoras",
        "Formação Espiritual",
        "Grupos de Oração",
        "Ações de Caridade",
        "Retiros de Conversão"
      ],
      contact: {
        phone: "(85) 88888-8888",
        email: "fanuel@fortaleza.com",
        website: "www.comfanuel.org"
      },
      color: "bg-purple-600",
      icon: "🙏"
    },
    {
      id: 3,
      name: "Amigos de Maria",
      location: "Fortaleza, Ceará",
      description: "Os amigos de Maria tem foco na formação espiritual e no serviço aos mais necessitados. Nossa vocação é ser instrumentos de Deus para transformar vidas através da oração e da caridade.",
      longDescription: "Fundada com o propósito de ser um espaço de encontro com Deus através da oração, adoração e missão. Nossa espiritualidade é centrada na Eucaristia e na devoção a Maria. A comunidade tem como pilares a oração constante, a formação espiritual sólida e o serviço aos mais necessitados. Realizamos missões evangelizadoras, retiros de formação, encontros de oração e ações sociais que transformam vidas e comunidades. Nossa missão é levar a todos a experiência do amor misericordioso de Deus, especialmente aos que mais precisam de acolhimento e esperança.",
      images: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=600&fit=crop"
      ],
      meetingPlaces: [
        {
          name: "Igreja",
          address: "Rua da Paz, 789 - Aldeota, Fortaleza",
          schedule: "Segundas e Quartas às 20h"
        },
        {
          name: "Capela Nossa Senhora das Graças",
          address: "Av. Santos Dumont, 321 - Dionísio Torres, Fortaleza",
          schedule: "Sábados às 16h"
        }
      ],
      activities: [
        "Adoração Eucarística",
        "Missões Evangelizadoras",
        "Formação Espiritual",
        "Grupos de Oração",
        "Ações de Caridade",
        "Retiros de Conversão"
      ],
      contact: {
        phone: "(85) 88888-8888",
        email: "fanuel@fortaleza.com",
        website: "www.amigosmaria.org"
      },
      color: "bg-purple-600",
      icon: "🙏"
    }
  ];

  const openImageModal = (images: string[], index: number, title: string) => {
    setSelectedImage({ images, index, title });
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-16">
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-700 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white z-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
              Comunidades Católicas
            </h1>
            <p className="text-xl md:text-2xl font-light animate-fade-in-delay">
              Conheça as comunidades que fazem parte da nossa paróquia
            </p>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 text-white text-6xl opacity-20">🕊️</div>
        <div className="absolute bottom-10 right-10 text-white text-6xl opacity-20">🙏</div>
      </div>

      {/* Communities Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          {communities.map((community) => (
            <div key={community.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              {/* Header */}
              <div className={`${community.color} text-white p-8`}>
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-4">{community.icon}</span>
                  <div>
                    <h2 className="text-3xl font-bold">{community.name}</h2>
                    <p className="text-xl opacity-90">{community.location}</p>
                  </div>
                </div>
                <p className="text-lg opacity-95 leading-relaxed">{community.description}</p>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Left Column - Images and Description */}
                  <div className="space-y-6">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Galeria de Fotos</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {community.images.map((image, imgIndex) => (
                          <div 
                            key={imgIndex} 
                            className="relative group overflow-hidden rounded-lg cursor-pointer transform hover:scale-105 transition-all duration-300"
                            onClick={() => openImageModal(community.images, imgIndex, community.name)}
                          >
                            <img
                              src={image}
                              alt={`${community.name} - Foto ${imgIndex + 1}`}
                              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                              <span className="text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">🔍</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Long Description */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Sobre a Comunidade</h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">{community.longDescription}</p>
                    </div>

                    {/* Activities */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Atividades</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {community.activities.map((activity, actIndex) => (
                          <div key={actIndex} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                            <span className="text-gray-700 dark:text-gray-200 font-medium">{activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Meeting Places and Contact */}
                  <div className="space-y-6">
                    {/* Meeting Places */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Locais de Encontro</h3>
                      <div className="space-y-4">
                        {community.meetingPlaces.map((place, placeIndex) => (
                          <div key={placeIndex} className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-600 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                            <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{place.name}</h4>
                            <p className="text-gray-600 dark:text-gray-300 mb-2">
                              <span className="font-medium">Endereço:</span> {place.address}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                              <span className="font-medium">Horário:</span> {place.schedule}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Informações de Contato</h3>
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl">
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <span className="text-blue-600 dark:text-blue-400 text-xl mr-3">📞</span>
                            <span className="text-gray-700 dark:text-gray-200 font-medium">{community.contact.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-blue-600 dark:text-blue-400 text-xl mr-3">✉️</span>
                            <span className="text-gray-700 dark:text-gray-200 font-medium">{community.contact.email}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-blue-600 dark:text-blue-400 text-xl mr-3">🌐</span>
                            <span className="text-gray-700 dark:text-gray-200 font-medium">{community.contact.website}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
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

export default CommunitiesPage; 