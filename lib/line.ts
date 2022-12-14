import { Client } from "@line/bot-sdk"
import Config from "../config"

const lineClient = new Client({
  channelAccessToken: Config.LINE_MESSAGING.ACCESS_TOKEN,
  channelSecret: Config.LINE_MESSAGING.CHANNEL_SECRET,
})

export default lineClient
