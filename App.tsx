
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Contacts from './pages/Contacts';
import About from './pages/About';
import SmartHome from './pages/SmartHome';
import ServiceDetail from './pages/ServiceDetail';
import { SERVICES } from './constants';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    if (currentPage === 'home') return <Home darkMode={darkMode} setPage={setCurrentPage} />;
    if (currentPage === 'portfolio') return <Portfolio darkMode={darkMode} />;
    if (currentPage === 'contacts') return <Contacts darkMode={darkMode} />;
    if (currentPage === 'about') return <About darkMode={darkMode} setPage={setCurrentPage} />;
    
    // Smart Home dedicated page
    if (currentPage === 'service-smart-home') {
      return (
        <SmartHome 
          darkMode={darkMode} 
          onBack={() => setCurrentPage('home')} 
          onConsult={() => setCurrentPage('contacts')}
        />
      );
    }
    
    // Services routing
    if (currentPage.startsWith('service-')) {
      const serviceId = currentPage.split('-')[1];
      const service = SERVICES.find(s => s.id === serviceId);
      if (service) {
        return (
          <ServiceDetail 
            service={service} 
            darkMode={darkMode} 
            onBack={() => setCurrentPage('home')} 
            onConsult={() => setCurrentPage('contacts')}
          />
        );
      }
    }

    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-xl">Страница еще в разработке</p>
          <button 
            onClick={() => setCurrentPage('home')}
            className="mt-8 text-blue-500 underline"
          >
            Вернуться на главную
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-950' : 'bg-white'}`}>
      <Navbar 
        darkMode={darkMode} 
        toggleDarkMode={() => setDarkMode(!darkMode)} 
        currentPage={currentPage}
        setPage={setCurrentPage}
      />
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer darkMode={darkMode} setPage={setCurrentPage} />
      
      {/* Floating Action Button for Mobile Contacts */}
      <button 
        onClick={() => setCurrentPage('contacts')}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl z-40 animate-pulse"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
      </button>
    </div>
  );
};

export default App;
