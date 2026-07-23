
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import { COMPANY_CONTACTS } from '../constants';

interface ContactsProps {
  darkMode: boolean;
}

const Contacts: React.FC<ContactsProps> = ({ darkMode }) => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formState.name.trim() || !formState.phone.trim() || !formState.message.trim()) {
      setMessage({ type: 'error', text: 'Пожалуйста, заполните все поля' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`${API_URL}/api/inquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formState.name.trim(),
          phone: formState.phone.trim(),
          message: formState.message.trim()
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage({ 
          type: 'success', 
          text: 'Спасибо! Мы свяжемся с вами в ближайшее время.' 
        });
        setFormState({ name: '', phone: '', message: '' });
      } else {
        setMessage({ 
          type: 'error', 
          text: data.error || 'Ошибка при отправке запроса. Попробуйте позже.' 
        });
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: 'Ошибка подключения. Пожалуйста, позвоните нам напрямую. ' + COMPANY_CONTACTS.phone
      });
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`pt-24 pb-20 min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h1 className={`text-4xl md:text-5xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Обсудим ваш проект</h1>
            <p className={`text-lg mb-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Оставьте заявку, и наши инженеры помогут подобрать оптимальное решение под ваши задачи и бюджет.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-blue-600/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="text-blue-500" size={24} />
                </div>
                <div>
                  <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Телефон</h4>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{COMPANY_CONTACTS.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-blue-600/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="text-blue-500" size={24} />
                </div>
                <div>
                  <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Электронная почта</h4>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{COMPANY_CONTACTS.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-blue-600/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-blue-500" size={24} />
                </div>
                <div>
                  <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Офис</h4>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{COMPANY_CONTACTS.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-blue-600/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="text-blue-500" size={24} />
                </div>
                <div>
                  <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Режим работы</h4>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Пн — Пт: {COMPANY_CONTACTS.workingHours.weekdays}</p>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Сб — Вс: {COMPANY_CONTACTS.workingHours.weekend}</p>
                </div>
              </div>
            </div>
          </div>

          <div className={`p-10 rounded-3xl shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <h3 className={`text-2xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Быстрая заявка</h3>
            
            {message && (
              <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${
                message.type === 'success'
                  ? darkMode ? 'bg-green-900/20 border border-green-500/30' : 'bg-green-50 border border-green-200'
                  : darkMode ? 'bg-red-900/20 border border-red-500/30' : 'bg-red-50 border border-red-200'
              }`}>
                {message.type === 'success' ? (
                  <CheckCircle2 className={`${darkMode ? 'text-green-400' : 'text-green-600'} flex-shrink-0`} size={20} />
                ) : (
                  <AlertCircle className={`${darkMode ? 'text-red-400' : 'text-red-600'} flex-shrink-0`} size={20} />
                )}
                <p className={message.type === 'success' ? (darkMode ? 'text-green-300' : 'text-green-700') : (darkMode ? 'text-red-300' : 'text-red-700')}>
                  {message.text}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Ваше имя</label>
                <input 
                  type="text" 
                  required
                  disabled={loading}
                  className={`w-full px-5 py-4 rounded-xl outline-none border-2 transition-all ${
                    darkMode 
                      ? 'bg-gray-900 border-gray-700 text-white focus:border-blue-500 disabled:opacity-50' 
                      : 'bg-white border-gray-200 focus:border-blue-500 disabled:opacity-50'
                  }`}
                  placeholder="Иван Иванов"
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                />
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Телефон *</label>
                <input 
                  type="tel" 
                  required
                  disabled={loading}
                  className={`w-full px-5 py-4 rounded-xl outline-none border-2 transition-all ${
                    darkMode 
                      ? 'bg-gray-900 border-gray-700 text-white focus:border-blue-500 disabled:opacity-50' 
                      : 'bg-white border-gray-200 focus:border-blue-500 disabled:opacity-50'
                  }`}
                  placeholder="+7 (___) ___-__-__"
                  value={formState.phone}
                  onChange={(e) => setFormState({...formState, phone: e.target.value})}
                />
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Комментарий к проекту</label>
                <textarea 
                  rows={4}
                  required
                  disabled={loading}
                  className={`w-full px-5 py-4 rounded-xl outline-none border-2 transition-all ${
                    darkMode 
                      ? 'bg-gray-900 border-gray-700 text-white focus:border-blue-500 disabled:opacity-50' 
                      : 'bg-white border-gray-200 focus:border-blue-500 disabled:opacity-50'
                  }`}
                  placeholder="Опишите ваши пожелания..."
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                ></textarea>
              </div>
              <button 
                type="submit"
                disabled={loading}
                className={`w-full font-bold py-5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 ${
                  loading
                    ? 'bg-blue-600/50 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'
                } text-white`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Отправка...
                  </>
                ) : (
                  <>
                    Отправить запрос <Send size={20} />
                  </>
                )}
              </button>
              <p className="text-xs text-gray-500 text-center px-4">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности и обработки персональных данных.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
