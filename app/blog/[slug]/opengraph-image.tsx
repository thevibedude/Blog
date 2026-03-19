import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/mdx';

export const runtime = 'nodejs';

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug('blog', params.slug);

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#0A0A0A',
          padding: '80px',
          border: '20px solid #1A1A1A',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              height: '40px',
              width: '10px',
              backgroundColor: '#00F5D4',
              marginRight: '20px',
            }}
          />
          <span
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#F0F0F0',
              fontFamily: 'monospace',
            }}
          >
            thevibedude
          </span>
        </div>
        <h1
          style={{
            fontSize: '80px',
            fontWeight: 'bold',
            color: '#F0F0F0',
            lineHeight: 1.1,
            margin: 0,
            fontFamily: 'sans-serif',
          }}
        >
          {post?.data.title || 'thevibedude blog'}
        </h1>
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <p
            style={{
              fontSize: '24px',
              color: '#888888',
              margin: 0,
            }}
          >
            building in public • one commit at a time
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
