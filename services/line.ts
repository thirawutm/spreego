import lineClient from "../lib/line";

export namespace LineService {
  export function init(reqBody: any): Promise<any> {
    return lineClient.replyMessage(reqBody.events[0].replyToken, [
      {
        type: "text",
        text: "ทำไรกันดี SpreePle 🎉",
        quickReply: {
          items: [
            {
              type: "action",
              action: {
                type: "uri",
                label: "เปิดตี้",
                uri: "https://google.com",
              },
            },
            {
              type: "action",
              action: {
                type: "message",
                label: "ดูตี้ทั้งหมด",
                text: "#ดูตี้ทั้งหมด",
              },
            },
          ],
        },
      },
    ]);
  }
}
