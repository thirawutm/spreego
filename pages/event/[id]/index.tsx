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
import {
  FlexMessageBuilders,
  formatDate,
  formatTime,
} from "../../../services/helpers/builders"
import { RootProps } from "../../_app"
import { FrontEndType, Members } from "../../../interfaces"
import Configs from "../../../config"

export interface EventDetailsProps extends RootProps {}

export default function EventDetails({ profile }: EventDetailsProps) {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)
  const [event, setEvent] = useState<FrontEndType.Event>()

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

  const handleShare = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsLoading(true)
    if (event) {
      const liff = (await import("@line/liff")).default
      await liff.shareTargetPicker([
        {
          type: "flex",
          altText: "มาเข้าตี้ซะดีๆ SpreePle",
          contents: {
            type: "bubble",
            header: {
              type: "box",
              layout: "horizontal",
              backgroundColor: "#3371FF",
              alignItems: "flex-end",
              spacing: "sm",
              contents: [
                {
                  type: "box",
                  layout: "vertical",
                  flex: 2,
                  contents: [
                    {
                      type: "text",
                      text: `${event.name}`,
                      wrap: true,
                      weight: "bold",
                      size: "xl",
                      color: "#FFFFFF",
                    },
                    {
                      type: "text",
                      text: `by ${event.host.displayName}`,
                      size: "sm",
                      color: "#EEEEEE",
                    },
                  ],
                },
                {
                  type: "image",
                  url: `https://spreego.vercel.app/ren-confetti.png`,
                },
                {
                  type: "box",
                  layout: "vertical",
                  contents: [
                    {
                      type: "text",
                      text: "INVITE",
                      color: "#3371FF",
                      align: "center",
                      size: "12px",
                      offsetTop: "3px",
                      weight: "bold",
                    },
                  ],
                  position: "absolute",
                  cornerRadius: "15px",
                  backgroundColor: "#ffffff",
                  height: "20px",
                  width: "60px",
                  offsetTop: "4px",
                  offsetEnd: "4px",
                },
              ],
            },
            body: {
              type: "box",
              layout: "vertical",
              spacing: "md",
              contents: [
                {
                  type: "box",
                  layout: "horizontal",
                  spacing: "sm",
                  contents: [
                    {
                      type: "text",
                      text: "Location",
                      color: "#aaaaaa",
                      size: "sm",
                      flex: 3,
                    },
                    {
                      type: "text",
                      wrap: true,
                      color: "#666666",
                      size: "sm",
                      flex: 11,
                      contents: [],
                      text: `${event.location.text}` as unknown as undefined,
                    },
                  ],
                },
                {
                  type: "box",
                  layout: "baseline",
                  spacing: "sm",
                  contents: [
                    {
                      type: "text",
                      text: "Date",
                      color: "#aaaaaa",
                      size: "sm",
                      flex: 3,
                    },
                    {
                      type: "text",
                      text: `${formatDate(event.date)}`,
                      wrap: true,
                      color: "#666666",
                      size: "sm",
                      flex: 11,
                    },
                  ],
                },
                {
                  type: "box",
                  layout: "baseline",
                  spacing: "sm",
                  contents: [
                    {
                      type: "text",
                      text: "Time",
                      color: "#aaaaaa",
                      size: "sm",
                      flex: 3,
                    },
                    {
                      type: "text",
                      text: `${formatTime(event.startTime)} - ${formatTime(
                        event.endTime
                      )}`,
                      wrap: true,
                      color: "#666666",
                      size: "sm",
                      flex: 11,
                    },
                  ],
                },
                {
                  type: "button",
                  style: "primary",
                  color: "#3371FF",
                  action: {
                    type: "uri",
                    label: "Join",
                    uri: `${Configs.LINE_LIFF.LIFF_URL}/event/${event._id}/join?external=true`,
                  },
                },
                {
                  type: "separator",
                },
                FlexMessageBuilders.buildJoinerCount(
                  event.members as Members[]
                ),
                FlexMessageBuilders.buildJoiners(event.members as Members[]),
              ],
            },
          },
        },
      ])
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

  if (
    event.host.userId !== profile.userId ||
    !event.status ||
    event.isCompleted
  ) {
    return (
      <div style={{ marginTop: "16px", flexGrow: 1 }}>
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
        {!event.status && (
          <Typography
            variant="h2"
            fontWeight="bold"
            className="prevent-select"
            sx={{
              position: "absolute",
              color: "#ff000055",
              rotate: "-40deg",
              top: 220,
              left: 20,
            }}
          >
            CANCELED
          </Typography>
        )}
        {event.isCompleted && (
          <Typography
            variant="h2"
            fontWeight="bold"
            className="prevent-select"
            sx={{
              position: "absolute",
              color: "#00890954",
              rotate: "-40deg",
              top: 220,
              left: 0,
            }}
          >
            COMPLETED
          </Typography>
        )}

        <Grid container spacing={2}>
          <Grid item xs={12} padding="16px 0" bgcolor="#3371FF">
            <Typography variant="h4" color="white" padding="0 16px">
              {event.name}
              <Typography variant="body1" color="white">
                By{" "}
                <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                  @{event.host.displayName}
                </span>
              </Typography>
            </Typography>
          </Grid>
          <Grid item xs={12} margin="0 16px">
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
          <Grid item xs={12} margin="0 16px">
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
          <Grid container xs={12} spacing={2} margin="0 16px">
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
          </Grid>

          <Grid
            item
            xs={12}
            visibility={
              event.status && !event.isCompleted ? "visible" : "hidden"
            }
            margin="16px 16px 0 16px"
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
          <Grid
            item
            xs={12}
            visibility={
              event.status && !event.isCompleted ? "visible" : "hidden"
            }
            margin="0 16px"
          >
            <Button
              fullWidth
              size="large"
              variant="outlined"
              onClick={handleShare}
            >
              Share
            </Button>
          </Grid>
        </Grid>
      </div>
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
              value={event.location.text}
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
          <Grid item xs={12} marginTop="16px">
            <Button
              fullWidth
              size="large"
              variant="contained"
              sx={{ backgroundColor: "#3371FF" }}
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
              size="large"
              variant="outlined"
              onClick={handleShare}
            >
              Share
            </Button>
          </Grid>
          <Grid item xs={12} marginBottom="16px">
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
