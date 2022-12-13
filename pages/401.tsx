import Error from "next/error"

export default function UnauthorizedError() {
  return <Error statusCode={401} title="Unauthorized" />
}
