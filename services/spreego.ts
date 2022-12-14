import { Message } from "@line/bot-sdk"
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
                uri: " https://liff.line.me/1657732696-MwOP0zVZ/event/create",
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
          header: {
            type: "box",
            layout: "horizontal",
            backgroundColor: "#3371FF",
            alignItems: "flex-end",
            contents: [
              {
                type: "text",
                text: "#เปิดตี้",
                weight: "bold",
                size: "xxl",
                color: "#FFFFFF",
              },
              {
                type: "filler",
              },
              {
                type: "image",
                url: `${Configs.HOST}/ren-confetti.png`,
              },
            ],
          },
          body: {
            type: "box",
            layout: "vertical",
            spacing: "xl",
            contents: [
              {
                type: "text",
                text: "มาเลยครับ เดี๋ยวน้องเรนช่วยเปิดตี้ให้เอง",
              },
              {
                type: "separator",
              },
              {
                type: "box",
                layout: "vertical",
                backgroundColor: "#3371FF",
                cornerRadius: "md",
                contents: [
                  {
                    type: "button",
                    color: "#FFFFFF",
                    action: {
                      type: "uri",
                      label: "ใส่รายละเอียดตี้ที่จะเปิด",
                      uri: "https://liff.line.me/1657735002-y6LEPx1J/event/create",
                    },
                  },
                ],
              },
            ],
          },
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
          header: {
            type: "box",
            layout: "horizontal",
            backgroundColor: "#3371FF",
            alignItems: "flex-end",
            spacing: "md",
            contents: [
              {
                type: "box",
                layout: "vertical",
                flex: 2,
                contents: [
                  {
                    type: "text",
                    text: "Basketball",
                    weight: "bold",
                    size: "xl",
                    color: "#FFFFFF",
                  },
                  {
                    type: "text",
                    text: "หัวตี้ Thirawut Muninta",
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
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "box",
                layout: "baseline",
                spacing: "md",
                contents: [
                  {
                    type: "icon",
                    url: reqBody.user.pictureUrl ?? `${Configs.HOST}/user-default.png`,
                    size: "xxl",
                  },
                  {
                    type: "text",
                    text: `${reqBody.user.displayName} is joining ${reqBody.user.withFriends>0 ? `(+${reqBody.user.withFriends})` : ""}`,
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
              {
                type: "text",
                text: `${reqBody.members.length} people are joining`,
                size: "sm",
                color: "#aaaaaa",
              },
            ],
          },
        },
      },
    ]
    return LineService.pushMessage(reqBody, messages)
  }

  export function list(reqBody: any): Promise<any> {
    const messages: Message[] = [
      {
        type: "flex",
        altText: "มาเข้าตี้ซะดีๆ SpreePle",
        contents: {
          type: "carousel",
          contents: [
            {
              type: "bubble",
              header: {
                type: "box",
                layout: "horizontal",
                backgroundColor: "#3371FF",
                alignItems: "flex-end",
                spacing: "md",
                contents: [
                  {
                    type: "box",
                    layout: "vertical",
                    flex: 2,
                    contents: [
                      {
                        type: "text",
                        text: "Basketball",
                        weight: "bold",
                        size: "xl",
                        color: "#FFFFFF",
                      },
                      {
                        type: "text",
                        text: "หัวตี้ Thirawut Muninta",
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
              body: {
                type: "box",
                layout: "vertical",
                spacing: "md",
                contents: [
                  {
                    type: "box",
                    layout: "horizontal",
                    spacing: "sm",
                    contents: [
                      {
                        type: "text",
                        text: "Place",
                        color: "#aaaaaa",
                        size: "sm",
                        flex: 1,
                      },
                      {
                        type: "text",
                        wrap: true,
                        color: "#666666",
                        size: "sm",
                        flex: 4,
                        contents: [],
                        text: "The Street Ratchada,\nRatchadaphisek Rd, Din Daeng, Bangkok 10400" as unknown as undefined,
                      },
                    ],
                  },
                  {
                    type: "box",
                    layout: "baseline",
                    spacing: "sm",
                    contents: [
                      {
                        type: "text",
                        text: "Date",
                        color: "#aaaaaa",
                        size: "sm",
                        flex: 1,
                      },
                      {
                        type: "text",
                        text: "Tuesday 20 Dec 2022",
                        wrap: true,
                        color: "#666666",
                        size: "sm",
                        flex: 4,
                      },
                    ],
                  },
                  {
                    type: "box",
                    layout: "baseline",
                    spacing: "sm",
                    contents: [
                      {
                        type: "text",
                        text: "Time",
                        color: "#aaaaaa",
                        size: "sm",
                        flex: 1,
                      },
                      {
                        type: "text",
                        text: "20:00 - 22:00",
                        wrap: true,
                        color: "#666666",
                        size: "sm",
                        flex: 4,
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
                      uri: "https://google.com",
                    },
                  },
                  {
                    type: "button",
                    color: "#FF0000",
                    action: {
                      type: "uri",
                      label: "Adjust Event",
                      uri: "https://google.com",
                    },
                  },
                  {
                    type: "separator",
                  },
                  {
                    type: "text",
                    text: "12 people are joining",
                    size: "sm",
                    color: "#aaaaaa",
                  },
                  {
                    type: "box",
                    layout: "horizontal",
                    spacing: "sm",
                    contents: [
                      {
                        type: "box",
                        layout: "vertical",
                        spacing: "xl",
                        flex: 2,
                        contents: [
                          {
                            type: "box",
                            layout: "baseline",
                            contents: [
                              {
                                type: "icon",
                                url: "https://ca.slack-edge.com/T3ZPZ7J7M-U027PPTSYHG-b86ca57759f4-512",
                              },
                              {
                                type: "text",
                                text: "Thirawut Muninta",
                                size: "xs",
                                margin: "sm",
                              },
                            ],
                          },
                          {
                            type: "box",
                            layout: "baseline",
                            contents: [
                              {
                                type: "icon",
                                url: "https://ca.slack-edge.com/T3ZPZ7J7M-U027PPTSYHG-b86ca57759f4-512",
                              },
                              {
                                type: "text",
                                text: "Thirawut Muninta",
                                size: "xs",
                                margin: "sm",
                              },
                            ],
                          },
                          {
                            type: "box",
                            layout: "baseline",
                            contents: [
                              {
                                type: "icon",
                                url: "https://ca.slack-edge.com/T3ZPZ7J7M-U027PPTSYHG-b86ca57759f4-512",
                              },
                              {
                                type: "text",
                                text: "Thirawut Muninta",
                                size: "xs",
                                margin: "sm",
                              },
                            ],
                          },
                          {
                            type: "box",
                            layout: "baseline",
                            contents: [
                              {
                                type: "icon",
                                url: "https://ca.slack-edge.com/T3ZPZ7J7M-U027PPTSYHG-b86ca57759f4-512",
                              },
                              {
                                type: "text",
                                text: "Thirawut Muninta",
                                size: "xs",
                                margin: "sm",
                              },
                            ],
                          },
                          {
                            type: "box",
                            layout: "baseline",
                            contents: [
                              {
                                type: "icon",
                                url: "https://ca.slack-edge.com/T3ZPZ7J7M-U027PPTSYHG-b86ca57759f4-512",
                              },
                              {
                                type: "text",
                                text: "Thirawut Muninta",
                                size: "xs",
                                margin: "sm",
                              },
                            ],
                          },
                          {
                            type: "box",
                            layout: "baseline",
                            contents: [
                              {
                                type: "icon",
                                url: "https://ca.slack-edge.com/T3ZPZ7J7M-U027PPTSYHG-b86ca57759f4-512",
                              },
                              {
                                type: "text",
                                text: "Thirawut Muninta",
                                size: "xs",
                                margin: "sm",
                              },
                            ],
                          },
                        ],
                      },
                      {
                        type: "box",
                        layout: "vertical",
                        spacing: "xl",
                        flex: 2,
                        contents: [
                          {
                            type: "box",
                            layout: "baseline",
                            contents: [
                              {
                                type: "icon",
                                url: "https://ca.slack-edge.com/T3ZPZ7J7M-U029UTTTHA6-3fa5adaa004e-512",
                              },
                              {
                                type: "text",
                                text: "Chalermchon Onbua",
                                size: "xs",
                                margin: "sm",
                              },
                            ],
                          },
                          {
                            type: "box",
                            layout: "baseline",
                            contents: [
                              {
                                type: "icon",
                                url: "https://ca.slack-edge.com/T3ZPZ7J7M-U029UTTTHA6-3fa5adaa004e-512",
                              },
                              {
                                type: "text",
                                text: "Chalermchon Onbua",
                                size: "xs",
                                margin: "sm",
                              },
                            ],
                          },
                          {
                            type: "box",
                            layout: "baseline",
                            contents: [
                              {
                                type: "icon",
                                url: "https://ca.slack-edge.com/T3ZPZ7J7M-U029UTTTHA6-3fa5adaa004e-512",
                              },
                              {
                                type: "text",
                                text: "Chalermchon Onbua",
                                size: "xs",
                                margin: "sm",
                              },
                            ],
                          },
                          {
                            type: "box",
                            layout: "baseline",
                            contents: [
                              {
                                type: "icon",
                                url: "https://ca.slack-edge.com/T3ZPZ7J7M-U029UTTTHA6-3fa5adaa004e-512",
                              },
                              {
                                type: "text",
                                text: "Chalermchon Onbua",
                                size: "xs",
                                margin: "sm",
                              },
                            ],
                          },
                          {
                            type: "box",
                            layout: "baseline",
                            contents: [
                              {
                                type: "icon",
                                url: "https://ca.slack-edge.com/T3ZPZ7J7M-U029UTTTHA6-3fa5adaa004e-512",
                              },
                              {
                                type: "text",
                                text: "Chalermchon Onbua",
                                size: "xs",
                                margin: "sm",
                              },
                            ],
                          },
                          {
                            type: "box",
                            layout: "baseline",
                            contents: [
                              {
                                type: "icon",
                                url: "https://ca.slack-edge.com/T3ZPZ7J7M-U029UTTTHA6-3fa5adaa004e-512",
                              },
                              {
                                type: "text",
                                text: "Chalermchon Onbua",
                                size: "xs",
                                margin: "sm",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
      },
    ]
    return LineService.replyMessage(reqBody, messages)
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
