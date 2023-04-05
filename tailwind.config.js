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
        'gray-4': '#C7C9CC',
        'gray-5': '#526581',
        neutral: '#F5F8FA',
        'renaissance-black': '#1A1A1A',
        'off-black': '#1e1e1e',
      },
      backgroundImage: {
        'lepole-pattern': "url('/public/lePole-bg.png')",
      },
      height: {
        main: 'calc(100vh - 105px)',
      },

      boxShadow: {
        '3xl': '0px 0px 20px rgba(0, 0, 0, 0.1)',
        '4xl': '0px -1px 6px rgba(0, 0, 0, 0.05)',
        '5xl': '-1px 1px 4px 2px rgba(0, 0, 0, 0.33)',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        droid: ['Droid Serif', 'serif'],
      },
    },
  },
  plugins: [],
};
