import clientPromise from "../../../lib/mongodb"

import type { NextApiRequest, NextApiResponse } from "next"
import Constants from "../../../constants"
import { Document, ObjectId } from "mongodb"
import { SpreeGOService } from "../../../services/spreego"
import moment from "moment"

const COLLECTION_NAME = "events"

const notifyEvents = async (
  req: NextApiRequest,
  res: NextApiResponse,
  collection: Document
) => {

  const hours = -4
    const checkNoti = moment().add(hours, 'hours')

    const aggregated = [ {
      $addFields: {
          dateEnd: {
             $dateFromString: {
                dateString: '$endTime'
             }
          },
             dateStart: {
                $dateFromString: {
                  dateString: "$startTime"
                }
             }
      }
       
    },
    {
        $match: { 
            status: true,
            isCompleted: false,
            dateStart: {$gt: new Date()},
            latestNotify: {$lt: new Date(checkNoti.toDate()) }
        }
    }
   ]
    // console.log("🚀 ~ file: notify.ts:44 ~ aggregated", JSON.stringify(aggregated) )

  const events = await collection.aggregate(aggregated).toArray()

  await Promise.all(events.map((event: any) => {
    return SpreeGOService.reminder(event)
  }))

  await collection.updateMany({_id: {$in: events.map((x: { _id: any })=> x._id)}}, { $set: { latestNotify: new Date() }})

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
        return notifyEvents(req, res, collection)
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
