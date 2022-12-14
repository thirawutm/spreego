import { Button, CircularProgress, Container, Grid, TextField, Typography } from "@mui/material"
import { DatePicker, TimePicker } from "@mui/x-date-pickers"
import axios from "axios"
import Error from "next/error"
import Image from "next/image"
import { useState } from "react"
import { RootProps } from "../_app"

export interface CreateEventProps extends RootProps {}

export default function CreateEvent({ profile }: CreateEventProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [event, setEvent] = useState({
    name: "",
    location: "",
    date: null,
    startTime: null,
    endTime: null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEvent({ ...event, [name]: value })
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsLoading(true)
    await axios.post("/api/event", {
      host: {
        userId: profile?.userId,
        displayName: profile?.displayName,
        pictureUrl: profile?.pictureUrl,
      },
      groupId: profile?.groupId,
      name: event.name,
      location: {
        text: event.location,
      },
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
    })
    const liff = (await import("@line/liff")).default
    liff.closeWindow()
    setIsLoading(false)
  }

  if (profile && !profile.groupId) {
    return <Error statusCode={400} title="Group ID is required" />
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
    <Container maxWidth="sm" style={{ marginTop: "16px" }}>
      <Image
        className="image"
        style={{ zIndex: -10, position: "absolute", top: 10, opacity: 0.15 }}
        src="/ren-confetti.png"
        width={350}
        height={350}
        alt="Ren Confetti image"
      />
      <Grid container spacing={2}>
        <Grid item xs={12} paddingBottom="8px">
          <Typography variant="h5" color="#3371FF">
            Create a new event
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Event name"
            name="name"
            value={event.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={event.location}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <DatePicker
            label="Date"
            value={event.date}
            onChange={(newValue) => {
              if (newValue) {
                setEvent({
                  ...event,
                  date: newValue,
                  startTime: newValue,
                  endTime: newValue,
                })
              }
            }}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
        </Grid>
        <Grid item xs={6}>
          <TimePicker
            label="Start"
            ampm={false}
            value={event.startTime}
            onChange={(newValue) => {
              if (newValue) {
                setEvent({ ...event, startTime: newValue })
              }
            }}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
        </Grid>
        <Grid item xs={6}>
          <TimePicker
            label="End"
            ampm={false}
            value={event.endTime}
            onChange={(newValue) => {
              if (newValue) {
                setEvent({ ...event, endTime: newValue })
              }
            }}
            renderInput={(params) => <TextField fullWidth {...params} />}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            size="large"
            variant="contained"
            onClick={handleSubmit}
            disabled={
              !event.name ||
              !event.location ||
              !event.date ||
              !event.startTime ||
              !event.endTime
            }
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}
