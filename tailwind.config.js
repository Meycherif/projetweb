/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],

  theme: {
    extend: {
      // Example future customizations
    },
  },

  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#f3d00c",  // Indigo - Main action buttons, branding
          "secondary": "#EC4899", // Pink - Secondary buttons or highlights
          "accent": "#22C55E",    // Green - Subtle accents, toggle states
          "neutral": "#374151",   // Gray - Neutral backgrounds or components
          "base-100": "#e4e6e7",  // Light Gray - Base background
          "info": "#f3d00c",      // Blue - Informational messages
          "success": "#16A34A",   // Green - Success states
          "warning": "#F59E0B",   // Amber - Warnings or attention messages
          "error": "#DC2626",     // Red - Error states or destructive actions
        },
      },
    ],
  },

  plugins: [
    require("daisyui"), // DaisyUI plugin for enhanced components and themes
  ],
};
