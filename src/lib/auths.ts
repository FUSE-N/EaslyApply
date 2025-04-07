import { supabase } from './supabase';
import type { Profile } from './supabase';

export async function signUp(email: string, password: string, role: 'seeker' | 'employer', fullName: string) {
  const { data: auth, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    return { data: null, error: signUpError };
  }

  if (!auth.user) {
    return { data: null, error: new Error('User creation failed') };
  }

  const { error: profileError } = await supabase
    .from('profiles')
    .insert({
      id: auth.user.id,
      role,
      full_name: fullName,
      email,
    });

  if (profileError) {
    return { data: null, error: profileError };
  }

  return { data: auth, error: null };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // Return a more user-friendly error message
    const message = error.message === 'Invalid login credentials' 
      ? 'Invalid email or password. Please try again.'
      : error.message;
    return { data: null, error: new Error(message) };
  }

  return { data, error: null };
}

export async function signOut() {
  return await supabase.auth.signOut();
}

export async function getCurrentProfile(): Promise<{ data: Profile | null, error: any }> {
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError) {
    return { data: null, error: authError };
  }

  if (!user) {
    return { data: null, error: null };
  }

  const { data, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (profileError) {
    return { data: null, error: profileError };
  }

  return { data, error: null };
}