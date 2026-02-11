// Send welcome email when someone subscribes
// Called automatically by subscribe.js

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
    const { email, preferences = [], unsubscribeToken } = JSON.parse(event.body);

    if (!email || !unsubscribeToken) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Email and unsubscribe token required' })
      };
    }

    // Build preference list
    const preferenceNames = {
      general: 'General Updates',
      events: 'Events & Activities',
      stories: 'Success Stories & Impact',
      fundraising: 'Fundraising Campaigns',
      volunteer: 'Volunteer Opportunities'
    };

    const preferenceList = preferences
      .map(pref => preferenceNames[pref] || pref)
      .join(', ');

    // Create unsubscribe URL
    const unsubscribeUrl = `https://johnniesplace.netlify.app/pages/unsubscribe.html?token=${unsubscribeToken}`;

    // Send welcome email
    const { data, error } = await resend.emails.send({
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: email,
      replyTo: process.env.REPLY_TO_EMAIL,
      subject: "Welcome to Johnnie's Place Newsletter! 🏡",
      html: getWelcomeEmailHTML(preferenceList, unsubscribeUrl)
    });

    if (error) {
      console.error('Resend error:', error);
      throw new Error('Failed to send welcome email');
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Welcome email sent successfully',
        emailId: data.id
      })
    };

  } catch (error) {
    console.error('Welcome email error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to send welcome email'
      })
    };
  }
};

// Welcome email HTML template
function getWelcomeEmailHTML(preferences, unsubscribeUrl) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Johnnie's Place</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #F5F2E3;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #F5F2E3;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="background-color: #CB6330; padding: 40px 32px; text-align: center;">
              <h1 style="margin: 0; color: #FFFFFF; font-size: 28px; font-weight: 700;">Welcome to Johnnie's Place!</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 32px;">
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #232323;">
                Thank you for subscribing to our newsletter! We're thrilled to have you as part of the Johnnie's Place community.
              </p>

              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #232323;">
                You'll receive updates about:
              </p>

              <div style="background-color: #F5F2E3; border-left: 4px solid #CB6330; padding: 16px 20px; margin: 0 0 24px; border-radius: 4px;">
                <p style="margin: 0; font-size: 15px; color: #5C4A3A; font-weight: 600;">
                  ${preferences}
                </p>
              </div>

              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #232323;">
                <strong>Our Mission:</strong> Johnnie's Place provides first-class, safe residential housing for adults with autism in Conshohocken, PA, with comprehensive support services and meaningful community connection.
              </p>

              <div style="text-align: center; margin: 32px 0;">
                <a href="https://johnniesplace.netlify.app" style="display: inline-block; background-color: #FECE00; color: #232323; text-decoration: none; padding: 14px 32px; border-radius: 50px; font-weight: 600; font-size: 16px;">
                  Visit Our Website
                </a>
              </div>

              <p style="margin: 24px 0 0; font-size: 14px; line-height: 1.6; color: #8A7A6A;">
                <strong>Your Privacy Matters:</strong> We will never share your information with third parties. Your data is stored securely and used only to send you the updates you requested.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F5F2E3; padding: 32px; text-align: center; border-top: 1px solid #E8DFD0;">
              <p style="margin: 0 0 12px; font-size: 14px; color: #5C4A3A;">
                <strong>Johnnie's Place</strong><br>
                318 East Elm Street<br>
                Conshohocken, PA 19428<br>
                610 960 8205
              </p>
              <p style="margin: 12px 0 0; font-size: 12px; color: #8A7A6A;">
                <a href="${unsubscribeUrl}" style="color: #CB6330; text-decoration: underline;">Unsubscribe</a> |
                <a href="https://johnniesplace.netlify.app/pages/contact.html" style="color: #CB6330; text-decoration: underline;">Contact Us</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
