
import React from 'react';
import { Link } from 'react-router-dom';
import { PERIODS } from '../constants';
import PeriodCard from '../components/PeriodCard';

const Home: React.FC = () => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: 'url("https://picsum.photos/id/24/1600/900")' }}
        >
          <div className="absolute inset-0 bg-amber-900/60 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 serif-font leading-tight">
            Edebiyatın Büyülü Yolculuğu Başlıyor
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-amber-100 font-light">
            Divan'dan Cumhuriyet'e uzanan bu serüvende kalem senin elinde. Bulmacaları çöz, eserleri keşfet ve "Edebiyat Bilgesi" unvanını kazan!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/game" 
              className="bg-amber-500 hover:bg-amber-400 text-amber-950 px-8 py-4 rounded-full text-lg font-bold transition shadow-xl transform hover:scale-105"
            >
              🎮 Serüvene Başla
            </Link>
            <Link 
              to="/periods" 
              className="bg-white/10 hover:bg-white/20 backdrop-blur text-white border border-white/30 px-8 py-4 rounded-full text-lg font-bold transition shadow-lg"
            >
              📚 Dönemleri İncele
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Periods */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold serif-font text-gray-800">Edebiyatın Beş Mevsimi</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.values(PERIODS).map((p) => (
            <PeriodCard key={p.id} period={p} onExplore={() => {}} />
          ))}
        </div>
      </section>

      {/* Why Play? */}
      <section className="bg-amber-50 py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4">
            <div className="text-4xl">📜</div>
            <h3 className="text-xl font-bold serif-font">Gerçekçi Hikayeler</h3>
            <p className="text-gray-600">Yazarların ruhlarıyla tanışın, onların kaleminden dökülenlere ortak olun.</p>
          </div>
          <div className="space-y-4">
            <div className="text-4xl">🧠</div>
            <h3 className="text-xl font-bold serif-font">Eğlenceli Öğrenme</h3>
            <p className="text-gray-600">Sıkıcı ezberler yerine oyunlarla, bulmacalarla edebiyatı keşfedin.</p>
          </div>
          <div className="space-y-4">
            <div className="text-4xl">🏆</div>
            <h3 className="text-xl font-bold serif-font">Zengin Koleksiyon</h3>
            <p className="text-gray-600">Başarılar kazanın, nadir eser kartlarını toplayın ve bilginizi kanıtlayın.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
