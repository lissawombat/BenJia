import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Globe } from 'lucide-react';
import { supabase } from '../supabase/client';

interface ContentItem {
  id: string;
  key: string;
  content_zh: string;
  content_en: string;
}

export default function AdminContent() {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lang, setLang] = useState<'zh' | 'en'>('zh');

  useEffect(() => {
    loadContents();
  }, []);

  async function loadContents() {
    const { data } = await supabase.from('site_content').select('*').order('key');
    setContents(data || []);
    setLoading(false);
  }

  async function saveContent(id: string, value: string) {
    setSaving(true);
    await supabase
      .from('site_content')
      .update({ [lang === 'zh' ? 'content_zh' : 'content_en']: value })
      .eq('id', id);
    setSaving(false);
  }

  if (loading) return <div className="p-8 text-white">加载中...</div>;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">网站内容管理</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setLang('zh')}
            className={`px-4 py-2 rounded-lg ${lang === 'zh' ? 'bg-amber-600' : 'bg-zinc-700'} text-white`}
          >
            <Globe className="w-4 h-4 inline mr-2" />中文
          </button>
          <button
            onClick={() => setLang('en')}
            className={`px-4 py-2 rounded-lg ${lang === 'en' ? 'bg-amber-600' : 'bg-zinc-700'} text-white`}
          >
            <Globe className="w-4 h-4 inline mr-2" />English
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {contents.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900 rounded-xl p-6"
          >
            <label className="text-amber-500 text-sm font-medium mb-2 block">{item.key}</label>
            <textarea
              defaultValue={lang === 'zh' ? item.content_zh : item.content_en}
              onBlur={(e) => saveContent(item.id, e.target.value)}
              rows={3}
              className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
            />
          </motion.div>
        ))}
      </div>

      {saving && (
        <div className="fixed bottom-4 right-4 bg-amber-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Save className="w-4 h-4" />保存中...
        </div>
      )}
    </div>
  );
}
