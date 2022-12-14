import clientPromise from "../../../lib/mongodb"

import type { NextApiRequest, NextApiResponse } from "next"
import Constants from "../../../constants"
import { Document, ObjectId } from "mongodb"
import { SpreeGOService } from "../../../services/spreego"
import moment from "moment"

const COLLECTION_NAME = "events"

const summaryEvents = async (
  req: NextApiRequest,
  res: NextApiResponse,
  collection: Document
) => {

    const now = moment().toDate()
    console.log("🚀 ~ file: summary.ts:18 ~ now", now)

  const events = await collection.find({
    status: true,
    // endTime: {$lt: now}

  }).toArray()

  return res.json({ status: true, events })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise
    const db = client.db(Constants.DB.NAME)

    const collection = db.collection(COLLECTION_NAME)

    console.log(req.method)
    switch (req.method) {
      case "GET":
        return summaryEvents(req, res, collection)
      default:
        return res
          .status(404)
          .json({ status: false, message: "Http method not found" })
    }
  } catch (e) {
    console.error(e)
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" })
  }
}
