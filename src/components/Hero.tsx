import React from 'react';
import { ArrowRight, Search, Calculator, Users, Settings } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToInventory = () => {
    document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCalculator = () => {
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openAdminPanel = () => {
    window.open('/admin', '_blank');
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Premium Car
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Importation
            </span>
            Made Simple
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
            Import your dream car from Japan, UK, or UAE with complete transparency, 
            competitive pricing, and expert guidance throughout the process.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-2 flex items-center">
              <input
                type="text"
                placeholder="Search by make, model, or budget (e.g., Toyota Prado, Under 2M)"
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
              <span>Import Calculator</span>
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

      {/* Floating Action Cards */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:flex space-x-4">
        <div 
          onClick={scrollToInventory}
          className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white text-center hover:bg-white/20 transition-all duration-200 cursor-pointer"
        >
          <Search className="w-8 h-8 mx-auto mb-2 text-amber-400" />
          <div className="text-sm font-semibold">Find Your Car</div>
        </div>
        <div 
          onClick={scrollToCalculator}
          className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white text-center hover:bg-white/20 transition-all duration-200 cursor-pointer"
        >
          <Calculator className="w-8 h-8 mx-auto mb-2 text-amber-400" />
          <div className="text-sm font-semibold">Calculate Costs</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white text-center hover:bg-white/20 transition-all duration-200 cursor-pointer">
          <Users className="w-8 h-8 mx-auto mb-2 text-amber-400" />
          <div className="text-sm font-semibold">Expert Consultation</div>
        </div>
        <div 
          onClick={openAdminPanel}
          className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white text-center hover:bg-white/20 transition-all duration-200 cursor-pointer"
        >
          <Settings className="w-8 h-8 mx-auto mb-2 text-amber-400" />
          <div className="text-sm font-semibold">Admin Panel</div>
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