import type { AppProps } from "next/app"
import Error from "next/error"
import { useEffect, useState } from "react"
import Configs from "../config"
import "../styles/globals.css"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"
import { LocalizationProvider } from "@mui/x-date-pickers"

export type Profile = {
  groupId?: string
  userId: string
  displayName: string
  pictureUrl?: string
  statusMessage?: string
}

export interface RootProps {
  profile?: Profile
}

export default function App({ Component, pageProps }: AppProps) {
  const [profile, setProfile] = useState<Profile>()
  const [isInitLiffSuccess, setIsInitLiffSuccess] = useState<boolean>()

  useEffect(() => {
    const initializeLiff = async () => {
      const liff = (await import("@line/liff")).default
      await liff.init({ liffId: Configs.LINE_LIFF.LIFF_ID })
      if (!liff.isInClient()) {
        setIsInitLiffSuccess(false)
      } else {
        setIsInitLiffSuccess(true)
        const profile = await liff.getProfile()
        const groupId = liff.getContext()?.groupId
        setProfile({ ...profile, groupId })
      }
    }

    initializeLiff().catch((error) => {
      console.error("Error initializing LIFF", error)
    })
  }, [])

  if (isInitLiffSuccess === true) {
    return (
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Component {...pageProps} profile={profile} />
      </LocalizationProvider>
    )
  } else if (isInitLiffSuccess === false) {
    return <Error statusCode={404} title="Only support on mobile" />
  }
}
