import { useState, useEffect } from 'react';

interface ImageModalProps {
  images: string[];
  currentIndex: number;
  title?: string;
  onClose: () => void;
}

const ImageModal = ({ images, currentIndex: initialIndex, title, onClose }: ImageModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          setCurrentIndex(prev => prev > 0 ? prev - 1 : images.length - 1);
          break;
        case 'ArrowRight':
          setCurrentIndex(prev => prev < images.length - 1 ? prev + 1 : 0);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [images.length, onClose]);

  const goToPrevious = () => {
    setCurrentIndex(prev => prev > 0 ? prev - 1 : images.length - 1);
  };

  const goToNext = () => {
    setCurrentIndex(prev => prev < images.length - 1 ? prev + 1 : 0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-90"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative z-10 max-w-7xl max-h-full mx-4">
        {/* Header */}
        <div className="flex justify-between items-center text-white mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 text-2xl font-bold p-2 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Image Container */}
        <div className="relative">
          <img
            src={images[currentIndex]}
            alt={`${title} - Imagem ${currentIndex + 1}`}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
          />
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all duration-200"
              >
                ‹
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all duration-200"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="text-center text-white mt-4">
            <span className="bg-black bg-opacity-50 px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} de {images.length}
            </span>
          </div>
        )}

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex justify-center space-x-2 mt-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  index === currentIndex 
                    ? 'border-blue-500 scale-110' 
                    : 'border-transparent hover:border-gray-400'
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageModal; 