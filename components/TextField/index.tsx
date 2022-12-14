import React, { HTMLInputTypeAttribute } from "react"
import style from "./style.module.css"

export type TextFieldProps = {
  label: string
  name?: string
  type?: HTMLInputTypeAttribute
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const TextField = (props: TextFieldProps) => {
  const { label, name, type = "text", value, onChange } = props
  return (
    <div className={style["text-field"]}>
      <label>{label}</label>
      <input name={name} type={type} value={value} onChange={onChange} />
    </div>
  )
}
