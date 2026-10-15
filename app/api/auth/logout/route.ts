import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const cookieRefreshToken = request.cookies.get('refresh_token')?.value;
        const body = await request.json().catch(() => ({}));
        const refreshToken = cookieRefreshToken || body?.refresh_token;

        const backendBaseUrl =
            process.env.BACKEND_USER_SERVICE_URL ||
            process.env.NEXT_PUBLIC_BACKEND_USER_SERVICE_URL ||
            'http://localhost:9092';

        const logoutPath = '/api/v1/auth/logout';

        const backendUrl =
            process.env.BACKEND_USER_SERVICE_LOGOUT_URL ||
            `${backendBaseUrl.replace(/\/$/, '')}${logoutPath.startsWith('/') ? '' : '/'}${logoutPath}`;

        if (refreshToken) {
            await fetch(backendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ refresh_token: refreshToken }),
            }).catch((err) => console.error('Backend logout call error:', err));
        }

        const response = NextResponse.json({ message: 'Logout successful' });
        response.cookies.delete('refresh_token');
        return response;
    } catch (error: any) {
        console.error('Logout Route Handler Error:', error);
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
