import { notFound, redirect } from 'next/navigation';
import { db } from '@/lib/firebase';


async function getLink(code: string) {
  console.log(`Fetching link for code: ${code}`);
  const link = await db.collection('links').where('shortcode', '==', code).get();

  if (link.empty) {
    notFound();
  }

  const linkData = link.docs[0].data();

  // Update the link's click count and last clicked time
  await db.collection('links').doc(link.docs[0].id).update({
    totalClicks: linkData.totalClicks + 1,
    lastClicked: new Date(),
  });

  return {
    url: linkData.url,
    shortcode: linkData.shortcode,
    totalClicks: linkData.totalClicks + 1,
    lastClicked: new Date(),
    createdAt: linkData.createdAt,
  };
}


export default async function RedirectPage({ params }: { params: { code: string } }) {
  const { code } = await params; 
  const link = await getLink(code);
  
  
  redirect(link.url);
}
