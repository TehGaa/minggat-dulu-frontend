import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const body = await request.json().catch(() => ({}));

        const backendBaseUrl =
            process.env.BACKEND_USER_SERVICE_URL ||
            process.env.NEXT_PUBLIC_BACKEND_USER_SERVICE_URL ||
            'http://localhost:9092';

        const logoutPath = '/api/v1/auth/logout';

        const backendUrl =
            process.env.BACKEND_USER_SERVICE_LOGOUT_URL ||
            `${backendBaseUrl.replace(/\/$/, '')}${logoutPath.startsWith('/') ? '' : '/'}${logoutPath}`;

        const backendResponse = await fetch(backendUrl, {
            method: 'GET',
        });

        const responseText = await backendResponse.text();

        let data: any = null;
        try {
            data = JSON.parse(responseText);
        } catch {
            data = { message: responseText.trim() || 'Logout failed' };
        }

        if (!backendResponse.ok) {
            return NextResponse.json(
                data || { message: 'Logout failed' },
                { status: backendResponse.status }
            );
        }

        return NextResponse.json(data);
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
