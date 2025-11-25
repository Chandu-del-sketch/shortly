import { db } from '@/lib/firebase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const snapshot = await db.collection('links').get();
  const links = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  if (links.length === 0) {
    return NextResponse.json({ message: 'No links found' }, { status: 404 });
  }

  // Sort links by createdAt in descending order
  links.sort((a:any, b:any) => b.createdAt.toDate() - a.createdAt.toDate());

  // Map to include formatted date
  links.forEach((link: any) => {
    link.createdAt = link.createdAt.toDate().toISOString();
    if (link.lastClicked) {
      link.lastClicked = link.lastClicked.toDate().toISOString();
    }
  });
  return NextResponse.json(links);
}

export async function POST(req: NextRequest) {
  const { longUrl, shortCode } = await req.json();

  if (!longUrl) {
    return NextResponse.json({ error: 'longUrl is required' }, { status: 400 });
  }

  try {
    new URL(longUrl);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  if (shortCode) {
    const codeRegex = /^[A-Za-z0-9]{6,8}$/;
    if (!codeRegex.test(shortCode)) {
      return NextResponse.json({ error: 'Invalid short code format' }, { status: 400 });
    }

    const existingLink = await db.collection('links').where('shortcode', '==', shortCode).get();

    if (!existingLink.empty) {
      return NextResponse.json({ error: 'Short code already exists' }, { status: 409 });
    }
  }

  const newShortCode = shortCode || Math.random().toString(36).substring(2, 8);

  const newLink = {
    url: longUrl,
    shortcode: newShortCode,
    totalClicks: 0,
    lastClicked: null,
    createdAt: new Date(),
  };

  const docRef = await db.collection('links').add(newLink);

  return NextResponse.json({ id: docRef.id, ...newLink }, { status: 201 });
}
