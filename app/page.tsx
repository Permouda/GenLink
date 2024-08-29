// app/page.tsx

"use client";

import { ModeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Footer from '@/components/Footer';




const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const getYouTubeChannelId = (url: string): string | null => {
  const regExp = /youtube.com\/channel\/([^?&]*)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

const getYouTubePlaylistId = (url: string): string | null => {
  const regExp = /youtube.com\/playlist\?list=([^?&]*)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

const YouTubeLinkGenerator = () => {
  const [url, setUrl] = useState('');
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const videoId = getYouTubeVideoId(url.trim());
    const channelId = getYouTubeChannelId(url.trim());
    const playlistId = getYouTubePlaylistId(url.trim());

    if (videoId || channelId || playlistId) {
      // Use your dynamic URL
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      // const link = `${baseUrl}/api/redirect?${videoId ? `videoId=${videoId}` : channelId ? `channelId=${channelId}` : `playlistId=${playlistId}`}`;
      const link = `${baseUrl}/api/redirect?${videoId ? `videoId=${videoId}` : channelId ? `channelId=${channelId}` : `playlistId=${playlistId}`}`;
      setGeneratedLink(link);
    } else {
      setGeneratedLink(null);
      console.error('Invalid YouTube URL');
    }
  };

  const handleCopy = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
    <header className="p-4">
      <ModeToggle />
    </header>

    <main className="flex-grow flex items-center justify-center p-4">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Link To App</CardTitle>
          <CardDescription>Youtube link to youtube application</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <p className='mb-2'>YouTube Link To App</p>
            <Input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter YouTube URL"
              required
            />
            <Button 
            className='my-4 '
            type="submit">Generate Link</Button>
          </form>

          {generatedLink && (
            <div>
              <p className='mb-2'>Generated Deep Link:</p>
              <Input
                type="text"
                value={generatedLink}
                readOnly
              />
              <Button
              className='my-4'
              onClick={handleCopy}>Copy Link</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </main>

    <Footer />
  </div>
  );
};

export default YouTubeLinkGenerator;
