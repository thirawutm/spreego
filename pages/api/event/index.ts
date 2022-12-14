import clientPromise from "../../../lib/mongodb"

import type { NextApiRequest, NextApiResponse } from "next"
import Constants from "../../../constants"
import { Document, ObjectId } from "mongodb"
import { SpreeGOService } from "../../../services/spreego"

const COLLECTION_NAME = "events"

const list = async (
  req: NextApiRequest,
  res: NextApiResponse,
  collection: Document
) => {
  const events = await collection.find().toArray()

  return res.json({ status: true, events })
}

const create = async (
  req: NextApiRequest,
  res: NextApiResponse,
  collection: Document
) => {

  const created = await collection.insertOne(req.body)
  SpreeGOService.announce({...req.body, eventId: created.insertedId.toString() })

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
    { $set: toUpdate }
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
