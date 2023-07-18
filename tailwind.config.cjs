module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bgff: '#FFFFFF',
        primaryff: '#D3DFAF',
        secondaryff: '#FFE177',
        thirdff: '#ff9b90', // #1F7551 notre couleur #ff9b90 marmiton #E26A6B cuisineAZ
        fourthff: '#ff6f61', // 9DC2B7 notre couleur #ff6f61 marmiton #333333 cuisineAZ
      },
      keyframes: {
        modalProfilOpen: {
          '0%': { right: '-20rem' },
          '100%': { right: '0px' },
        },
        modalProfilClose: {
          '0%': { right: '0px' },
          '100%': { right: '-20rem' },
        },
        CardOpen: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        modalProfilOpen: 'modalProfilOpen 0.6s ease-in-out',
        modalProfilClose: 'modalProfilClose 0.6s ease-in-out',
        CardOpen: 'CardOpen 0.6s ease-in-out',
      },
    },
  },
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  plugins: [require('daisyui')],
};
