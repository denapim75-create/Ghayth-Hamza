
import React from 'react';
import { Link } from 'react-router-dom';
import { PERIODS } from '../constants.tsx';
import PeriodCard from '../components/PeriodCard.tsx';

const Home: React.FC = () => {
  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000&auto=format&fit=crop")' }}
        >
          <div className="absolute inset-0 bg-amber-950/70 backdrop-blur-[1px]"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl animate-in">
          <span className="inline-block bg-amber-500 text-amber-950 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-lg">9. Sınıf Edebiyat Projesi</span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 serif-font leading-tight">
            Edebiyatın Büyülü Dünyası
          </h1>
          <p className="text-lg mb-8 text-amber-100/80 font-medium max-w-2xl mx-auto leading-relaxed">
            Divan'dan Cumhuriyet'e uzanan bu serüvende usta yazarlarla tanış ve eserleri topla.
          </p>
          <Link 
            to="/game" 
            className="inline-block bg-white text-amber-950 px-12 py-4 rounded-2xl text-lg font-black transition shadow-2xl hover:bg-amber-100 active:scale-95 border-b-4 border-amber-200"
          >
            🎮 Hemen Başla
          </Link>
        </div>
      </section>

      {/* Featured Periods */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold serif-font text-gray-800">Edebiyat Tarihi</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.values(PERIODS).map((p) => (
            <PeriodCard key={p.id} period={p} onExplore={() => {}} />
          ))}
        </div>
      </section>

      {/* Info Section */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-amber-50 p-8 rounded-[2rem] border border-amber-200">
          <p className="text-amber-900 font-bold italic">
            "Bu proje, Türk edebiyatının eşsiz dönemlerini keşfetmeniz için hazırlanmış bir dijital rehberdir."
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
