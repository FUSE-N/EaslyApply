import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  role: 'seeker' | 'employer';
  full_name: string;
  email: string;
  headline?: string;
  bio?: string;
  skills?: string[];
  experience?: Array<{
    title: string;
    company: string;
    location: string;
    start_date: string;
    end_date?: string;
    description: string;
  }>;
  education?: Array<{
    degree: string;
    institution: string;
    location: string;
    graduation_date: string;
  }>;
  location?: string;
  created_at: string;
  updated_at: string;
};

export type Job = {
  id: string;
  employer_id: string;
  title: string;
  company: string;
  location: string;
  salary_range?: string;
  type: string;
  experience_level: string;
  description: string;
  requirements: string[];
  benefits?: string[];
  skills_required: string[];
  created_at: string;
  updated_at: string;
};

export type JobMatch = {
  id: string;
  job_id: string;
  seeker_id: string;
  match_score: number;
  status: 'pending' | 'applied' | 'rejected' | 'accepted';
  created_at: string;
  updated_at: string;
};