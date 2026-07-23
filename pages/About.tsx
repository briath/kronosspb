import React from 'react';
import { Users, Award, Zap, Target, CheckCircle2, TrendingUp } from 'lucide-react';

interface AboutProps {
  darkMode: boolean;
  setPage: (page: string) => void;
}

const About: React.FC<AboutProps> = ({ darkMode, setPage }) => {
  const team = [
    {
      name: 'Сергей Кулаков',
      role: 'Основатель и главный инженер',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      bio: '15+ лет опыта в проектировании инженерных систем'
    },
    {
      name: 'Мария Волкова',
      role: 'Директор проектов',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
      bio: 'Специалист в управлении крупными проектами автоматизации'
    },
    {
      name: 'Алексей Смирнов',
      role: 'Ведущий инженер СКС',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
      bio: 'Сертифицированный специалист Cisco и Legrand'
    },
    {
      name: 'Екатерина Лебедева',
      role: 'Инженер по безопасности',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400',
      bio: 'Эксперт в системах видеонаблюдения и СКУД'
    }
  ];

  const milestones = [
    { year: '2015', title: 'Основание', description: 'Компания INGENIOUS SYSTEMS основана' },
    { year: '2017', title: 'Расширение', description: 'Открыт филиал, команда расширилась до 20 человек' },
    { year: '2020', title: 'Инновация', description: 'Запущено первое умное офисное здание' },
    { year: '2024', title: 'Лидер', description: '500+ успешных проектов, 1000+ довольных клиентов' }
  ];

  const values = [
    {
      icon: <Target className="w-12 h-12" />,
      title: 'Качество',
      description: 'Мы не идем на компромиссы в качестве. Каждый проект – это наш шедевр.'
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: 'Инновация',
      description: 'Всегда в курсе новых технологий и лучших практик индустрии.'
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Командность',
      description: 'Мы верим в силу командной работы и открытого общения.'
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: 'Честность',
      description: 'Прозрачная коммуникация и честные сметы – наш стандарт.'
    }
  ];

  const achievements = [
    { number: '500+', label: 'Завершено проектов' },
    { number: '1000+', label: 'Довольных клиентов' },
    { number: '50+', label: 'Сотрудников' },
    { number: '15', label: 'Лет опыта' }
  ];

  return (
    <div className={`pt-24 pb-0 min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Hero Section */}
      <section className="relative h-96 flex items-center overflow-hidden mb-24">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1920" 
            className="w-full h-full object-cover"
            alt="About us"
          />
          <div className={`absolute inset-0 ${darkMode ? 'bg-gray-950/70' : 'bg-gray-900/40'}`}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            О компании INGENIOUS SYSTEMS
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Мы создаем технологический фундамент будущего с 2015 года. Комплексные решения для умного дома, безопасности и автоматизации.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Achievements */}
        <section className="mb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className={`text-4xl md:text-5xl font-bold mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  {achievement.number}
                </div>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {achievement.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Company Story */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold mb-12">Наша история</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className={`text-lg mb-6 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                INGENIOUS SYSTEMS начала свой путь как небольшая команда энтузиастов, убежденных, что технология должна служить комфорту людей, а не усложнять жизнь.
              </p>
              <p className={`text-lg mb-6 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                За девять лет мы выросли из 3 человек в коллектив из 50+ профессионалов, реализовав более 500 проектов в Санкт-Петербурге, Москве и прилегающих регионах.
              </p>
              <p className={`text-lg mb-6 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Сегодня INGENIOUS SYSTEMS – это не просто подрядчик, а ваш технологический партнер, готовый решить самые сложные задачи в области инженерных систем.
              </p>
              <div className="mt-8">
                <button
                  onClick={() => setPage('contacts')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold transition-all"
                >
                  Обсудить проект
                </button>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600"
                alt="Company office"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold mb-12">Наши ценности</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className={`p-8 rounded-2xl transition-all hover:shadow-xl ${
                  darkMode 
                    ? 'bg-gray-800 hover:bg-gray-750' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="text-blue-500 mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {value.title}
                </h3>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold mb-12">Вехи развития</h2>
          <div className="relative">
            <div className={`absolute left-1/2 top-0 w-1 h-full ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-1/2"></div>
                  <div className="w-1/2 relative">
                    <div className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-blue-600'} border-4 ${darkMode ? 'border-gray-900' : 'border-white'}`}></div>
                    <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                      <div className="text-blue-500 font-bold text-lg mb-2">
                        {milestone.year}
                      </div>
                      <h4 className="font-bold text-lg mb-2">
                        {milestone.title}
                      </h4>
                      <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="mb-24">
          <h2 className="text-4xl font-bold mb-12">Наша команда</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div 
                key={index}
                className={`rounded-2xl overflow-hidden transition-all hover:shadow-2xl ${
                  darkMode ? 'bg-gray-800' : 'bg-gray-50'
                }`}
              >
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-500 text-sm font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className={darkMode ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'}>
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Us */}
        <section className={`mb-24 p-12 rounded-3xl ${darkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
          <h2 className="text-4xl font-bold mb-12">Почему выбирают нас</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold mb-2">Гарантия результата</h4>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Мы гарантируем раскрытие всего потенциала инженерных систем
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold mb-2">Собственная бригада</h4>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Работают постоянные сотрудники, а не нанятые подрядчики
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold mb-2">Сертификация</h4>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Все специалисты имеют международные сертификаты
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold mb-2">Сервис 24/7</h4>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  Техническая поддержка и обслуживание в любое время
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={`mb-24 p-12 rounded-3xl text-center ${darkMode ? 'bg-gradient-to-r from-blue-900 to-blue-800' : 'bg-gradient-to-r from-blue-600 to-blue-500'}`}>
          <h2 className="text-4xl font-bold mb-6 text-white">
            Готовы начать проект?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Свяжитесь с нами сегодня и давайте обсудим ваше будущее инженерное решение
          </p>
          <button
            onClick={() => setPage('contacts')}
            className="bg-white hover:bg-gray-100 text-blue-600 px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl"
          >
            Заказать консультацию
          </button>
        </section>
      </div>
    </div>
  );
};

export default About;
