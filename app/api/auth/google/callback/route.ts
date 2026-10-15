import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const ticket = request.nextUrl.searchParams.get("ticket");

        const backendBaseUrl =
            process.env.BACKEND_USER_SERVICE_URL ||
            process.env.NEXT_PUBLIC_BACKEND_USER_SERVICE_URL ||
            'http://localhost:9092';

        const ticketPath = '/api/v1/auth/redeem-google-oauth-ticket';

        const backendUrl =
            process.env.BACKEND_USER_SERVICE_GOOGLE_OAUTH_URL ||
            `${backendBaseUrl.replace(/\/$/, '')}${ticketPath.startsWith('/') ? '' : '/'}${ticketPath}`;

        const backendResponse = await fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ ticket }),
        });

        const responseText = await backendResponse.text();

        let data: any = null;
        try {
            data = JSON.parse(responseText);
        } catch {
            data = { message: responseText.trim() || 'Authentication failed' };
        }

        if (!backendResponse.ok) {
            return NextResponse.redirect(
                new URL("/login?error=oauth", request.url)
            );
        }

        const response = NextResponse.redirect(
            new URL("/dashboard", request.url)
        );

        response.headers.set("Cache-Control", "no-store");
        response.headers.set("Referrer-Policy", "no-referrer");

        response.cookies.set("access_token", data.access_token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/",
            maxAge: 15 * 60,
        });

        response.cookies.set("refresh_token", data.refresh_token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            path: "/api/auth/refresh",
            maxAge: 24 * 60 * 60,
        });

        return response;
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
