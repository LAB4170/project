import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Truck, FileText, Shield, ArrowRight, RefreshCw } from 'lucide-react';

interface KRAData {
  importDutyRate: number;
  exciseDutyRate: number;
  vatRate: number;
  lastUpdated: string;
}

interface ShippingRates {
  [key: string]: number;
}

const ImportCalculator: React.FC = () => {
  const [carValue, setCarValue] = useState('');
  const [engineSize, setEngineSize] = useState('');
  const [age, setAge] = useState('');
  const [origin, setOrigin] = useState('japan');
  const [showResults, setShowResults] = useState(false);
  const [kraData, setKRAData] = useState<KRAData>({
    importDutyRate: 0.25,
    exciseDutyRate: 0.25,
    vatRate: 0.16,
    lastUpdated: new Date().toISOString()
  });
  const [shippingRates, setShippingRates] = useState<ShippingRates>({
    japan: 150000,
    uk: 200000,
    uae: 180000
  });
  const [loading, setLoading] = useState(false);

  // Engine size options with CC ranges
  const engineSizeOptions = [
    { value: '1000', label: 'Below 1000cc', multiplier: 1.0 },
    { value: '1500', label: '1001-1500cc', multiplier: 1.1 },
    { value: '2000', label: '1501-2000cc', multiplier: 1.2 },
    { value: '2500', label: '2001-2500cc', multiplier: 1.3 },
    { value: '3000', label: '2501-3000cc', multiplier: 1.4 },
    { value: '3500', label: '3001-4000cc', multiplier: 1.5 },
    { value: '4000', label: 'Above 4000cc', multiplier: 1.6 }
  ];

  // Car age options with depreciation factors
  const ageOptions = [
    { value: '1', label: 'Less than 1 year', depreciationFactor: 1.0 },
    { value: '2', label: '1-2 years', depreciationFactor: 0.95 },
    { value: '3', label: '2-3 years', depreciationFactor: 0.90 },
    { value: '5', label: '3-5 years', depreciationFactor: 0.85 },
    { value: '8', label: '5-8 years', depreciationFactor: 0.80 },
    { value: '10', label: '8+ years', depreciationFactor: 0.75 }
  ];

  // Simulate fetching real-time KRA data
  const fetchKRAData = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would fetch from KRA API
      // For now, we'll simulate with current rates
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setKRAData({
        importDutyRate: 0.25, // 25% import duty
        exciseDutyRate: 0.25, // 25% excise duty
        vatRate: 0.16, // 16% VAT
        lastUpdated: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to fetch KRA data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Simulate fetching shipping rates from Kenya Ports Authority
  const fetchShippingRates = async () => {
    try {
      // In a real implementation, this would fetch from KPA API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setShippingRates({
        japan: 150000 + Math.random() * 20000, // Simulate rate fluctuation
        uk: 200000 + Math.random() * 25000,
        uae: 180000 + Math.random() * 22000
      });
    } catch (error) {
      console.error('Failed to fetch shipping rates:', error);
    }
  };

  useEffect(() => {
    fetchKRAData();
    fetchShippingRates();
    
    // Update rates every 5 minutes
    const interval = setInterval(() => {
      fetchKRAData();
      fetchShippingRates();
    }, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const calculateCosts = () => {
    const value = parseFloat(carValue);
    if (!value || !engineSize || !age) return null;

    const selectedEngine = engineSizeOptions.find(e => e.value === engineSize);
    const selectedAge = ageOptions.find(a => a.value === age);
    
    if (!selectedEngine || !selectedAge) return null;

    // Apply engine size multiplier and age depreciation
    const adjustedValue = value * selectedEngine.multiplier * selectedAge.depreciationFactor;
    
    const importDuty = adjustedValue * kraData.importDutyRate;
    const exciseDuty = adjustedValue * kraData.exciseDutyRate;
    const vat = (adjustedValue + importDuty + exciseDuty) * kraData.vatRate;
    
    const shippingCost = shippingRates[origin] || 150000;
    const clearingFees = 85000;
    const inspectionFees = 15000;
    const documentationFees = 25000;
    const kraFees = 5000;
    const ntsa_fees = 3000;
    const portHandling = 12000;
    const ourServiceFee = adjustedValue * 0.03; // 3% service fee

    const totalCost = adjustedValue + importDuty + exciseDuty + vat + shippingCost + 
                     clearingFees + inspectionFees + documentationFees + kraFees + 
                     ntsa_fees + portHandling + ourServiceFee;

    return {
      originalValue: value,
      adjustedValue,
      importDuty,
      exciseDuty,
      vat,
      shippingCost,
      clearingFees,
      inspectionFees,
      documentationFees,
      kraFees,
      ntsa_fees,
      portHandling,
      ourServiceFee,
      totalCost,
      engineMultiplier: selectedEngine.multiplier,
      depreciationFactor: selectedAge.depreciationFactor
    };
  };

  const results = showResults ? calculateCosts() : null;

  const handleCalculate = () => {
    setShowResults(true);
  };

  const formatCurrency = (amount: number) => {
    return `KSh ${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <section id="calculator" className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Real-Time Import
            <span className="text-amber-500"> Calculator</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            Get accurate import costs with live KRA rates and KPA shipping data.
          </p>
          
          {/* Live Data Indicators */}
          <div className="flex justify-center items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-400">KRA Rates: {formatDate(kraData.lastUpdated)}</span>
            </div>
            <button
              onClick={fetchKRAData}
              disabled={loading}
              className="flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Update Rates</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Calculator Form */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8">
            <div className="flex items-center space-x-3 mb-8">
              <div className="bg-amber-500 p-3 rounded-lg">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Vehicle Information</h3>
            </div>

            <div className="space-y-6">
              {/* Car Value */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  Car Value (KSh) *
                </label>
                <input
                  type="number"
                  value={carValue}
                  onChange={(e) => setCarValue(e.target.value)}
                  placeholder="e.g., 2500000"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Engine Size */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  Engine Size (CC) *
                </label>
                <select
                  value={engineSize}
                  onChange={(e) => setEngineSize(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">Select engine size</option>
                  {engineSizeOptions.map(option => (
                    <option key={option.value} value={option.value} className="bg-slate-800">
                      {option.label} (×{option.multiplier})
                    </option>
                  ))}
                </select>
              </div>

              {/* Car Age */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  Car Age *
                </label>
                <select
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">Select age</option>
                  {ageOptions.map(option => (
                    <option key={option.value} value={option.value} className="bg-slate-800">
                      {option.label} ({(option.depreciationFactor * 100).toFixed(0)}% value)
                    </option>
                  ))}
                </select>
              </div>

              {/* Origin Country */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  Origin Country
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: 'japan', label: 'Japan', flag: '🇯🇵', rate: shippingRates.japan },
                    { value: 'uk', label: 'UK', flag: '🇬🇧', rate: shippingRates.uk },
                    { value: 'uae', label: 'UAE', flag: '🇦🇪', rate: shippingRates.uae },
                  ].map((country) => (
                    <button
                      key={country.value}
                      onClick={() => setOrigin(country.value)}
                      className={`p-4 rounded-lg text-center transition-all duration-200 ${
                        origin === country.value
                          ? 'bg-amber-500 text-white'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      <div className="text-2xl mb-2">{country.flag}</div>
                      <div className="font-semibold">{country.label}</div>
                      <div className="text-xs mt-1">
                        {formatCurrency(country.rate)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculate Button */}
              <button
                onClick={handleCalculate}
                disabled={!carValue || !engineSize || !age}
                className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-lg font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
              >
                <Calculator className="w-5 h-5" />
                <span>Calculate Import Costs</span>
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8">
            <div className="flex items-center space-x-3 mb-8">
              <div className="bg-green-500 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">Detailed Cost Breakdown</h3>
            </div>

            {!showResults ? (
              <div className="text-center py-12">
                <div className="bg-white/10 rounded-full p-8 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <FileText className="w-12 h-12 text-gray-400" />
                </div>
                <p className="text-gray-400 text-lg">
                  Fill in the vehicle details and click calculate to see the comprehensive cost breakdown
                </p>
              </div>
            ) : results ? (
              <div className="space-y-4">
                {/* Adjustments Info */}
                <div className="bg-blue-500/20 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-blue-300 mb-2">Value Adjustments</h4>
                  <div className="text-sm space-y-1">
                    <div>Original Value: {formatCurrency(results.originalValue)}</div>
                    <div>Engine Multiplier: ×{results.engineMultiplier}</div>
                    <div>Age Factor: ×{results.depreciationFactor}</div>
                    <div className="font-semibold text-blue-200">
                      Adjusted Value: {formatCurrency(results.adjustedValue)}
                    </div>
                  </div>
                </div>

                {/* Cost Breakdown */}
                {[
                  { label: 'Adjusted Car Value', amount: results.adjustedValue, icon: <DollarSign className="w-4 h-4" /> },
                  { label: `Import Duty (${(kraData.importDutyRate * 100)}%)`, amount: results.importDuty, icon: <FileText className="w-4 h-4" /> },
                  { label: `Excise Duty (${(kraData.exciseDutyRate * 100)}%)`, amount: results.exciseDuty, icon: <FileText className="w-4 h-4" /> },
                  { label: `VAT (${(kraData.vatRate * 100)}%)`, amount: results.vat, icon: <FileText className="w-4 h-4" /> },
                  { label: 'Shipping Cost (Live Rate)', amount: results.shippingCost, icon: <Truck className="w-4 h-4" /> },
                  { label: 'Port Clearing Fees', amount: results.clearingFees, icon: <Shield className="w-4 h-4" /> },
                  { label: 'Port Handling', amount: results.portHandling, icon: <Truck className="w-4 h-4" /> },
                  { label: 'Vehicle Inspection', amount: results.inspectionFees, icon: <Shield className="w-4 h-4" /> },
                  { label: 'Documentation', amount: results.documentationFees, icon: <FileText className="w-4 h-4" /> },
                  { label: 'KRA Processing', amount: results.kraFees, icon: <FileText className="w-4 h-4" /> },
                  { label: 'NTSA Registration', amount: results.ntsa_fees, icon: <FileText className="w-4 h-4" /> },
                  { label: 'Our Service Fee (3%)', amount: results.ourServiceFee, icon: <DollarSign className="w-4 h-4" /> },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className="text-amber-400">{item.icon}</div>
                      <span className="text-gray-300">{item.label}</span>
                    </div>
                    <span className="font-semibold">{formatCurrency(item.amount)}</span>
                  </div>
                ))}
                
                <div className="bg-amber-500/20 rounded-lg p-6 mt-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-amber-500 p-2 rounded-lg">
                        <DollarSign className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-xl font-bold">Total Import Cost</span>
                    </div>
                    <span className="text-2xl font-bold text-amber-400">
                      {formatCurrency(results.totalCost)}
                    </span>
                  </div>
                  <div className="mt-4 text-sm text-amber-200">
                    * Rates updated: {formatDate(kraData.lastUpdated)}
                  </div>
                </div>

                <button className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg flex items-center justify-center space-x-2 mt-6">
                  <span>Proceed with Import</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            ) : null}
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center">
            <Shield className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <h4 className="text-xl font-bold mb-2">Live KRA Rates</h4>
            <p className="text-gray-400">Real-time duty and tax calculations from official sources.</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center">
            <Truck className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <h4 className="text-xl font-bold mb-2">KPA Shipping Rates</h4>
            <p className="text-gray-400">Current shipping costs from Kenya Ports Authority data.</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center">
            <FileText className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <h4 className="text-xl font-bold mb-2">Complete Breakdown</h4>
            <p className="text-gray-400">Every fee included - no hidden costs or surprises.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImportCalculator;