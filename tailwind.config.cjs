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
        scheduleSlideLeft: {
          '0%': { left: '-100%' },
          '100%': { left: '0' },
        },
        message: {
          '0%': { right: '-15rem' },
          '20%': { right: '40px' },
          '80%': { right: '40px' },
          '100%': { right: '-15rem' },
        },
        selectRecipe: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        modalProfilOpen: 'modalProfilOpen 0.6s ease-in-out',
        modalProfilClose: 'modalProfilClose 0.6s ease-in-out',
        CardOpen: 'CardOpen 0.6s ease-in-out',
        scheduleSlideLeft: 'scheduleSlideLeft 2s ease-in-out',
        messageAnimation: 'message 3s ease-in-out',
        selectRecipe: 'selectRecipe 2s ease-in-out',
      },
    },
  },
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
};
