import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const ticket = request.nextUrl.searchParams.get("ticket");

        const apiKey = process.env.API_KEY || 'local';

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
                'X-API-Key': apiKey,
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
            new URL("/login?from=google", request.url)
        );

        response.headers.set("Cache-Control", "no-store");
        response.headers.set("Referrer-Policy", "no-referrer");

        const isProd = process.env.NODE_ENV === 'production';

        if (data.access_token) {
            response.cookies.set("access_token", data.access_token, {
                httpOnly: false,
                secure: isProd,
                sameSite: "lax",
                path: "/",
                maxAge: 15 * 60,
            });

            const expiryTime = Date.now() + 15 * 60 * 1000;

            response.cookies.set("access_token_exp", expiryTime.toString(), {
                httpOnly: false,
                secure: isProd,
                sameSite: "lax",
                path: "/",
                maxAge: 15 * 60,
            });
        }

        if (data.refresh_token) {
            response.cookies.set("refresh_token", data.refresh_token, {
                httpOnly: true,
                secure: isProd,
                sameSite: "lax",
                path: "/",
                maxAge: 24 * 60 * 60,
            });
        }

        if (data.user_data) {
            const userDataString =
                typeof data.user_data === 'string'
                    ? data.user_data
                    : JSON.stringify(data.user_data);

            response.cookies.set("user_data", userDataString, {
                httpOnly: false,
                secure: isProd,
                sameSite: "lax",
                path: "/",
                maxAge: 1 * 60,
            });
        }

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
