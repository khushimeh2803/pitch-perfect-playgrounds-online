
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import OpenAI from "https://deno.land/x/openai@v4.24.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const openai = new OpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY')
});

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId } = await req.json();

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Fetch user's previous bookings and preferences
    const { data: bookings, error: bookingError } = await supabase
      .from('bookings')
      .select('ground_id, sport_id')
      .eq('user_id', userId);

    if (bookingError) throw bookingError;

    // Get sports from previous bookings
    const sportIds = [...new Set(bookings.map(booking => booking.sport_id))];

    const { data: sports, error: sportError } = await supabase
      .from('sports')
      .select('name')
      .in('id', sportIds);

    if (sportError) throw sportError;

    // Generate AI recommendation
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system", 
          content: "You are a sports ground recommendation assistant. Based on the user's past sports and preferences, suggest personalized ground recommendations."
        },
        {
          role: "user", 
          content: `The user has played these sports previously: ${sports.map(s => s.name).join(', ')}. 
                    Provide 3 unique and engaging recommendations for ground selection considering variety and user's past interests.`
        }
      ]
    });

    const recommendations = response.choices[0].message.content;

    return new Response(JSON.stringify({ recommendations }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ground recommendation function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
