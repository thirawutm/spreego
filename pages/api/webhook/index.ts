import type { NextApiRequest, NextApiResponse } from "next"
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
    case "#ดูตี้ทั้งหมด":
      return SpreeGOService.list(reqBody)
    case "#testjoin":
      return SpreeGOService.join(reqBody)
    default:
      return null
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): Promise<void> {
  console.log("🚀 ~ file: index.ts:29 ~ req.body", req.body)

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
