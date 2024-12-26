import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://hpmbeclejpgmkxnjmuvc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwbWJlY2xlanBnbWt4bmptdXZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyMDAyOTYsImV4cCI6MjA1MDc3NjI5Nn0.swGUQiwl9qEaz3R64wQ1HvWs3LnKYp7VLEe-S6D5Js0';
const supabase = createClient(supabaseUrl, supabaseKey);
export async function addScore(score) {
    await supabase.from('PlayLog').insert({ score });
}
export async function getBestScore() {
    const { data } = await supabase
        .from('PlayLog')
        .select('score')
        .order('score', { ascending: false })
        .limit(1);
    return data[0].score;
}
