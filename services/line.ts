import { Message } from "@line/bot-sdk";
import lineClient from "../lib/line";

export namespace LineService {
  function _extractReplyToken(reqBody: Record<string, any>): string {
    return reqBody.events[0].replyToken;
  }

  export function replyMessage(
    reqBody: any,
    messages: Message[],
  ): Promise<any> {
    const replyToken = _extractReplyToken(reqBody);
    console.log("🚀 ~ file: line.ts:14 ~ replyToken", replyToken);
    return lineClient.replyMessage(replyToken, messages);
  }
}
