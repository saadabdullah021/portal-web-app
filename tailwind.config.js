/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)", "sans-serif"], // default
        dm: ["DM Sans", "sans-serif"], // custom class
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        text: "#23262F",
      },
    },
  },
  plugins: [require("tailwindcss-logical")],
};
