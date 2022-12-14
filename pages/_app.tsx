import type { AppProps } from "next/app"
import Error from "next/error"
import { useEffect, useState } from "react"
import Configs from "../config"
import "../styles/globals.css"
import { Profile } from "../types/line"

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
        setProfile(await liff.getProfile())
      }
    }

    initializeLiff().catch((error) => {
      console.error("Error initializing LIFF", error)
    })
  }, [])

  if (isInitLiffSuccess === true) {
    return <Component {...pageProps} profile={profile} />
  } else if (isInitLiffSuccess === false) {
    return <Error statusCode={404} title="Only support on mobile" />
  }
}
