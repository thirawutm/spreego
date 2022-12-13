import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // TODO: Add webhook logic here
  console.log(req.body)

  res.status(200).json({ name: 'Webhook' })
}
