
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const musicUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"; 

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.2;
    if (!isMuted) {
      audio.play().catch(() => setIsMuted(true));
    } else {
      audio.pause();
    }
  }, [isMuted]);

  const navItems = [
    { path: '/', label: '🏠 Ana Sayfa' },
    { path: '/game', label: '🎮 Oyun' },
    { path: '/periods', label: '📚 Dönemler' },
    { path: '/about', label: 'ℹ️ Hakkında' },
    { path: '/contact', label: '✉️ İletişim' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf9f2] selection:bg-amber-200">
      <audio ref={audioRef} loop preload="auto" src={musicUrl} />

      <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-amber-100 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 md:h-20 items-center">
            <div className="flex flex-col">
              <span className="text-lg md:text-2xl font-black text-amber-950 serif-font tracking-tight">
                Edebiyatın Yolculuğu
              </span>
              <span className="text-[9px] font-black text-amber-700/60 uppercase tracking-[0.2em] mt-0.5">Dijital Serüven</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className={`p-2 rounded-xl transition-all shadow-sm border ${
                  isMuted ? 'bg-rose-50 border-rose-200 text-rose-700' : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                }`}
              >
                <span className="text-lg">{isMuted ? '🔇' : '🔊'}</span>
              </button>
            </div>
          </div>
          
          <div className="flex space-x-1 overflow-x-auto pb-2 no-scrollbar border-t border-amber-50 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`${
                  location.pathname === item.path
                    ? 'bg-amber-900 text-white'
                    : 'text-amber-900/60 hover:bg-amber-50'
                } px-3 py-1.5 rounded-lg text-[10px] font-black transition-all whitespace-nowrap uppercase tracking-widest`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-amber-950 text-amber-100 py-12 mt-auto border-t-[12px] border-amber-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-black text-xl md:text-2xl serif-font text-amber-200 mb-2">Edebiyatın Yolculuğu</p>
          <p className="text-xs opacity-60 font-medium italic">Ghayth Hamza • 9. Sınıf Projesi</p>
          <p className="text-[10px] mt-10 opacity-20 font-bold uppercase tracking-[0.5em]">Bahçelievler 15 Temmuz Şehitleri AIHL</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
