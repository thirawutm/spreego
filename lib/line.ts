import { Client } from "@line/bot-sdk"
import Config from "../config"

const lineClient = new Client({
  channelAccessToken: Config.LINE.ACCESS_TOKEN,
  channelSecret: Config.LINE.CHANNEL_SECRET,
})

export default lineClient
