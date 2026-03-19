import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rateLimit';

const resend = new Resend(process.env.RESEND_API_KEY);
const ALLOWED_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yourdomain.com';

export async function POST(req: Request) {
  try {
    const origin = req.headers.get('origin');
    
    // Allow localhost during development, otherwise enforce CORS
    const isDev = process.env.NODE_ENV === 'development';
    
    if (!isDev && origin && origin !== ALLOWED_ORIGIN) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Try again later.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, message, website } = body;

    // Honeypot check
    if (website && website.length > 0) {
      // Bots fill hidden fields — humans don't
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Existence checks
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields required.' },
        { status: 400 }
      );
    }

    // Type checks
    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof message !== 'string'
    ) {
      return NextResponse.json(
        { error: 'Invalid input.' },
        { status: 400 }
      );
    }

    // Length limits
    if (name.length > 100) return NextResponse.json({ error: 'Name too long.' }, { status: 400 });
    if (email.length > 254) return NextResponse.json({ error: 'Email too long.' }, { status: 400 });
    if (message.length > 2000) return NextResponse.json({ error: 'Message too long.' }, { status: 400 });

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    const sanitise = (str: string) => str.replace(/<[^>]*>/g, '').trim();

    const safeName = sanitise(name);
    const safeEmail = sanitise(email);
    const safeMessage = sanitise(message);
    const destinationEmail = process.env.CONTACT_EMAIL || 'thevibedude01@gmail.com';

    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.includes('placeholder')) {
       console.log('--- DEVELOPMENT MODE: EMAIL LOG ---');
       console.log(`To: ${destinationEmail}`);
       console.log(`From: ${safeName} (${safeEmail})`);
       console.log(`Message: ${safeMessage}`);
       console.log('------------------------------------');
       return NextResponse.json({ success: true, message: 'Simulated success in development' });
    }

    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: [destinationEmail],
      subject: `New message from ${safeName} (${safeEmail})`,
      text: safeMessage,
    });

    if (error) {
       console.error(error);
       return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    if (process.env.NODE_ENV === 'development') console.error(err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
