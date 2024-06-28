/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true, // Center the container content horizontally
      padding: {
        default: "2rem", // Default padding value
        sm: "2rem", // Padding value for small screens (sm breakpoint)
        lg: "4rem", // Padding value for large screens (lg breakpoint)
        xl: "6rem", // Padding value for extra large screens (xl breakpoint)
      },
    },

    extend: {
      height: {
        'screen-minus-navbar': 'calc(100vh - 84px)', // Assuming navbar height is 4rem
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        DarkBlue: "#1D3072",
        MyGrey: "#CBCBCB",
        mainColor: "#27419E",
        secondaryColor: "#1D3072",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      llgg: "1300px",
      // => @media (min-width: 1536px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }

      xxll: "1750px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [require("tailwindcss-animate")],
};
