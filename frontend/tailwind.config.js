module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
	  './src/components/**/*.js',
	  './pages/**/*.js',
  ],
  theme: {
    extend: {
        screens: {
          xm: '320px'
        },
        height: {
            'almost-screen': 'calc(-16rem + 100vh)',
            '225px': '14.063rem',
            '338px': '21.125rem'
        },
        width: {
            '400px': '25rem',
            '600px': '37.5rem'
        },
        minHeight:{
            'almost-screen': 'calc(-16rem + 100vh)'
        },
    },
  },
  variants: {},
  plugins: [
	  require( 'tailwindcss' ),
	  require( 'precss' ),
	  require( 'autoprefixer' )
  ],
}
