// app/api/redirect/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const videoId = searchParams.get('videoId');
  const channelId = searchParams.get('channelId');
  const playlistId = searchParams.get('playlistId');

  if (!videoId && !channelId && !playlistId) {
    return new NextResponse('Invalid request', { status: 400 });
  }

  // Base YouTube URL
  const webLink = videoId ? `https://www.youtube.com/watch?v=${videoId}` :
    channelId ? `https://www.youtube.com/channel/${channelId}` :
    playlistId ? `https://www.youtube.com/playlist?list=${playlistId}` :
    '';

  // Deep link URL
  const deepLink = videoId ? `vnd.youtube://www.youtube.com/watch?v=${videoId}` :
    channelId ? `vnd.youtube://www.youtube.com/channel/${channelId}` :
    playlistId ? `vnd.youtube://www.youtube.com/playlist?list=${playlistId}` :
    '';

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Redirecting to YouTube</title>
      <meta http-equiv="refresh" content="0;url=${webLink}">
      <script>
        window.location.href = "${deepLink}";
        setTimeout(function() {
          window.location.href = "${webLink}";
        }, 1000);
      </script>
    </head>
    <body>
      <p>Redirecting to YouTube. If you are not redirected, <a href="${webLink}">click here</a>.</p>
    </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: { 'Content-Type': 'text/html' },
  });
}