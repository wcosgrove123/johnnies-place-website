// Newsletter subscription function
// Privacy-first: stores only email and preferences in YOUR database

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Newsletter preference types
const VALID_PREFERENCES = [
  'general',
  'events',
  'stories',
  'fundraising',
  'volunteer',
  'monthly'
];

export const handler = async (event) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight request
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse request body
    const { email, preferences = [] } = JSON.parse(event.body);

    // Validate email
    if (!email || !EMAIL_REGEX.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Please provide a valid email address' })
      };
    }

    // Normalize email (lowercase, trim)
    const normalizedEmail = email.toLowerCase().trim();

    // Validate preferences
    const validatedPreferences = preferences.filter(pref =>
      VALID_PREFERENCES.includes(pref)
    );

    // If no preferences selected, default to 'general'
    if (validatedPreferences.length === 0) {
      validatedPreferences.push('general');
    }

    // Check if email already exists
    const { data: existing, error: checkError } = await supabase
      .from('subscribers')
      .select('id, is_active, unsubscribed_at')
      .eq('email', normalizedEmail)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 means no rows found, which is fine
      console.error('Error checking subscriber:', checkError);
      throw new Error('Database error');
    }

    if (existing) {
      // Email already exists
      if (existing.is_active) {
        // Already subscribed - update preferences
        const { error: updateError } = await supabase
          .from('subscribers')
          .update({
            preferences: validatedPreferences,
            updated_at: new Date().toISOString()
          })
          .eq('id', existing.id);

        if (updateError) {
          console.error('Error updating subscriber:', updateError);
          throw new Error('Failed to update subscription');
        }

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            message: 'Preferences updated successfully!',
            action: 'updated'
          })
        };
      } else {
        // Previously unsubscribed - reactivate
        const { error: reactivateError } = await supabase
          .from('subscribers')
          .update({
            is_active: true,
            unsubscribed_at: null,
            preferences: validatedPreferences,
            subscribed_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', existing.id);

        if (reactivateError) {
          console.error('Error reactivating subscriber:', reactivateError);
          throw new Error('Failed to reactivate subscription');
        }

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            message: 'Welcome back! You\'re subscribed again.',
            action: 'reactivated'
          })
        };
      }
    }

    // New subscriber - insert
    const { error: insertError } = await supabase
      .from('subscribers')
      .insert([{
        email: normalizedEmail,
        preferences: validatedPreferences,
        is_active: true
      }]);

    if (insertError) {
      console.error('Error inserting subscriber:', insertError);
      throw new Error('Failed to subscribe');
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Successfully subscribed! Thank you for joining us.',
        action: 'subscribed'
      })
    };

  } catch (error) {
    console.error('Subscription error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Something went wrong. Please try again later.'
      })
    };
  }
};
