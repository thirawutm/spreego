import clientPromise from "../../../lib/mongodb"

import type { NextApiRequest, NextApiResponse } from "next"
import Constants from "../../../constants"
import { Document, ObjectId } from "mongodb"

const COLLECTION_NAME = "events"

const getEvent = async (
  req: NextApiRequest,
  res: NextApiResponse,
  collection: Document
) => {
  const { id } = req.query

  if (typeof id !== "string") {
    return res.status(400).json({ status: false, message: "id must be string" })
  }

  const event = await collection.findOne({ _id: new ObjectId(id) })

  return res.json({ status: true, event })
}

const deleteEvent = async (
  req: NextApiRequest,
  res: NextApiResponse,
  collection: Document
) => {
  const { id } = req.query

  if (typeof id !== "string") {
    return res.status(400).json({ status: false, message: "id must be string" })
  }

  const updated = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { status: false } }
  )

  // const deleted = await collection.deleteOne({ _id: new ObjectId(id) })

  return res.json({ status: true, deleted: updated })
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
      case "GET":
        return getEvent(req, res, collection)
      case "DELETE":
        return deleteEvent(req, res, collection)
      default:
        return res
          .status(404)
          .json({ status: false, message: "Http method not found" })
    }
  } catch (e) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" })
  }
}
