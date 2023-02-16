import axios from "axios"
import type { NextApiRequest, NextApiResponse } from "next"
import Configs from "../../../config"
import { SpreeGOService } from "../../../services/spreego"

type Data = {
  name: string
  error?: string
}

async function messageController(reqBody: any): Promise<any> {
  const cmd = reqBody?.events[0]?.message?.text || "undefined"
  switch (cmd.toLowerCase()) {
    case "spreego":
    case "gogo":
      return SpreeGOService.start(reqBody)
    case "#createevent":
      return SpreeGOService.setup(reqBody)
    case "#eventlist": {
      const groupId = reqBody.events[0]?.source?.groupId || undefined
      if (!groupId) return null

      const events = await axios
        .get(`${Configs.HOST}/api/event?groupId=${groupId}&isCompleted=no`)
        .then((res) => res.data.events)
      if (!events.length) return null

      return SpreeGOService.list(reqBody, events)
    }
    default:
      return null
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  const messageType = req?.body?.events[0]?.type || "undefined"

  try {
    switch (messageType) {
      case "message": {
        await messageController(req.body)
        break
      }
      default: {
        console.log(JSON.stringify(req.body, null, 1))
        break
      }
    }

    res.status(200).json({ name: "Webhook" })
  } catch (error: any) {
    const errorCode = error.statusCode || 500
    const errorMessage = error.message || error.statusMessage

    console.log(errorMessage)
    console.log(error)

    await SpreeGOService.error(req.body)

    res.status(errorCode).json({ name: "Webhook", error: errorMessage })
  }
}
