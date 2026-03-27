/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#FFFFFF',
          secondary: '#F6F6F6',
          card: '#FFFFFF',
        },
        border: {
          DEFAULT: '#E5E7EB',
        },
        accent: {
          primary: '#C1121F',
        },
        interactive: {
          primary: '#C1121F',
          hover: '#9A0E19',
        },
        text: {
          primary: '#111111',
          secondary: '#6B7280',
          muted: '#6B7280',
        },
        success: {
          green: '#1D9E75',
        },
        warning: {
          amber: '#D29922',
        },
        danger: {
          red: '#E24B4A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      borderWidth: {
        DEFAULT: '0.5px',
      }
    },
  },
  plugins: [],
}
