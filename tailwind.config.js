/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 18 column grid
        18: "repeat(18, minmax(0, 1fr))",
      },
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(76.97% 83.67% at 100% 100%, #0D4477 0%, #3E92CE 100%)",

        "gradient-player-card":
          "linear-gradient(160.65deg, rgba(255, 255, 255, 0.6) 0.74%, rgba(255, 255, 255, 0.1) 102.03%)",

        "gradient-decorator-circle":
          "radial-gradient(157.07% 157.07% at 171.6% 173.4%, #FFFFFF 0%, #3E92CE 100%)",

        "gradient-glassy":
          "linear-gradient(107.62deg, rgba(255, 255, 255, 0.6) -0.7%, rgba(255, 255, 255, 0.1) 102.18%)",

        "gradient-card-match":
          "linear-gradient(116.82deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 105.28%)",

        "gradient-mobile":
          "linear-gradient(107.62deg, rgba(255, 255, 255, 0.6) -0.7%, rgba(255, 255, 255, 0.1) 102.18%)",

        "gradient-mobile-player-card-to-r":
          "linear-gradient(90.37deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.1) 99.2%)",

        "gradient-mobile-player-card-to-l":
          "linear-gradient(90.37deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.6) 99.2%)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
