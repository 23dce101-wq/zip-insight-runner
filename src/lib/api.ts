// Supabase-backed API layer
import { supabase } from '@/integrations/supabase/client';
import type { House } from '@/types/models';

// Houses
export const fetchHouses = async () => {
  const { data, error } = await supabase
    .from('houses')
    .select('*')
    .order('house_number');
  
  if (error) throw error;
  
  return {
    list: (data || []).map((h: any) => ({
      _id: h.id,
      houseNo: h.house_number,
      block: h.block || '',
      floor: h.area_sqft || '',
      status: h.status,
      notes: h.address || '',
      ownerName: '',
      membersCount: 0,
      vehiclesCount: 0,
      createdAt: h.created_at,
      updatedAt: h.updated_at,
    })),
    summary: { total: data?.length || 0, occupied: 0, vacant: 0 },
    pagination: { total: data?.length || 0, page: 1, pageSize: 100 }
  };
};

export const createHouse = async (payload: any) => {
  const { data, error } = await supabase
    .from('houses')
    .insert({
      house_number: payload.houseNo,
      block: payload.block,
      area_sqft: payload.floor,
      status: payload.status,
      address: payload.notes
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateHouse = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from('houses')
    .update({
      house_number: updates.houseNo,
      block: updates.block,
      area_sqft: updates.floor,
      status: updates.status,
      address: updates.notes
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteHouse = async (id: string) => {
  const { error } = await supabase
    .from('houses')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// Members
export const fetchMembers = async () => {
  const { data, error } = await supabase
    .from('members')
    .select('*, houses(house_number)')
    .order('name');
  
  if (error) throw error;
  
  return (data || []).map((m: any) => ({
    _id: m.id,
    name: m.name,
    house: m.houses?.house_number || '',
    role: m.relationship === 'Owner' ? 'Owner' : m.relationship === 'Tenant' ? 'Tenant' : 'Family Member',
    relationship: m.relationship,
    phone: m.phone || '',
    email: m.email,
    status: m.is_primary ? 'active' : 'active',
    createdAt: m.created_at,
    updatedAt: m.updated_at,
  }));
};

export const createMember = async (payload: any) => {
  const { data: house } = await supabase
    .from('houses')
    .select('id')
    .eq('house_number', payload.house)
    .single();
  
  if (!house) throw new Error('House not found');
  
  const { data, error } = await supabase
    .from('members')
    .insert({
      house_id: house.id,
      name: payload.name,
      relationship: payload.relationship || payload.role,
      phone: payload.phone,
      email: payload.email,
      is_primary: payload.role === 'Owner'
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateMember = async (id: string, updates: any) => {
  const { data: house } = await supabase
    .from('houses')
    .select('id')
    .eq('house_number', updates.house)
    .single();
  
  if (!house) throw new Error('House not found');
  
  const { data, error } = await supabase
    .from('members')
    .update({
      house_id: house.id,
      name: updates.name,
      phone: updates.phone,
      email: updates.email
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteMember = async (id: string) => {
  const { error } = await supabase
    .from('members')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// Vehicles
export const fetchVehicles = async () => {
  const { data, error } = await supabase
    .from('vehicles')
    .select('*, houses(house_number)')
    .order('vehicle_number');
  
  if (error) throw error;
  
  return (data || []).map((v: any) => ({
    _id: v.id,
    number: v.vehicle_number,
    type: (v.vehicle_type === 'bike' || v.vehicle_type === 'scooter') ? 'Two Wheeler' : 'Four Wheeler',
    brandModel: v.model,
    color: v.color,
    ownerName: v.owner_name,
    house: v.houses?.house_number || '',
    registrationDate: v.created_at,
    status: 'active',
    createdAt: v.created_at,
    updatedAt: v.updated_at,
  }));
};

export const createVehicle = async (payload: any) => {
  const { data: house } = await supabase
    .from('houses')
    .select('id')
    .eq('house_number', payload.house)
    .single();
  
  if (!house) throw new Error('House not found');
  
  const { data, error } = await supabase
    .from('vehicles')
    .insert({
      house_id: house.id,
      vehicle_number: payload.number,
      vehicle_type: payload.type === 'Two Wheeler' ? 'bike' : 'car',
      model: payload.brandModel,
      color: payload.color,
      owner_name: payload.ownerName
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateVehicle = async (id: string, updates: any) => {
  const { data: house } = await supabase
    .from('houses')
    .select('id')
    .eq('house_number', updates.house)
    .single();
  
  if (!house) throw new Error('House not found');
  
  const { data, error } = await supabase
    .from('vehicles')
    .update({
      house_id: house.id,
      vehicle_number: updates.number,
      vehicle_type: updates.type === 'Two Wheeler' ? 'bike' : 'car',
      model: updates.brandModel,
      color: updates.color,
      owner_name: updates.ownerName
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteVehicle = async (id: string) => {
  const { error } = await supabase
    .from('vehicles')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// Payments
export const fetchPayments = async () => {
  const { data, error } = await supabase
    .from('maintenance_payments')
    .select('*, houses(house_number)')
    .order('due_date', { ascending: false });
  
  if (error) throw error;
  
  const payments = (data || []).map((p: any) => ({
    id: parseInt(p.id),
    house: p.houses?.house_number || '',
    owner: '',
    amount: parseFloat(p.amount),
    amountPaid: p.status === 'paid' ? parseFloat(p.amount) : 0,
    month: new Date(p.due_date).toLocaleString('en-US', { month: 'long', year: 'numeric' }),
    dueDate: p.due_date,
    paidDate: p.paid_date,
    status: p.status,
    method: p.payment_method,
    remarks: p.notes,
    createdAt: p.created_at,
    updatedAt: p.updated_at,
  }));
  
  const total = payments.reduce((s: number, p: any) => s + p.amount, 0);
  const collected = payments.filter((p: any) => p.status === 'paid').reduce((s: number, p: any) => s + p.amountPaid, 0);
  
  return {
    list: payments,
    summary: {
      total,
      collected,
      pending: total - collected,
      overdue: 0,
      collectionRate: total > 0 ? Math.round((collected / total) * 100) : 0
    }
  };
};

export const createPayment = async (payload: any) => {
  const { data: house } = await supabase
    .from('houses')
    .select('id')
    .eq('house_number', payload.house)
    .single();
  
  if (!house) throw new Error('House not found');
  
  const { data, error } = await supabase
    .from('maintenance_payments')
    .insert({
      house_id: house.id,
      amount: payload.amount,
      due_date: payload.dueDate,
      paid_date: payload.paidDate,
      status: payload.status,
      payment_method: payload.method,
      notes: payload.remarks
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updatePayment = async (id: number, updates: any) => {
  const { data, error } = await supabase
    .from('maintenance_payments')
    .update({
      amount: updates.amount,
      due_date: updates.dueDate,
      paid_date: updates.paidDate,
      status: updates.status as 'paid' | 'pending' | 'overdue',
      payment_method: updates.method,
      notes: updates.remarks
    })
    .eq('id', id.toString())
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deletePayment = async (id: number) => {
  const { error } = await supabase
    .from('maintenance_payments')
    .delete()
    .eq('id', id.toString());
  
  if (error) throw error;
};

export const generateMonthlyPayments = async (defaultAmount: number) => {
  const { data: houses } = await supabase.from('houses').select('id, house_number, status');
  if (!houses) return { count: 0 };
  
  const currentMonth = new Date().toISOString().slice(0, 7);
  const dueDate = `${currentMonth}-05`;
  
  const payments = houses
    .filter((h: any) => h.status === 'occupied')
    .map((h: any) => ({
      house_id: h.id,
      amount: defaultAmount,
      due_date: dueDate,
      status: 'pending' as 'pending'
    }));
  
  const { error } = await supabase.from('maintenance_payments').insert(payments);
  if (error) throw error;
  
  return { count: payments.length };
};

// Expenditures
export const fetchExpenditures = async () => {
  const { data, error } = await supabase
    .from('expenditures')
    .select('*')
    .order('date', { ascending: false });
  
  if (error) throw error;
  
  const expenditures = (data || []).map((e: any) => ({
    id: parseInt(e.id),
    title: e.description?.substring(0, 50) || 'Expense',
    category: e.category,
    amount: parseFloat(e.amount),
    paymentMode: 'Cash' as 'Cash',
    date: e.date,
    description: e.description,
    createdAt: e.created_at,
    updatedAt: e.updated_at,
  }));
  
  return {
    list: expenditures,
    summary: {
      totalExpenditure: expenditures.reduce((s: number, e: any) => s + e.amount, 0),
      totalCollection: 0,
      remainingBalance: 0,
      categoryBreakdown: {}
    }
  };
};

// Backup / Restore (not implemented for Supabase)
export const exportData = () => ({ message: 'Export not available with cloud database' });
export const importData = () => ({ message: 'Import not available with cloud database' });
export const resetData = () => ({ message: 'Reset not available with cloud database' });
