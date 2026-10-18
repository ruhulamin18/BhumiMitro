import { NextResponse } from 'next/server';

const DEFAULT_API_BASE_URL = 'http://127.0.0.1:5000';

export function flaskApiUrl(path: string): string {
  const baseUrl = (
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.FLASK_API_URL ||
    DEFAULT_API_BASE_URL
  ).replace(/\/+$/, '');
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export async function fetchFlask(path: string, init?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);
  try {
    return await fetch(flaskApiUrl(path), {
      ...init,
      signal: controller.signal,
      cache: 'no-store',
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function proxyFlask(
  path: string,
  init?: RequestInit
): Promise<NextResponse> {
  try {
    const upstream = await fetchFlask(path, init);
    const contentType = upstream.headers.get('content-type') || 'application/json';
    return new NextResponse(upstream.body, {
      status: upstream.status,
      headers: { 'content-type': contentType },
    });
  } catch (error) {
    console.error(`Flask API request failed for ${path}`, error);
    return NextResponse.json(
      { error: 'The demo service is temporarily unavailable. Please try again shortly.' },
      { status: 502 }
    );
  }
}
