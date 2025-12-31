
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.tsx';
import Home from './pages/Home.tsx';
import Game from './pages/Game.tsx';
import PeriodsPage from './pages/Periods.tsx';

// Uygulamayı koruma altına alan şifre ekranı
const AccessGate: React.FC<{ onGrant: () => void }> = ({ onGrant }) => {
  const [key, setKey] = useState('');
  const [error, setError] = useState(false);

  const checkKey = () => {
    if (key.toUpperCase() === 'EDEBİYAT2025') {
      localStorage.setItem('lib_access', 'granted');
      onGrant();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-amber-950 flex items-center justify-center p-4">
      <div className="bg-[#fcf9f2] p-8 md:p-12 rounded-[2.5rem] shadow-2xl max-w-md w-full text-center border-4 border-amber-700 space-y-8 animate-in">
        <div className="text-6xl mb-4">📜</div>
        <h2 className="text-3xl font-black serif-font text-amber-950">Kütüphane Girişi</h2>
        <p className="text-amber-800/70 font-medium text-sm">
          Türk edebiyatı kütüphanesine girmek için mühürlü anahtarı kullanmalısınız.
        </p>
        <div className="space-y-4">
          <input 
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkKey()}
            placeholder="ANAHTARI YAZIN..."
            className={`w-full px-6 py-4 rounded-2xl border-2 text-center text-xl font-black uppercase tracking-widest outline-none transition-all ${
              error ? 'border-red-500 bg-red-50 text-red-900 animate-shake' : 'border-amber-200 bg-white text-black focus:border-amber-600'
            }`}
          />
          <button 
            onClick={checkKey}
            className="w-full bg-amber-900 text-white py-4 rounded-2xl font-black hover:bg-black transition-all shadow-lg active:scale-95"
          >
            Mührü Aç ve Gir
          </button>
        </div>
        
        {error && <p className="text-rose-600 font-black text-[10px] uppercase tracking-widest">Yanlış Anahtar! Tekrar Deneyin.</p>}

        <div className="pt-6 border-t border-amber-100">
          <p className="text-[10px] text-amber-900/40 font-bold uppercase tracking-widest mb-2">Hata mı alıyorsunuz?</p>
          <p className="text-[9px] text-amber-700/60 leading-relaxed">
            Eğer bu ekranı göremiyorsanız, gönderen kişi size yanlış (lokal) adresi atmış olabilir. 
            Lütfen gerçek önizleme adresini isteyin.
          </p>
        </div>

        <p className="text-[10px] text-amber-900/30 font-bold uppercase tracking-[0.3em]">
          Ghayth Hamza • 2025
        </p>
      </div>
    </div>
  );
};

const About: React.FC = () => (
  <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-8">
    <h1 className="text-5xl font-bold serif-font text-amber-950">Proje Hakkında</h1>
    <div className="bg-amber-50 p-8 md:p-12 rounded-3xl shadow-xl space-y-8 text-left border border-amber-200">
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="flex-grow">
          <p className="text-xl text-amber-900/80 leading-relaxed mb-6">
            <strong>Edebiyatın Yolculuğu</strong>, Türk edebiyatı dersini modern bir öğrenme deneyimi haline getirmeyi amaçlayan, 
            geleneksel yöntemleri dijital dünyanın olanaklarıyla birleştiren interaktif bir platformdur.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-black text-amber-950 flex items-center gap-2 text-lg">
                <span className="text-2xl">🎯</span> Vizyon
              </h3>
              <p className="text-amber-800/70 font-medium">
                Edebiyatın sadece bir "ezber" dersi olmadığını, her döneminin yaşayan bir ruhu olduğunu öğrencilere hissettirmek.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-black text-amber-950 flex items-center gap-2 text-lg">
                <span className="text-2xl">💻</span> Mimari
              </h3>
              <p className="text-amber-800/70 font-medium">
                Gelişmiş doğal dil işleme yetenekleri ve modern web teknolojileri üzerine inşa edilmiş, kullanıcıyla etkileşime giren dinamik bir altyapı.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pt-8 border-t border-amber-200 bg-amber-100/30 p-8 rounded-2xl text-center md:text-left">
        <h3 className="font-black text-amber-950 mb-2 uppercase tracking-widest text-sm">Geliştirici</h3>
        <p className="text-2xl font-black text-amber-900">Ghayth Hamza</p>
        <p className="text-amber-800 font-bold mt-1">9. Sınıf Öğrencisi</p>
        <p className="text-amber-700/60 text-sm italic mt-4 uppercase font-bold">Bahçelievler 15 Temmuz Şehitleri AIHL</p>
      </div>
    </div>
  </div>
);

const Contact: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold serif-font text-center mb-12 text-amber-950">İletişim Kanalları</h1>
      <div className="flex justify-center items-center">
        <div className="w-full max-w-lg bg-amber-950 text-amber-50 p-10 rounded-3xl shadow-2xl border-b-8 border-amber-700 transition-transform hover:scale-[1.02]">
          <h3 className="text-3xl font-black serif-font mb-10 text-amber-200 text-center">Bize Ulaşın</h3>
          <div className="space-y-10">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-amber-900 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-amber-800">📧</div>
              <div>
                <p className="text-amber-400 text-[10px] uppercase font-black tracking-[0.2em] mb-1">E-posta</p>
                <a href="mailto:ghaythhamza25@gmail.com" className="text-xl font-bold hover:text-amber-300 transition-colors break-all">ghaythhamza25@gmail.com</a>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-amber-900 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-amber-800">📞</div>
              <div>
                <p className="text-amber-400 text-[10px] uppercase font-black tracking-[0.2em] mb-1">Telefon</p>
                <a href="tel:05314246556" className="text-xl font-bold hover:text-amber-300 transition-colors">0531 424 65 56</a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center">
            <p className="text-amber-200/50 text-xs italic font-medium uppercase tracking-widest">
              "Kütüphane kapısı her zaman açıktır."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const access = localStorage.getItem('lib_access');
    if (access === 'granted') setHasAccess(true);
  }, []);

  if (!hasAccess) {
    return <AccessGate onGrant={() => setHasAccess(true)} />;
  }

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/periods" element={<PeriodsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/collection" element={<div className="p-24 text-center text-amber-900/40 italic font-bold">Koleksiyon sayfası kütüphane sırları çözüldükçe aktifleşecektir.</div>} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
