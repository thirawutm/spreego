import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next"
import Configs from "../../../config";
import { SpreeGOService } from "../../../services/spreego";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {

    switch (req.method) {
    //   case "GET": {
    //     const { groupId } = req.query

    //     const events = await axios
    //     .get(`${Configs.HOST}/api/event?`)
    //     .then((res) => res.data.events)
    //     return SpreeGOService.list(reqBody, events)

    //     break;
    //   }
      // case "PUT":
      //     return update(req, res, collection)
      // case "DELETE":
      //     return deleteEvent(req, res, collection)
      default:
        res
          .status(404)
          .json({ status: false, message: "Http method not found" })
    }
  } catch (e) {
    console.error(e)
    res.status(500).json({ status: false, message: "Internal server error" })
  }
}
