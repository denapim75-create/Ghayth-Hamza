
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Tarihi ve mistik dokuya uygun, yüksek erişilebilirliğe sahip Ney/Sufi fon müziği
  const musicUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"; 

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.3;

    const attemptPlay = async () => {
      if (!isMuted) {
        try {
          await audio.play();
        } catch (err) {
          console.warn("Ses engellendi. Manuel etkileşim gerekiyor.");
          setIsMuted(true);
        }
      } else {
        audio.pause();
      }
    };

    attemptPlay();
  }, [isMuted]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  const navItems = [
    { path: '/', label: '🏠 Ana Sayfa' },
    { path: '/game', label: '🎮 Oyuna Başla' },
    { path: '/periods', label: '📚 Dönemler' },
    { path: '/collection', label: '💎 Koleksiyon' },
    { path: '/about', label: 'ℹ️ Hakkında' },
    { path: '/contact', label: '✉️ İletişim' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf9f2] selection:bg-amber-200">
      <audio 
        ref={audioRef}
        loop 
        preload="auto"
        src={musicUrl} 
      />

      <header className="bg-white/95 backdrop-blur-md shadow-sm border-b border-amber-100 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center gap-4">
              <span className="text-xl md:text-2xl font-bold text-amber-950 serif-font tracking-tight">
                Edebiyatın Yolculuğu
              </span>
              <button 
                onClick={toggleMute}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all text-xs font-black shadow-sm border ${
                  isMuted 
                    ? 'bg-rose-50 border-rose-200 text-rose-700' 
                    : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                }`}
              >
                <span className="text-lg">{isMuted ? '🔇' : '🔊'}</span>
                <span>{isMuted ? 'Sesi Aç' : 'Mistik Fon Aktif'}</span>
              </button>
            </div>
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${
                    location.pathname === item.path
                      ? 'bg-amber-50 text-amber-950'
                      : 'text-amber-800/70 hover:bg-amber-50 hover:text-amber-900'
                  } px-3 py-2 rounded-lg text-sm font-bold transition-colors`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-amber-950 text-amber-100 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-bold text-lg serif-font">Edebiyatın Yolculuğu</p>
          <p className="text-sm mt-1 opacity-80 italic">Yapımcı: Ghayth Hamza (9. Sınıf Öğrencisi)</p>
          <p className="text-[10px] mt-4 opacity-40 font-bold uppercase tracking-[0.2em]">© 2024 Tüm Hakları Saklıdır.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
