
import React from 'react';
import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook } from 'lucide-react';
import { COMPANY_CONTACTS } from '../constants';

interface FooterProps {
  darkMode: boolean;
  setPage: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ darkMode, setPage }) => {
  return (
    <footer className={`${darkMode ? 'bg-gray-950 text-gray-400 border-t border-gray-900' : 'bg-gray-50 text-gray-600 border-t border-gray-200'} py-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <span className={`text-2xl font-extrabold tracking-tighter ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              INGENIOUS <span className="text-blue-500">SYSTEMS</span>
            </span>
            <p className="mt-6 text-sm leading-relaxed">
              Ваш технологический партнер в мире инженерных решений. Мы создаем будущее, обеспечивая комфорт и безопасность сегодня.
            </p>
            <div className="mt-8 flex space-x-4">
              <a href="#" className="hover:text-blue-500 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-blue-500 transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-blue-500 transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className={`text-sm font-bold uppercase tracking-wider mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Услуги</h4>
            <ul className="space-y-4 text-sm">
              <li><button onClick={() => setPage('service-scs')} className="hover:text-blue-500">Монтаж СКС</button></li>
              <li><button onClick={() => setPage('service-security')} className="hover:text-blue-500">Видеонаблюдение</button></li>
              <li><button onClick={() => setPage('service-smart-home')} className="hover:text-blue-500">Умный дом</button></li>
              <li><button onClick={() => setPage('service-electrical')} className="hover:text-blue-500">Электромонтаж</button></li>
            </ul>
          </div>

          <div>
            <h4 className={`text-sm font-bold uppercase tracking-wider mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Компания</h4>
            <ul className="space-y-4 text-sm">
              <li><button onClick={() => setPage('about')} className="hover:text-blue-500">О нас</button></li>
              <li><button onClick={() => setPage('portfolio')} className="hover:text-blue-500">Наши работы</button></li>
              <li><button onClick={() => setPage('contacts')} className="hover:text-blue-500">Контакты</button></li>
              <li><button className="hover:text-blue-500">Вакансии</button></li>
            </ul>
          </div>

          <div>
            <h4 className={`text-sm font-bold uppercase tracking-wider mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Контакты</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-blue-500" />
                <span>{COMPANY_CONTACTS.phone}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-blue-500" />
                <span>{COMPANY_CONTACTS.email}</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin size={16} className="text-blue-500" />
                <span>{COMPANY_CONTACTS.address}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className={`mt-16 pt-8 border-t ${darkMode ? 'border-gray-900' : 'border-gray-200'} text-xs text-center`}>
          <p>© {new Date().getFullYear()} Ingenious Systems. Все права защищены. Инженерные решения под ключ.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
