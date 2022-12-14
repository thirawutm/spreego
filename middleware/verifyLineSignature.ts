import { NextRequest, NextResponse } from "next/server"
import Configs from "../config"

export async function verifyLineSignature(request: NextRequest) {
  const encoder = new TextEncoder()
  const algorithm = { name: "HMAC", hash: "SHA-256" }

  const reader = request.body?.getReader()
  const result = await reader?.read()
  const body = JSON.stringify(
    JSON.parse(Buffer.from(result?.value || new Uint8Array()).toString("utf8"))
  )

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(Configs.LINE_MESSAGING.CHANNEL_SECRET),
    algorithm,
    false,
    ["sign", "verify"]
  )
  const signatureBuffer = await crypto.subtle.sign(
    algorithm.name,
    key,
    encoder.encode(body)
  )
  const signature = Buffer.from(signatureBuffer).toString("base64")

  if (signature !== request.headers.get("x-line-signature")) {
    return NextResponse.rewrite(
      `${request.nextUrl.protocol}//${request.nextUrl.host}/401`,
      {
        status: 401,
        statusText: "Unauthorized",
      }
    )
  }

  return NextResponse.next()
}
