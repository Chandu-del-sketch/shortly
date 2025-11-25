import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#1a1a1a',
        'purple': '#6a0dad',
        'blue': '#0070f3',
        'primary': '#1a1a1a',
        'secondary': '#f2f2f2',
        'accent': '#6a0dad',
        'highlight': '#0070f3',
        'text-primary': '#ffffff',
        'text-secondary': '#b3b3b3',
      },
    },
  },
  plugins: [],
}
export default config
