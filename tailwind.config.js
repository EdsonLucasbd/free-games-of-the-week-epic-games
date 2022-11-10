/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

const backfaceVisibility = plugin(function ({ addUtilities }) {
  addUtilities({
    '.backface-visible': {
      'backface-visibility': 'visible',
    },
    '.backface-hidden': {
      'backface-visibility': 'hidden',
    }
  })
});

const preserve3d = plugin(function ({ addUtilities }) {
  addUtilities({
    '.preserve-3d': {
      'transform-style': 'preserve-3d'
    }
  })
})

const rotateY = plugin(function ({ addUtilities }) {
  addUtilities({
    '.rotate-y-180': {
      transform: 'rotateY(180deg)'
    }
  })
})

module.exports = {
  content: [
    "./pages/**/*.tsx",
    "./src/components/**/*.tsx",
  ],
  theme: {
    extend: {
    },
  },
  plugins: [
    require('@kamona/tailwindcss-perspective'),
    backfaceVisibility,
    preserve3d,
    rotateY
  ],
}
