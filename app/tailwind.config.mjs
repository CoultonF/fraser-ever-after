/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        paper: '#f4f2f7',
      },
      fontFamily: {
        serif: ['Handwritten', 'Calibri'],
        sans: ['Helvetica', 'Arial'],
      },
      backgroundImage: {
        '404-image':
          "url('https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75')",
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
