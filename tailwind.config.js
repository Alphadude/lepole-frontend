/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-green': '#006666',
        'primary-dark-green': '#008080',
        'primary-white': '#FCFCFC',
        'primary-gray': '#73797F',
        'blue-green': '#29BDCC',
        'dark-1': '#1E1E1E',
        'dark-2': '#212934',
        'gray-1': '#525964',
        'gray-2': '#8F9499',
        'gray-3': '#CED6DE',
        neutral: '#F5F8FA',
        'off-black': '#1a1a1a'
      },
      backgroundImage: {
        'lepole-pattern': "url('/public/lePole-bg.png')",
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        droid: ['PT Serif', 'serif']
      }
    },
  },
  plugins: [],
};
