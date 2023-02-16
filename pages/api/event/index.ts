import clientPromise from "../../../lib/mongodb"

import type { NextApiRequest, NextApiResponse } from "next"
import Constants from "../../../constants"
import { Document, ObjectId } from "mongodb"
import { SpreeGOService } from "../../../services/spreego"
import { RoomService } from "../../../services/room"

const COLLECTION_NAME = "events"

const list = async (
  req: NextApiRequest,
  res: NextApiResponse,
  collection: Document
) => {
  const { groupId, limit=3, isCompleted, status } = req.query
  const query: any = groupId ? { groupId } : {}
  if(isCompleted==='no') {
    query.isCompleted = false
  }
  if(status==='yes') {
    query.status = true
  }

  const projection = { name: true, host: true }

  const events = await collection.find(query).project(projection).sort({_id: -1}).limit(limit).toArray()
  
  return res.json({ status: true, total: events.length, events })
}

const create = async (
  req: NextApiRequest,
  res: NextApiResponse,
  collection: Document
) => {
  const { host, groupId } = req.body
  const roomGroupId = groupId ? await RoomService.getGroupId(groupId) : ""
  const doc = {
    ...req.body,
    groupId: roomGroupId,
    members: [{ ...host, joinType: "going", withFriends: 0 }],
    status: true,
    isCompleted: false,
    latestNotify: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  const created = await collection.insertOne(doc)
  await SpreeGOService.announce({
    ...doc,
    eventId: created.insertedId.toString(),
  })

  return res.json({ status: true, created })
}

const update = async (
  req: NextApiRequest,
  res: NextApiResponse,
  collection: Document
) => {
  const { id, ...toUpdate } = req.body

  const updated = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...toUpdate, updatedAt: new Date() } }
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
      case "GET":
        return list(req, res, collection)
      case "POST":
        return create(req, res, collection)
      case "PUT":
        return update(req, res, collection)
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
