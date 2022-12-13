const LINE_BASE_URL = "https://api.line.me";
const LINE_DATA_URL = "https://api-data.line.me";

const Constants = {
  LINE: {
    MESSAGING_API: {
      WEBHOOK: `${LINE_BASE_URL}/v2/bot/message/{messageId}/content`,
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
};

export default Constants;
