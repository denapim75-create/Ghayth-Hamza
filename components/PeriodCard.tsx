
import React from 'react';
import { PeriodInfo } from '../types';

interface Props {
  period: PeriodInfo;
  onExplore: (id: string) => void;
}

const PeriodCard: React.FC<Props> = ({ period, onExplore }) => {
  return (
    <div className={`p-6 rounded-2xl border-l-8 shadow-md transition hover:scale-[1.02] ${period.color}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-bold serif-font text-gray-800">{period.title}</h3>
          <p className="text-sm text-gray-500 italic">{period.era}</p>
        </div>
      </div>
      
      <p className="text-gray-700 mb-4 line-clamp-3">{period.description}</p>
      
      <div className="mb-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Anahtar Kavramlar</h4>
        <div className="flex flex-wrap gap-2">
          {period.keyConcepts.map(c => (
            <span key={c} className="bg-white/50 px-2 py-1 rounded text-xs text-gray-600 border border-black/5">
              {c}
            </span>
          ))}
        </div>
      </div>

      <button 
        onClick={() => onExplore(period.id)}
        className={`w-full py-2 px-4 rounded-lg font-semibold transition bg-${period.accent}-500 text-white hover:opacity-90 shadow-sm`}
        style={{ backgroundColor: `var(--tw-color-${period.accent}-500)` }}
      >
        Dönemi Keşfet
      </button>
    </div>
  );
};

export default PeriodCard;
