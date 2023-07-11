module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      bgff: '#FFFFFF',
      primaryff: '#D3DFAF',
      secondaryff: '#FFE177',
      thirdff: '#1F7551',
      fourthff: '#9DC2B7',
      activeff: '#FF0000',
    },
  },
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  plugins: [require('daisyui')],
};
