import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Utensils, FileText, Calendar, Settings, LogOut, Menu, X } from 'lucide-react';
import AdminReservations from './AdminReservations';
import AdminLogin from './AdminLogin';

const menuItems = [
  { id: 'menu', label: '菜单管理', icon: Utensils },
  { id: 'content', label: '内容管理', icon: FileText },
  { id: 'reservations', label: '预订管理', icon: Calendar },
  { id: 'settings', label: '系统设置', icon: Settings },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState('menu');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('admin_logged_in') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    localStorage.removeItem('admin_logged_in');
    localStorage.removeItem('admin_username');
    setIsLoggedIn(false);
  }

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        className="fixed left-0 top-0 h-full w-[280px] bg-zinc-900 border-r border-zinc-800 z-50"
      >
        <div className="p-6 border-b border-zinc-800">
          <h1 className="text-xl font-bold text-white">BENJIA 管理后台</h1>
        </div>
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id
                  ? 'bg-amber-600 text-white'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-zinc-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white transition-colors"
          >
            <LogOut size={20} />
            <span>退出登录</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-[280px]' : 'ml-0'}`}>
        {/* Header */}
        <header className="h-16 bg-zinc-900 border-b border-zinc-800 flex items-center px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-zinc-400 hover:text-white transition-colors"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <span className="ml-4 text-zinc-400">{menuItems.find((i) => i.id === activeTab)?.label}</span>
        </header>

        {/* Content Area */}
        <div className="p-8">
          {activeTab === 'menu' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">菜单管理</h2>
                <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors">
                  添加菜品
                </button>
              </div>
              <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-zinc-800">
                    <tr>
                      <th className="px-6 py-4 text-left text-zinc-400">菜品名称</th>
                      <th className="px-6 py-4 text-left text-zinc-400">分类</th>
                      <th className="px-6 py-4 text-left text-zinc-400">价格</th>
                      <th className="px-6 py-4 text-left text-zinc-400">状态</th>
                      <th className="px-6 py-4 text-left text-zinc-400">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    <tr className="hover:bg-zinc-800/50">
                      <td className="px-6 py-4 text-white">和牛肋眼</td>
                      <td className="px-6 py-4 text-zinc-400">炭火烤肉</td>
                      <td className="px-6 py-4 text-amber-500">3,500 RSD</td>
                      <td className="px-6 py-4"><span className="bg-green-500/20 text-green-500 px-2 py-1 rounded text-sm">上架</span></td>
                      <td className="px-6 py-4"><button className="text-amber-500 hover:text-amber-400">编辑</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">内容管理</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
                  <h3 className="text-lg font-semibold text-white mb-4">首页标题</h3>
                  <input type="text" className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white" defaultValue="BEN JIA" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reservations' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">预订管理</h2>
              <AdminReservations />
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">系统设置</h2>
              <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6 max-w-md">
                <div className="space-y-4">
                  <div>
                    <label className="block text-zinc-400 mb-2">餐厅名称</label>
                    <input type="text" className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white" defaultValue="BENJIA Korean BBQ" />
                  </div>
                  <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg transition-colors">保存设置</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
