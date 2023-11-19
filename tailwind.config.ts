import type { Config } from 'tailwindcss'

const radix = require('tailwindcss-radix')

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        white: '#EDEADC',
        black: '#171A1B',
        yellow: '#EDC337'
      },
      fontSize: {
        base: '17px',
        lg: '30px',
        xl: '40px',
        xxl: '80px'
      }
    }
  },
  plugins: [radix()]
}
export default config
