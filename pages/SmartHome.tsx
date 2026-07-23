import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Zap, Home, Lightbulb, Thermometer, Lock, Volume2, Eye, ChevronDown, ChevronUp } from 'lucide-react';

interface SmartHomeProps {
  darkMode: boolean;
  onBack: () => void;
  onConsult: () => void;
}

const SmartHome: React.FC<SmartHomeProps> = ({ darkMode, onBack, onConsult }) => {
  const [expandedScenario, setExpandedScenario] = useState<number | null>(0);

  const scenarios = [
    {
      title: 'Сценарий "Утро"',
      description: 'Автоматически включается освещение в прихожей, спальне и ванной. Выполняется команда открытия штор, включается кофемашина. Температура в квартире повышается до 22°C.',
      benefits: ['Комфортный путь утром', 'Экономия времени', 'Готовый кофе'],
      icon: <Lightbulb className="w-6 h-6" />
    },
    {
      title: 'Сценарий "Выход из дома"',
      description: 'При последнем выходе все люстры гасятся, закрываются все шторы, система отопления переходит в режим экономии, включается режим охраны камер и сигнализации.',
      benefits: ['Полная безопасность', 'Экономия энергии до 30%', 'Контроль со смартфона'],
      icon: <Lock className="w-6 h-6" />
    },
    {
      title: 'Сценарий "Кинотеатр"',
      description: 'Затемняются все окна, свет в гостиной гасится, система кондиционирования отключается, включается объемный звук, экран опускается автоматически.',
      benefits: ['Идеальная атмосфера', 'Кинотеатр дома', 'Один клик для включения'],
      icon: <Eye className="w-6 h-6" />
    },
    {
      title: 'Сценарий "Ночь"',
      description: 'Включается ночное освещение с 5% яркостью, закрываются все шторы, отопление переходит в режим сна, включается запись видеонаблюдения, удаляются источники света с дисплеев.',
      benefits: ['Спокойный сон', 'Полная безопасность', 'Здоровое освещение'],
      icon: <Home className="w-6 h-6" />
    },
    {
      title: 'Сценарий "Гости"',
      description: 'Свет в прихожей и гостиной включается на 80% яркостью, фоновая музыка включается на среднюю громкость, температура устанавливается на 21°C, открываются шторы в гостиной.',
      benefits: ['Теплая атмосфера', 'Профессиональный интерьер', 'Фоновая музыка'],
      icon: <Volume2 className="w-6 h-6" />
    },
    {
      title: 'Сценарий "Работа из дома"',
      description: 'Включается рабочее освещение в кабинете, отключаются все уведомления, включается белый шум, система кондиционирования настраивается на 20°C, отключается видеозвонок.',
      benefits: ['Полная концентрация', 'Оптимальный микроклимат', 'Профессиональная обстановка'],
      icon: <Thermometer className="w-6 h-6" />
    }
  ];

  const installationSteps = [
    {
      step: 1,
      title: 'Обследование и консультация',
      description: 'Инженер посещает объект, проводит обследование, обсуждает пожелания и возможности системы.'
    },
    {
      step: 2,
      title: 'Проектирование',
      description: 'Разработка 3D проекта размещения датчиков, исполнительных устройств и точек управления.'
    },
    {
      step: 3,
      title: 'Монтажные работы',
      description: 'Установка проводки, датчиков, реле, блоков управления и исполнительных устройств.'
    },
    {
      step: 4,
      title: 'Программирование',
      description: 'Настройка логики работы, создание сценариев и интеграция с мобильным приложением.'
    },
    {
      step: 5,
      title: 'Тестирование',
      description: 'Полное тестирование всех сценариев, проверка отказоустойчивости и безопасности системы.'
    },
    {
      step: 6,
      title: 'Обучение пользователя',
      description: 'Обучение владельца всем функциям системы и оказание технической поддержки.'
    }
  ];

  const systems = [
    {
      name: 'Система освещения',
      description: 'Управление уровнем освещения, цветовой температурой и расписанием включения.',
      features: ['Программируемые сценарии', 'Управление со смартфона', 'Датчики движения', 'Голосовое управление']
    },
    {
      name: 'Климат-контроль',
      description: 'Автоматическое управление температурой, влажностью и вентиляцией.',
      features: ['Профилактика плесени', 'Оптимальный микроклимат', 'Энергосбережение', 'Датчики CO2']
    },
    {
      name: 'Управление шторами',
      description: 'Моторизованные шторы с автоматическим управлением по расписанию и датчикам освещения.',
      features: ['Защита от солнца', 'Программируемое расписание', 'Управление голосом', 'Датчики ветра']
    },
    {
      name: 'Управление кондиционированием',
      description: 'Интеллектуальные кондиционеры, которые учат ваши предпочтения.',
      features: ['Обучение предпочтениям', 'Геолокация', 'Интеграция с календарем', 'Энергоаналитика']
    },
    {
      name: 'Система безопасности',
      description: 'Интеграция дверных замков, датчиков движения и видеонаблюдения в единую систему.',
      features: ['Удаленный контроль', 'Оповещения в реальном времени', 'Архив видео', 'Интеграция с ПЦО']
    },
    {
      name: 'Аудиосистема',
      description: 'Многозональная аудиосистема с управлением через приложение и голосовые команды.',
      features: ['Многозональность', 'Потоковая музыка', 'Голосовое управление', 'High-res audio']
    }
  ];

  const caseStudies = [
    {
      title: 'Квартира-студия 60м² | Молодая семья',
      scope: 'Система освещения KNX, климат-контроль, автоматические шторы',
      result: 'Комфорт увеличился на 100%, энергопотребление снизилось на 25%',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'Загородный дом 300м² | Семья с детьми',
      scope: 'Полная автоматизация, система безопасности CCTV, аудиосистема многозонная',
      result: 'Система окупилась за 2 года на энергосбережение и удобстве',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600'
    },
    {
      title: 'Офис 150м² | Технологический хаб',
      scope: 'Система управления работой сотрудников, автоматизация освещения, климат-контроль по зонам',
      result: 'Производительность возросла на 15%, затраты на электричество снизились на 30%',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600'
    }
  ];

  return (
    <div className={`pt-24 pb-0 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back button and Hero */}
        <button 
          onClick={onBack}
          className={`flex items-center gap-2 mb-8 text-sm font-semibold hover:text-blue-500 transition-colors ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
        >
          <ArrowLeft size={16} /> Назад к услугам
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <span className="text-blue-500 font-bold uppercase tracking-wider text-sm mb-4 block">Услуга</span>
            <h1 className={`text-5xl md:text-6xl font-bold mb-8 leading-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Умный дом и автоматизация
            </h1>
            <p className={`text-xl leading-relaxed mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Превратите ваш дом в интеллектуальную систему, которая предугадывает ваши потребности и работает на вас 24/7.
            </p>

            <div className={`p-8 rounded-2xl mb-10 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-blue-50'}`}>
              <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>Основные преимущества</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Экономия энергии до 30%</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Управление из любой точки мира</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-blue-500 flex-shrink-0 mt-1" size={20} />
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Повышение безопасности на 50%</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={onConsult}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-xl hover:shadow-blue-600/30"
            >
              Получить консультацию
            </button>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800"
              alt="Smart Home"
              className="w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Systems */}
        <section className="mb-24">
          <h2 className={`text-4xl font-bold mb-12 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Системы, которые мы интегрируем
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {systems.map((system, idx) => (
              <div 
                key={idx}
                className={`p-8 rounded-2xl transition-all hover:shadow-xl ${
                  darkMode 
                    ? 'bg-gray-800 hover:border-blue-500 border border-gray-700' 
                    : 'bg-gray-50 hover:border-blue-500 border border-gray-200'
                }`}
              >
                <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {system.name}
                </h3>
                <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {system.description}
                </p>
                <ul className="space-y-2">
                  {system.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Scenarios */}
        <section className="mb-24">
          <h2 className={`text-4xl font-bold mb-12 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Сценарии автоматизации
          </h2>
          <div className="space-y-4">
            {scenarios.map((scenario, idx) => (
              <div 
                key={idx}
                className={`p-6 rounded-2xl cursor-pointer transition-all ${
                  expandedScenario === idx
                    ? (darkMode ? 'bg-blue-900/20 border-blue-500' : 'bg-blue-50 border-blue-500')
                    : (darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-gray-50 hover:bg-gray-100')
                } border ${expandedScenario !== idx ? (darkMode ? 'border-gray-700' : 'border-gray-200') : ''}`}
                onClick={() => setExpandedScenario(expandedScenario === idx ? null : idx)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-blue-500">
                      {scenario.icon}
                    </div>
                    <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {scenario.title}
                    </h3>
                  </div>
                  {expandedScenario === idx ? <ChevronUp /> : <ChevronDown />}
                </div>
                
                {expandedScenario === idx && (
                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {scenario.description}
                    </p>
                    <h4 className={`text-sm font-bold mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Ваши преимущества:
                    </h4>
                    <ul className="space-y-2">
                      {scenario.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Installation Process */}
        <section className="mb-24">
          <h2 className={`text-4xl font-bold mb-12 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Процесс установки
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {installationSteps.map((step, idx) => (
              <div 
                key={idx}
                className={`p-8 rounded-2xl relative ${
                  darkMode ? 'bg-gray-800' : 'bg-gray-50'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-6 ${
                  darkMode 
                    ? 'bg-blue-900 text-blue-400' 
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  {step.step}
                </div>
                <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {step.title}
                </h3>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {step.description}
                </p>
                {idx < installationSteps.length - 1 && (
                  <div className={`absolute -right-4 top-1/2 hidden lg:block ${darkMode ? 'text-gray-700' : 'text-gray-300'}`}>
                    <ChevronDown className="rotate-90" size={32} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Case Studies */}
        <section className="mb-24">
          <h2 className={`text-4xl font-bold mb-12 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Примеры реализаций
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, idx) => (
              <div 
                key={idx}
                className={`rounded-2xl overflow-hidden transition-all hover:shadow-2xl ${
                  darkMode ? 'bg-gray-800' : 'bg-gray-50'
                }`}
              >
                <img 
                  src={study.image}
                  alt={study.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className={`text-lg font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {study.title}
                  </h3>
                  <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <span className="font-semibold">Объем работ:</span> {study.scope}
                  </p>
                  <p className={`text-sm font-semibold text-blue-500`}>
                    ✓ {study.result}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className={`mb-24 p-12 rounded-3xl ${darkMode ? 'bg-gray-800' : 'bg-blue-50'}`}>
          <h2 className={`text-4xl font-bold mb-12 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Часто задаваемые вопросы
          </h2>
          <div className="space-y-6">
            <div>
              <h4 className={`text-lg font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Работает ли система без интернета?
              </h4>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                Да, основные функции работают благодаря локальной сети. Управление со смартфона требует интернета.
              </p>
            </div>
            <div>
              <h4 className={`text-lg font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Какой срок установки?
              </h4>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                Зависит от размера и сложности. Квартиру можно автоматизировать за 2-4 недели, дом за 4-8 недель.
              </p>
            </div>
            <div>
              <h4 className={`text-lg font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Можно ли расширить систему позже?
              </h4>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                Абсолютно. Система модульная и легко расширяется. Одну комнату можно автоматизировать через год.
              </p>
            </div>
            <div>
              <h4 className={`text-lg font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Насколько это безопасно?
              </h4>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                Мы используем шифрование на все коммуникациях, двухфакторную аутентификацию и регулярные обновления безопасности.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={`mb-24 p-12 rounded-3xl text-center text-white ${
          darkMode 
            ? 'bg-gradient-to-r from-blue-900 to-blue-800' 
            : 'bg-gradient-to-r from-blue-600 to-blue-500'
        }`}>
          <h2 className="text-4xl font-bold mb-6">
            Готовы сделать свой дом умным?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Наши инженеры помогут подобрать оптимальное решение и воплотить ваши идеи в реальность
          </p>
          <button
            onClick={onConsult}
            className="bg-white hover:bg-gray-100 text-blue-600 px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl"
          >
            Заказать консультацию
          </button>
        </section>
      </div>
    </div>
  );
};

export default SmartHome;
