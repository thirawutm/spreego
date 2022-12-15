import {
  Alert,
  AlertTitle,
  Backdrop,
  Button,
  Card,
  CircularProgress,
  Divider,
  Fade,
  Grid,
  Grow,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material"
import { Container } from "@mui/system"
import { Close as CloseIcon } from "@mui/icons-material"
import axios, { isAxiosError } from "axios"
import moment from "moment"
import Error from "next/error"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { FrontEndType } from "../../../interfaces"
import { RootProps } from "../../_app"

export interface EventPaymentProps extends RootProps {}

export default function EventPayment({ profile }: EventPaymentProps) {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  const [event, setEvent] = useState<FrontEndType.Event>()
  const [paymentData, setPaymentData] = useState<any>()

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
    const { name, value } = e.target
    setPaymentData({
      ...paymentData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsLoading(true)
    if (!event) {
      setErrorMessage("Event not found")
    } else {
      try {
        await axios.post(`/api/event/payment`, {
          eventId: event._id,
          paymentPromptPay: paymentData.promptpay,
          totalMoney: paymentData.totalMoney,
        })
        const liff = (await import("@line/liff")).default
        liff.closeWindow()
      } catch (e) {
        if (isAxiosError(e)) {
          setErrorMessage(e.response?.data.message)
        }
      }
    }
    setPaymentData(undefined)
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

  if (event.host.userId !== profile.userId) {
    return <Error statusCode={403} title="Permission denied" />
  }

  return (
    <div style={{ margin: "16px 0", flexGrow: 1 }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!!errorMessage}
        onClick={() => setErrorMessage("")}
      >
        <Grow in={!!errorMessage}>
          <Alert
            elevation={16}
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setErrorMessage("")
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{
              position: "absolute",
              top: 30,
              left: 20,
              right: 20,
              zIndex: 100,
              borderRadius: 2,
            }}
          >
            <AlertTitle>Failed to collect money!</AlertTitle>
            {errorMessage}
          </Alert>
        </Grow>
      </Backdrop>
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

      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sx={{ backgroundColor: "#3371FF", padding: "16px 0" }}
        >
          <Typography variant="h4" color="white" sx={{ padding: "0 16px" }}>
            {event.name}
            <Typography variant="body1" color="white">
              <span style={{ fontWeight: "bold", fontSize: "16px" }}>
                {event.members.reduce(
                  (acc, member) => acc + (1 + member.withFriends),
                  0
                )}
              </span>{" "}
              people have joined
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={12} margin="16px 16px 0 16px">
          <TextField
            fullWidth
            label="Promptpay"
            name="promptpay"
            onChange={handleChange}
            type="tel"
          />
        </Grid>
        <Grid item xs={12} margin="16px 16px 0 16px">
          <TextField
            fullWidth
            label="Total Money"
            name="totalMoney"
            onChange={handleChange}
            type="tel"
          />
        </Grid>
        <Grid item xs={12} margin="32px 16px 0 16px">
          <Button
            fullWidth
            size="large"
            variant="contained"
            onClick={handleSubmit}
            disabled={
              !paymentData || !paymentData.promptpay || !paymentData.totalMoney
            }
          >
            Collect Money
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}
