/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({}),
      boxShadow: {
        custom: "inset 0 0 8px white, 0 0 8px white",
      },
    },
  },
  plugins: [],
};
