// Newsletter unsubscribe function
// Privacy-first: secure unsubscribe via token

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export const handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { token } = JSON.parse(event.body);

    if (!token) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Unsubscribe token required' })
      };
    }

    // Find subscriber by token
    const { data: subscriber, error: findError } = await supabase
      .from('subscribers')
      .select('id, email, is_active')
      .eq('unsubscribe_token', token)
      .single();

    if (findError || !subscriber) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Invalid unsubscribe link' })
      };
    }

    // Check if already unsubscribed
    if (!subscriber.is_active) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          message: 'You are already unsubscribed.',
          email: subscriber.email
        })
      };
    }

    // Unsubscribe
    const { error: updateError } = await supabase
      .from('subscribers')
      .update({
        is_active: false,
        unsubscribed_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', subscriber.id);

    if (updateError) {
      console.error('Error unsubscribing:', updateError);
      throw new Error('Failed to unsubscribe');
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'You have been successfully unsubscribed.',
        email: subscriber.email
      })
    };

  } catch (error) {
    console.error('Unsubscribe error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Something went wrong. Please try again later.'
      })
    };
  }
};
