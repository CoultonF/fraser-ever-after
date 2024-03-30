/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        paper: '#f4f2f7',
        rosette : {
        '50': '#fef2f3',
        '100': '#fde6e8',
        '200': '#fbd0d7',
        '300': '#f6a0ac',
        '400': '#f27a8e',
        '500': '#e84b69',
        '600': '#d42a52',
        '700': '#b21e44',
        '800': '#951c3f',
        '900': '#801b3c',
        '950': '#470a1c',
    },
    
      },
      fontFamily: {
        serif: ['Handwritten', 'Calibri'],
        sans: ['Helvetica', 'Arial'],
      },
      backgroundImage: {
        '404-image':
          "url('https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75')",
      },
      animation: {
            enter: "enter .2s ease-out",
            leave: "leave .15s ease-in forwards",
          },
          keyframes: {
            enter: {
              "0%": {
                opacity: "0",
                transform: "scale(.9)",
              },
              "100%": {
                opacity: "1",
                transform: "scale(1)",
              },
            },
            leave: {
              "0%": {
                opacity: "1",
                transform: "scale(1)",
              },
              "100%": {
                opacity: "0",
                transform: "scale(.9)",
              },
            },
          },
  },
  },
  plugins: [require('@tailwindcss/forms')],
};
