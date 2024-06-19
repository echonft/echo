import type { RequestHandlerArgsWithParams } from '@echo/frontend/lib/types/request-handlers/request-handler'
import type { ErrorResponse } from '@echo/utils/types/error-response'
import { NextResponse } from 'next/server'

export async function ipfsRequestHandler({ req }: RequestHandlerArgsWithParams<{ path: string[] }>) {
  const match = req.url.match(/\/ipfs\/[^ ]+/)
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
