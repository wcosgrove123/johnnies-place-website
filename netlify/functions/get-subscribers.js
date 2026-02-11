// Get all newsletter subscribers (admin only)
// This function should be protected - only accessible by authenticated users

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export const handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Get query parameters
    const params = event.queryStringParameters || {};
    const activeOnly = params.active !== 'false'; // Default to active only
    const format = params.format || 'json'; // json or csv

    // Build query
    let query = supabase
      .from('subscribers')
      .select('id, email, preferences, subscribed_at, unsubscribed_at, is_active, created_at')
      .order('created_at', { ascending: false });

    if (activeOnly) {
      query = query.eq('is_active', true);
    }

    const { data: subscribers, error } = await query;

    if (error) {
      console.error('Error fetching subscribers:', error);
      throw new Error('Failed to fetch subscribers');
    }

    // Return as CSV if requested
    if (format === 'csv') {
      const csv = convertToCSV(subscribers);
      return {
        statusCode: 200,
        headers: {
          ...headers,
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename="subscribers.csv"'
        },
        body: csv
      };
    }

    // Return as JSON
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        count: subscribers.length,
        subscribers
      })
    };

  } catch (error) {
    console.error('Get subscribers error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to retrieve subscribers'
      })
    };
  }
};

// Convert subscribers to CSV format
function convertToCSV(subscribers) {
  const headers = ['Email', 'Preferences', 'Subscribed Date', 'Status'];
  const rows = subscribers.map(sub => [
    sub.email,
    sub.preferences.join('; '),
    new Date(sub.subscribed_at).toLocaleDateString(),
    sub.is_active ? 'Active' : 'Unsubscribed'
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  return csvContent;
}
