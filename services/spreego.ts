import { Message } from "@line/bot-sdk";
import { LineService } from "./line";

export namespace SpreeGOService {
  export function start(reqBody: any): Promise<any> {
    const messages: Message[] = [
      {
        type: "text",
        text: "ทำไรกันดี SpreePle 🎉",
        quickReply: {
          items: [
            {
              type: "action",
              action: {
                type: "message",
                label: "เปิดตี้ (mock)",
                text: "#mockเปิดตี้",
              },
            },
            {
              type: "action",
              action: {
                type: "message",
                label: "ดูตี้ทั้งหมด (mock)",
                text: "#mockดูตี้ทั้งหมด",
              },
            },
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
    ];
    return LineService.replyMessage(reqBody, messages);
  }

  export function setup(reqBody: any): Promise<any> {
    const messages: Message[] = [
      {
        type: "flex",
        altText: "สวัสดี SpreePle, มีตี้ใหม่ สนใจป่าวว 🔥",
        contents: {
          type: "bubble",
          hero: {
            type: "image",
            url: "https://lh5.googleusercontent.com/p/AF1QipMSaBclL0pmNMCp43c4nb4MzT7bUgW0c5gK81Vo=w426-h240-k-no",
            size: "full",
            aspectRatio: "20:13",
            aspectMode: "cover",
            action: {
              type: "uri",
              label: "Join",
              uri: "http://linecorp.com/",
            },
          },
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "Basketball (3x3)",
                weight: "bold",
                size: "xl",
              },
              {
                type: "box",
                layout: "vertical",
                margin: "lg",
                spacing: "sm",
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
                    type: "box",
                    layout: "horizontal",
                    contents: [
                      {
                        type: "text",
                        color: "#aaaaaa",
                        size: "xs",
                        text: "Joiners",
                        margin: "none",
                        align: "start",
                        flex: 1,
                      },
                      {
                        type: "box",
                        layout: "baseline",
                        contents: [
                          {
                            type: "icon",
                            url: "https://gitlab.com/uploads/-/system/user/avatar/9296008/avatar.png",
                          },
                          {
                            type: "icon",
                            url: "https://gitlab.com/uploads/-/system/user/avatar/11723687/avatar.png",
                          },
                          {
                            type: "icon",
                            url: "https://gitlab.com/uploads/-/system/user/avatar/9416234/avatar.png",
                          },
                          {
                            type: "icon",
                            url: "https://gitlab.com/uploads/-/system/user/avatar/10645646/avatar.png",
                          },
                          {
                            type: "text",
                            wrap: true,
                            color: "#666666",
                            size: "sm",
                            text: "and 12 joiners",
                          },
                        ],
                        flex: 4,
                        spacing: "md",
                        offsetStart: "5px",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          footer: {
            type: "box",
            layout: "vertical",
            spacing: "sm",
            contents: [
              {
                type: "button",
                style: "link",
                height: "sm",
                action: {
                  type: "uri",
                  label: "GOOGLE MAPS",
                  uri: "https://www.google.com/maps/place/THE+STREET+RATCHADA/@13.7705118,100.5722782,15z/data=!4m2!3m1!1s0x0:0xb0e50b499216c2d7?sa=X&ved=2ahUKEwiCj9uYjeX7AhWjSGwGHWvHAtEQ_BJ6BAhnEAg",
                },
              },
              {
                type: "button",
                style: "secondary",
                height: "sm",
                action: {
                  type: "uri",
                  label: "DETAILS",
                  uri: "https://linecorp.com",
                },
              },
              {
                type: "button",
                action: {
                  type: "postback",
                  label: "JOIN NOW",
                  data: "activity-id",
                  displayText: "ไปด้วย",
                },
                style: "primary",
                color: "#004bb0",
              },
            ],
            flex: 0,
          },
        },
      },
    ];
    return LineService.replyMessage(reqBody, messages);
  }

  export function list(reqBody: any): Promise<any> {
    const messages: Message[] = [
      {
        type: "flex",
        altText: "มาเข้าตี้ซะดีๆ SpreePle 🚀",
        contents: {
          type: "carousel",
          contents: [
            {
              type: "bubble",
              hero: {
                type: "image",
                url: "https://lh5.googleusercontent.com/p/AF1QipMSaBclL0pmNMCp43c4nb4MzT7bUgW0c5gK81Vo=w426-h240-k-no",
                size: "full",
                aspectRatio: "20:13",
                aspectMode: "cover",
                action: {
                  type: "uri",
                  label: "Google Maps",
                  uri: "http://linecorp.com/",
                },
              },
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: "Basketball (3x3)",
                    weight: "bold",
                    size: "xl",
                  },
                  {
                    type: "box",
                    layout: "vertical",
                    margin: "lg",
                    spacing: "sm",
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
                        type: "box",
                        layout: "horizontal",
                        contents: [
                          {
                            type: "text",
                            color: "#aaaaaa",
                            size: "xs",
                            text: "Joiners",
                            margin: "none",
                            align: "start",
                            flex: 1,
                          },
                          {
                            type: "box",
                            layout: "baseline",
                            contents: [
                              {
                                type: "icon",
                                url: "https://gitlab.com/uploads/-/system/user/avatar/9296008/avatar.png",
                              },
                              {
                                type: "icon",
                                url: "https://gitlab.com/uploads/-/system/user/avatar/11723687/avatar.png",
                              },
                              {
                                type: "icon",
                                url: "https://gitlab.com/uploads/-/system/user/avatar/9416234/avatar.png",
                              },
                              {
                                type: "icon",
                                url: "https://gitlab.com/uploads/-/system/user/avatar/10645646/avatar.png",
                              },
                              {
                                type: "text",
                                wrap: true,
                                color: "#666666",
                                size: "sm",
                                text: "and 12 joiners",
                              },
                            ],
                            flex: 4,
                            spacing: "md",
                            offsetStart: "5px",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              footer: {
                type: "box",
                layout: "vertical",
                spacing: "sm",
                contents: [
                  {
                    type: "button",
                    style: "link",
                    height: "sm",
                    action: {
                      type: "uri",
                      label: "GOOGLE MAPS",
                      uri: "https://www.google.com/maps/place/THE+STREET+RATCHADA/@13.7705118,100.5722782,15z/data=!4m2!3m1!1s0x0:0xb0e50b499216c2d7?sa=X&ved=2ahUKEwiCj9uYjeX7AhWjSGwGHWvHAtEQ_BJ6BAhnEAg",
                    },
                  },
                  {
                    type: "button",
                    style: "link",
                    height: "sm",
                    action: {
                      type: "uri",
                      label: "CANCLE",
                      uri: "https://linecorp.com",
                    },
                    color: "#F15555",
                  },
                ],
                flex: 0,
              },
            },
            {
              type: "bubble",
              hero: {
                type: "image",
                url: "https://lh5.googleusercontent.com/p/AF1QipNC6Mc2zkTX_1-e3pbQ0GR02R2I11dQGx4YPRhL=w408-h242-k-no",
                size: "full",
                aspectRatio: "20:13",
                aspectMode: "cover",
                action: {
                  type: "uri",
                  label: "Google Maps",
                  uri: "http://linecorp.com/",
                },
              },
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    text: "เตะบอลกันค้าบ",
                    weight: "bold",
                    size: "xl",
                  },
                  {
                    type: "box",
                    layout: "vertical",
                    margin: "lg",
                    spacing: "sm",
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
                            text: "Soccer Pro Ratchada 18,\n888 Soi Yu Charoen29 Samsen Nok, Huai Khwang, Bangkok 10310" as unknown as undefined,
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
                            text: "Wednesday 14 Dec 2022",
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
                        type: "box",
                        layout: "horizontal",
                        contents: [
                          {
                            type: "text",
                            color: "#aaaaaa",
                            size: "xs",
                            text: "Joiners",
                            margin: "none",
                            align: "start",
                            flex: 1,
                          },
                          {
                            type: "box",
                            layout: "baseline",
                            contents: [
                              {
                                type: "icon",
                                url: "https://gitlab.com/uploads/-/system/user/avatar/9296008/avatar.png",
                              },
                              {
                                type: "icon",
                                url: "https://gitlab.com/uploads/-/system/user/avatar/11723687/avatar.png",
                              },
                              {
                                type: "icon",
                                url: "https://gitlab.com/uploads/-/system/user/avatar/9416234/avatar.png",
                              },
                              {
                                type: "icon",
                                url: "https://gitlab.com/uploads/-/system/user/avatar/10645646/avatar.png",
                              },
                              {
                                type: "text",
                                wrap: true,
                                color: "#666666",
                                size: "sm",
                                text: "and 12 joiners",
                              },
                            ],
                            flex: 4,
                            spacing: "md",
                            offsetStart: "5px",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              footer: {
                type: "box",
                layout: "vertical",
                spacing: "sm",
                contents: [
                  {
                    type: "button",
                    style: "link",
                    height: "sm",
                    action: {
                      type: "uri",
                      label: "GOOGLE MAPS",
                      uri: "https://www.google.com/maps/place/THE+STREET+RATCHADA/@13.7705118,100.5722782,15z/data=!4m2!3m1!1s0x0:0xb0e50b499216c2d7?sa=X&ved=2ahUKEwiCj9uYjeX7AhWjSGwGHWvHAtEQ_BJ6BAhnEAg",
                    },
                  },
                  {
                    type: "button",
                    style: "link",
                    height: "sm",
                    action: {
                      type: "uri",
                      label: "CANCLE",
                      uri: "https://linecorp.com",
                    },
                    color: "#F15555",
                  },
                ],
                flex: 0,
              },
            },
          ],
        },
      },
    ];
    return LineService.replyMessage(reqBody, messages);
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
    ];
    return LineService.replyMessage(reqBody, messages);
  }
}
