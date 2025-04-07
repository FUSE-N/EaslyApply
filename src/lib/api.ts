import { supabase } from './supabase';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  tags: string[];
  description: string;
  posted: string;
  easy_apply: boolean;
}

export async function searchJobs(query: string = '', location: string = '', page: number = 1): Promise<Job[]> {
  try {
    const response = await fetch(
      `http://localhost:8000/api/jobs?query=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}&page=${page}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }

    const jobs = await response.json();
    return jobs;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}

export async function saveJob(jobId: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('User not authenticated');

  await supabase
    .from('job_matches')
    .insert({
      job_id: jobId,
      seeker_id: user.id,
      status: 'saved',
      match_score: 0,
    });
}