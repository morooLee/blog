function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(${variable})`;
    }
    return `rgb(${variable} / ${opacityValue})`;
  };
}

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  // experimental: {
  //   darkModeVariant: true,
  // },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        DEFAULT: 'var(--color-fg-default)',
        muted: 'var(--color-fg-muted)',
      },
      boxShadowColor: {
        DEFAULT: 'var(--color-border-default)',
        canvas: 'var(--color-canvas-default)',
        inset: 'var(--color-shadow-inset)',
        button: 'var(--color-btn-shadow)',
        muted: 'var(--color-fg-muted)',
      },
      divideColor: {
        DEFAULT: 'var(--color-border-default)',
        muted: 'var(--color-border-muted)',
      },
      borderColor: {
        DEFAULT: 'var(--color-border-default)',
        muted: 'var(--color-border-muted)',
        btn: 'var(--color-btn-border)',
        'btn-hover': 'var(--color-btn-hover-border)',
        inset: 'var(--color-bg-inset)',
        accent: 'var(--color-text-accent)',
      },
      backgroundColor: {
        DEFAULT: 'var(--color-canvas-default)',
        canvas: 'var(--color-canvas-default)',
        header: 'var(--color-header-bg)',
        inset: 'var(--color-bg-inset)',
        btn: 'var(--color-btn-bg)',
        'btn-hover': 'var(--color-btn-hover-bg)',
        tag: 'var(--color-tag-bg)',
        overlay: withOpacityValue('var(--color-bg-overlay)'),
      },
      textColor: {
        DEFAULT: 'var(--color-fg-default)',
        icon: 'var(--color-fg-default)',
        primary: 'var(--color-fg-default)',
        secondary: 'var(--color-fg-muted)',
        'header-text': 'var(--color-header-text)',
        'header-logo': 'var(--color-header-logo)',
        accent: 'var(--color-text-accent)',
        btn: 'var(--color-btn-text)',
        'link-accent': 'var(--color-accent-fg)',
      },
      width: {
        50: '12.5rem',
        content: '1408px',
        'screen-xs': '320px',
        aside: '350px',
        '3xl': '48rem',
        62: '15.5rem',
      },
      minWidth: {
        content: '1408px',
        'screen-xs': '320px',
        '3xl': '48rem',
        60: '15rem',
        62: '15.5rem',
      },
      maxWidth: {
        content: '1408px',
        'screen-xs': '320px',
        screen: '100vw',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        60: '15rem',
        62: '15.5rem',
      },
      height: {
        50: '12.5rem',
        aside: 'calc(100vh - 4.5rem)',
      },
      left: {
        62: '15.5rem',
        '-62': '-15.5rem',
      },
      top: {
        62: '15.5rem',
        '-62': '-15.5rem',
      },
      right: {
        62: '15.5rem',
        '-62': '-15.5rem',
      },
      bottom: {
        62: '15.5rem',
        '-62': '-15.5rem',
      },
      inset: {
        62: '15.5rem',
        '-62': '-15.5rem',
      },
      aspectRatio: {
        'og-image': '1.91 / 1',
      },
    },
  },
  variants: {
    extend: {
      // typography: ['dark'],
    },
    // typography: ['responsive', 'dark'],
  },
  plugins: [
    require('@fullhuman/postcss-purgecss')({
      content: ['./**/*.html'],
    }),
    require('@tailwindcss/typography')({
      className: 'markdown',
    }),
    require('tailwind-scrollbar-hide'),
    require('@neojp/tailwindcss-line-clamp-utilities'),
  ],
};
