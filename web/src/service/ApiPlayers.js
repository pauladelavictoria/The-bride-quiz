import { supabase } from './supabase';

export const getPlayers = async () => {
  const { data, error } = await supabase
    .from('players')
    .select('*');

  if (error) {
    console.error('Error fetching players:', error);
    return [];
  }

  return data.map(item => {
    try {
      const parsed = JSON.parse(item.name);
      return {
        id: item.id,
        name: parsed.name || '',
        email: parsed.email || '',
        groupCode: parsed.groupCode || 'default',
        groupName: parsed.groupName || 'Default Group',
        isGroup: !!parsed.isGroup,
        isOrganizer: !!parsed.isOrganizer
      };
    } catch (e) {
      return {
        id: item.id,
        name: item.name || '',
        email: '',
        groupCode: 'default',
        groupName: 'Default Group',
        isGroup: false,
        isOrganizer: false
      };
    }
  });
};

export const createPlayer = async (playerData) => {
  const serializedData = {
    name: playerData.name,
    email: playerData.email || '',
    groupCode: playerData.groupCode || 'default',
    groupName: playerData.groupName || 'Default Group',
    isGroup: !!playerData.isGroup,
    isOrganizer: !!playerData.isOrganizer
  };

  const { data, error } = await supabase
    .from('players')
    .insert([{ name: JSON.stringify(serializedData) }])
    .select();

  if (error) {
    console.error('Error creating player:', error);
    return { success: false, playerData: "error" };
  }

  return {
    success: true,
    playerData: {
      id: data[0].id,
      ...serializedData
    }
  };
};

export const updatePlayer = async (playerData) => {
  const serializedData = {
    name: playerData.name,
    email: playerData.email || '',
    groupCode: playerData.groupCode || 'default',
    groupName: playerData.groupName || 'Default Group',
    isGroup: !!playerData.isGroup,
    isOrganizer: !!playerData.isOrganizer
  };

  const { data, error } = await supabase
    .from('players')
    .update({ name: JSON.stringify(serializedData) })
    .eq('id', playerData.id)
    .select();

  if (error) {
    console.error('Error updating player:', error);
    return { success: false, playerData: "error" };
  }

  return {
    success: true,
    playerData: {
      id: data[0].id,
      ...serializedData
    }
  };
};

export const deletePlayer = async (playerData) => {
  const { error } = await supabase
    .from('players')
    .delete()
    .eq('id', playerData.id);

  if (error) {
    console.error('Error deleting player:', error);
    return { error };
  }
  return { id: playerData.id };
};
