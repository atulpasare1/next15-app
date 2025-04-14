import { NextResponse } from 'next/server';

/**
 * Proxy API route to handle CORS issues
 * This will forward requests to the external API and return the response
 */
export async function GET(request) {
  // Get the path from the URL
  const url = new URL(request.url);
  // Extract path - be careful with empty paths
  let path = url.pathname.replace('/api/proxy', '');
  if (!path) path = '/'; // Ensure we have at least a slash for root path
  
  // Get any query parameters
  const params = {};
  url.searchParams.forEach((value, key) => {
    params[key] = value;
  });
  
  // Build the query string
  const queryString = Object.keys(params).length > 0
    ? '?' + new URLSearchParams(params).toString()
    : '';

  try {
    // Use the domain from package.json
    const baseURL = 'https://testxlake.iitjobs.com/api';
    // If path doesn't start with /, add it
    if (path && !path.startsWith('/')) {
      path = '/' + path;
    }
    const targetUrl = `${baseURL}${path}${queryString}`;
    
    console.log('Proxying GET request to:', targetUrl);
    console.log('Request headers:', Object.fromEntries(request.headers));
    
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      console.error(`Proxy error: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error('Error response:', errorText);
      return NextResponse.json(
        { error: `API responded with status ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Successful response from API:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Failed to fetch data', message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  // Get the path from the URL
  const url = new URL(request.url);
  let path = url.pathname.replace('/api/proxy', '');
  if (!path) path = '/'; // Ensure we have at least a slash for root path
  
  // If path doesn't start with /, add it
  if (path && !path.startsWith('/')) {
    path = '/' + path;
  }
  
  try {
    // Use the domain from package.json
    const baseURL = 'https://testxlake.iitjobs.com/api';
    const targetUrl = `${baseURL}${path}`;
    
    console.log('Proxying POST request to:', targetUrl);
    
    let body;
    try {
      body = await request.json();
      console.log('Request body:', body);
    } catch (e) {
      console.log('No JSON body or invalid JSON');
      body = {};
    }
    
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error(`Proxy error: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error('Error response:', errorText);
      return NextResponse.json(
        { error: `API responded with status ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Successful response from API:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Failed to fetch data', message: error.message }, { status: 500 });
  }
}

// Add similar handlers for PUT and DELETE if needed
export async function PUT(request) {
  // Get the path from the URL
  const url = new URL(request.url);
  let path = url.pathname.replace('/api/proxy', '');
  if (!path) path = '/'; // Ensure we have at least a slash for root path
  
  // If path doesn't start with /, add it
  if (path && !path.startsWith('/')) {
    path = '/' + path;
  }
  
  try {
    // Use the domain from package.json
    const baseURL = 'https://testxlake.iitjobs.com/api';
    const targetUrl = `${baseURL}${path}`;
    
    console.log('Proxying PUT request to:', targetUrl);
    
    let body;
    try {
      body = await request.json();
      console.log('Request body:', body);
    } catch (e) {
      console.log('No JSON body or invalid JSON');
      body = {};
    }
    
    const response = await fetch(targetUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error(`Proxy error: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error('Error response:', errorText);
      return NextResponse.json(
        { error: `API responded with status ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Successful response from API:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Failed to fetch data', message: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  // Get the path from the URL
  const url = new URL(request.url);
  let path = url.pathname.replace('/api/proxy', '');
  if (!path) path = '/'; // Ensure we have at least a slash for root path
  
  // If path doesn't start with /, add it
  if (path && !path.startsWith('/')) {
    path = '/' + path;
  }
  
  try {
    // Use the domain from package.json
    const baseURL = 'https://testxlake.iitjobs.com/api';
    const targetUrl = `${baseURL}${path}`;
    
    console.log('Proxying DELETE request to:', targetUrl);
    
    const response = await fetch(targetUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      console.error(`Proxy error: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error('Error response:', errorText);
      return NextResponse.json(
        { error: `API responded with status ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Successful response from API:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Failed to fetch data', message: error.message }, { status: 500 });
  }
}
