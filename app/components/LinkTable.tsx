'use client';

import { useState } from 'react';

export default function LinkTable({ links, onDelete }: { links: any; onDelete: (shortcode: string) => void }) {
  const [copied, setCopied] = useState('');

  const copyToClipboard = (shortcode: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/${shortcode}`);
    setCopied(shortcode);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="overflow-x-auto bg-secondary rounded-lg shadow-md">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="py-3 px-4 text-left text-sm font-medium text-text-secondary uppercase tracking-wider">Short Link</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-text-secondary uppercase tracking-wider">Original URL</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-text-secondary uppercase tracking-wider">Clicks</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-text-secondary uppercase tracking-wider">Last Clicked</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-text-secondary uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {links.length > 0 ? links.map((link:any) => (
            <tr key={link.id} className="hover:bg-gray-700/50">
              <td className="py-4 px-4 whitespace-nowrap">
                <a href={`/code/${link.shortcode}`} className="text-highlight hover:underline">
                  {`${window.location.origin}/${link.shortcode}`}
                </a>
              </td>
              <td className="py-4 px-4 truncate max-w-xs text-text-secondary">{link.url}</td>
              <td className="py-4 px-4 text-text-secondary">{link.totalClicks}</td>
              <td className="py-4 px-4 text-text-secondary">
                {link.lastClicked ? new Date(link.lastClicked).toLocaleString() : 'N/A'}
              </td>
              <td className="py-4 px-4 whitespace-nowrap">
                <button
                  onClick={() => copyToClipboard(link.shortcode)}
                  className="p-2 bg-highlight/10 text-highlight rounded-md hover:bg-highlight/20 transition-colors"
                >
                  {copied === link.shortcode ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={() => onDelete(link.shortcode)}
                  className="p-2 bg-red-500/10 text-red-500 rounded-md hover:bg-red-500/20 transition-colors ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          )): (
            <tr>
              <td colSpan={5} className="py-4 px-4 text-center text-text-secondary">
                No links found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
