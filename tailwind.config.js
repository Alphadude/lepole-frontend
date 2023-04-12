/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-green': '#006666',
        'dark-white': '#0D0D0D',
        'primary-dark-green': '#008080',
        'primary-white': '#FCFCFC',
        'primary-gray': '#73797F',
        'blue-green': '#29BDCC',
        'green-2': '#24B57A',
        'green-light': '#C4EFDF',
        'primary-blue': '#007AFF',
        'blue-light': '#D5EDFA',
        'dark-1': '#1E1E1E',
        'dark-2': '#212934',
        'gray-1': '#525964',
        'gray-2': '#8F9499',
        'gray-3': '#CED6DE',
        'gray-4': '#C7C9CC',
        'gray-dark-4': '#101010',
        'gray-5': '#526581',
        neutral: '#F5F8FA',
        'renaissance-black': '#1A1A1A',
        'renaissance-dark-black': '#EFEFEF',
        'off-black': '#1e1e1e',
        'orange-1': '#E08304',
        'orange-light': '#FFF0DB',
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
        '6xl': '0px 6px 3px rgba(207, 206, 206, 0.05)',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        droid: ['Droid Serif', 'serif'],
      },
    },
  },
  plugins: [],
};
