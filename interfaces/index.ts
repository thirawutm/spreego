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
}
export interface Events {
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
}
