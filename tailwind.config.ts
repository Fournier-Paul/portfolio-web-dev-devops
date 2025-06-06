import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"
import typography from "@tailwindcss/typography"

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#6366f1",
      },
    },
  },
  plugins: [typography],
}

export default config
