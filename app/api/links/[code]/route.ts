import { db } from '@/lib/firebase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: Promise<{ code: string; }>; }) {
  const { code } = await params;

  const snapshot = await db.collection('links').where('shortcode', '==', code).get();

  if (snapshot.empty) {
    return NextResponse.json({ error: 'Link not found' }, { status: 404 });
  }

  const doc = snapshot.docs[0];
  if (!doc.exists) {
    return NextResponse.json({ error: 'Link not found' }, { status: 404 });
  }

  // Update the link's click count and last clicked time
  await doc.ref.update({
    totalClicks: (doc.data().totalClicks || 0) + 1,
    lastClicked: new Date(),
  });

  // Prepare the link data to return  
  const link = { id: doc.id, ...doc.data() };

  return NextResponse.json(link);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ code: string; }>; }) {
  const { code } = await params;

  const snapshot = await db.collection('links').where('shortcode', '==', code).get();

  if (snapshot.empty) {
    return NextResponse.json({ error: 'Link not found' }, { status: 404 });
  }

  const doc = snapshot.docs[0];
  await doc.ref.delete();

  return new NextResponse(null, { status: 204 });
}
