
import React, { useState } from 'react';
import { PERIODS } from '../constants';
import { Period } from '../types';

const PeriodsPage: React.FC = () => {
  const [selected, setSelected] = useState<Period>(Period.DIVAN);

  const p = PERIODS[selected];

  // Renk eşleşmeleri - Okunabilirliği garanti altına almak için sabitlendi
  const getColors = (accent: string) => {
    switch(accent) {
      case 'amber': return { bg: 'bg-amber-50', border: 'border-amber-600', text: 'text-amber-900', badge: 'bg-amber-100 text-amber-900' };
      case 'red': return { bg: 'bg-rose-50', border: 'border-rose-600', text: 'text-rose-900', badge: 'bg-rose-100 text-rose-900' };
      case 'purple': return { bg: 'bg-purple-50', border: 'border-purple-600', text: 'text-purple-900', badge: 'bg-purple-100 text-purple-900' };
      case 'emerald': return { bg: 'bg-emerald-50', border: 'border-emerald-600', text: 'text-emerald-900', badge: 'bg-emerald-100 text-emerald-900' };
      case 'orange': return { bg: 'bg-orange-50', border: 'border-orange-600', text: 'text-orange-900', badge: 'bg-orange-100 text-orange-900' };
      default: return { bg: 'bg-gray-50', border: 'border-gray-600', text: 'text-gray-900', badge: 'bg-gray-100 text-gray-900' };
    }
  };

  const colors = getColors(p.accent);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-12">
      {/* Sol Liste */}
      <div className="lg:col-span-1 space-y-4">
        <h1 className="text-3xl font-black serif-font mb-8 text-amber-950">Edebiyat Tarihi</h1>
        <div className="space-y-3">
          {Object.values(PERIODS).map((item) => {
            const itemColors = getColors(item.accent);
            const isActive = selected === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setSelected(item.id)}
                className={`w-full text-left p-5 rounded-2xl transition-all border-l-8 shadow-sm ${
                  isActive 
                  ? `${itemColors.bg} ${itemColors.border} transform translate-x-2` 
                  : 'bg-white border-transparent hover:bg-gray-50'
                }`}
              >
                <h3 className={`font-black text-lg ${isActive ? itemColors.text : 'text-gray-700'}`}>{item.title}</h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.era}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sağ Detay Paneli */}
      <div className={`lg:col-span-2 p-8 md:p-12 rounded-3xl shadow-2xl border-t-8 ${colors.border} bg-white animate-in fade-in duration-300`}>
        <div className="mb-10">
          <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 shadow-sm ${colors.badge}`}>
            {p.era}
          </span>
          <h2 className={`text-4xl md:text-5xl font-black serif-font mb-6 ${colors.text}`}>{p.title}</h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium">
            {p.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-5">
            <h4 className={`font-black text-xl border-b-2 pb-3 flex items-center gap-2 ${colors.text}`}>
              <span className="text-2xl">🖋️</span> Temsilciler
            </h4>
            <ul className="space-y-3">
              {p.authors.map(a => (
                <li key={a} className="flex items-center gap-3 text-gray-800 font-bold bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm"></span> {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-5">
            <h4 className={`font-black text-xl border-b-2 pb-3 flex items-center gap-2 ${colors.text}`}>
              <span className="text-2xl">📖</span> Başlıca Eserler
            </h4>
            <ul className="space-y-3">
              {p.works.map(w => (
                <li key={w} className="flex items-center gap-3 text-gray-800 font-bold bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm"></span> {w}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-inner">
          <h4 className="font-black mb-5 uppercase text-xs tracking-[0.3em] text-gray-400 text-center">Dönemin Ruhunu Yansıtan Kavramlar</h4>
          <div className="flex flex-wrap justify-center gap-3">
            {p.keyConcepts.map(c => (
              <span key={c} className="bg-white px-5 py-2.5 rounded-2xl text-sm font-black shadow-sm border border-gray-100 text-gray-700 hover:scale-110 transition-transform cursor-default">
                #{c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeriodsPage;
