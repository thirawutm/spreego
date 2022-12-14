import { Button, Container, Grid, TextField, Typography } from "@mui/material"
import { DatePicker, TimePicker } from "@mui/x-date-pickers"
import axios from "axios"
import Error from "next/error"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { RootProps } from "../_app"

export interface EventDetailsProps extends RootProps {}

export default function EventDetails({ profile }: EventDetailsProps) {
  const router = useRouter()
  const [event, setEvent] = useState({
    host: {
      userId: "",
      displayName: "",
      pictureUrl: "",
    },
    name: "",
    place: "",
    date: null,
    startTime: null,
    endTime: null,
  })

  useEffect(() => {
    const fetchEvent = async () => {
      const { id } = router.query
      const { data } = await axios.get(`/api/event/${id}`)
      setEvent({
        host: data.host,
        name: data.name,
        place: data.place,
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
      })
    }
    fetchEvent()
  }, [])

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await axios.post("/api/event", {
      hostUserId: profile?.userId,
      groupId: profile?.groupId,
      name: event.name,
      location: event.place,
      date: event.date,
      startTime: event.startTime,
      endTime: event.endTime,
    })
  }

  return (
    <>
      <Head>
        <title>SpreeGO | {event.name}</title>
      </Head>
      <Container maxWidth="sm" style={{ marginTop: "16px" }}>
        <Image
          style={{ position: "absolute", top: 10, opacity: 0.15 }}
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
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Place"
              name="place"
              value={event.place}
            />
          </Grid>
          <Grid item xs={12}>
            <DatePicker
              label="Date"
              value={event.date}
              onChange={(newValue) => {
                if (newValue) {
                  setEvent({ ...event, date: newValue })
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
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
