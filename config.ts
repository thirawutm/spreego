const Configs = {
  HOST:
    process.env.HOST ||
    "https://614a-2001-fb1-98-f923-80d1-85d5-5a7-1a79.ap.ngrok.io",
  NODE_ENV: process.env.NODE_ENV || "development",
  LINE_MESSAGING: {
    ACCESS_TOKEN: process.env.LINE_MESSAGING_ACCESS_TOKEN || "",
    CHANNEL_SECRET: process.env.LINE_MESSAGING_CHANNEL_SECRET || "",
  },
  LINE_LIFF: {
    LIFF_ID: process.env.NEXT_PUBLIC_LINE_LIFF_ID || "",
    CHANNEL_SECRET: process.env.LINE_LIFF_CHANNEL_SECRET || "",
  },
  MONGODB: {
    URI: process.env.MONGODB_URI || "mongodb://localhost:27017",
  },
}

export default Configs
