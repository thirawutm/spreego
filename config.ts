const Configs = {
  HOST: process.env.HOST || "",
  NODE_ENV: process.env.NODE_ENV || "development",
  LINE_MESSAGING: {
    ACCESS_TOKEN: process.env.LINE_MESSAGING_ACCESS_TOKEN || "",
    CHANNEL_SECRET: process.env.LINE_MESSAGING_CHANNEL_SECRET || "",
  },
  LINE_LIFF: {
    LIFF_ID: process.env.NEXT_PUBLIC_LINE_LIFF_ID || "",
    LIFF_URL: process.env.NEXT_PUBLIC_LINE_LIFF_URL || "",
    CHANNEL_SECRET: process.env.LINE_LIFF_CHANNEL_SECRET || "",
  },
  MONGODB: {
    URI: process.env.MONGODB_URI || "mongodb://localhost:27017",
  },
  NOTIFY_EVERY_MINS: parseInt(process.env.NOTIFY_EVERY_MINS ?? "240")
}

export default Configs
