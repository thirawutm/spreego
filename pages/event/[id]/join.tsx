import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material"
import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Profile, RootProps } from "../../_app"

export interface JoinEventProps extends RootProps {}

interface Joiner extends Omit<Profile, "statusMessage" | "groupId"> {
  withFriends: number
}

export default function JoinEvent({ profile }: JoinEventProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [eventName, setEventName] = useState("")
  const [joiner, setJoiner] = useState<Joiner>({
    userId: "",
    displayName: "",
    pictureUrl: "",
    withFriends: 0,
  })
  const [isJoin, setIsJoin] = useState(false)
  const [withFriends, setWithFriends] = useState(0)
  const router = useRouter()

  useEffect(() => {
    if (profile) {
      setJoiner({
        ...joiner,
        userId: profile.userId,
        displayName: profile.displayName,
        pictureUrl: profile.pictureUrl,
      })
      if (profile.userId && router.query.id) {
        loadCurrentData(profile.userId)
      }
    }
  }, [profile])

  const loadCurrentData = async (userId: string) => {
    const {
      data: { event },
    } = await axios.get("/api/event/" + router.query.id)
    setEventName(event.name)
    if (!event.status) {
      await router.replace(`/event/${router.query.id}`)
    } else {
      if (event && event.members && event.members.length > 0) {
        const findCurrentUser = event.members.find(
          (member: any) => member.userId === userId
        )

        if (findCurrentUser) {
          setIsJoin(findCurrentUser.joinType === "going")
          if (findCurrentUser.withFriends && findCurrentUser.withFriends > 0) {
            setWithFriends(findCurrentUser.withFriends)
          }
        }
      }
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsLoading(true)
    await axios.post("/api/event/join", {
      eventId: router.query.id,
      user: {
        userId: joiner.userId,
        displayName: joiner.displayName,
        pictureUrl: joiner.pictureUrl,
        withFriends: withFriends,
        joinType: "going",
      },
    })
    const liff = (await import("@line/liff")).default
    liff.closeWindow()
    setIsLoading(false)
  }

  const handleLeaveEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsLoading(true)
    await axios.post("/api/event/leave", {
      eventId: router.query.id,
      userId: joiner.userId,
    })
    const liff = (await import("@line/liff")).default
    liff.closeWindow()
    setIsLoading(false)
  }

  const handleIncrease = () => {
    setWithFriends(withFriends + 1)
  }
  const handleDecrease = () => {
    const newWithFriends = withFriends - 1
    setWithFriends(newWithFriends < 0 ? 0 : newWithFriends)
  }

  if (isLoading) {
    return (
      <Container
        maxWidth="sm"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    )
  }

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Image
          className="prevent-select"
          style={{
            position: "absolute",
            zIndex: -10,
            bottom: -20,
            right: 0,
            opacity: 0.2,
          }}
          src="/ren-confetti.png"
          width={280}
          height={300}
          alt="Ren Confetti image"
        />
        <div
          style={{
            boxShadow: "0px 4px 8px #20212353",
            borderRadius: "20px",
            padding: "16px",
            margin: "16px auto",
            width: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <Avatar
            alt={`${joiner.displayName} avatar`}
            src={joiner.pictureUrl}
            sx={{ width: 100, height: 100, marginRight: "16px" }}
          />

          <Typography variant="body1" color="grey">
            <Typography
              style={{ color: "#3371FF", fontSize: "20px", fontWeight: "bold" }}
            >
              {joiner.displayName}
            </Typography>
            is joining{" "}
            <span
              style={{ color: "#3371FF", fontSize: "20px", fontWeight: "bold" }}
            >
              {eventName}
            </span>
          </Typography>
        </div>
        <div
          style={{
            padding: "8px 0 16px 0",
            marginBottom: "16px",
          }}
        >
          <Typography
            variant="body1"
            color="grey"
            fontWeight="bold"
            marginBottom="16px"
          >
            How many friend(s) is going with you?
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "fit-content",
              margin: "0 auto",
            }}
          >
            <Button
              variant="outlined"
              size="small"
              style={{
                fontSize: "40px",
                fontWeight: "bold",
                lineHeight: 1,
              }}
              disabled={withFriends === 0}
              onClick={handleDecrease}
            >
              -
            </Button>
            <Typography
              variant="body1"
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                lineHeight: 1,
              }}
              padding="16px 32px"
              color="#3371FF"
            >
              {withFriends}
            </Typography>
            <Button
              variant="outlined"
              size="small"
              style={{
                fontSize: "32px",
                fontWeight: "bold",
              }}
              onClick={handleIncrease}
              disabled={withFriends === 10}
            >
              +
            </Button>
          </div>
        </div>

        <Button
          style={{
            width: "80%",
            backgroundColor: "#3371FF",
          }}
          size="large"
          variant="contained"
          onClick={handleSubmit}
        >
          {isJoin ? "Update Join" : "Join Now"}
        </Button>
        {isJoin && (
          <Button
            style={{
              marginTop: "20px",
              width: "80%",
            }}
            color="error"
            size="large"
            variant="contained"
            onClick={handleLeaveEvent}
          >
            Leave Event
          </Button>
        )}
      </div>
    </>
  )
}
