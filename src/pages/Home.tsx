import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Calendar } from 'lucide-react';
import { LanguageContext } from '../App';

const features = [
  {
    char: { zh: '炭', en: '炭' },
    title: { zh: 'Charcoal Fire', en: 'Charcoal Fire' },
    desc: {
      zh: '精选优质炭火，稳定高温与纯净火力，激发肉的香气与灵魂风味。',
      en: 'Premium charcoal fire, delivering steady heat and pure flame to unlock the true aroma of the meat.'
    }
  },
  {
    char: { zh: '鮮', en: '鮮' },
    title: { zh: 'Daily Fresh', en: 'Daily Fresh' },
    desc: {
      zh: '每日精选新鲜肉品，严选优质食材，从厨房到餐桌，保留最原始的鲜美风味。',
      en: 'Premium cuts selected fresh every day, bringing pure flavor and authentic taste from kitchen to table.'
    }
  },
  {
    char: { zh: '匠', en: '匠' },
    title: { zh: 'Authentic Taste', en: 'Authentic Taste' },
    desc: {
      zh: '坚持传统韩式烤肉技法，用时间与火候，呈现每一份肉的最佳状态。',
      en: 'Traditional Korean grilling techniques, perfecting every cut with precise timing, fire, and craftsmanship.'
    }
  },
  {
    char: { zh: '心', en: '心' },
    title: { zh: 'Heartfelt Service', en: 'Heartfelt Service' },
    desc: {
      zh: '不仅是用餐，更是一场体验。从服务到细节，让每一位客人感受到真正的韩式待客之道。',
      en: 'More than a meal — it\'s an experience. From service to every detail, we deliver true Korean hospitality.'
    }
  }
];

const highlights = [
  { name: { zh: '冠军套餐', en: 'MEAT SET' }, price: '5,880 RSD', tag: { zh: '人气推荐', en: 'Popular' }, image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777392669383-%E5%86%A0%E5%86%9B%E5%A5%97%E9%A4%902.JPG?auth_key=1ab2d51407abc9ed225776fbf2ccd794c607780f698cccb11e6ff403c7086f39' },
  { name: { zh: '猪五花', en: 'PORK BELLY' }, price: '1,280 RSD', tag: { zh: '经典必点', en: 'Classic' }, image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-27/1777319547423-%E7%8C%AA%E4%BA%94%E8%8A%B12.JPEG?auth_key=01219e9bd693ebe2118385f64c7b28eb5839b69cd9dbfeb4680bdc1354660751' },
  { name: { zh: '芝士熔岩火辣鸡', en: 'CHEESE SPICY CHICKEN' }, price: '1,580 RSD', tag: { zh: '招牌菜', en: 'Signature' }, image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777390496104-%E8%8A%9D%E5%A3%AB%E7%86%94%E5%B2%A9%E7%81%AB%E8%BE%A3%E9%B8%A12.JPG?auth_key=770c8957bd7acb492e31bae956925fccd5236ac8aca7fd2990a0a7c0dbc2f5b5' },
  { name: { zh: '石锅拌饭', en: 'BIBIMBAP' }, price: '1,080 RSD', tag: { zh: '人气推荐', en: 'Popular' }, image: 'https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777389052982-%E7%9F%B3%E9%94%85%E6%8B%8C%E9%A5%AD2.JPG?auth_key=9c9e63c5065a939778abfdacffe2a47d1d1b1f1a4ea9c7879933903bef62b818' },
];

export default function Home() {
  const { lang, t } = React.useContext(LanguageContext);

  return (
    <div className="page-transition">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream">
        <div className="absolute inset-0 bg-[url('https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-05-02/1777720465529-d9c6f4c207340090f42bdd9da8833170.JPG?auth_key=3828fd89d19112e5c7b5bd04e1adc1aaa6e850c93d52d94b1ee16319a9efec0a')] bg-cover bg-center sm:bg-cover sm:bg-center bg-contain bg-top" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <img src="https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777415343814-ChatGPT_Image_2026年4月29日_00_10_56.png?auth_key=ef09c8a3d5bb8de3e6b0088e43eb620616cbce83a5f30da71fc6d635fed13c3d" alt="BENJIA GRILL" className="h-20 sm:h-28 md:h-40 w-auto object-contain mx-auto mb-6 sm:mb-8 brightness-0 invert" />
            <h1 className="text-white text-lg sm:text-xl md:text-2xl font-light tracking-widest mb-3 sm:mb-4 uppercase px-2">
              {lang === 'zh' ? '正宗韩式烤肉' : 'Authentic Korean BBQ'}
            </h1>
            <p className="text-white/80 text-base sm:text-lg md:text-xl mb-8 sm:mb-12 font-light tracking-wide px-2">
              {lang === 'zh' ? '塞尔维亚 · 贝尔格莱德' : 'Belgrade, Serbia'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link to="/contact" className="group inline-flex items-center justify-center gap-2 bg-cream text-burgundy px-6 sm:px-10 py-3 sm:py-4 text-xs sm:text-sm font-medium tracking-wider uppercase hover:bg-cream-dark transition-all duration-300">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                {lang === 'zh' ? '预订座位' : 'Reserve a Table'}
              </Link>
              <Link to="/menu" className="group inline-flex items-center justify-center gap-2 border-2 border-cream text-cream px-6 sm:px-10 py-3 sm:py-4 text-xs sm:text-sm font-medium tracking-wider uppercase hover:bg-cream hover:text-burgundy transition-all duration-300">
                {t('menu')}
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-light text-burgundy mb-4 tracking-wide"
            >
              {lang === 'zh' ? '难忘的体验' : 'An Unforgettable Experience'}
            </motion.h2>
            <div className="w-16 h-px bg-burgundy/30 mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 md:gap-12">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 mx-auto mb-6 border-2 border-burgundy/20 rounded-full flex items-center justify-center group-hover:border-burgundy group-hover:bg-burgundy transition-all duration-300">
                  <span className="text-3xl font-bold text-burgundy group-hover:text-cream transition-colors">{f.char[lang]}</span>
                </div>
                <h3 className="text-sm font-medium text-burgundy mb-2 tracking-wide uppercase">{f.title[lang]}</h3>
                <p className="text-burgundy/60 text-sm leading-relaxed">{f.desc[lang]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-cream-dark">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-light text-burgundy mb-4 tracking-wide"
            >
              {lang === 'zh' ? '精选菜品' : 'Featured Dishes'}
            </motion.h2>
            <div className="w-16 h-px bg-burgundy/30 mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-cream overflow-hidden border border-burgundy/10"
              >
                <div className="h-56 bg-cream-dark flex items-center justify-center overflow-hidden">
                  {item.image ? (
                    <img src={item.image} alt={item.name[lang]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <span className="text-4xl text-burgundy/20 font-bold">{item.name[lang][0]}</span>
                  )}
                </div>
                <div className="p-5 text-center">
                  <span className="text-xs text-burgundy/50 tracking-wider uppercase">{item.tag[lang]}</span>
                  <h3 className="font-medium text-burgundy mt-2 mb-1">{item.name[lang]}</h3>
                  <p className="text-burgundy font-semibold">{item.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/menu" className="inline-flex items-center gap-2 text-burgundy hover:text-burgundy-light font-medium text-sm tracking-wider uppercase transition-colors">
              {lang === 'zh' ? '查看完整菜单' : 'View Full Menu'}
              <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-burgundy">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-light text-cream mb-4 tracking-wide">
              {lang === 'zh' ? '预订您的座位' : 'Reserve Your Table'}
            </h2>
            <p className="text-cream/60 mb-10 font-light">
              {lang === 'zh' ? '体验正宗韩式烤肉，享受美好时光' : 'Experience authentic Korean BBQ with us'}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-cream text-burgundy px-12 py-4 text-sm font-medium tracking-wider uppercase hover:bg-cream-dark transition-all duration-300"
            >
              <Calendar className="w-4 h-4" />
              {lang === 'zh' ? '立即预订' : 'Book Now'}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
