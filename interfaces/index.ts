import { ObjectId } from "mongodb"

export interface Host {
  userId: string
  displayName: string
  pictureUrl: string
}
export interface Location {
  text: string
}
export interface Members {
  userId: string
  displayName: string
  pictureUrl: string
  joinType: string
  withFriends: number
  money: number
}
export interface Payment {
  totalMoney: number
  promptPay: string
  qrUrl: string
}
export interface Events {
  _id: ObjectId
  groupId: string
  name: string
  dueDate: Date
  detail: string
  date: Date
  startTime: Date
  endTime: Date
  host: Host
  location: Location
  members: Members[]
  payment: Payment
  eventId: string
}

export namespace FrontEndType {
  export interface Host {
    userId: string
    displayName: string
    pictureUrl: string
  }
  export interface Location {
    text: string
  }

  export interface Member {
    userId: string
    displayName: string
    pictureUrl?: string
    joinType: string
    withFriends: number
  }

  export interface Event {
    _id: string
    groupId: string
    name: string
    location: Location
    date: string
    startTime: string
    endTime: string
    host: Host
    members: Member[]
    status: boolean
    isCompleted: boolean
  }
}
