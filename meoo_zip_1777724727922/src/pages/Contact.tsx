import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Mail, Send } from 'lucide-react';
import { LanguageContext } from '../App';
import { supabase } from '../supabase/client';

const translations = {
  title: { zh: '联系我们', en: 'Contact Us' },
  subtitle: { zh: '期待您的光临', en: 'We Look Forward to Your Visit' },
  address: { zh: '地址', en: 'Address' },
  phone: { zh: '电话', en: 'Phone' },
  hours: { zh: '营业时间', en: 'Opening Hours' },
  email: { zh: '邮箱', en: 'Email' },
  bookTable: { zh: '预订座位', en: 'Book a Table' },
  name: { zh: '姓名', en: 'Name' },
  date: { zh: '日期', en: 'Date' },
  time: { zh: '时间', en: 'Time' },
  guests: { zh: '人数', en: 'Guests' },
  message: { zh: '留言', en: 'Message' },
  submit: { zh: '提交预订', en: 'Submit Booking' },
  success: { zh: '预订成功！我们会尽快联系您。', en: 'Booking successful! We will contact you soon.' },
};

export default function Contact() {
  const { lang } = React.useContext(LanguageContext);
  const t = (key: string) => translations[key][lang];
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: '2',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error: submitError } = await supabase.from('reservations').insert({
        name: formData.name,
        email: formData.email,
        date: formData.date,
        time: formData.time,
        guests: parseInt(formData.guests),
        message: formData.message,
        status: 'pending',
      });

      if (submitError) throw submitError;

      // 尝试发送邮件通知（不阻塞主流程）
      try {
        await supabase.functions.invoke('send-booking-email', {
          body: {
            name: formData.name,
            email: formData.email,
            date: formData.date,
            time: formData.time,
            guests: parseInt(formData.guests),
            message: formData.message,
          },
        });
      } catch (emailErr) {
        console.log('Email notification skipped:', emailErr);
      }

      setSubmitted(true);
    } catch (err) {
      setError(lang === 'zh' ? '预订失败，请重试' : 'Booking failed, please try again');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream pt-20">
      <div className="relative h-[40vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-cream z-10" />
        <img
          src="https://conversation.cdn.meoo.host/conversations/306804809288265728/image/2026-04-28/1777413885843-环境.JPG?auth_key=c3073d081e826164de2ae27ca48ea257ea193e96b89b36a4b41999d91e8ad11c"
          alt="Restaurant"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-cream mb-4">{t('title')}</h1>
            <p className="text-xl text-cream/80">{t('subtitle')}</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="bg-cream-dark rounded-2xl p-8 border border-burgundy/10">
              <h2 className="text-2xl font-bold text-burgundy mb-8">{t('title')}</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-burgundy/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-burgundy" size={24} />
                  </div>
                  <div>
                    <h3 className="text-burgundy font-semibold mb-1">{t('address')}</h3>
                    <p className="text-burgundy/60">Maršala Birjuzova 7, Belgrade 11000, Serbia</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-burgundy/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="text-burgundy" size={24} />
                  </div>
                  <div>
                    <h3 className="text-burgundy font-semibold mb-1">{t('phone')}</h3>
                    <p className="text-burgundy/60">+381 69 841 8888</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-burgundy/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="text-burgundy" size={24} />
                  </div>
                  <div>
                    <h3 className="text-burgundy font-semibold mb-1">{t('email')}</h3>
                    <p className="text-burgundy/60">benjiabbq@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-burgundy/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="text-burgundy" size={24} />
                  </div>
                  <div>
                    <h3 className="text-burgundy font-semibold mb-1">{t('hours')}</h3>
                    <p className="text-burgundy/60">Mon - Sun: 11:00 - 23:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-cream-dark rounded-2xl p-4 h-80 border border-burgundy/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.789123456789!2d20.4557269!3d44.8147033!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7b07fea2d7ed%3A0xeba10e666680dcd2!2sBenjia%20korean%20bbq%20%7C%20%E6%9C%AC%E5%AE%B6%E9%9F%A9%E5%BC%8F%E7%83%A4%E8%82%89!5e0!3m2!1sen!2srs!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-cream-dark rounded-2xl p-8 border border-burgundy/10">
              <h2 className="text-2xl font-bold text-burgundy mb-8">{t('bookTable')}</h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-burgundy/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="text-burgundy" size={32} />
                  </div>
                  <p className="text-burgundy text-lg">{t('success')}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                      {error}
                    </div>
                  )}
                  <div>
                    <label className="block text-burgundy/60 text-sm mb-2">{t('name')}</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-cream border border-burgundy/20 rounded-xl px-4 py-3 text-burgundy focus:border-burgundy focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-burgundy/60 text-sm mb-2">{t('email')}</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-cream border border-burgundy/20 rounded-xl px-4 py-3 text-burgundy focus:border-burgundy focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-burgundy/60 text-sm mb-2">{t('date')}</label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-cream border border-burgundy/20 rounded-xl px-4 py-3 text-burgundy focus:border-burgundy focus:outline-none transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-burgundy/60 text-sm mb-2">{t('time')}</label>
                      <input
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full bg-cream border border-burgundy/20 rounded-xl px-4 py-3 text-burgundy focus:border-burgundy focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-burgundy/60 text-sm mb-2">{t('guests')}</label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full bg-cream border border-burgundy/20 rounded-xl px-4 py-3 text-burgundy focus:border-burgundy focus:outline-none transition-colors"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                        <option key={n} value={n}>{n} {lang === 'zh' ? '人' : 'People'}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-burgundy/60 text-sm mb-2">{t('message')}</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full bg-cream border border-burgundy/20 rounded-xl px-4 py-3 text-burgundy focus:border-burgundy focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-burgundy hover:bg-burgundy-light text-cream font-semibold py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <span>{lang === 'zh' ? '提交中...' : 'Submitting...'}</span>
                    ) : (
                      <>
                        <Send size={20} />
                        {t('submit')}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
