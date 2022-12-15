import {
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material"
import { DatePicker, TimePicker } from "@mui/x-date-pickers"
import axios from "axios"
import moment from "moment"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Profile, RootProps } from "../../_app"

export interface EventDetailsProps extends RootProps {}

type Host = { userId: string; displayName: string; pictureUrl?: string }
interface Joiner extends Omit<Profile, "statusMessage" | "groupId"> {
  withFriends: number
  joinType: string
}

type Event = {
  groupId: string
  _id: string
  name: string
  location: {
    text: string
  }
  date: string
  startTime: string
  endTime: string
  host: Host
  members: Joiner[]
  status: boolean
  isCompleted: boolean
}

export default function EventDetails({ profile }: EventDetailsProps) {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)
  const [event, setEvent] = useState<Event>()

  useEffect(() => {
    const fetchEvent = async () => {
      const id = router.query.id
      const { data } = await axios.get(`/api/event/${id}`)
      setEvent(data.event)
      setIsLoading(false)
    }

    fetchEvent()
  }, [router.query.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (event) {
      const { name, value } = e.target
      setEvent({ ...event, [name]: value })
    }
  }

  const handleUpdate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsLoading(true)
    if (event) {
      await axios.put(`/api/event`, {
        id: event._id,
        name: event.name,
        location: {
          text: event.location.text,
        },
        date: event.date,
        startTime: event.startTime,
        endTime: event.endTime,
      })
      const liff = (await import("@line/liff")).default
      liff.closeWindow()
    }
    setIsLoading(false)
  }

  const handleCancel = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsLoading(true)
    if (event) {
      await axios.delete(`/api/event/${event._id}`)
      const liff = (await import("@line/liff")).default
      liff.closeWindow()
    }
    setIsLoading(false)
  }

  const handleJoin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsLoading(true)
    if (event) {
      router.push(`/event/${event._id}/join`)
    }
    setIsLoading(false)
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

  if (!event || !profile) {
    return null
  }

  if (event.host.userId !== profile.userId || !event.status) {
    return (
      <Container maxWidth="sm" style={{ marginTop: "16px" }}>
        <Image
          className="prevent-select"
          style={{
            zIndex: -10,
            position: "absolute",
            bottom: 10,
            opacity: 0.15,
          }}
          src="/ren-confetti.png"
          width={350}
          height={350}
          alt="Ren Confetti image"
        />
        {!event.status &&
          (event.isCompleted ? (
            <Typography
              variant="h2"
              fontWeight="bold"
              className='prevent-select'
              sx={{
                position: "absolute",
                color: "#00890954",
                rotate: "-40deg",
                top: 220,
                left: -5,
              }}
            >
              COMPLETED
            </Typography>
          ) : (
            <Typography
              variant="h2"
              fontWeight="bold"
              className='prevent-select'
              sx={{
                position: "absolute",
                color: "#ff000055",
                rotate: "-40deg",
                top: 220,
              }}
            >
              CANCELED
            </Typography>
          ))}

        <Grid container spacing={2}>
          <Grid item xs={12} padding="16px 0" bgcolor="#3371FF">
            <Typography variant="h4" color="white">
              {event.name}
            </Typography>
            <Typography variant="body1" color="white">
              By{" "}
              <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                @{event.host.displayName}
              </span>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" color="grey">
              Location
            </Typography>
            <Typography
              variant="body1"
              color="#3371FF"
              fontWeight="bold"
              padding="8px 0"
              borderBottom="1px solid #6a96ff"
            >
              {event.location.text}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" color="grey">
              Date
            </Typography>
            <Typography
              variant="body1"
              color="#3371FF"
              fontWeight="bold"
              padding="8px 0"
              borderBottom="1px solid #6a96ff"
            >
              {moment(event.date).add(7, "hours").format("MMMM Do YYYY")}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="grey">
              Start
            </Typography>
            <Typography
              variant="body1"
              color="#3371FF"
              fontWeight="bold"
              padding="8px 0"
              borderBottom="1px solid #6a96ff"
            >
              {moment(event.startTime).add(7, "hours").format("HH:mm")}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="grey">
              End
            </Typography>
            <Typography
              variant="body1"
              color="#3371FF"
              fontWeight="bold"
              padding="8px 0"
              borderBottom="1px solid #6a96ff"
            >
              {moment(event.endTime).add(7, "hours").format("HH:mm")}
            </Typography>
          </Grid>
          {/* <Grid item xs={12} marginTop="16px">
            <Button
              fullWidth
              size="large"
              variant="outlined"
            >
              Share
            </Button>
          </Grid> */}
          <Grid
            item
            xs={12}
            marginTop="16px"
            visibility={event.status ? "visible" : "hidden"}
          >
            <Button
              fullWidth
              size="large"
              variant="contained"
              onClick={handleJoin}
            >
              {event.members.find((member) => member.userId === profile.userId)
                ?.joinType === "going"
                ? "Edit Join"
                : "Join Event"}
            </Button>
          </Grid>
        </Grid>
      </Container>
    )
  } else {
    return (
      <Container maxWidth="sm" style={{ marginTop: "16px" }}>
        <Image
          className="prevent-select"
          style={{ zIndex: -10, position: "absolute", top: 10, opacity: 0.15 }}
          src="/ren-confetti.png"
          width={350}
          height={350}
          alt="Ren Confetti image"
        />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              className="disabled-highlight"
              label="Event name"
              name="name"
              value={event.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              className="disabled-highlight"
              label="Location"
              name="location"
              value={event.location.text}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <DatePicker
              label="Date"
              className="disabled-highlight"
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
              className="disabled-highlight"
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
              className="disabled-highlight"
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
          {/* <Grid item xs={12} marginTop="16px">
            <Button
              fullWidth
              size="large"
              variant="outlined"
            >
              Share
            </Button>
          </Grid> */}
          <Grid item xs={12} marginTop="16px">
            <Button
              fullWidth
              size="large"
              variant="contained"
              color="primary"
              onClick={handleUpdate}
              disabled={
                !event.name ||
                !event.location ||
                !event.date ||
                !event.startTime ||
                !event.endTime
              }
            >
              Update Event
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              size="large"
              variant="outlined"
              onClick={handleJoin}
            >
              Edit Join
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              size="small"
              variant="text"
              color="error"
              onClick={handleCancel}
            >
              Cancel Event
            </Button>
          </Grid>
        </Grid>
      </Container>
    )
  }
}
