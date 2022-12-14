import Head from "next/head"
import { TextField } from "../../components/TextField"
import { RootProps } from "../_app"
import axios from "axios"
import { useState } from "react"

export interface EventCreateProps extends RootProps {}

export default function EventCreate({ profile }: EventCreateProps) {
  const [form, setForm] = useState({
    eventName: "",
    place: "",
    datetime: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const res = await axios.post("/api/event", {
      name: form.eventName,
      location: {
        text: form.place,
        link: "https://maps.google.com"
      },
      dateStart: form.datetime,
      dateEnd: form.datetime,
    })
    alert(JSON.stringify(res.data))
  }

  return (
    <>
      <Head>
        <title>SpreeGO | Create Event</title>
      </Head>
      <div>
        <TextField
          label="ชื่อกิจกรรม"
          value={form.eventName}
          name="eventName"
          onChange={handleChange}
        />
        <TextField
          label="ชื่อสถานที่"
          value={form.place}
          name="place"
          onChange={handleChange}
        />
        <TextField
          label="วันเวลา"
          value={form.datetime}
          name="datetime"
          type="datetime-local"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  )
}
