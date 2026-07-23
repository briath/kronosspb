
import React from 'react';
import { ArrowLeft, CheckCircle2, ChevronRight, Calculator } from 'lucide-react';
import { Service } from '../types';

interface ServiceDetailProps {
  service: Service;
  darkMode: boolean;
  onBack: () => void;
  onConsult: () => void;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ service, darkMode, onBack, onConsult }) => {
  return (
    <div className={`pt-24 pb-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button 
          onClick={onBack}
          className={`flex items-center gap-2 mb-12 text-sm font-semibold hover:text-blue-500 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
        >
          <ArrowLeft size={16} /> Назад к услугам
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          <div>
            <span className="text-blue-500 font-bold uppercase tracking-wider text-sm mb-4 block">Направление</span>
            <h1 className={`text-4xl md:text-5xl font-bold mb-8 leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {service.title}
            </h1>
            <p className={`text-xl leading-relaxed mb-10 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {service.shortDescription}
            </p>

            <div className={`p-8 rounded-2xl mb-10 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-blue-50'}`}>
              <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>Проблема клиента</h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{service.problem}</p>
            </div>

            <div className="mb-10">
              <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Наше решение</h3>
              <p className={`leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{service.solution}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.scope.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="text-blue-500 flex-shrink-0" size={20} />
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={onConsult}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl hover:shadow-blue-600/30 transition-all"
            >
              <Calculator size={22} /> Рассчитать проект
            </button>
          </div>

          <div className="space-y-8">
            <img 
              src={service.image} 
              alt={service.title} 
              className="w-full h-[500px] object-cover rounded-3xl shadow-2xl"
            />
            
            <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Ваши преимущества</h3>
              <ul className="space-y-4">
                {service.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`p-8 rounded-2xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`text-sm font-bold uppercase tracking-widest mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Технологии и бренды</h3>
              <div className="flex flex-wrap gap-4">
                {service.brands.map((brand, idx) => (
                  <span key={idx} className={`px-4 py-2 rounded-lg font-bold text-sm ${darkMode ? 'bg-gray-700 text-white' : 'bg-white shadow-sm text-gray-700'}`}>
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation to other services */}
        <div className={`pt-12 border-t ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
           <h3 className={`text-xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Связанные услуги</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Dummy related links */}
              <div className={`p-6 rounded-xl border hover:border-blue-500 transition-all cursor-pointer ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h4 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Электромонтаж</h4>
                <p className="text-xs text-gray-500">Основа любой интеллектуальной системы.</p>
              </div>
              <div className={`p-6 rounded-xl border hover:border-blue-500 transition-all cursor-pointer ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <h4 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Безопасность</h4>
                <p className="text-xs text-gray-500">Защита вашего имущества и спокойствие.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
