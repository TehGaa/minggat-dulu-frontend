import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const backendBaseUrl =
            process.env.BACKEND_USER_SERVICE_URL ||
            process.env.NEXT_PUBLIC_BACKEND_USER_SERVICE_URL ||
            'http://localhost:9092';

        const callbackPath = '/api/v1/auth/google-oauth-callback';
        const baseEndpoint =
            process.env.BACKEND_USER_SERVICE_GOOGLE_OAUTH_URL ||
            `${backendBaseUrl.replace(/\/$/, '')}${callbackPath.startsWith('/') ? '' : '/'}${callbackPath}`;

        const targetUrl = new URL(baseEndpoint);
        request.nextUrl.searchParams.forEach((value, key) => {
            targetUrl.searchParams.set(key, value);
        });

        return NextResponse.redirect(targetUrl)
    } catch (error: any) {
        console.error('Google Oauth Callback Route Handler Error:', error);
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
