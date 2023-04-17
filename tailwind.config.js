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
        'sidebar-dark-green': '#05A7A7',
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
        'neutral': '#F5F8FA',
        'neutral-700': '#2A2E33',
        'grey-6': '#ABAFB2',
        'renaissance-black': '#1A1A1A',
        'renaissance-dark-black': '#EFEFEF',
        'renaissance-blue': '#177AE5',
        'renaissance-gray-2': '#ABAFB2',
        'off-black': '#1e1e1e',
        'filter-bg': '#F4F6F8',
        'bundle-coin-bg': '#252525',
        'badge-gray': '#E1E7EC',
        'orange-1': '#E08304',
        'orange-light': '#FFF0DB',
        'avatarBg': '#BDF3FC',
        'avatarText': '#085E7A',
        'avatar-headerText': '#08294C',
        'table-header-black': '#141414',
        'table-border-gray': '#1D262E',
        'table-dark-text': '#E5E5E5'
      },
      backgroundImage: {
        'lepole-pattern': "url('/public/lePole-bg.png')",
        'lepole-pattern-light': "url('/public/lePole-bg-light.png')",
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
      fontSize: {
        'xxs': '10px'
      },
      borderRadius: {
        'xlg': '10px'
      }
    },
  },
  plugins: [],
};
