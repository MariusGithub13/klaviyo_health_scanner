/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#1E40AF', // blue-800
        'primary-50': '#EFF6FF', // blue-50
        'primary-100': '#DBEAFE', // blue-100
        'primary-200': '#BFDBFE', // blue-200
        'primary-500': '#3B82F6', // blue-500
        'primary-600': '#2563EB', // blue-600
        'primary-700': '#1D4ED8', // blue-700
        'primary-foreground': '#FFFFFF', // white

        // Secondary Colors
        'secondary': '#64748B', // slate-500
        'secondary-50': '#F8FAFC', // slate-50
        'secondary-100': '#F1F5F9', // slate-100
        'secondary-200': '#E2E8F0', // slate-200
        'secondary-300': '#CBD5E1', // slate-300
        'secondary-400': '#94A3B8', // slate-400
        'secondary-600': '#475569', // slate-600
        'secondary-700': '#334155', // slate-700
        'secondary-800': '#1E293B', // slate-800
        'secondary-900': '#0F172A', // slate-900
        'secondary-foreground': '#FFFFFF', // white

        // Accent Colors
        'accent': '#0EA5E9', // sky-500
        'accent-50': '#F0F9FF', // sky-50
        'accent-100': '#E0F2FE', // sky-100
        'accent-200': '#BAE6FD', // sky-200
        'accent-300': '#7DD3FC', // sky-300
        'accent-400': '#38BDF8', // sky-400
        'accent-600': '#0284C7', // sky-600
        'accent-700': '#0369A1', // sky-700
        'accent-foreground': '#FFFFFF', // white

        // Background Colors
        'background': '#F8FAFC', // slate-50
        'surface': '#FFFFFF', // white
        'surface-secondary': '#F1F5F9', // slate-100

        // Text Colors
        'text-primary': '#0F172A', // slate-900
        'text-secondary': '#475569', // slate-600
        'text-muted': '#64748B', // slate-500
        'text-inverse': '#FFFFFF', // white

        // Status Colors
        'success': '#059669', // emerald-600
        'success-50': '#ECFDF5', // emerald-50
        'success-100': '#D1FAE5', // emerald-100
        'success-200': '#A7F3D0', // emerald-200
        'success-500': '#10B981', // emerald-500
        'success-foreground': '#FFFFFF', // white

        'warning': '#D97706', // amber-600
        'warning-50': '#FFFBEB', // amber-50
        'warning-100': '#FEF3C7', // amber-100
        'warning-200': '#FDE68A', // amber-200
        'warning-500': '#F59E0B', // amber-500
        'warning-foreground': '#FFFFFF', // white

        'error': '#DC2626', // red-600
        'error-50': '#FEF2F2', // red-50
        'error-100': '#FEE2E2', // red-100
        'error-200': '#FECACA', // red-200
        'error-500': '#EF4444', // red-500
        'error-foreground': '#FFFFFF', // white

        // Border Colors
        'border': '#E2E8F0', // slate-200
        'border-muted': '#F1F5F9', // slate-100
      },
      fontFamily: {
        'heading': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'body': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'caption': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      spacing: {
        'header-height': '64px',
        'sidebar-width': '280px',
        'content-padding': '16px',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'modal': '0 10px 25px rgba(0, 0, 0, 0.1)',
      },
      transitionDuration: {
        'fast': '200ms',
        'normal': '300ms',
        'slow': '500ms',
      },
      transitionTimingFunction: {
        'micro': 'ease-out',
        'smooth': 'ease-out',
        'workflow': 'ease-out',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      zIndex: {
        'header': '1000',
        'mobile-menu': '1100',
        'sidebar': '100',
        'modal': '1200',
        'tooltip': '1300',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}