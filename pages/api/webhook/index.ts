import axios from "axios"
import type { NextApiRequest, NextApiResponse } from "next"
import Configs from "../../../config"
import { SpreeGOService } from "../../../services/spreego"

type Data = {
  name: string
  error?: string
}

async function messageController(reqBody: any): Promise<any> {
  const cmd = reqBody.events[0].message.text
  switch (cmd.toLowerCase()) {
    case "spreego":
      return SpreeGOService.start(reqBody)
    case "#เปิดตี้":
      return SpreeGOService.setup(reqBody)
    case "#ดูตี้ทั้งหมด": {
      const events = await axios
        .get(`${Configs.HOST}/api/event`)
        .then((res) => res.data.events)
      return SpreeGOService.list(reqBody, events)
    }
    case "#testsummary": {
      const events = await axios
        .get(`${Configs.HOST}/api/event`)
        .then((res) => res.data.events)
      return SpreeGOService.summary(reqBody, events)
    }
    default:
      return null
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  const messageType = req.body.events[0].type

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
    await SpreeGOService.error(req.body)

    res.status(errorCode).json({ name: "Webhook", error: errorMessage })
  }
}
