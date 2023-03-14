/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-green': '#006666',
        'primary-white': '#FCFCFC',
        'dark-1': '#1E1E1E',
        'dark-2': '#212934',
        'gray-2': '#8F9499',
        'gray-3': '#CED6DE',
      },
      backgroundImage: {
        'lepole-pattern': "url('/public/lePole-bg.png')",
      },
    },
  },
  plugins: [],
};
