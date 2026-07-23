
import React from 'react';
import { ArrowRight, CheckCircle2, Zap, Shield, Home as HomeIcon, Globe } from 'lucide-react';
import { SERVICES, FEATURES, PROJECTS } from '../constants';

interface HomeProps {
  darkMode: boolean;
  setPage: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ darkMode, setPage }) => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1920" 
            className="w-full h-full object-cover"
            alt="High tech background"
          />
          <div className={`absolute inset-0 ${darkMode ? 'bg-gray-950/80' : 'bg-gray-900/40'}`}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
              Инженерные системы <br />
              <span className="gradient-text">будущего</span> уже сегодня
            </h1>
            <p className="mt-6 text-xl text-gray-200 max-w-xl leading-relaxed">
              Интеллектуальная среда для жизни и бизнеса. Полный цикл: мы создаем — вы пользуетесь.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button 
                onClick={() => setPage('contacts')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-2 transition-all shadow-xl hover:shadow-blue-600/30"
              >
                Рассчитать проект <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => setPage('portfolio')}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md px-8 py-4 rounded-full font-bold text-lg transition-all"
              >
                Наши работы
              </button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className={`w-6 h-10 rounded-full border-2 ${darkMode ? 'border-gray-500' : 'border-white'} flex justify-center p-1`}>
            <div className={`w-1 h-3 rounded-full ${darkMode ? 'bg-gray-500' : 'bg-white'}`}></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={`py-24 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Наши направления</h2>
            <div className="h-1.5 w-24 bg-blue-600 mx-auto mt-4 rounded-full"></div>
            <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto">
              Интегрируем передовые технологии в единую систему для максимальной эффективности.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service) => (
              <div 
                key={service.id}
                onClick={() => setPage(`service-${service.id}`)}
                className={`group cursor-pointer rounded-2xl p-8 transition-all duration-300 transform hover:-translate-y-2 ${
                  darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-gray-50 hover:bg-white hover:shadow-2xl'
                }`}
              >
                <div className="w-16 h-16 bg-blue-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <Zap className="text-blue-600 group-hover:text-white" size={32} />
                </div>
                <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{service.title}</h3>
                <p className={`text-sm leading-relaxed mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {service.shortDescription}
                </p>
                <span className="text-blue-500 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Подробнее <ArrowRight size={16} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={`py-24 ${darkMode ? 'bg-gray-950' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className={`text-4xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Ваш надежный <br />технологический партнер
              </h2>
              <p className={`text-lg mb-10 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Мы предлагаем комплексный подход, исключающий несовместимость оборудования и лишние затраты. С нами вы получаете надежное решение "под ключ".
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {FEATURES.map((feature, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">{feature.icon}</div>
                    <div>
                      <h4 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h4>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-500/10 rounded-3xl blur-2xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200" 
                alt="Engineering process" 
                className="relative rounded-3xl shadow-2xl z-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Portfolio */}
      <section className={`py-24 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Реализованные проекты</h2>
              <p className="mt-4 text-gray-500">Доказательство нашей экспертизы в цифрах и фактах.</p>
            </div>
            <button 
              onClick={() => setPage('portfolio')}
              className="text-blue-500 font-bold hover:text-blue-600 flex items-center gap-2"
            >
              Все работы <ArrowRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROJECTS.slice(0, 3).map((project) => (
              <div key={project.id} className="group overflow-hidden rounded-2xl relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent flex flex-col justify-end p-8">
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-2">{project.type}</span>
                  <h3 className="text-white text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-300 text-sm line-clamp-2">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600"></div>
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -left-20 -top-20 w-96 h-96 bg-blue-800/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8">Готовы начать свой проект?</h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Получите бесплатную консультацию инженера и предварительный расчет стоимости в течение рабочего дня.
          </p>
          <button 
            onClick={() => setPage('contacts')}
            className="bg-white text-blue-600 hover:bg-blue-50 px-12 py-5 rounded-full font-bold text-xl transition-all shadow-2xl"
          >
            Заказать консультацию
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
