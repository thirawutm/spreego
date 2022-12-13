const LINE_BASE_URL = "https://api.line.me";
const LINE_DATA_URL = "https://api-data.line.me";
const Constants = {
  LINE: {
    MESSAGING_API: {
      WEBHOOK: `${LINE_BASE_URL}/v2/bot/message/{messageId}/content`,
    },
  },
};

export default Constants;
