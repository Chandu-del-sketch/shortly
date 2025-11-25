'use client';

import { useEffect, useState } from 'react';
import AddLinkForm from './components/AddLinkForm';
import LinkTable from './components/LinkTable';

export default function Home() {
  const [links, setLinks] = useState<any[]>([]);

  const fetchLinks = async () => {
    const res = await fetch('/api/links');
    const data = await res.json();
    setLinks(data);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleDelete = async (shortcode: string) => {
    await fetch(`/api/links/${shortcode}`, {
      method: 'DELETE',
    });
    fetchLinks();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-text-primary p-4">
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          TinyLink
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto">
          Shorten your links, track their performance, and share them with the world.
          Simple, fast, and secure.
        </p>
      </div>
      <div className="w-full max-w-4xl">
        <AddLinkForm onLinkAdded={fetchLinks} />
        <LinkTable links={links} onDelete={handleDelete} />
      </div>
    </div>
  );
}
