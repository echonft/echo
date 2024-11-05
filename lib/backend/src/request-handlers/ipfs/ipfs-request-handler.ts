import type { RequestHandlerArgsWithParams } from '@echo/backend/types/request-handler'
import type { ErrorResponse } from '@echo/backend/types/error-response'
import { NextResponse } from 'next/server'

interface Params {
  path: string[]
}

export async function ipfsRequestHandler({ req }: RequestHandlerArgsWithParams<Params>) {
  const regex = /\/ipfs\/[^ ]+/
  const match = regex.exec(decodeURIComponent(req.url))
  if (match) {
    return (await fetch(`https://echo-nft.quicknode-ipfs.com${match[0]}`)) as unknown as Promise<NextResponse>
  }
  return NextResponse.json<ErrorResponse>(
    {
      error: 'invalid path'
    },
    { status: 404 }
  )
}
