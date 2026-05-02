import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { supabase } from '../supabase/client';

interface MenuItem {
  id: string;
  name_zh: string;
  name_en: string;
  price: string;
  desc_zh: string;
  desc_en: string;
  image: string;
  category: string;
  is_active: boolean;
}

const categories = ['bbq', 'marinated', 'sides', 'drinks'];

export default function AdminMenu() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [form, setForm] = useState({
    name_zh: '',
    name_en: '',
    price: '',
    desc_zh: '',
    desc_en: '',
    image: '',
    category: 'bbq',
    is_active: true,
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    const { data } = await supabase.from('menu_items').select('*').order('created_at', { ascending: false });
    if (data) setItems(data);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('menu-images')
      .upload(fileName, file);

    if (uploadError) {
      alert('上传失败: ' + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('menu-images')
      .getPublicUrl(fileName);

    setForm({ ...form, image: publicUrl });
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (editingItem) {
      await supabase.from('menu_items').update(form).eq('id', editingItem.id);
    } else {
      await supabase.from('menu_items').insert(form);
    }
    setIsModalOpen(false);
    setEditingItem(null);
    setForm({ name_zh: '', name_en: '', price: '', desc_zh: '', desc_en: '', image: '', category: 'bbq', is_active: true });
    loadItems();
  }

  async function handleDelete(id: string) {
    await supabase.from('menu_items').delete().eq('id', id);
    loadItems();
  }

  function openEdit(item: MenuItem) {
    setEditingItem(item);
    setForm({
      name_zh: item.name_zh,
      name_en: item.name_en,
      price: item.price,
      desc_zh: item.desc_zh || '',
      desc_en: item.desc_en || '',
      image: item.image || '',
      category: item.category,
      is_active: item.is_active,
    });
    setIsModalOpen(true);
  }

  return (
    <div className="min-h-screen bg-black pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">菜单管理</h1>
          <button
            onClick={() => { setEditingItem(null); setForm({ name_zh: '', name_en: '', price: '', desc_zh: '', desc_en: '', image: '', category: 'bbq', is_active: true }); setIsModalOpen(true); }}
            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={20} /> 添加菜品
          </button>
        </div>

        <div className="bg-zinc-900 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-zinc-800">
              <tr>
                <th className="text-left text-gray-300 px-4 py-3">中文名</th>
                <th className="text-left text-gray-300 px-4 py-3">英文名</th>
                <th className="text-left text-gray-300 px-4 py-3">价格</th>
                <th className="text-left text-gray-300 px-4 py-3">分类</th>
                <th className="text-left text-gray-300 px-4 py-3">状态</th>
                <th className="text-right text-gray-300 px-4 py-3">操作</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-t border-zinc-800">
                  <td className="text-white px-4 py-3">{item.name_zh}</td>
                  <td className="text-gray-400 px-4 py-3">{item.name_en}</td>
                  <td className="text-amber-500 px-4 py-3">{item.price}</td>
                  <td className="text-gray-400 px-4 py-3">{item.category}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${item.is_active ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300'}`}>
                      {item.is_active ? '上架' : '下架'}
                    </span>
                  </td>
                  <td className="text-right px-4 py-3">
                    <button onClick={() => openEdit(item)} className="text-blue-500 hover:text-blue-400 mr-3"><Edit2 size={18} /></button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-400"><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-zinc-900 rounded-xl p-6 w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">{editingItem ? '编辑菜品' : '添加菜品'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="中文名" value={form.name_zh} onChange={(e) => setForm({ ...form, name_zh: e.target.value })} className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white" required />
              <input type="text" placeholder="英文名" value={form.name_en} onChange={(e) => setForm({ ...form, name_en: e.target.value })} className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white" required />
              <input type="text" placeholder="价格" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white" required />
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white">
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <textarea placeholder="中文描述" value={form.desc_zh} onChange={(e) => setForm({ ...form, desc_zh: e.target.value })} className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white" rows={2} />
              <textarea placeholder="英文描述" value={form.desc_en} onChange={(e) => setForm({ ...form, desc_en: e.target.value })} className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white" rows={2} />

              {/* Image Upload */}
              <div className="space-y-2">
                <label className="text-gray-400 text-sm">菜品图片</label>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-amber-600 file:text-white hover:file:bg-amber-700"
                  />
                  {uploading && <span className="text-amber-500">上传中...</span>}
                </div>
                {form.image && (
                  <img src={form.image} alt="Preview" className="w-32 h-32 object-cover rounded-lg mt-2" />
                )}
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4" />
                <span className="text-white">上架</span>
              </div>
              <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold">{editingItem ? '保存' : '添加'}</button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
