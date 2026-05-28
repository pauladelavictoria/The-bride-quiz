import { supabase } from './supabase';

export const getPlayers = async () => {
  const { data, error } = await supabase
    .from('players')
    .select('*');
  
  if (error) {
    console.error('Error fetching players:', error);
    return [];
  }
  return data;
};

export const createPlayer = async (playerData) => {
  const { data, error } = await supabase
    .from('players')
    .insert([{ name: playerData.name }])
    .select();

  if (error) {
    console.error('Error creating player:', error);
    return { success: false, playerData: "error" };
  }
  return { success: true, playerData: data[0] };
};

export const deletePlayer = async (playerData) => {
  const { data, error } = await supabase
    .from('players')
    .delete()
    .eq('id', playerData.id);

  if (error) {
    console.error('Error deleting player:', error);
    return { error };
  }
  return { id: playerData.id };
};
