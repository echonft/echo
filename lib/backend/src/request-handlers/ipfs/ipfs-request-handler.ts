import { ipfsGatewayRoute } from '@echo/backend/constants/ipfs-gateway-route'
import type { RequestHandlerArgsWithParams } from '@echo/backend/types/request-handler'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import { NextResponse } from 'next/server'
import { isNil, join } from 'ramda'

interface Params {
  path: string[]
}

function getErrorResponse() {
  return new NextResponse(null, {
    status: 404,
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'no-store'
    }
  })
}

export async function ipfsRequestHandler({ req, params: { path } }: RequestHandlerArgsWithParams<Params>) {
  const width = req.nextUrl.searchParams.get('width')
  const route = isNilOrEmpty(width) ? ipfsGatewayRoute : ipfsGatewayRoute.withQuery({ width })
  const url = route.getUrl({ path: join('/', path) })
  try {
    const response = await fetch(url)
    if (!response.ok) {
      return getErrorResponse()
    }
    const headers = new Headers()
    const essentialHeaders = ['content-type', 'content-length', 'cache-control', 'etag', 'last-modified']
    essentialHeaders.forEach((header) => {
      const value = response.headers.get(header)
      if (!isNil(value)) {
        headers.set(header, value)
      }
    })
    return new NextResponse(response.body, {
      status: 200,
      headers
    })
  } catch (_err) {
    return getErrorResponse()
  }
}
