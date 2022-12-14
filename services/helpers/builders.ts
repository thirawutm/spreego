import { FlexBox, FlexComponent } from "@line/bot-sdk"
import { Host, Location, Members } from "../../interfaces"
import moment from "moment"
import Configs from "../../config"

export const formatDate = (input: any) => {
  if (!input) return ""
  return moment(input).format("ddd D MMMM YYYY")
}

export const formatTime = (input: any) => {
  if (!input) return ""
  return moment(input).format("HH:mm")
}

export namespace FlexMessageBuilders {
  export function buildSetupHeader(): FlexBox {
    return {
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
    }
  }

  export function buildSetupBody(): FlexBox {
    return {
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
                uri: `${Configs.LINE_LIFF.LIFF_URL}/event/create`,
              },
            },
          ],
        },
      ],
    }
  }

  export function buildListHeader(name: string, host: Host, backgroundColor: string = "#3371FF"): FlexBox {
    return {
      type: "box",
      layout: "horizontal",
      backgroundColor,
      alignItems: "flex-end",
      spacing: "sm",
      contents: [
        {
          type: "box",
          layout: "vertical",
          flex: 2,
          contents: [
            {
              type: "text",
              text: `${name}`,
              weight: "bold",
              size: "xl",
              color: "#FFFFFF",
            },
            {
              type: "text",
              text: `หัวตี้ ${host.displayName}`,
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
    }
  }

  export function buildListBody(
    location: Location,
    date: Date,
    startTime: Date,
    endTime: Date,
    members: Members[] = [],
    eventId: String
  ): FlexBox {
    return {
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
              text: "Location",
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
              text: `${location.text}` as unknown as undefined,
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
              text: `${formatDate(date)}`,
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
              text: `${formatTime(startTime)} - ${formatTime(endTime)}`,
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
            uri: `${Configs.LINE_LIFF.LIFF_URL}/event/${eventId}/join`,
          },
        },
        {
          type: "button",
          color: "#333333",
          action: {
            type: "uri",
            label: "More Detail",
            uri: `${Configs.LINE_LIFF.LIFF_URL}/event/${eventId}`,
          },
        },
        {
          type: "separator",
        },
        {
          type: "text",
          text: `${members.length} people are joining`,
          size: "sm",
          color: "#aaaaaa",
        },
        buildJoiners(members),
      ],
    }
  }

  function buildJoiners(members: Members[] = []): FlexBox {
    const joiners = members
      .filter((fil) => fil.joinType === "going")
      .reduce(
        (
          acc: { left: FlexComponent[]; right: FlexComponent[] },
          member,
          idx
        ) => {
          const joinerFlex: FlexComponent = {
            type: "box",
            layout: "baseline",
            contents: [
              {
                type: "icon",
                url: `${member.pictureUrl}`,
              },
              {
                type: "text",
                text: `${member.displayName}`,
                size: "xs",
                margin: "sm",
              },
            ],
          }
          idx % 2 === 0 ? acc.left.push(joinerFlex) : acc.right.push(joinerFlex)
          return acc
        },
        { left: [], right: [] }
      )
    return {
      type: "box",
      layout: "horizontal",
      spacing: "sm",
      contents: [
        {
          type: "box",
          layout: "vertical",
          spacing: "xl",
          flex: 2,
          contents: joiners.left,
        },
        {
          type: "box",
          layout: "vertical",
          spacing: "xl",
          flex: 2,
          contents: joiners.right,
        },
      ],
    }
  }
}
