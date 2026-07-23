
import React from 'react';
import { 
  Network, 
  ShieldCheck, 
  Music, 
  Cpu, 
  Zap, 
  Flame,
  Layers,
  UserCheck,
  ShieldAlert,
  FileText,
  Warehouse,
  Headphones
} from 'lucide-react';
import { ServiceType, Service, Project, Feature } from './types';

export const SERVICES: Service[] = [
  {
    id: 'scs',
    type: ServiceType.SCS,
    title: 'Структурированные сети (СКС)',
    shortDescription: 'Стабильный интернет и телефония для любого масштаба.',
    problem: 'Хаос из проводов, медленный интернет в офисе, обрывы связи и сложность добавления новых рабочих мест.',
    solution: 'Проектируем и монтируем СКС, которые обеспечивают бесперебойную работу всех цифровых систем объекта.',
    scope: ['Обследование объекта', 'Проектирование кабельных трасс', 'Монтаж шкафов и стоек', 'Пусконаладка сетевого оборудования', 'Паспортизация и документирование'],
    benefits: ['Высокая скорость передачи данных', 'Легкая масштабируемость', 'Порядок в серверной', 'Гарантия 15 лет на пассивное оборудование'],
    brands: ['Cisco', 'Legrand', 'Zyxel', 'Panduit'],
    icon: 'Network',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'security',
    type: ServiceType.Security,
    title: 'Видеонаблюдение и безопасность',
    shortDescription: 'Интеллектуальный контроль доступа и видеонаблюдение.',
    problem: 'Слепые зоны на объекте, отсутствие удаленного контроля, риск несанкционированного проникновения.',
    solution: 'Системы видеонаблюдения с видеоаналитикой и СКУД для полного контроля 24/7.',
    scope: ['Подбор камер под задачи', 'Монтаж кабельных линий', 'Настройка серверов и регистраторов', 'Обучение персонала'],
    benefits: ['Контроль со смартфона', 'Распознавание лиц и номеров', 'Облачное хранение архива'],
    brands: ['Hikvision', 'Dahua', 'Axis', 'Ajax'],
    icon: 'ShieldCheck',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'smart-home',
    type: ServiceType.SmartHome,
    title: 'Умный дом и автоматизация',
    shortDescription: 'Управление комфортом одним касанием.',
    problem: 'Сложное управление климатом, светом и шторами, избыточное энергопотребление.',
    solution: 'Единая экосистема автоматизации, объединяющая все инженерные системы в интуитивный интерфейс.',
    scope: ['Разработка концепции', 'Монтаж исполнительных устройств', 'Программирование сценариев', 'Интеграция с голосовыми помощниками'],
    benefits: ['Экономия ресурсов до 30%', 'Персонализированные сценарии', 'Удаленное управление'],
    brands: ['HDL', 'Xiaomi', 'KNX', 'Loxone'],
    icon: 'Cpu',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'electrical',
    type: ServiceType.Electrical,
    title: 'Электромонтажные работы',
    shortDescription: 'Надежное электроснабжение любого объекта.',
    problem: 'Перегрузки сети, ненадежная проводка, отсутствие защиты от скачков напряжения.',
    solution: 'Профессиональный электромонтаж с соблюдением всех норм ПУЭ и ГОСТ.',
    scope: ['Сборка электрощитов', 'Черновой монтаж кабеля', 'Установка чистовой электрики', 'Испытания электролаборатории'],
    benefits: ['Пожарная безопасность', 'Равномерное распределение нагрузки', 'Долговечность соединений'],
    brands: ['ABB', 'Schneider Electric', 'Legrand'],
    icon: 'Zap',
    image: 'https://images.unsplash.com/photo-1621905252507-b35220adcfba?auto=format&fit=crop&q=80&w=800'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Офис 300 кв.м. Технологический хаб',
    type: ServiceType.SCS,
    objectType: 'Office',
    description: 'Монтаж СКС на 120 портов и бесшовного Wi-Fi покрытия.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    tags: ['СКС', 'Wi-Fi 6', 'Серверная']
  },
  {
    id: 'p2',
    title: 'Загородная резиденция "Modern House"',
    type: ServiceType.SmartHome,
    objectType: 'House',
    description: 'Полная автоматизация освещения, отопления и системы безопасности.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    tags: ['Умный дом', 'KNX', 'Сценарное освещение']
  },
  {
    id: 'p3',
    title: 'ЖК "Премьер" - Квартира 120м2',
    type: ServiceType.Electrical,
    objectType: 'Apartment',
    description: 'Дизайнерский электромонтаж и установка системы защиты от протечек.',
    image: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?auto=format&fit=crop&q=80&w=800',
    tags: ['Электрика', 'Защита от протечек']
  },
  {
    id: 'p4',
    title: 'Складской комплекс Logistics Pro',
    type: ServiceType.Security,
    objectType: 'Commercial',
    description: 'Система периметрального видеонаблюдения и контроля доступа.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    tags: ['CCTV', 'СКУД', 'Безопасность']
  }
];

export const FEATURES: Feature[] = [
  {
    title: 'Комплексный подход',
    description: 'Все системы от одного подрядчика — они идеально совместимы друг с другом.',
    icon: <Layers className="w-8 h-8 text-blue-500" />
  },
  {
    title: 'Опытные инженеры',
    description: 'Сертифицированные специалисты с высшим техническим образованием.',
    icon: <UserCheck className="w-8 h-8 text-blue-500" />
  },
  {
    title: 'Гарантия и сервис',
    description: 'Длительная гарантия на работы и оперативная техническая поддержка.',
    icon: <ShieldAlert className="w-8 h-8 text-blue-500" />
  },
  {
    title: 'Честная смета',
    description: 'Фиксированная цена по договору, без скрытых платежей и доплат.',
    icon: <FileText className="w-8 h-8 text-blue-500" />
  },
  {
    title: 'Собственный склад',
    description: 'Все необходимое оборудование всегда в наличии для быстрого старта.',
    icon: <Warehouse className="w-8 h-8 text-blue-500" />
  },
  {
    title: 'Под ключ',
    description: 'От проектирования до сдачи объекта с полным пакетом документации.',
    icon: <Zap className="w-8 h-8 text-blue-500" />
  }
];

export const COMPANY_CONTACTS = {
  phone: '+7 (921) 183-11-92',
  email: 'turingshift@yandex.com',
  address: 'г. Санкт-Петербург, ул. Оптиков, д. 34 корпус 2, квартира 316',
  workingHours: {
    weekdays: '09:00 - 19:00',
    weekend: 'Выходные'
  }
};
