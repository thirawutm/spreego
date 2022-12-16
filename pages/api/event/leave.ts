import clientPromise from "../../../lib/mongodb"

import type { NextApiRequest, NextApiResponse } from "next"
import Constants from "../../../constants"
import { Document, ObjectId } from "mongodb"
import { SpreeGOService } from "../../../services/spreego"

const COLLECTION_NAME = "events"

const leaveEvent = async (
  req: NextApiRequest,
  res: NextApiResponse,
  collection: Document
) => {
  const {
    eventId,
    userId,
  } = req.body

  const event = await collection.findOne({ _id: new ObjectId(eventId) })

  if (!event)
    res.status(404).json({ status: false, message: "Event is not found" })

  if (event.status===false) {
    res.status(500).json({ status: false, message: "Event is deleted" })
  }

  const { members = [] } = event

  const findUser = members.find((member: any) => (member.userId === userId))
  if (findUser) {
    findUser.joinType = "decline"
  }

  const updated = await collection.updateOne(
    { _id: new ObjectId(eventId) },
    { $set: { members } }
  )

  await SpreeGOService.leave({ 
    ...event,
    user: findUser, 
    name: event.name, 
    host: event.host, 
    eventId: event._id.toString(), 
    groupId: event.groupId, 
    members: members 
  })

  return res.json({ status: true, updated })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise
    const db = client.db(Constants.DB.NAME)

    const collection = db.collection(COLLECTION_NAME)

    switch (req.method) {
      // case "GET":
      //     return list(req, res, collection)
      case "POST":
        return leaveEvent(req, res, collection)
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
