import type { Config } from 'tailwindcss';

/**
 * DoubleHub Tailwind 設定
 * 色・タイポグラフィ・スペーシングは全て CSS 変数で持たせ、
 * `[data-theme="dark"]` と `.theme-bookcompass` / `.theme-trainnote` でオーバーライドする。
 */
const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{ts,tsx,mdx}', './content/**/*.{md,mdx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '1.5rem',
        lg: '2rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1200px',
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-2': 'var(--color-surface-2)',
        border: 'var(--color-border)',
        divider: 'var(--color-divider)',
        text: 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        'text-faint': 'var(--color-text-faint)',
        'text-inverse': 'var(--color-text-inverse)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          soft: 'var(--color-primary-soft)',
        },
        'accent-warm': {
          DEFAULT: 'var(--color-accent-warm)',
          soft: 'var(--color-accent-warm-soft)',
        },
        // プロダクトごとのアクセント（スコープで差し替え）
        'accent-product': 'var(--color-accent-product, var(--color-primary))',
        'accent-product-fg': 'var(--color-accent-product-fg, var(--color-text-inverse))',
      },
      fontFamily: {
        sans: ['var(--font-body)'],
        display: ['var(--font-display)'],
      },
      fontSize: {
        xs: 'var(--text-xs)',
        sm: 'var(--text-sm)',
        base: 'var(--text-base)',
        lg: 'var(--text-lg)',
        xl: 'var(--text-xl)',
        '2xl': 'var(--text-2xl)',
        '3xl': 'var(--text-3xl)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      maxWidth: {
        'content-narrow': '680px',
        'content-default': '1000px',
        'content-wide': '1200px',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      animation: {
        'fade-in': 'fade-in 420ms var(--ease-out, cubic-bezier(0.16, 1, 0.3, 1)) both',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
