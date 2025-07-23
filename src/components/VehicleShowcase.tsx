import React, { useState, useEffect } from 'react';
import { Loader2, Truck, MapPin, Calendar, Fuel, Settings, Star, TrendingUp } from 'lucide-react';
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

interface LiveArrival {
  id: string;
  vessel: string;
  eta: string;
  origin: string;
  vehicleCount: number;
  status: 'in_transit' | 'arrived' | 'clearing';
}

const VehicleShowcase: React.FC = () => {
  const { vehicles, loading, fetchVehicles } = useVehicles();
  const [inquiryModal, setInquiryModal] = useState<{
    isOpen: boolean;
    vehicleId?: string;
    vehicleInfo?: { make: string; model: string; year: number; price: number };
  }>({ isOpen: false });
  
  const [liveArrivals, setLiveArrivals] = useState<LiveArrival[]>([]);
  const [marketTrends, setMarketTrends] = useState<any[]>([]);

  // Simulate fetching live arrivals data
  useEffect(() => {
    const fetchLiveArrivals = () => {
      // In real implementation, this would fetch from Kenya Ports Authority API
      const mockArrivals: LiveArrival[] = [
        {
          id: '1',
          vessel: 'MV ASIAN MAJESTY',
          eta: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          origin: 'Japan',
          vehicleCount: 45,
          status: 'in_transit'
        },
        {
          id: '2',
          vessel: 'MV EUROPEAN STAR',
          eta: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          origin: 'UK',
          vehicleCount: 32,
          status: 'in_transit'
        },
        {
          id: '3',
          vessel: 'MV GULF TRADER',
          eta: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          origin: 'UAE',
          vehicleCount: 28,
          status: 'clearing'
        }
      ];
      setLiveArrivals(mockArrivals);
    };

    const fetchMarketTrends = () => {
      // Mock market trends data
      const trends = [
        { make: 'Toyota', trend: 'up', change: '+12%', reason: 'High demand for Land Cruiser' },
        { make: 'Mercedes-Benz', trend: 'up', change: '+8%', reason: 'New model releases' },
        { make: 'BMW', trend: 'stable', change: '+2%', reason: 'Steady market' },
        { make: 'Nissan', trend: 'up', change: '+15%', reason: 'X-Trail popularity' }
      ];
      setMarketTrends(trends);
    };

    fetchLiveArrivals();
    fetchMarketTrends();

    // Update every 30 seconds
    const interval = setInterval(() => {
      fetchLiveArrivals();
      fetchMarketTrends();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_transit': return 'bg-blue-100 text-blue-800';
      case 'arrived': return 'bg-green-100 text-green-800';
      case 'clearing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? (
      <TrendingUp className="w-4 h-4 text-green-500" />
    ) : trend === 'down' ? (
      <TrendingUp className="w-4 h-4 text-red-500 transform rotate-180" />
    ) : (
      <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
    );
  };

  return (
    <section id="inventory" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Live Vehicle
            <span className="text-amber-500"> Inventory</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-time inventory with live arrivals from Japan, UK, and UAE ports.
            All vehicles verified and ready for import.
          </p>
        </div>

        {/* Live Data Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Live Arrivals */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Live Ship Arrivals</h3>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Live from KPA</span>
              </div>
            </div>
            
            <div className="space-y-4">
              {liveArrivals.map((arrival) => (
                <div key={arrival.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Truck className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{arrival.vessel}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{arrival.origin}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(arrival.eta)}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-slate-900">{arrival.vehicleCount} vehicles</div>
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(arrival.status)}`}>
                      {arrival.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Trends */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-green-500 p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Market Trends</h3>
            </div>
            
            <div className="space-y-4">
              {marketTrends.map((trend, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getTrendIcon(trend.trend)}
                    <div>
                      <div className="font-semibold text-slate-900">{trend.make}</div>
                      <div className="text-xs text-gray-600">{trend.reason}</div>
                    </div>
                  </div>
                  <div className={`font-semibold ${
                    trend.trend === 'up' ? 'text-green-600' : 
                    trend.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {trend.change}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} loading={loading} />

        {/* Results */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-slate-900">
              {loading ? 'Searching...' : `${vehicles.length} vehicle${vehicles.length !== 1 ? 's' : ''} available`}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Real-time inventory</span>
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
                <p className="text-gray-600">Loading latest inventory...</p>
              </div>
            </div>
          ) : vehicles.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-gray-100 rounded-full p-8 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl">🚗</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No vehicles found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search filters or check our live arrivals above for upcoming inventory.</p>
              <button
                onClick={() => handleSearch({})}
                className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                View All Vehicles
              </button>
            </div>
          ) : (
            <>
              {/* Featured/Premium Vehicles */}
              {vehicles.slice(0, 3).length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center space-x-3 mb-6">
                    <Star className="w-6 h-6 text-amber-500" />
                    <h3 className="text-2xl font-bold text-slate-900">Featured Vehicles</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {vehicles.slice(0, 3).map((vehicle) => (
                      <div key={vehicle.id} className="relative">
                        <div className="absolute -top-2 -right-2 z-10">
                          <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            Featured
                          </span>
                        </div>
                        <VehicleCard
                          vehicle={vehicle}
                          onInquire={handleInquire}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* All Vehicles */}
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">All Available Vehicles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {vehicles.map((vehicle) => (
                    <VehicleCard
                      key={vehicle.id}
                      vehicle={vehicle}
                      onInquire={handleInquire}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Real-time Updates Notice */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <h4 className="text-lg font-semibold text-slate-900">Live Inventory System</h4>
          </div>
          <p className="text-gray-700 mb-4">
            Our inventory updates in real-time with arrivals from Japan, UK, and UAE. 
            Prices and availability reflect current market conditions and shipping costs.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4" />
              <span>Live ship tracking</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Port clearance status</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Market price updates</span>
            </div>
          </div>
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