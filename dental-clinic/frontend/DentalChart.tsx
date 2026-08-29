import React, { useState } from 'react';

const TOOTH_CONDITIONS = {
  HEALTHY: 'bg-green-100 border-green-500',
  CAVITY: 'bg-red-100 border-red-500',
  FILLED: 'bg-blue-100 border-blue-500',
  MISSING: 'bg-gray-200 border-gray-400',
};

export const DentalChart = ({ isAdmin = false, data = [] }) => {
  const [selectedTooth, setSelectedTooth] = useState(null);

  const renderTeeth = (range: number[]) => (
    <div className="flex gap-2 justify-center">
      {range.map((num) => {
        const status = data.find(t => t.toothNumber === num)?.condition || 'HEALTHY';
        return (
          <button
            key={num}
            disabled={!isAdmin}
            onClick={() => setSelectedTooth(num)}
            className={`w-10 h-14 border-2 rounded-t-lg flex flex-col items-center justify-center transition-all ${TOOTH_CONDITIONS[status] || TOOTH_CONDITIONS.HEALTHY} hover:scale-110`}
          >
            <span className="text-[10px] font-bold">{num}</span>
            <div className="w-4 h-4 mt-1 rounded-full bg-white/50" />
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-lg font-semibold mb-6">Interactive Dental Map</h3>
      <div className="space-y-8">
        {renderTeeth([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16])}
        <div className="h-px bg-slate-100 w-full" />
        {renderTeeth([32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17])}
      </div>
    </div>
  );
};