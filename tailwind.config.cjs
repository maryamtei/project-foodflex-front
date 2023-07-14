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
    },
  },
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  plugins: [require('daisyui')],
};
