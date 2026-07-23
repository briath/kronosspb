
import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { ServiceType } from '../types';

interface PortfolioProps {
  darkMode: boolean;
}

const Portfolio: React.FC<PortfolioProps> = ({ darkMode }) => {
  const [filter, setFilter] = useState<string>('All');

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.type === filter || p.objectType === filter);

  const filterOptions = [
    { label: 'Все работы', value: 'All' },
    { label: 'Офисы', value: 'Office' },
    { label: 'Дома/Квартиры', value: 'House' },
    { label: 'СКС', value: ServiceType.SCS },
    { label: 'Умный дом', value: ServiceType.SmartHome },
    { label: 'Безопасность', value: ServiceType.Security },
  ];

  return (
    <div className={`pt-24 pb-20 min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Наши работы</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Галерея реализованных проектов. Каждое решение — это результат тесного сотрудничества с клиентом и инженерного мастерства.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                filter === opt.value
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : (darkMode ? 'bg-gray-800 text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200')
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className={`group overflow-hidden rounded-3xl transition-all duration-300 ${
                darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-100'
              }`}
            >
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                   {project.tags.map((tag, idx) => (
                     <span key={idx} className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                       {tag}
                     </span>
                   ))}
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                   <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{project.title}</h3>
                </div>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">В этой категории пока нет опубликованных проектов.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
