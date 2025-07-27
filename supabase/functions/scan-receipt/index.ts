import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Receipt scanning request received');
    
    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    const { imageBase64 } = await req.json();
    
    if (!imageBase64) {
      throw new Error('No image data provided');
    }

    console.log('Processing receipt image with OpenAI Vision API');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          {
            role: 'system',
            content: `You are a receipt scanner that extracts transaction details from receipt images. 
            Always respond with a valid JSON object in this exact format:
            {
              "title": "string - main item or store name",
              "amount": "number - total amount spent",
              "category": "string - one of: food, housing, transport, shopping, entertainment, income",
              "description": "string - brief description of items purchased",
              "date": "string - date in YYYY-MM-DD format, use today if not visible",
              "store": "string - store or merchant name"
            }
            
            Extract information carefully from the receipt. For category, choose the most appropriate one:
            - food: restaurants, groceries, cafes
            - housing: utilities, rent, home supplies
            - transport: gas, parking, public transport, rideshare
            - shopping: clothing, electronics, general retail
            - entertainment: movies, games, subscriptions
            - income: refunds, cashback (rare on receipts)
            
            If multiple items, summarize in description. Focus on accuracy.`
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Please extract the transaction details from this receipt image and return them as JSON.'
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`
                }
              }
            ]
          }
        ],
        max_tokens: 500,
        temperature: 0.1
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenAI response received');
    
    const content = data.choices[0].message.content;
    console.log('Extracted content:', content);
    
    // Parse the JSON response
    let extractedData;
    try {
      // Remove any markdown formatting if present
      const jsonMatch = content.match(/```json\n?(.*?)\n?```/s) || content.match(/```\n?(.*?)\n?```/s);
      const jsonString = jsonMatch ? jsonMatch[1] : content;
      extractedData = JSON.parse(jsonString.trim());
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      throw new Error('Failed to parse extracted data');
    }

    // Validate required fields
    if (!extractedData.title || !extractedData.amount) {
      throw new Error('Could not extract required transaction details');
    }

    // Ensure amount is a number
    extractedData.amount = parseFloat(extractedData.amount);
    
    // Default to today's date if not extracted
    if (!extractedData.date) {
      extractedData.date = new Date().toISOString().split('T')[0];
    }

    console.log('Successfully extracted receipt data:', extractedData);

    return new Response(JSON.stringify({
      success: true,
      data: extractedData
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error) {
    console.error('Error in scan-receipt function:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});