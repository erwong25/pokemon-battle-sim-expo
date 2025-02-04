/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./app/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        Normal: "#A8A77A",
        Fighting: "#C22E28",
        Flying: "#A98FF3",
        Poison: "#A33EA1",
        Ground: "#E2BF65",
        Rock: "#B6A136",
        Bug: "#A6B91A",
        Ghost: "#735797",
        Steel: "#B7B7CE",
        Water: "#6390F0",
        Fire: "#EE8130",
        Grass: "#7AC74C",
        Electric: "#F7D02C",
        Psychic: "#F95587",
        Ice: "#96D9D6",
        Dragon: "#6F35FC",
        Dark: "#705746",
        Fairy: "#D685AD",
      },
    },
  },
  plugins: [],
};
