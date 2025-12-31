
import React, { useState, useCallback, useMemo, useRef, useEffect, memo } from 'react';
import { Period, QuizQuestion } from '../types';
import { PERIODS } from '../constants';
import { getQuizQuestions, getNPCResponse, evaluateShortStory } from '../services/geminiService';

// Memoize edilmiş alt bileşenler performansı artırır
const MessageItem = memo(({ m }: { m: { role: 'ai' | 'user'; text: string } }) => (
  <div className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} mb-3`}>
    <div className={`max-w-[85%] p-3 px-4 rounded-2xl shadow-sm border text-sm ${
      m.role === 'user' 
      ? 'bg-amber-900 text-amber-50 rounded-tr-none border-amber-950' 
      : 'bg-white text-amber-950 border-amber-100 rounded-tl-none font-medium'
    }`}>
      {m.text}
    </div>
  </div>
));

const QuizOption = memo(({ opt, idx, onSelect }: { opt: string, idx: number, onSelect: (i: number) => void }) => (
  <button 
    onClick={() => onSelect(idx)}
    className="p-4 bg-amber-50 border border-amber-200 rounded-2xl hover:bg-amber-100 transition-all text-left flex items-center gap-4 group active:scale-[0.98]"
  >
    <span className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-black group-hover:bg-amber-700 transition-colors text-xs">
      {String.fromCharCode(65 + idx)}
    </span>
    <span className="text-amber-950 font-bold text-sm">{opt}</span>
  </button>
));

const Game: React.FC = () => {
  const [step, setStep] = useState<'intro' | 'exploration' | 'quiz' | 'quiz-results' | 'final' | 'ending'>('intro');
  const [currentPeriod, setCurrentPeriod] = useState<Period>(Period.DIVAN);
  const [score, setScore] = useState(0);
  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [finalStory, setFinalStory] = useState('');
  const [evaluation, setEvaluation] = useState('');
  const [unlockedPeriods, setUnlockedPeriods] = useState<Period[]>([Period.DIVAN]);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // Verimli scroll yönetimi
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages, loading]);

  const startPeriod = useCallback(async (period: Period) => {
    setLoading(true);
    setCurrentPeriod(period);
    setUserAnswers([]);
    setCurrentQuizIdx(0);
    setQuizQuestions([]); 
    setMessages([{ role: 'ai', text: `${PERIODS[period].title} kapıları açıldı. Görevin: ${PERIODS[period].mission}` }]);
    setStep('exploration');

    try {
      const questions = await getQuizQuestions(PERIODS[period].title);
      if (questions?.length) setQuizQuestions(questions);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);
    
    try {
      const response = await getNPCResponse(PERIODS[currentPeriod].authors[0], userMsg);
      setMessages(prev => [...prev, { role: 'ai', text: response }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'ai', text: "Zamanın akışında bir kesinti oldu. Tekrar deneyin." }]);
    } finally {
      setLoading(false);
    }
  };

  const currentPeriodInfo = useMemo(() => PERIODS[currentPeriod], [currentPeriod]);

  if (step === 'intro') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-3xl shadow-xl max-w-xl text-center space-y-8 border border-amber-100">
          <div className="text-6xl">🏛️</div>
          <h1 className="text-4xl font-black serif-font text-amber-950">Zamanın Kütüphanesi</h1>
          <p className="text-amber-900/70 font-medium">Türk edebiyatının hazinelerini keşfetmeye hazır mısınız?</p>
          <button 
            onClick={() => startPeriod(Period.DIVAN)}
            className="bg-amber-900 text-amber-50 px-12 py-4 rounded-full font-black hover:bg-black transition-all shadow-lg active:scale-95"
          >
            Yolculuğa Başla
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 grid lg:grid-cols-4 gap-6">
      {/* Sol Panel */}
      <aside className="lg:col-span-1 space-y-4">
        <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-sm">
          <p className="text-[10px] font-black text-amber-900/40 uppercase mb-2">Bilgelik Puanı</p>
          <div className="flex justify-between items-center">
            <span className="font-black text-3xl text-amber-900">{score}</span>
            <div className="w-20 bg-amber-50 h-2 rounded-full overflow-hidden border border-amber-100">
              <div className="bg-amber-700 h-full" style={{ width: `${(unlockedPeriods.length / 5) * 100}%` }}></div>
            </div>
          </div>
        </div>

        <div className="bg-amber-950 text-amber-50 p-5 rounded-2xl shadow-lg border-t-4 border-amber-500">
          <p className="text-[10px] font-black uppercase text-amber-400 mb-1">Konum</p>
          <p className="font-bold text-sm mb-4">{currentPeriodInfo.title}</p>
          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
            <div className="w-8 h-8 rounded-full bg-amber-800 flex items-center justify-center text-lg border border-amber-700">👤</div>
            <div className="flex flex-col">
              <span className="text-[9px] text-amber-400 font-bold">MİHMANDAR</span>
              <span className="font-bold text-xs">{currentPeriodInfo.authors[0]}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Ana Oyun Alanı */}
      <main className="lg:col-span-3">
        {step === 'exploration' && (
          <div className="bg-white h-[550px] flex flex-col rounded-3xl shadow-xl border border-amber-100 overflow-hidden">
            <div className="p-4 border-b border-amber-50 bg-amber-50/30 flex justify-between items-center">
              <h2 className="text-sm font-black serif-font text-amber-950">{currentPeriodInfo.title}</h2>
              <span className="text-[10px] font-black text-amber-700 bg-amber-100 px-3 py-1 rounded-full">{currentPeriodInfo.era}</span>
            </div>
            
            <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto bg-[#fdfcf9]">
              {messages.map((m, i) => <MessageItem key={i} m={m} />)}
              {loading && <div className="text-amber-800 font-bold animate-pulse text-[10px] italic">Yazılıyor...</div>}
            </div>

            <div className="p-4 bg-white border-t border-amber-100">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Bir mesaj yazın..."
                  className="flex-grow px-4 py-3 border border-amber-100 rounded-xl bg-gray-50 focus:bg-white outline-none text-sm font-bold transition-all text-black"
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={loading}
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={loading || !input.trim()}
                  className="bg-amber-900 text-white px-6 py-3 rounded-xl font-bold text-sm disabled:opacity-50 active:scale-95"
                >
                  Gönder
                </button>
              </div>
              <div className="flex justify-end mt-3">
                <button 
                  onClick={() => setStep('quiz')}
                  disabled={loading || !quizQuestions.length}
                  className="text-xs font-black text-emerald-700 hover:text-emerald-900 transition-colors flex items-center gap-1"
                >
                  {quizQuestions.length ? "İmtihana Geç →" : "Hazırlanıyor..."}
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 'quiz' && (
          <div className="bg-white p-8 rounded-3xl shadow-xl text-center space-y-8 border border-amber-100 animate-in fade-in duration-300">
            <div className="space-y-2">
              <p className="text-amber-700 font-black text-xs">SORU {currentQuizIdx + 1}/3</p>
              <h2 className="text-xl md:text-2xl font-black serif-font text-amber-950">{quizQuestions[currentQuizIdx].question}</h2>
            </div>
            <div className="grid grid-cols-1 gap-3 max-w-lg mx-auto">
              {quizQuestions[currentQuizIdx].options.map((opt, i) => (
                <QuizOption key={i} opt={opt} idx={i} onSelect={(idx) => {
                  const newAnswers = [...userAnswers, idx];
                  setUserAnswers(newAnswers);
                  if (currentQuizIdx < 2) setCurrentQuizIdx(prev => prev + 1);
                  else {
                    let pScore = 0;
                    quizQuestions.forEach((q, idx2) => { if (q.correctAnswer === newAnswers[idx2]) pScore += 20; });
                    setScore(s => s + pScore);
                    setStep('quiz-results');
                  }
                }} />
              ))}
            </div>
          </div>
        )}

        {step === 'quiz-results' && (
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-amber-100 space-y-6">
            <h2 className="text-2xl font-black serif-font text-amber-950 text-center">İmtihan Değerlendirmesi</h2>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {quizQuestions.map((q, i) => (
                <div key={i} className={`p-3 rounded-xl border-l-4 text-xs ${q.correctAnswer === userAnswers[i] ? 'bg-emerald-50 border-emerald-500' : 'bg-rose-50 border-rose-500'}`}>
                  <p className="font-black mb-1 text-black">{q.question}</p>
                  <p className="opacity-70 italic text-black">{q.explanation}</p>
                </div>
              ))}
            </div>
            <button 
              onClick={() => {
                const order = [Period.DIVAN, Period.TANZIMAT, Period.SERVETIFUNUN, Period.MILLI, Period.CUMHURIYET];
                const idx = order.indexOf(currentPeriod);
                if (idx < 4) {
                  setUnlockedPeriods(p => [...new Set([...p, order[idx+1]])]);
                  startPeriod(order[idx+1]);
                } else setStep('final');
              }}
              className="w-full bg-amber-900 text-white py-4 rounded-xl font-black shadow-lg"
            >
              Yola Devam Et
            </button>
          </div>
        )}

        {(step === 'final' || step === 'ending') && (
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-amber-100 text-center space-y-6">
            <h2 className="text-3xl font-black serif-font text-amber-950">
              {step === 'final' ? 'Kendi Hikayen' : 'Yolculuk Tamamlandı'}
            </h2>
            {step === 'final' ? (
              <>
                <textarea 
                  className="w-full h-40 p-4 bg-amber-50 rounded-2xl outline-none font-medium serif-font text-black"
                  placeholder="Buraya hikayenizi yazın..."
                  value={finalStory}
                  onChange={(e) => setFinalStory(e.target.value)}
                />
                <button 
                  onClick={async () => {
                    setLoading(true);
                    const fb = await evaluateShortStory(finalStory);
                    setEvaluation(fb);
                    setStep('ending');
                    setLoading(false);
                  }}
                  className="w-full bg-amber-900 text-white py-4 rounded-xl font-black"
                  disabled={loading || !finalStory.trim()}
                >
                  {loading ? 'Değerlendiriliyor...' : 'Hikayeyi Bitir'}
                </button>
              </>
            ) : (
              <div className="space-y-6">
                <p className="italic text-amber-900 font-medium">"{evaluation}"</p>
                <p className="text-4xl font-black">Puan: {score}</p>
                <button onClick={() => window.location.reload()} className="bg-amber-800 text-white px-8 py-3 rounded-full font-black">Yeniden Başla</button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default memo(Game);
