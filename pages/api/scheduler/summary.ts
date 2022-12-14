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

    const aggregated = [ {
      $addFields: {
         dateEnd: {
            $dateFromString: {
               dateString: '$endTime'
            }
         }
      }
   },
   {
       $match: { dateEnd: {$lt: new Date(now)}, status: true, isCompleted: false }
   }
   ]

  const events = await collection.aggregate(aggregated).toArray()

  await SpreeGOService.summary(events.map((event:any) => { return {...event, eventId: event._id.toString()}}))

  await collection.updateMany({_id: {$in: events.map((x: { _id: any })=> x._id)}}, { $set: { isCompleted: true }})

  return res.json({ status: true, total: events.length, events })
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
