import { Avatar, Button, Card, Grid, Paper, Typography } from "@mui/material"
import axios from "axios"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Profile, RootProps } from "../../_app"

export interface JoinEventProps extends RootProps {}

interface Joiner extends Omit<Profile, "statusMessage"> {
  withFriends: number
}

export default function JoinEvent({ profile }: JoinEventProps) {
  const [joiner, setJoiner] = useState<Joiner>({
    userId: "",
    displayName: "",
    pictureUrl: "",
    withFriends: 0,
  })
  const router = useRouter()

  useEffect(() => {
    if (profile) {
      setJoiner({
        ...joiner,
        userId: profile.userId,
        displayName: profile.displayName,
        pictureUrl: profile.pictureUrl,
      })
    }
  }, [profile])

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await axios.post("/api/event/join", {
      id: router.query.id,
      user: {
        userId: joiner.userId,
        displayName: joiner.displayName,
        pictureUrl: joiner.pictureUrl,
        withFriends: joiner.withFriends,
        joinType: "going",
      },
    })
  }

  const handleIncrease = () => {
    setJoiner({
      ...joiner,
      withFriends: joiner.withFriends + 1,
    })
  }
  const handleDecrease = () => {
    setJoiner({
      ...joiner,
      withFriends: joiner.withFriends - 1,
    })
  }

  return (
    <div style={{ textAlign: "center" }}>
      <Image
        style={{ position: "absolute", bottom: 10, right: 50, opacity: 0.15 }}
        src="/ren-confetti.png"
        width={200}
        height={200}
        alt="Ren Confetti image"
      />
      <div
        style={{
          boxShadow: "0px 4px 8px #20212353",
          borderRadius: "20px",
          padding: "16px",
          margin: "16px auto",
          width: "75%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar
          alt={`${joiner.displayName} avatar`}
          src={joiner.pictureUrl}
          sx={{ width: 70, height: 70, marginRight: "16px" }}
        />

        <Typography variant="body1" color="grey">
          <Typography
            style={{ color: "#3371FF", fontSize: "20px", fontWeight: "bold" }}
          >
            {joiner.displayName}
          </Typography>
          is joining
        </Typography>
      </div>
      <div
        style={{
          padding: "16px 0",
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
              fontSize: "20px",
              fontWeight: "bold",
            }}
            disabled={joiner.withFriends === 0}
            onClick={handleDecrease}
          >
            -
          </Button>
          <Typography variant="body1" padding="16px 32px" color="#3371FF">
            {joiner.withFriends}
          </Typography>
          <Button
            variant="outlined"
            size="small"
            style={{
              fontSize: "20px",
              fontWeight: "bold",
            }}
            onClick={handleIncrease}
            disabled={joiner.withFriends === 10}
          >
            +
          </Button>
        </div>
      </div>

      <Button
        style={{
          width: "75%",
          backgroundColor: "#3371FF",
        }}
        size="large"
        variant="contained"
        onClick={handleSubmit}
      >
        Join now
      </Button>
    </div>
  )
}
