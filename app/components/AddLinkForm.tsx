'use client';

import { useState } from 'react';

export default function AddLinkForm({ onLinkAdded }: { onLinkAdded: () => void }) {
  const [longUrl, setLongUrl] = useState('');
  const [shortCode, setShortCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const res = await fetch('/api/links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ longUrl, shortCode }),
    });

    const data = await res.json();

    if (res.ok) {
      setSuccess(`Link created: ${window.location.origin}/${data.shortcode}`);
      setLongUrl('');
      setShortCode('');
      onLinkAdded();
    } else {
      setError(data.error);
    }
  };

  return (
    <div className="p-8 bg-secondary rounded-lg shadow-md mb-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="longUrl" className="block text-sm font-medium text-text-secondary mb-1">
            Destination URL
          </label>
          <input
            id="longUrl"
            type="url"
            placeholder="https://example.com/very/long/url..."
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            required
            className="w-full p-3 bg-background border border-gray-600 rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-highlight"
          />
        </div>
        <div>
          <label htmlFor="shortCode" className="block text-sm font-medium text-text-secondary mb-1">
            Custom Code (Optional)
          </label>
          <div className="flex items-center">
            <span className="inline-flex items-center px-3 h-12 bg-gray-700 border border-r-0 border-gray-600 rounded-l-md text-text-secondary">
              {typeof window !== 'undefined' ? window.location.origin : ''}/
            </span>
            <input
              id="shortCode"
              type="text"
              placeholder="custom-alias"
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value)}
              className="w-full p-3 h-12 bg-background border border-gray-600 rounded-r-md text-text-primary focus:outline-none focus:ring-2 focus:ring-highlight"
            />
          </div>
          <p className="text-xs text-text-secondary mt-1">
            Leave empty for a random code. Custom codes must be 6-8 alphanumeric characters.
          </p>
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-highlight text-white rounded-md bg-blue-600 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-highlight"
        >
          Shorten URL
        </button>
      </form>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      {success && <p className="text-green-500 mt-4 text-center">{success}</p>}
    </div>
  );
}
