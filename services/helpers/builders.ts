import { FlexBox, FlexComponent } from "@line/bot-sdk"

interface Host {
  userId: string
  displayName: string
  pictureUrl: string
}

interface Members {
  userId: string
  displayName: string
  pictureUrl: string
  joinType: string
  withFriends: number
}

export namespace FlexMessageBuilder {
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
          url: "https://614a-2001-fb1-98-f923-80d1-85d5-5a7-1a79.ap.ngrok.io/ren-confetti.png",
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
                uri: "https://liff.line.me/1657735002-y6LEPx1J/event/create",
              },
            },
          ],
        },
      ],
    }
  }

  export function buildListHeader(name: string, host: Host): FlexBox {
    return {
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
          url: "https://614a-2001-fb1-98-f923-80d1-85d5-5a7-1a79.ap.ngrok.io/ren-confetti.png",
        },
      ],
    }
  }

  export function buildListBody(
    location: string,
    date: string,
    startTime: string,
    endTime: string,
    members: Members[]
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
              text: `${location}` as unknown as undefined,
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
              text: `${date}`,
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
              text: `${startTime} - ${endTime}`,
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
        buildJoiners(members),
      ],
    }
  }

  function buildJoiners(members: Members[]): FlexBox {
    const joiners = members.reduce(
      (acc: { left: FlexComponent[]; right: FlexComponent[] }, member, idx) => {
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