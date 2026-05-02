import { supabase } from '../supabase/client';

export async function generateWhiteLogo() {
  const { data, error } = await supabase.functions.invoke('ai-image-gen', {
    body: {
      prompt: 'Create a Korean BBQ restaurant logo on transparent background. The logo should have: 1) Korean text "벤지아" in white/cream color with brush stroke style at the top, 2) English text "BENJIA GRILL" in white/cream color with brush stroke style below the Korean text, 3) A red traditional Chinese seal/stamp on the right side with white Chinese characters "本家" inside it. The overall style should be elegant, traditional Korean/Chinese calligraphy style. White text on transparent background, only the seal is red.',
      model: 'wan2.7-image',
      size: '2K',
      n: 1
    },
  });
  
  if (error) throw error;
  
  const imageUrl = data?.output?.choices?.[0]?.message?.content?.[0]?.image;
  return imageUrl;
}
