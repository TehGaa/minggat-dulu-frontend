import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));

    const apiKey = process.env.API_KEY || 'local';

    const backendBaseUrl =
      process.env.BACKEND_USER_SERVICE_URL ||
      process.env.NEXT_PUBLIC_BACKEND_USER_SERVICE_URL ||
      'http://localhost:9092';

    const loginPath = '/api/v1/auth/login';

    const backendUrl =
      process.env.BACKEND_USER_SERVICE_LOGIN_URL ||
      `${backendBaseUrl.replace(/\/$/, '')}${loginPath.startsWith('/') ? '' : '/'}${loginPath}`;

    const backendResponse = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify(body),
    });

    const responseText = await backendResponse.text();

    let data: any = null;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { message: responseText.trim() || 'Authentication failed' };
    }

    if (!backendResponse.ok) {
      return NextResponse.json(
        data || { message: 'Authentication failed' },
        { status: backendResponse.status }
      );
    }

    const refreshToken = data?.refresh_token || data?.refresh || data?.refreshToken;
    const isProd = process.env.NODE_ENV === 'production';

    const response = NextResponse.json(data);

    if (refreshToken) {
      response.cookies.set('refresh_token', refreshToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax',
        path: '/',
        maxAge: 24 * 60 * 60,
      });
    }

    return response;
  } catch (error: any) {
    console.error('Login Route Handler Error:', error);
    return NextResponse.json(
      {
        message:
          error?.message ||
          'Failed to connect to backend server. Please verify BACKEND_URL configuration.',
      },
      { status: 502 }
    );
  }
}
