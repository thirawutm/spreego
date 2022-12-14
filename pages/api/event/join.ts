import clientPromise from "../../../lib/mongodb"

import type { NextApiRequest, NextApiResponse } from "next"
import Constants from "../../../constants"
import { Document, ObjectId } from "mongodb"

const COLLECTION_NAME = "events"

const joinEvent = async (
  req: NextApiRequest,
  res: NextApiResponse,
  collection: Document
) => {
  const {
    eventId,
    user: { userId, displayName, joinType, pictureUrl, withFriends },
  } = req.body

  // const {name, dueDate, detail, location: { link, text, latitude, longitude }, members: { going, maybe, invite },  } = req.body
  const event = await collection.findOne({ _id: new ObjectId(eventId) })

  if (!event)
    res.status(404).json({ status: false, message: "Event is not found" })

  const { members = [] } = event

  const findUser = members.find((member: any) => (member.userId === userId))
  if (findUser) {
    findUser.joinType = joinType
    findUser.displayName = displayName
    findUser.pictureUrl = pictureUrl
    findUser.withFriends = withFriends
  } else {
    members.push({ userId, displayName, joinType, pictureUrl, withFriends })
  }

  const updated = await collection.updateOne(
    { _id: new ObjectId(eventId) },
    { $set: { members } }
  )

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

    console.log(req.method)
    switch (req.method) {
      // case "GET":
      //     return list(req, res, collection)
      case "POST":
        return joinEvent(req, res, collection)
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
