
import { ObjectId } from "mongodb"
import Constants from "../constants"
import clientPromise from "../lib/mongodb"

export namespace RoomService {

  export async function getRoomToken(
    groupId: string
  ): Promise<string> {
    const client = await clientPromise
    const db = client.db(Constants.DB.NAME)

    const roomDB = db.collection("room")

    const room: any = await roomDB.findOneAndUpdate({ groupId}, { $set : {updatedAt: new Date()}  }, { upsert: true })
    return room.value._id.toString() ?? groupId
  }

  export async function getGroupId(
    roomId: string
  ): Promise<string> {
    const client = await clientPromise
    const db = client.db(Constants.DB.NAME)

    const roomDB = db.collection("room")
    const room = await roomDB.findOne({ _id: new ObjectId(roomId) })

    return room?.groupId ?? undefined
  }
}
