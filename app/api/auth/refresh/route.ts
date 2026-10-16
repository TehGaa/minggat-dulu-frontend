import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const cookieRefreshToken = request.cookies.get('refresh_token')?.value;

        const apiKey = process.env.API_KEY || 'local';

        const backendBaseUrl =
            process.env.BACKEND_USER_SERVICE_URL ||
            process.env.NEXT_PUBLIC_BACKEND_USER_SERVICE_URL ||
            'http://localhost:9092';

        const refreshPath = '/api/v1/auth/refresh';

        const backendUrl =
            process.env.BACKEND_USER_SERVICE_REFRESH_URL ||
            `${backendBaseUrl.replace(/\/$/, '')}${refreshPath.startsWith('/') ? '' : '/'}${refreshPath}`;

        const backendResponse = await fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-API-Key': apiKey,
            },
            body: JSON.stringify({ refresh_token: cookieRefreshToken }),
        });

        const responseText = await backendResponse.text();

        let data: any = null;
        try {
            data = JSON.parse(responseText);
        } catch {
            data = { message: responseText.trim() || 'Refresh failed' };
        }

        if (!backendResponse.ok) {
            return NextResponse.json(
                data || { message: 'Refresh failed' },
                { status: backendResponse.status }
            );
        }

        const newRefreshToken = data?.refresh_token || data?.refresh || data?.refreshToken;
        const isProd = process.env.NODE_ENV === 'production';

        const response = NextResponse.json(data);

        if (newRefreshToken) {
            response.cookies.delete('refresh_token')
            response.cookies.set('refresh_token', newRefreshToken, {
                httpOnly: true,
                secure: isProd,
                sameSite: 'lax',
                path: '/',
                maxAge: 24 * 60 * 60,
            });
        }

        return response;
    } catch (error: any) {
        console.error('Refresh Route Handler Error:', error);
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
