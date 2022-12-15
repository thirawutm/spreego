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
                label: "Create Event",
                uri: `${Configs.LINE_LIFF.LIFF_URL}/event/create`,
              },
            },
            {
              type: "action",
              action: {
                type: "message",
                label: "Event List",
                text: "#eventlist",
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
            "Let me help you find more people!",
            {
              label: "What do you want to do?",
              uri: `${Configs.LINE_LIFF.LIFF_URL}/event/create`,
            }
          ),
        },
      },
    ]
    return LineService.replyMessage(reqBody, messages)
  }

  export function destroy(reqBody: any): Promise<any> {
    const messages: Message[] = [
      {
        type: "flex",
        altText: "ไม่นะพี่ๆ มีตี้ล่มม~",
        contents: {
          type: "bubble",
          header: FlexMessageBuilders.buildSummaryHeader(
            "Event Canceled 😭",
            reqBody,
            "#E0a38e"
          ),
          body: FlexMessageBuilders.buildListBodyWithoutButton(
            reqBody.location,
            reqBody.date,
            reqBody.startTime,
            reqBody.endTime,
            reqBody.members
          ),
        },
      },
    ]
    return LineService.pushMessage(reqBody, messages)
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
          header: FlexMessageBuilders.buildListHeader(name, host, eventId),
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

  export function reminder(reqBody: Events): Promise<any> {
    const { location, date, startTime, endTime, members, eventId } = reqBody
    const messages: Message[] = [
      {
        type: "flex",
        altText: "มาเข้าตี้ซะดีๆ SpreePle",
        contents: {
          type: "bubble",
          header: FlexMessageBuilders.buildSummaryHeader("Reminder 🗓", reqBody),
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
            reqBody.host,
            reqBody.eventId
          ),
          body: {
            type: "box",
            layout: "vertical",
            spacing: "md",
            contents: [
              {
                type: "box",
                layout: "vertical",
                spacing: "md",
                contents: [
                  {
                    type: "image",
                    url:
                      reqBody.user.pictureUrl ??
                      `${Configs.HOST}/user-default.png`,
                  },
                  {
                    type: "text",
                    text: `${reqBody.user.displayName} is joining ${
                      reqBody.user.withFriends > 0
                        ? `(+${reqBody.user.withFriends} ${
                            reqBody.user.withFriends > 1 ? "Friends" : "Friend"
                          })`
                        : ""
                    }`,
                    align: "center",
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
              FlexMessageBuilders.buildJoinerCount(reqBody.members),
              FlexMessageBuilders.buildJoiners(reqBody.members),
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
            reqBody.eventId,
            "#E0a38e"
          ),
          body: {
            type: "box",
            layout: "vertical",
            spacing: "md",
            contents: [
              {
                type: "box",
                layout: "vertical",
                spacing: "md",
                contents: [
                  {
                    type: "image",
                    url:
                      reqBody.user.pictureUrl ??
                      `${Configs.HOST}/user-default.png`,
                  },
                  {
                    type: "text",
                    text: `${reqBody.user.displayName} has dumped us!! ${
                      reqBody.user.withFriends > 0
                        ? `(+${reqBody.user.withFriends} ${
                            reqBody.user.withFriends > 1 ? "Friends" : "Friend"
                          })`
                        : ""
                    }`,
                    align: "center",
                  },
                ],
              },
              {
                type: "separator",
              },
              FlexMessageBuilders.buildJoinerCount(reqBody.members),
              FlexMessageBuilders.buildJoiners(reqBody.members),
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
        header: FlexMessageBuilders.buildListHeader(
          event.name,
          event.host,
          reqBody.eventId
        ),
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

  export async function summary(events: Events[]): Promise<any> {
    await Promise.all(
      events.map(async (event: Events) => {
        const message: Message = {
          type: "flex",
          altText: `ตี้ ${event.name} สำเร็จลุล่วงแล้วว`,
          contents: {
            type: "bubble",
            header: FlexMessageBuilders.buildSummaryHeader(
              "🎉 WE DID IT 🎉",
              event
            ),
            body: FlexMessageBuilders.buildSetupBodyWithJoiners(
              `don't forget to pay @${event.host.displayName} :)`,
              {
                label: "Calculate",
                uri: `${Configs.LINE_LIFF.LIFF_URL}/event/calculate`,
              },
              event.members
            ),
          },
        }
        try {
          await LineService.pushMessage({ groupId: event.groupId }, [message])
        } catch (e) {}
      })
    )
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
