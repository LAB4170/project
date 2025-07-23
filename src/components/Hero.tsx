import React, { useState, useEffect } from 'react';
import { ArrowRight, Search, Calculator, Users, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Diverse car brands slideshow
  const carSlides = [
    {
      image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      brand: 'Toyota',
      model: 'Land Cruiser',
      description: 'Reliable & Powerful'
    },
    {
      image: 'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      brand: 'Mercedes-Benz',
      model: 'E-Class',
      description: 'Luxury & Elegance'
    },
    {
      image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      brand: 'BMW',
      model: 'X5',
      description: 'Performance & Style'
    },
    {
      image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      brand: 'Nissan',
      model: 'X-Trail',
      description: 'Adventure Ready'
    },
    {
      image: 'https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      brand: 'Honda',
      model: 'CR-V',
      description: 'Efficiency & Comfort'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollToInventory = () => {
    document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCalculator = () => {
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openAdminPanel = () => {
    window.open('/admin', '_blank');
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carSlides.length) % carSlides.length);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {carSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
              style={{ backgroundImage: `url('${slide.image}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/50"></div>
          </div>
        ))}
        
        {/* Slide Navigation */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
          {carSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide ? 'bg-amber-500' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Brand Showcase */}
          <div className="mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
              <h3 className="text-2xl font-bold text-amber-400 mb-2">
                {carSlides[currentSlide].brand} {carSlides[currentSlide].model}
              </h3>
              <p className="text-lg text-gray-200">
                {carSlides[currentSlide].description}
              </p>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Import Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Dream Car
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed max-w-3xl mx-auto">
            From Japan, UK & UAE with complete transparency and expert guidance.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-2 flex items-center">
              <input
                type="text"
                placeholder="Search Toyota Prado, BMW X5, or any model..."
                className="flex-1 bg-transparent text-white placeholder-gray-300 px-4 py-3 focus:outline-none"
              />
              <button className="bg-amber-500 hover:bg-amber-600 text-white p-3 rounded-full transition-all duration-200 hover:scale-105">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-6 justify-center mb-16">
            <button 
              onClick={scrollToInventory}
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-xl flex items-center justify-center space-x-2"
            >
              <span>Browse Inventory</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={scrollToCalculator}
              className="border-2 border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 backdrop-blur-sm flex items-center justify-center space-x-2"
            >
              <Calculator className="w-5 h-5" />
              <span>Calculate Costs</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-400 mb-2">500+</div>
              <div className="text-gray-300">Cars Imported</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-400 mb-2">15+</div>
              <div className="text-gray-300">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-400 mb-2">98%</div>
              <div className="text-gray-300">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;