import type { NextApiRequest, NextApiResponse } from "next";
import { SpreeGOService } from "../../../services/spreego";

type Data = {
  name: string;
};

async function messageController(reqBody: any): Promise<any> {
  const cmd = reqBody.events[0].message.text;
  switch (cmd.toLowerCase()) {
    case "spreego":
      return SpreeGOService.start(reqBody);
    default: {
      break;
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const messageType = req.body.events[0].type;
  switch (messageType) {
    case "message":
      await messageController(req.body);
    default: {
      console.log(JSON.stringify(req.body, null, 1));
      break;
    }
  }

  res.status(200).json({ name: "Webhook" });
}
