import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MapPin, Phone, Clock, Instagram, Facebook } from 'lucide-react';
import Home from './pages/Home';
import MenuPage from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';
import FoodPhoto from './pages/FoodPhoto';
import Admin from './pages/Admin';
import AdminMenu from './pages/AdminMenu';
import AdminReservations from './pages/AdminReservations';
import AdminContent from './pages/AdminContent';
import './styles/app.css';

type Language = 'zh' | 'en';

interface Translations {
  [key: string]: {
    zh: string;
    en: string;
  };
}

export const translations: Translations = {
  home: { zh: '首页', en: 'Home' },
  menu: { zh: '菜单', en: 'Menu' },
  foodPhoto: { zh: '漂亮饭', en: 'Food Photo' },
  about: { zh: '关于我们', en: 'About' },
  contact: { zh: '联系我们', en: 'Contact' },
  bookTable: { zh: '预订座位', en: 'Book a Table' },
  brandName: { zh: '本家', en: 'BEN JIA' },
  subtitle: { zh: '韩式烤肉', en: 'Korean BBQ' },
  admin: { zh: '管理', en: 'Admin' },
};

export const LanguageContext = React.createContext<{
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}>({ lang: 'en', setLang: () => {}, t: () => '' });

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { lang, setLang, t } = React.useContext(LanguageContext);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'home' },
    { path: '/menu', label: 'menu' },
    { path: '/about', label: 'about' },
    { path: '/food-photo', label: 'foodPhoto' },
    { path: '/contact', label: 'contact' },
    { path: '/admin', label: 'admin' },
  ];

  const getNavBg = () => {
    if (isHome && !isScrolled) return 'bg-transparent';
    return 'bg-cream shadow-sm';
  };

  const getTextColor = () => {
    if (isHome && !isScrolled) return 'text-cream';
    return 'text-burgundy';
  };

  const getHoverColor = () => {
    if (isHome && !isScrolled) return 'hover:text-cream/80';
    return 'hover:text-burgundy-light';
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${getNavBg()}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            <img src="https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777415310018-ChatGPT_Image_2026年4月29日_00_10_56.png?auth_key=10ef7509b675a1434f3397c9fe0c17094d7d60239e497b4ef6da74200197ed6d" alt="BENJIA GRILL" className={`h-12 w-auto object-contain ${isHome && !isScrolled ? 'brightness-0 invert' : ''}`} />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-300 ${
                  location.pathname === item.path
                    ? isHome && !isScrolled ? 'text-cream border-b border-cream' : 'text-burgundy border-b border-burgundy'
                    : `${getTextColor()} ${getHoverColor()}`
                }`}
              >
                {t(item.label)}
              </Link>
            ))}

            <div className={`flex items-center space-x-2 border-l pl-6 ${isHome && !isScrolled ? 'border-cream/20' : 'border-burgundy/20'}`}>
              <button
                onClick={() => setLang('zh')}
                className={`text-sm font-medium transition-colors ${
                  lang === 'zh'
                    ? isHome && !isScrolled ? 'text-cream' : 'text-burgundy'
                    : isHome && !isScrolled ? 'text-cream/60 hover:text-cream' : 'text-burgundy/40 hover:text-burgundy'
                }`}
              >
                中文
              </button>
              <span className={isHome && !isScrolled ? 'text-cream/30' : 'text-burgundy/30'}>|</span>
              <button
                onClick={() => setLang('en')}
                className={`text-sm font-medium transition-colors ${
                  lang === 'en'
                    ? isHome && !isScrolled ? 'text-cream' : 'text-burgundy'
                    : isHome && !isScrolled ? 'text-cream/60 hover:text-cream' : 'text-burgundy/40 hover:text-burgundy'
                }`}
              >
                EN
              </button>
            </div>

            <Link
              to="/contact"
              className={`text-sm font-medium transition-all duration-300 ${
                isHome && !isScrolled
                  ? 'bg-cream text-burgundy px-6 py-2 hover:bg-cream-dark'
                  : 'bg-burgundy text-cream px-6 py-2 hover:bg-burgundy-light'
              }`}
            >
              {t('bookTable')}
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 ${getTextColor()}`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cream shadow-lg"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block text-lg font-medium ${
                    location.pathname === item.path
                      ? 'text-burgundy'
                      : 'text-burgundy/60 hover:text-burgundy'
                  }`}
                >
                  {t(item.label)}
                </Link>
              ))}
              <div className="flex items-center space-x-4 pt-4 border-t border-burgundy/10">
                <button
                  onClick={() => setLang('zh')}
                  className={`text-sm font-medium ${
                    lang === 'zh' ? 'text-burgundy' : 'text-burgundy/40'
                  }`}
                >
                  中文
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`text-sm font-medium ${
                    lang === 'en' ? 'text-burgundy' : 'text-burgundy/40'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function Footer() {
  const { t } = React.useContext(LanguageContext);

  return (
    <footer className="bg-burgundy text-cream py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <img src="https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777415271043-ChatGPT_Image_2026年4月29日_00_10_56.png?auth_key=b9aa4ea8820761e553613a6bc6bb451c256e9945994b231cd864a425da61eed1" alt="BENJIA GRILL" className="h-16 w-auto object-contain brightness-0 invert" />
            <p className="text-cream/60 text-sm">
              Authentic Korean BBQ experience in Serbia
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-cream">{t('contact')}</h4>
            <div className="space-y-2 text-cream/60 text-sm">
              <p className="flex items-center gap-2">
                <MapPin size={16} className="text-cream" />
                Belgrade, Serbia
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} className="text-cream" />
                +381 69 841 8888
              </p>
              <p className="flex items-center gap-2">
                <Clock size={16} className="text-cream" />
                Daily 11:00 - 23:00
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-cream">{t('menu')}</h4>
            <ul className="space-y-2 text-cream/60 text-sm">
              <li><Link to="/menu" className="hover:text-cream transition-colors">Table BBQ</Link></li>
              <li><Link to="/menu" className="hover:text-cream transition-colors">Dishes</Link></li>
              <li><Link to="/menu" className="hover:text-cream transition-colors">Drink & Dessert</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-cream">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/benjia.bg/" target="_blank" rel="noopener noreferrer" className="text-cream/60 hover:text-cream transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://www.facebook.com/share/18caFH2CrF/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-cream/60 hover:text-cream transition-colors">
                <Facebook size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-cream/10 mt-12 pt-8 text-center text-cream/40 text-sm">
          © 2024 BEN JIA Korean BBQ. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function MainLayout() {
  return (
    <div className="min-h-screen bg-cream">
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/food-photo" element={<FoodPhoto />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function AdminLayout() {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="/menu" element={<AdminMenu />} />
      <Route path="/reservations" element={<AdminReservations />} />
      <Route path="/content" element={<AdminContent />} />
    </Routes>
  );
}

function App() {
  const [lang, setLang] = useState<Language>('en');

  const t = (key: string) => translations[key]?.[lang] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <HashRouter>
        <Routes>
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </HashRouter>
    </LanguageContext.Provider>
  );
}

export default App;
