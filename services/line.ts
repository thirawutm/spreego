import { Message } from "@line/bot-sdk"
import lineClient from "../lib/line"

export namespace LineService {
  function _extractReplyToken(reqBody: Record<string, any>): string {
    return reqBody.events[0].replyToken
  }

  export function replyMessage(
    reqBody: any,
    messages: Message[]
  ): Promise<any> {
    const replyToken = _extractReplyToken(reqBody)
    return lineClient.replyMessage(replyToken, messages)
  }

  export function pushMessage(reqBody: any, messages: Message[]): Promise<any> {
    const { groupId } = reqBody
    return lineClient.pushMessage(groupId, messages)
  }
}
