import { supabase } from '../supabase/client';

export async function getMenuItems() {
  const { data, error } = await supabase.from('menu_items').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function createMenuItem(item: any) {
  const { data, error } = await supabase.from('menu_items').insert(item).select().single();
  if (error) throw error;
  return data;
}

export async function updateMenuItem(id: string, item: any) {
  const { data, error } = await supabase.from('menu_items').update(item).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteMenuItem(id: string) {
  const { error } = await supabase.from('menu_items').delete().eq('id', id);
  if (error) throw error;
}

export async function getReservations() {
  const { data, error } = await supabase.from('reservations').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function updateReservationStatus(id: string, status: string) {
  const { data, error } = await supabase.from('reservations').update({ status }).eq('id', id).select().single();
  if (error) throw error;
  return data;
}

export async function getSiteContent() {
  const { data, error } = await supabase.from('site_content').select('*');
  if (error) throw error;
  return data;
}

export async function updateSiteContent(key: string, content: any) {
  const { data, error } = await supabase.from('site_content').update(content).eq('key', key).select().single();
  if (error) throw error;
  return data;
}
