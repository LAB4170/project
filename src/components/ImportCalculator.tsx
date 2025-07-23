import React, { useState } from 'react';
import { Calculator, DollarSign, Truck, FileText, Shield, ArrowRight } from 'lucide-react';

const ImportCalculator: React.FC = () => {
  const [carValue, setCarValue] = useState('');
  const [engineSize, setEngineSize] = useState('');
  const [age, setAge] = useState('');
  const [origin, setOrigin] = useState('japan');
  const [showResults, setShowResults] = useState(false);

  const calculateCosts = () => {
    const value = parseFloat(carValue);
    if (!value || !engineSize || !age) return null;

    const exciseDuty = value * 0.25; // 25% excise duty
    const vat = (value + exciseDuty) * 0.16; // 16% VAT
    const importDuty = value * 0.25; // 25% import duty
    const shippingCost = origin === 'japan' ? 150000 : origin === 'uk' ? 200000 : 180000;
    const clearingFees = 85000;
    const inspectionFees = 15000;
    const documentationFees = 25000;
    const ourServiceFee = value * 0.03; // 3% service fee

    const totalCost = value + exciseDuty + vat + importDuty + shippingCost + 
                     clearingFees + inspectionFees + documentationFees + ourServiceFee;

    return {
      carValue: value,
      exciseDuty,
      vat,
      importDuty,
      shippingCost,
      clearingFees,
      inspectionFees,
      documentationFees,
      ourServiceFee,
      totalCost,
    };
  };

  const results = showResults ? calculateCosts() : null;

  const handleCalculate = () => {
    setShowResults(true);
  };

  const formatCurrency = (amount: number) => {
    return `KSh ${amount.toLocaleString()}`;
  };

  return (
    <section id="calculator" className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Import Cost
            <span className="text-amber-500"> Calculator</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get an accurate estimate of all costs involved in importing your dream car. 
            Our calculator includes all duties, taxes, and fees for complete transparency.
          </p>
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
                  Car Value (KSh)
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
                  Engine Size (CC)
                </label>
                <select
                  value={engineSize}
                  onChange={(e) => setEngineSize(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">Select engine size</option>
                  <option value="1000">Below 1000cc</option>
                  <option value="1500">1001-1500cc</option>
                  <option value="2000">1501-2000cc</option>
                  <option value="2500">2001-2500cc</option>
                  <option value="3000">2501-3000cc</option>
                  <option value="3500">Above 3000cc</option>
                </select>
              </div>

              {/* Car Age */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  Car Age (Years)
                </label>
                <select
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">Select age</option>
                  <option value="1">Less than 1 year</option>
                  <option value="3">1-3 years</option>
                  <option value="5">3-5 years</option>
                  <option value="8">5-8 years</option>
                </select>
              </div>

              {/* Origin Country */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-3">
                  Origin Country
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: 'japan', label: 'Japan', flag: '🇯🇵' },
                    { value: 'uk', label: 'UK', flag: '🇬🇧' },
                    { value: 'uae', label: 'UAE', flag: '🇦🇪' },
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
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculate Button */}
              <button
                onClick={handleCalculate}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white py-4 rounded-lg font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
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
              <h3 className="text-2xl font-bold">Cost Breakdown</h3>
            </div>

            {!showResults ? (
              <div className="text-center py-12">
                <div className="bg-white/10 rounded-full p-8 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <FileText className="w-12 h-12 text-gray-400" />
                </div>
                <p className="text-gray-400 text-lg">
                  Fill in the vehicle details and click calculate to see the cost breakdown
                </p>
              </div>
            ) : results ? (
              <div className="space-y-4">
                {[
                  { label: 'Car Value', amount: results.carValue, icon: <DollarSign className="w-4 h-4" /> },
                  { label: 'Import Duty (25%)', amount: results.importDuty, icon: <FileText className="w-4 h-4" /> },
                  { label: 'Excise Duty (25%)', amount: results.exciseDuty, icon: <FileText className="w-4 h-4" /> },
                  { label: 'VAT (16%)', amount: results.vat, icon: <FileText className="w-4 h-4" /> },
                  { label: 'Shipping Cost', amount: results.shippingCost, icon: <Truck className="w-4 h-4" /> },
                  { label: 'Clearing Fees', amount: results.clearingFees, icon: <Shield className="w-4 h-4" /> },
                  { label: 'Inspection Fees', amount: results.inspectionFees, icon: <Shield className="w-4 h-4" /> },
                  { label: 'Documentation', amount: results.documentationFees, icon: <FileText className="w-4 h-4" /> },
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
                      <span className="text-xl font-bold">Total Cost</span>
                    </div>
                    <span className="text-2xl font-bold text-amber-400">
                      {formatCurrency(results.totalCost)}
                    </span>
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
            <h4 className="text-xl font-bold mb-2">Transparent Pricing</h4>
            <p className="text-gray-400">No hidden fees. All costs calculated upfront.</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center">
            <FileText className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <h4 className="text-xl font-bold mb-2">Legal Compliance</h4>
            <p className="text-gray-400">All calculations based on current KRA regulations.</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center">
            <Truck className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <h4 className="text-xl font-bold mb-2">Full Service</h4>
            <p className="text-gray-400">We handle everything from purchase to delivery.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImportCalculator;