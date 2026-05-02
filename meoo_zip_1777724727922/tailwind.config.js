module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#6e2523',
        cream: '#f3f1e8',
        'cream-dark': '#e8e5da',
        burgundy: '#6e2523',
        'burgundy-light': '#8a3a38',
      },
      fontFamily: {
        microphone: ['Microphone', 'sans-serif'],
      }
    }
  },
  plugins: []
};
