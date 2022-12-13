const LINE_BASE_URL = "https://api.line.me";

const Constants = {
  LINE: {
    ACCESS_TOKEN:
      "/6RjW7pFo0tT+WbFZoljV6rIfcQBJlINAGsThkB1Dhn3ktLFr0UCe4r8uO1VcmpvoZ1zevzjRCmtf20zgX38DKsN5V752PEigndXLS7qi28QJtDj8O1VH4RYyPWHZZe1+d17/OKqspwBwqcw8jG8tgdB04t89/1O/w1cDnyilFU=",
    CHANNEL_SECRET: "5796279dfe22b8b9212f73db1532f387",
    MESSAGING_API: {
      SEND_REPLY_MESSAGE: `${LINE_BASE_URL}/v2/bot/message/reply`,
    },
  },
  SCREEN_SIZE: {
    SSS: 320,
    SS: 600,
    XS: 769,
    SM: 1080,
    MD: 1440,
    LG: 1920,
  },
  DB: {
    NAME: 'spree-go-db'
  }
};

export default Constants;
