import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: '#000000',
          light: '#1a1a1a',
          lighter: '#333333',
        },
        white: {
          DEFAULT: '#ffffff',
          off: '#f5f5f5',
        },
        red: {
          DEFAULT: '#ff0000',
          dark: '#cc0000',
        },
        accent: {
          light: '#ffcccc',
          DEFAULT: '#ff0000',
          dark: '#cc0000',
        },
        wood: {
          50: '#f8f5f0',
          100: '#e8e0d1',
          200: '#d1c0a3',
          300: '#b89b74',
          400: '#a37c51',
          500: '#8f6b45',
          600: '#7a573a',
          700: '#5e4430',
          800: '#4e3a2a',
          900: '#3f2f24',
          950: '#201710',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-playfair-display)'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
