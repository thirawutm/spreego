import { FlexBubble, Message } from "@line/bot-sdk"
import Configs from "../config"
import { Events } from "../interfaces"
import { FlexMessageBuilders } from "./helpers/builders"
import { LineService } from "./line"

export namespace SpreeGOService {
  export function start(reqBody: any): Promise<any> {
    const messages: Message[] = [
      {
        type: "text",
        text: "ทำไรกันดี SpreePle",
        quickReply: {
          items: [
            {
              type: "action",
              action: {
                type: "uri",
                label: "เปิดตี้",
                uri: `${Configs.LINE_LIFF.LIFF_URL}/event/create`,
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
    ]
    return LineService.replyMessage(reqBody, messages)
  }

  export function setup(reqBody: any): Promise<any> {
    const messages: Message[] = [
      {
        type: "flex",
        altText: "มาเลยครับ เดี๋ยวน้องเรนช่วยเปิดตี้ให้เอง",
        contents: {
          type: "bubble",
          header: FlexMessageBuilders.buildSetupHeader(),
          body: FlexMessageBuilders.buildSetupBody(
            "มาเลยครับ เดี๋ยวน้องเรนช่วยเปิดตี้ให้เอง",
            {
              label: "ใส่รายละเอียดตี้ที่จะเปิด",
              uri: `${Configs.LINE_LIFF.LIFF_URL}/event/create`,
            }
          ),
        },
      },
    ]
    return LineService.replyMessage(reqBody, messages)
  }

  export function announce(reqBody: Events): Promise<any> {
    const { name, host } = reqBody
    const { location, date, startTime, endTime, members, eventId } = reqBody
    const messages: Message[] = [
      {
        type: "flex",
        altText: "มาเข้าตี้ซะดีๆ SpreePle",
        contents: {
          type: "bubble",
          header: FlexMessageBuilders.buildListHeader(name, host),
          body: FlexMessageBuilders.buildListBody(
            location,
            date,
            startTime,
            endTime,
            members,
            eventId
          ),
        },
      },
    ]
    return LineService.pushMessage(reqBody, messages)
  }

  export function join(reqBody: any): Promise<any> {
    const messages: Message[] = [
      {
        type: "flex",
        altText: "มาเข้าตี้ซะดีๆ SpreePle",
        contents: {
          type: "bubble",
          header: FlexMessageBuilders.buildListHeader(
            reqBody.name,
            reqBody.host
          ),
          body: {
            type: "box",
            layout: "vertical",
            spacing: "md",
            contents: [
              {
                type: "box",
                layout: "baseline",
                spacing: "md",
                contents: [
                  {
                    type: "icon",
                    url:
                      reqBody.user.pictureUrl ??
                      `${Configs.HOST}/user-default.png`,
                    size: "xxl",
                  },
                  {
                    type: "text",
                    text: `${reqBody.user.displayName} is joining ${
                      reqBody.user.withFriends > 0
                        ? `(+${reqBody.user.withFriends})`
                        : ""
                    }`,
                  },
                ],
              },
              {
                type: "button",
                style: "primary",
                color: "#3371FF",
                action: {
                  type: "uri",
                  label: "Join",
                  uri: `${Configs.LINE_LIFF.LIFF_URL}/event/${reqBody.eventId}/join`,
                },
              },
              {
                type: "separator",
              },
              FlexMessageBuilders.buildJoinerCount(reqBody.members)
            ],
          },
        },
      },
    ]
    return LineService.pushMessage(reqBody, messages)
  }

  export function leave(reqBody: any): Promise<any> {
    const messages: Message[] = [
      {
        type: "flex",
        altText: "มาเข้าตี้ซะดีๆ SpreePle",
        contents: {
          type: "bubble",
          header: FlexMessageBuilders.buildListHeader(
            reqBody.name,
            reqBody.host,
            "#E0a38e"
          ),
          body: {
            type: "box",
            layout: "vertical",
            spacing: "md",
            contents: [
              {
                type: "box",
                layout: "baseline",
                spacing: "md",
                contents: [
                  {
                    type: "icon",
                    url:
                      reqBody.user.pictureUrl ??
                      `${Configs.HOST}/user-default.png`,
                    size: "xxl",
                  },
                  {
                    type: "text",
                    text: `${reqBody.user.displayName} is declined ${
                      reqBody.user.withFriends > 0
                        ? `(+${reqBody.user.withFriends})`
                        : ""
                    }`,
                  },
                ],
              },
              {
                type: "separator",
              },
              FlexMessageBuilders.buildJoinerCount(reqBody.members)
            ],
          },
        },
      },
    ]
    return LineService.pushMessage(reqBody, messages)
  }

  export function list(reqBody: any, events: Events[]): Promise<any> {
    const contents: any[] = events
      .map((event: Events) => ({
        type: "bubble",
        header: FlexMessageBuilders.buildListHeader(event.name, event.host),
        body: FlexMessageBuilders.buildListBody(
          event.location,
          event.date,
          event.startTime,
          event.endTime,
          event.members,
          event.eventId
        ),
      }))
      .slice(0, 12)
    const messages: Message[] = [
      {
        type: "flex",
        altText: "มาเข้าตี้ซะดีๆ SpreePle",
        contents: {
          type: "carousel",
          contents,
        },
      },
    ]
    return LineService.replyMessage(reqBody, messages)
  }

  export function summary(reqBody: any, events: Events[]): Promise<any> {
    const messages: Message[] = events.map(
      (event: Events): Message => ({
        type: "flex",
        altText: `ตี้ ${event.name} สำเร็จลุล่วงแล้วว`,
        contents: {
          type: "bubble",
          header: {
            type: "box",
            layout: "horizontal",
            backgroundColor: "#3371FF",
            alignItems: "flex-end",
            spacing: "sm",
            contents: [
              {
                type: "box",
                layout: "vertical",
                spacing: "sm",
                flex: 2,
                contents: [
                  {
                    type: "text",
                    text: "🎉 WE DID IT 🎉",
                    weight: "bold",
                    size: "lg",
                    color: "#FFFFFF",
                  },
                  {
                    type: "text",
                    text: `${event.name}`,
                    size: "lg",
                    color: "#FFFFFF",
                  },
                  {
                    type: "text",
                    text: `by ${event.host.displayName}`,
                    size: "sm",
                    color: "#EEEEEE",
                  },
                ],
              },
              {
                type: "image",
                url: `${Configs.HOST}/ren-confetti.png`,
              },
            ],
          },
          body: FlexMessageBuilders.buildSetupBodyWithJoiners(
            `อย่าลืมจ่ายเงิน @${event.host.displayName} :)`,
            {
              label: "คำนวณเงิน",
              uri: `${Configs.LINE_LIFF.LIFF_URL}/event/calculate`,
            },
            event.members
          ),
        },
      })
    )
    return LineService.replyMessage(reqBody, [messages[0]])
  }

  export function error(reqBody: any): Promise<any> {
    const messages: Message[] = [
      {
        type: "text",
        text: "มุแง้~ แย่จัง บัคซะแล้ว 🐛",
      },
      {
        type: "sticker",
        packageId: "446",
        stickerId: "2008",
      },
    ]
    return LineService.replyMessage(reqBody, messages)
  }
}
