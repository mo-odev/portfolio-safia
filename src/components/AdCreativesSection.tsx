import { useState } from "react";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

export interface AdCreative {
  id: string;
  title: string;
  image: string;
}

const adCreatives: AdCreative[] = [
  { id: "1", title: "Création Publicitaire 1", image: "/assets/pub/photo_1_2026-03-04_03-41-50.jpg" },
  { id: "2", title: "Création Publicitaire 2", image: "/assets/pub/photo_2_2026-03-04_03-41-50.jpg" },
  { id: "3", title: "Création Publicitaire 3", image: "/assets/pub/photo_3_2026-03-04_03-41-50.jpg" },
  { id: "4", title: "Création Publicitaire 4", image: "/assets/pub/photo_4_2026-03-04_03-41-50.jpg" },
  { id: "5", title: "Création Publicitaire 5", image: "/assets/pub/photo_5_2026-03-04_03-41-50.jpg" },
  { id: "6", title: "Création Publicitaire 6", image: "/assets/pub/photo_6_2026-03-04_03-41-50.jpg" },
  { id: "7", title: "Création Publicitaire 7", image: "/assets/pub/photo_7_2026-03-04_03-41-50.jpg" },
  { id: "8", title: "Création Publicitaire 8", image: "/assets/pub/photo_8_2026-03-04_03-41-50.jpg" },
  { id: "9", title: "Création Publicitaire 9", image: "/assets/pub/photo_9_2026-03-04_03-41-50.jpg" },
];

interface LightboxProps {
  image: AdCreative | null;
  onClose: () => void;
}

const Lightbox = ({ image, onClose }: LightboxProps) => {
  if (!image) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div className="relative w-full max-w-2xl flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-primary transition-colors duration-200 z-51"
        >
          <X size={32} />
        </button>
        <img
          src={image.image}
          alt={image.title}
          decoding="async"
          className="w-full h-auto object-contain rounded-lg shadow-2xl animate-in zoom-in duration-300 max-h-[80vh]"
        />
        <p className="text-white text-center mt-4 font-medium">{image.title}</p>
      </div>
    </div>
  );
};

const ModernCarousel = ({ onImageClick }: { onImageClick: (image: AdCreative) => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % adCreatives.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + adCreatives.length) % adCreatives.length);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setTouchEnd(e.changedTouches[0].clientX);
    handleSwipe();
  };

  const handleSwipe = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 30;
    const isRightSwipe = distance < -30;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const getPrevIndex = () => (currentIndex - 1 + adCreatives.length) % adCreatives.length;
  const getNextIndex = () => (currentIndex + 1) % adCreatives.length;

  const prevImage = adCreatives[getPrevIndex()];
  const currentImage = adCreatives[currentIndex];
  const nextImage = adCreatives[getNextIndex()];

  return (
    <>
      {/* Desktop Slider */}
      <div className="hidden lg:block w-full">
        <div className="relative w-full overflow-hidden">
          {/* Carousel Container */}
          <div className="relative flex items-center justify-center py-16 px-4">
            {/* Background Glow */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 blur-3xl rounded-full" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-2xl" />
            </div>

            {/* Carousel Track */}
            <div className="relative w-full max-w-6xl flex items-center justify-center px-8">
              {/* Previous Image - Left */}
              <div className="absolute left-8 top-1/2 -translate-y-1/2 z-10">
                <div
                  className="relative overflow-hidden rounded-2xl shadow-xl backdrop-blur-md cursor-pointer transform transition-all duration-300 hover:scale-110"
                  style={{
                    width: "160px",
                    height: "220px",
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                  onClick={handlePrev}
                >
                  <img
                    src={prevImage.image}
                    alt={prevImage.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover blur-sm opacity-60 hover:blur-none hover:opacity-100 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Current Image - Center */}
              <div
                className="relative overflow-hidden rounded-3xl shadow-2xl cursor-pointer z-20 transform transition-all duration-500 group flex-shrink-0"
                style={{
                  width: "380px",
                  height: "500px",
                  background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
                  border: "2px solid rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37), 0 0 60px rgba(59, 130, 246, 0.15)",
                }}
                onClick={() => onImageClick(currentImage)}
              >
                {/* Light Flares */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />

                <img
                  src={currentImage.image}
                  alt={currentImage.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-xl">
                    <ZoomIn className="w-8 h-8 text-primary" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <h3 className="text-white font-bold text-lg">{currentImage.title}</h3>
                </div>
              </div>

              {/* Next Image - Right */}
              <div className="absolute right-8 top-1/2 -translate-y-1/2 z-10">
                <div
                  className="relative overflow-hidden rounded-2xl shadow-xl backdrop-blur-md cursor-pointer transform transition-all duration-300 hover:scale-110"
                  style={{
                    width: "160px",
                    height: "220px",
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                  onClick={handleNext}
                >
                  <img
                    src={nextImage.image}
                    alt={nextImage.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover blur-sm opacity-60 hover:blur-none hover:opacity-100 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-gradient-to-r from-primary/30 to-primary/10 hover:from-primary/50 hover:to-primary/20 text-white transition-all duration-300 transform hover:scale-110 active:scale-95 backdrop-blur-sm border border-white/20 z-30"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-gradient-to-r from-primary/30 to-primary/10 hover:from-primary/50 hover:to-primary/20 text-white transition-all duration-300 transform hover:scale-110 active:scale-95 backdrop-blur-sm border border-white/20 z-30"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Indicators */}
          <div className="flex items-center justify-center gap-2 flex-wrap mt-8">
            {adCreatives.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 backdrop-blur-sm ${
                  idx === currentIndex
                    ? "bg-gradient-to-r from-primary to-accent w-8 shadow-lg shadow-primary/50"
                    : "bg-white/30 w-2.5 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="text-center mt-6">
            <p className="text-sm font-medium text-muted-foreground">
              {currentIndex + 1} <span className="text-primary">/</span> {adCreatives.length}
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Modern Carousel with Touch Support */}
      <div className="lg:hidden w-full px-4" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {/* Main Carousel Container */}
        <div className="relative w-full mb-12">
          {/* Background Glow Effect */}
          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 blur-3xl rounded-full" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-radial from-primary/10 to-transparent rounded-full blur-2xl" />
          </div>

          {/* Carousel Track */}
          <div className="relative h-96 flex items-center justify-center">
            {/* Previous Image - Blurred Left */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 transform -translate-x-12 z-10">
              <div
                className="relative overflow-hidden rounded-2xl shadow-xl backdrop-blur-md"
                style={{
                  width: "140px",
                  height: "180px",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <img
                  src={prevImage.image}
                  alt={prevImage.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover blur-sm opacity-60 hover:blur-none hover:opacity-100 transition-all duration-300 cursor-pointer"
                  onClick={handlePrev}
                />
              </div>
            </div>

            {/* Current Image - Large Center */}
            <div
              className="relative overflow-hidden rounded-3xl shadow-2xl cursor-pointer z-20 transform transition-all duration-500 group flex-shrink-0"
              style={{
                width: "320px",
                height: "420px",
                background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37), 0 0 60px rgba(59, 130, 246, 0.15)",
              }}
              onClick={() => onImageClick(currentImage)}
            >
              {/* Light Flare Effect */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />

              {/* Image */}
              <img
                src={currentImage.image}
                alt={currentImage.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Zoom Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-xl">
                  <ZoomIn className="w-8 h-8 text-primary" />
                </div>
              </div>

              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <h3 className="text-white font-bold text-lg">{currentImage.title}</h3>
              </div>
            </div>

            {/* Next Image - Blurred Right */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 transform translate-x-12 z-10">
              <div
                className="relative overflow-hidden rounded-2xl shadow-xl backdrop-blur-md"
                style={{
                  width: "140px",
                  height: "180px",
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <img
                  src={nextImage.image}
                  alt={nextImage.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover blur-sm opacity-60 hover:blur-none hover:opacity-100 transition-all duration-300 cursor-pointer"
                  onClick={handleNext}
                />
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-gradient-to-r from-primary/30 to-primary/10 hover:from-primary/50 hover:to-primary/20 text-white transition-all duration-300 transform hover:scale-110 active:scale-95 backdrop-blur-sm border border-white/20 pointer-events-auto"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-gradient-to-r from-primary/30 to-primary/10 hover:from-primary/50 hover:to-primary/20 text-white transition-all duration-300 transform hover:scale-110 active:scale-95 backdrop-blur-sm border border-white/20 pointer-events-auto"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Progress Indicator - Bottom Center */}
        <div className="flex gap-2 flex-wrap justify-center">
          {adCreatives.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 backdrop-blur-sm ${
                idx === currentIndex
                  ? "bg-gradient-to-r from-primary to-accent w-8 shadow-lg shadow-primary/50"
                  : "bg-white/30 w-2.5 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Counter */}
        <div className="text-center mt-6">
          <p className="text-sm font-medium text-muted-foreground">
            {currentIndex + 1} <span className="text-primary">/</span> {adCreatives.length}
          </p>
        </div>
      </div>
    </>
  );
};

const AdCreativesSection = () => {
  const [selectedImage, setSelectedImage] = useState<AdCreative | null>(null);

  return (
    <section className="py-24 px-4 bg-beige relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "4s" }} />
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "5s", animationDelay: "1s" }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-foreground">
          Créations <span className="gradient-text">Publicitaires</span>
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Découvrez une sélection de mes créations publicitaires modernes et percutantes, conçues pour capturer l'attention et générer des résultats.
        </p>

        <ModernCarousel onImageClick={setSelectedImage} />

        <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
      </div>
    </section>
  );
};

export default AdCreativesSection;
