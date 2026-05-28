import { supabase } from './supabase';

export const getWords = async () => {
  const { data, error } = await supabase
    .from('hangman')
    .select('*');

  if (error) {
    console.error('Error fetching words:', error);
    return [];
  }
  return data;
};
