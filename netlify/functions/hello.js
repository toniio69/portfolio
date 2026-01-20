exports.handler = async (event, context) => {
  // Check for API key authentication
  const apiKey = process.env.API_KEY;
  const providedKey = event.headers['x-api-key'] || event.queryStringParameters.api_key;

  if (!providedKey || providedKey !== apiKey) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Unauthorized' }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  // Handle API request
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from Netlify serverless function!',
      timestamp: new Date().toISOString(),
      method: event.httpMethod,
      path: event.path,
    }),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    },
  };
};