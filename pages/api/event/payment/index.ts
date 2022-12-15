import clientPromise from "../../../../lib/mongodb"

import type { NextApiRequest, NextApiResponse } from "next"
import Constants from "../../../../constants"
import { Document, ObjectId } from "mongodb"
import { SpreeGOService } from "../../../../services/spreego"
import axios, { isAxiosError } from 'axios'

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
  const { eventId,
  paymentPromptPay,
  totalMoney } = req.body

  const event = await collection.findOne({ _id: new ObjectId(eventId) })

  if (!event)
    return res.status(404).json({ status: false, message: "Event is not found" })

  if (event.status === false) {
    return res.status(500).json({ status: false, message: "Event has been canceled" })
  }

  if (event.isCompleted !== true) {
    return res.status(500).json({ status: false, message: "Event has not completed yet" })
  }

  try {
    await axios.get(`https://promptpay.io/${paymentPromptPay}.png`)
  } catch (error) {
    if (isAxiosError(error)) {
      return res.status(error.response?.status ?? 500).json({
        status: false, message: error.response?.data.errorMessage ?? "Something went wrong" 
      })
    }
  }
  
  const { members} = event

  const peopleJoin = members.filter((member: any) => member.joinType==='going')
  if(peopleJoin.length === 0) {
    return res.status(500).json({status: false, message: "There is no joining people"})
  }

    const totalJoin = peopleJoin.reduce((total: number, member: any) => {
      return (total +=
        1 + (parseInt(member.withFriends?.toString() ?? "0") ?? 0))
    }, 0)

  const moneyPerPeople = Math.round(parseFloat(totalMoney) / totalJoin)

  const updateMembers = members.map((member: any) => {
    if(member.joinType === 'going') {
      member.money = (1 + parseInt(member.withFriends ?? "0")) * moneyPerPeople
    }
    return member
  })

  const payment = {
    promptPay: paymentPromptPay,
    totalMoney
  }

  const updated = await collection.updateOne(
    { _id: new ObjectId(eventId) },
    { $set: { members: updateMembers, payment, updatedAt: new Date() } }
  )

  const result = await SpreeGOService.payment({...event, members: updateMembers, payment})

  return res.json({ status: true, updated })

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
    //   case "GET":
    //     return list(req, res, collection)
      case "POST":
        return create(req, res, collection)
    //   case "PUT":
    //     return update(req, res, collection)
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
