const MEOO_AI_BASE_URL = 'https://api.meoo.host';
const MEOO_PROJECT_SERVICE_AK = Deno.env.get('MEOO_PROJECT_API_KEY') || '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const AUTH_HEADERS = {
  'Authorization': `Bearer ${MEOO_PROJECT_SERVICE_AK}`,
  'Content-Type': 'application/json',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { image, prompt } = body;

    if (!image || !prompt) {
      return new Response(
        JSON.stringify({ error: 'Image and prompt are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 使用 wan2.7-image 模型进行图像编辑
    // 参考图片 + 文本指令的格式
    const requestBody = {
      model: 'wan2.7-image',
      input: {
        messages: [{
          role: 'user',
          content: [
            { image: image },
            { text: prompt }
          ]
        }]
      },
      parameters: {
        size: '1K',
        n: 1,
        watermark: false,
      },
    };

    const response = await fetch(
      `${MEOO_AI_BASE_URL}/meoo-ai/api/v1/services/aigc/image-generation/generation`,
      { method: 'POST', headers: AUTH_HEADERS, body: JSON.stringify(requestBody) }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('AI API Error:', response.status, errorBody);
      return new Response(JSON.stringify({ error: 'AI service error', status: response.status, details: errorBody }), {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();

    // 提取生成的图片URL
    const imageUrl = data?.output?.choices?.[0]?.message?.content?.[0]?.image;

    if (!imageUrl) {
      console.error('No image URL in response:', JSON.stringify(data));
      return new Response(JSON.stringify({ error: 'No image generated', details: data }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ imageUrl }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Edge Function Error:', err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : 'Internal Server Error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
