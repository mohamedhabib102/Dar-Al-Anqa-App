import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const url = searchParams.get('url');

    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer',
        });

        const headers = new Headers();
        headers.set('Content-Type', 'application/pdf');
        headers.set('Content-Length', response.data.length);
        headers.set('Cache-Control', 'public, max-age=3600');

        return new NextResponse(response.data, {
            status: 200,
            headers,
        });
    } catch (error) {
        console.error('Proxy error:', error);
        return NextResponse.json({ error: 'Failed to fetch PDF' }, { status: 500 });
    }
}
