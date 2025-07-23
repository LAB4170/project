import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useVehicles } from '../hooks/useVehicles';
import SearchBar from './SearchBar';
import VehicleCard from './VehicleCard';
import InquiryModal from './InquiryModal';

interface SearchFilters {
  make?: string;
  bodyType?: string;
  priceRange?: string;
  location?: string;
  fuelType?: string;
  transmission?: string;
  kenyaReady?: boolean;
  rhd?: boolean;
  searchQuery?: string;
}

const VehicleShowcase: React.FC = () => {
  const { vehicles, loading, fetchVehicles } = useVehicles();
  const [inquiryModal, setInquiryModal] = useState<{
    isOpen: boolean;
    vehicleId?: string;
    vehicleInfo?: { make: string; model: string; year: number; price: number };
  }>({ isOpen: false });

  const handleSearch = (filters: SearchFilters) => {
    fetchVehicles(filters);
  };

  const handleInquire = (vehicleId: string) => {
    const vehicle = vehicles.find(v => v.id === vehicleId);
    setInquiryModal({
      isOpen: true,
      vehicleId,
      vehicleInfo: vehicle ? {
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year,
        price: vehicle.price,
      } : undefined,
    });
  };

  return (
    <section id="inventory" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Premium Vehicle
            <span className="text-amber-500"> Inventory</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Carefully selected vehicles from Japan, UK, and UAE. All cars are thoroughly 
            inspected and come with comprehensive documentation.
          </p>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} loading={loading} />

        {/* Results */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-slate-900">
              {loading ? 'Searching...' : `${vehicles.length} vehicle${vehicles.length !== 1 ? 's' : ''} found`}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Updated in real-time</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live</span>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <Loader2 className="w-12 h-12 text-amber-500 animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Searching for vehicles...</p>
              </div>
            </div>
          ) : vehicles.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-gray-100 rounded-full p-8 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl">🚗</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No vehicles found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search filters or check back later for new arrivals.</p>
              <button
                onClick={() => handleSearch({})}
                className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                View All Vehicles
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {vehicles.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onInquire={handleInquire}
                />
              ))}
            </div>
          )}
        </div>

        {/* Real-time Updates Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <p className="text-blue-800">
            🔄 This inventory updates in real-time. New arrivals and price changes appear automatically.
          </p>
        </div>
      </div>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryModal.isOpen}
        onClose={() => setInquiryModal({ isOpen: false })}
        vehicleId={inquiryModal.vehicleId}
        vehicleInfo={inquiryModal.vehicleInfo}
      />
    </section>
  );
};

export default VehicleShowcase;