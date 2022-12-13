const Configs = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  LINE: {
    ACCESS_TOKEN: process.env.LINE_ACCESS_TOKEN || '',
    CHANNEL_SECRET: process.env.LINE_CHANNEL_SECRET || '',
  },
  MONGODB: {
    URI: process.env.MONGODB_URI || 'mongodb://localhost:27017',
  },
}

export default Configs
