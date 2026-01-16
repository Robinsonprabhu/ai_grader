import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export const useSupabase = () => {
  return {
    isConnected: !!supabase,
    client: supabase,
  };
};

export async function saveSubmission(submission) {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('submissions')
      .insert([
        {
          submission_id: submission.id,
          question: submission.question,
          answer: submission.answer,
          risk_level: submission.analysis.riskLevel,
          risk_score: submission.analysis.riskScore,
          relevance_score: submission.analysis.relevanceScore,
          created_at: submission.timestamp,
        },
      ])
      .select();

    if (error) {
      console.error('Error saving submission:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Error:', err);
    return null;
  }
}

export async function saveModelAnswer(modelAnswer) {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('model_answers')
      .insert([
        {
          model_answer_id: modelAnswer.id,
          question: modelAnswer.question,
          model_answer: modelAnswer.modelAnswer,
          risk_level: modelAnswer.analysis.riskLevel,
          risk_score: modelAnswer.analysis.riskScore,
          created_at: modelAnswer.timestamp,
        },
      ])
      .select();

    if (error) {
      console.error('Error saving model answer:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Error:', err);
    return null;
  }
}
