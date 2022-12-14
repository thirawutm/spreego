import { Button, Container, Grid, TextField, Typography } from "@mui/material"
import { DatePicker, TimePicker } from "@mui/x-date-pickers"
import axios from "axios"
import Error from "next/error"
import Head from "next/head"
import { useState } from "react"
import { RootProps } from "../_app"

export interface EventCreateProps extends RootProps {}

export default function EventCreate({ profile }: EventCreateProps) {
  const [event, setEvent] = useState({
    name: "",
    place: "",
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

  if (profile && !profile.groupId) {
    return <Error statusCode={400} title="Group ID is required" />
  }

  return (
    <>
      <Head>
        <title>SpreeGO | Create Event</title>
      </Head>
      <Container maxWidth="sm" style={{ marginTop: "16px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} paddingBottom="8px">
            <Typography variant="h4" color="#3371FF">
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
              label="Place"
              name="place"
              value={event.place}
              onChange={handleChange}
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
