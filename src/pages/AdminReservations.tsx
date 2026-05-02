import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../supabase/client';
import { Check, X, Trash2, Calendar, Users, Clock } from 'lucide-react';

interface Reservation {
  id: string;
  name: string;
  date: string;
  time: string;
  guests: number;
  message: string | null;
  status: string;
  created_at: string;
}

export default function AdminReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  async function fetchReservations() {
    const { data, error } = await supabase
      .from('reservations')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setReservations(data);
    }
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from('reservations').update({ status }).eq('id', id);
    fetchReservations();
  }

  async function deleteReservation(id: string) {
    await supabase.from('reservations').delete().eq('id', id);
    fetchReservations();
  }

  if (loading) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-black pt-20 p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Reservations</h1>
      
      <div className="grid gap-4">
        {reservations.map((r) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-zinc-900 rounded-xl p-6 border border-zinc-800"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-white">{r.name}</h3>
                <div className="flex gap-4 text-gray-400 text-sm">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {r.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {r.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={14} /> {r.guests} guests
                  </span>
                </div>
                {r.message && <p className="text-gray-500 text-sm">{r.message}</p>}
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  r.status === 'confirmed' ? 'bg-green-600' :
                  r.status === 'cancelled' ? 'bg-red-600' : 'bg-amber-600'
                } text-white`}>
                  {r.status}
                </span>
                
                {r.status === 'pending' && (
                  <button
                    onClick={() => updateStatus(r.id, 'confirmed')}
                    className="p-2 bg-green-600 rounded-lg hover:bg-green-700"
                  >
                    <Check size={18} className="text-white" />
                  </button>
                )}
                
                <button
                  onClick={() => deleteReservation(r.id)}
                  className="p-2 bg-red-600 rounded-lg hover:bg-red-700"
                >
                  <Trash2 size={18} className="text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
