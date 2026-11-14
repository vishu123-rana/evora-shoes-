import React, { useState } from 'react';
import { X, Ruler, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const SizeChartModal: React.FC = () => {
  const { isSizeChartOpen, setIsSizeChartOpen } = useStore();
  const [selectedGender, setSelectedGender] = useState<'men' | 'women' | 'kids'>('men');

  if (!isSizeChartOpen) return null;

  const menSizes = [
    { uk: '6', us: '7', eu: '40', cm: '25.0' },
    { uk: '7', us: '8', eu: '41', cm: '25.7' },
    { uk: '8', us: '9', eu: '42', cm: '26.5' },
    { uk: '9', us: '10', eu: '43', cm: '27.3' },
    { uk: '10', us: '11', eu: '44', cm: '28.1' },
    { uk: '11', us: '12', eu: '45', cm: '28.9' },
    { uk: '12', us: '13', eu: '46', cm: '29.7' }
  ];

  const womenSizes = [
    { uk: '4', us: '6', eu: '37', cm: '23.0' },
    { uk: '5', us: '7', eu: '38', cm: '23.8' },
    { uk: '6', us: '8', eu: '39', cm: '24.6' },
    { uk: '7', us: '9', eu: '40', cm: '25.4' },
    { uk: '8', us: '10', eu: '41', cm: '26.2' },
    { uk: '9', us: '11', eu: '42', cm: '27.0' }
  ];

  const kidsSizes = [
    { uk: '11 (Kids)', us: '11.5', eu: '29', cm: '17.5' },
    { uk: '12 (Kids)', us: '12.5', eu: '31', cm: '18.5' },
    { uk: '13 (Kids)', us: '13.5', eu: '32', cm: '19.5' },
    { uk: '1 (Youth)', us: '1.5', eu: '33', cm: '20.5' },
    { uk: '2 (Youth)', us: '2.5', eu: '34', cm: '21.5' },
    { uk: '3 (Youth)', us: '3.5', eu: '35', cm: '22.5' }
  ];

  const currentChart = 
    selectedGender === 'men' 
      ? menSizes 
      : selectedGender === 'women' 
      ? womenSizes 
      : kidsSizes;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSizeChartOpen(false)}
      />

      <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#D7E8DC] z-10 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#D7E8DC]">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#183C2B]" />
            <h2 className="font-display text-lg font-bold text-[#183C2B]">
              EVORA Footwear Sizing Guide
            </h2>
          </div>
          <button
            onClick={() => setIsSizeChartOpen(false)}
            className="p-1 text-[#587064] hover:text-[#183C2B] rounded-lg transition-colors cursor-pointer"
            aria-label="Close size chart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gender Toggle */}
        <div className="flex gap-2 p-1 bg-[#DFF3E4] rounded-xl max-w-xs mx-auto">
          {(['men', 'women', 'kids'] as const).map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGender(g)}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors capitalize cursor-pointer ${
                selectedGender === g
                  ? 'bg-white text-[#183C2B] shadow-xs'
                  : 'text-[#587064] hover:text-[#183C2B]'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Size Chart Table */}
        <div className="overflow-x-auto border border-[#D7E8DC] rounded-xl">
          <table className="w-full text-xs text-center">
            <thead className="bg-[#DFF3E4]/50 text-[#183C2B] font-bold uppercase tracking-wider border-b border-[#D7E8DC]">
              <tr>
                <th className="py-2.5 px-3">India / UK</th>
                <th className="py-2.5 px-3">US Size</th>
                <th className="py-2.5 px-3">EU Size</th>
                <th className="py-2.5 px-3">Foot Length (cm)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D7E8DC]/60">
              {currentChart.map((row) => (
                <tr key={row.uk} className="hover:bg-[#F5FAF6]">
                  <td className="py-2.5 px-3 font-bold text-[#183C2B]">{row.uk}</td>
                  <td className="py-2.5 px-3 text-[#587064]">{row.us}</td>
                  <td className="py-2.5 px-3 text-[#587064]">{row.eu}</td>
                  <td className="py-2.5 px-3 font-semibold text-[#183C2B] tabular-nums">{row.cm} cm</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* How to Measure Note */}
        <div className="p-4 bg-[#F5FAF6] rounded-xl border border-[#D7E8DC] text-xs text-[#587064] space-y-1">
          <span className="font-bold text-[#183C2B] block">How to find your accurate fit:</span>
          <p>
            1. Stand flat on a sheet of paper with your heel against the wall.
          </p>
          <p>
            2. Mark the longest tip of your toes and measure distance to wall in centimeters (cm).
          </p>
          <p>
            3. If you fall between sizes, we recommend sizing up by half a size for athletic running shoes.
          </p>
        </div>

        <button
          onClick={() => setIsSizeChartOpen(false)}
          className="w-full py-2.5 bg-[#183C2B] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#5FAF78] transition-colors cursor-pointer"
        >
          Got It, Thanks
        </button>

      </div>
    </div>
  );
};
