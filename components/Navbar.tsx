
import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react';
import { SERVICES } from '../constants';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  currentPage: string;
  setPage: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode, currentPage, setPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Главная', id: 'home' },
    { name: 'Услуги', id: 'services', hasDropdown: true },
    { name: 'Наши работы', id: 'portfolio' },
    { name: 'О нас', id: 'about' },
    { name: 'Контакты', id: 'contacts' },
  ];

  const handleNavClick = (id: string) => {
    setPage(id);
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? (darkMode ? 'bg-gray-900/95 shadow-lg backdrop-blur-md py-2' : 'bg-white/95 shadow-md backdrop-blur-md py-2')
        : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
            <span className={`text-2xl font-extrabold tracking-tighter ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              INGENIOUS <span className="text-blue-500">SYSTEMS</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.id} className="relative group">
                <button
                  onClick={() => !link.hasDropdown && handleNavClick(link.id)}
                  onMouseEnter={() => link.hasDropdown && setServicesOpen(true)}
                  className={`flex items-center text-sm font-medium transition-colors ${
                    currentPage === link.id ? 'text-blue-500' : (darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-blue-600')
                  }`}
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown className="ml-1 w-4 h-4" />}
                </button>

                {link.hasDropdown && (
                  <div 
                    className={`absolute left-0 mt-2 w-64 rounded-xl shadow-2xl transition-all duration-200 transform origin-top-left ${
                      servicesOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-95 opacity-0 pointer-events-none'
                    } ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'}`}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <div className="py-2">
                      {SERVICES.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => {
                            setPage(`service-${service.id}`);
                            setServicesOpen(false);
                          }}
                          className={`block w-full text-left px-4 py-3 text-sm transition-colors ${
                            darkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                          }`}
                        >
                          {service.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600'}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button 
              onClick={() => handleNavClick('contacts')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-blue-500/20"
            >
              Консультация
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? 'text-yellow-400' : 'text-gray-600'}`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={darkMode ? 'text-gray-300' : 'text-gray-600'}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-screen border-t' : 'max-h-0'} ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-100'}`}>
        <div className="px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <div key={link.id}>
              <button
                onClick={() => handleNavClick(link.id)}
                className={`block w-full text-left px-3 py-4 text-base font-semibold ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                {link.name}
              </button>
              {link.hasDropdown && (
                <div className="pl-6 space-y-1">
                  {SERVICES.map(s => (
                    <button
                      key={s.id}
                      onClick={() => handleNavClick(`service-${s.id}`)}
                      className={`block w-full text-left px-3 py-3 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                    >
                      {s.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button 
            onClick={() => handleNavClick('contacts')}
            className="w-full bg-blue-600 text-white px-4 py-4 rounded-xl font-bold"
          >
            Связаться с нами
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
