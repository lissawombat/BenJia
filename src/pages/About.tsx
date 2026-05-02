import React from 'react';
import { motion } from 'framer-motion';
import { LanguageContext } from '../App';

const content = {
  hero: {
    zh: { title: '关于本家', subtitle: '传承正宗韩式烤肉文化' },
    en: { title: 'About BEN JIA', subtitle: 'Authentic Korean BBQ Heritage' }
  },
  story: {
    zh: {
      title: '品牌故事',
      paragraphs: [
        '欢迎来到本家（BEN JIA），在这里，正宗韩式烤肉与贝尔格莱德对烧烤的热爱相遇。',
        '我们的名字「本家」意为「原始之家」——一个传统开始、风味保持真实的地方。受到真正韩式用餐方式的启发，我们带来的不仅仅是食物，更是一种文化。',
        '在韩国，烤肉不仅仅是关于肉。它是关于围坐在烤架旁，包裹新鲜蔬菜，蘸入浓郁酱汁，一起分享每一口。它是温暖的、互动的、充满生命力的。',
        '在贝尔格莱德，这里的人们已经热爱烧烤，我们提供不同的体验——一种全新的体验方式。',
        '从在您桌边烤制的优质肉品，到经典韩式配菜和酱汁，每一个细节都旨在为您提供真正的韩式烤肉体验。',
        '这不是快餐。这不仅仅是一顿晚餐。这就是韩式烤肉，它本该如此。',
        '所以请坐下，拿起您的夹子——体验韩式烧烤。'
      ]
    },
    en: {
      title: 'Our Story',
      paragraphs: [
        'Welcome to BEN JIA, where authentic Korean BBQ meets Belgrade\'s love for grilling.',
        'Our name, BEN JIA, means "original home" — a place where tradition begins and flavors stay true. Inspired by the real Korean way of eating, we bring more than just food to the table — we bring a culture.',
        'In Korea, BBQ isn\'t just about meat. It\'s about gathering around the grill, wrapping fresh vegetables, dipping into rich sauces, and sharing every bite together. It\'s warm, interactive, and full of life.',
        'Here in Belgrade, where grilling is already loved, we offer something different — a new way to experience it.',
        'From premium cuts grilled right at your table, to classic Korean side dishes and sauces, every detail is designed to give you a true Korean BBQ experience.',
        'This is not fast food. This is not just dinner. This is Korean BBQ, the way it\'s meant to be.',
        'So sit down, grab your tongs — and experience grilling, the Korean way.'
      ]
    }
  }
};

export default function About() {
  const { lang } = React.useContext(LanguageContext);
  const t = (key: string) => content[key][lang];

  return (
    <div className="page-transition">
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-burgundy/60 via-burgundy/40 to-cream" />
        <div className="absolute inset-0 bg-[url('https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777398619152-8eab28402493b6c05cddabfc60dafa0a.JPG?auth_key=7d2fb03db7b5372a8fc73ccedfed16057bc1592527a79c207fe2f9f07a44d070')] bg-cover bg-center opacity-40 blur-sm" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-4"
        >
          <img src="https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777415389538-ChatGPT_Image_2026年4月29日_00_10_56.png?auth_key=cf0e27479f206593b3ee1451e8f3dd85e1796b22c4cff28ce1e042ed25c7a5d3" alt="BENJIA GRILL" className="h-20 md:h-28 w-auto object-contain mx-auto mb-4 brightness-0 invert" />
          <p className="text-xl md:text-2xl text-cream/80">{t('hero').subtitle}</p>
        </motion.div>
      </section>

      <section className="py-20 px-4 bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-burgundy mb-8">{t('story').title}</h2>
              <div className="space-y-4 font-sans">
                {t('story').paragraphs.map((paragraph: string, index: number) => (
                  <p key={index} className="text-gray-700 text-base leading-relaxed">
                    {index === 0 ? (
                      <>
                        Welcome to <span className="font-bold text-gray-900">BEN JIA</span>, where <span className="font-bold text-gray-900">authentic Korean BBQ</span> meets Belgrade&apos;s love for grilling.
                      </>
                    ) : (
                      paragraph
                    )}
                  </p>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2 relative"
            >
              <div className="relative w-full aspect-[4/3]">
                <div className="absolute top-0 right-0 w-[70%] h-[80%] bg-gray-200 rounded-lg overflow-hidden shadow-xl">
                  <img
                    src="https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777414677768-ChatGPT_Image_2026年4月28日_23_58_53.png?auth_key=f98c1d5b9902ae9d81eda082f5e2042d56313335bb1edf8af12cd0c11fe0ab54"
                    alt="Korean Street"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-0 w-[65%] h-[70%] bg-gray-200 rounded-lg overflow-hidden shadow-xl">
                  <img
                    src="https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777415144732-ChatGPT_Image_2026年4月29日_00_25_21.png?auth_key=3bdc3e4bcf26082382ec5d8e3b250d35fa1f375844fc9798d294be434b1bda20"
                    alt="Korean BBQ Dining"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
