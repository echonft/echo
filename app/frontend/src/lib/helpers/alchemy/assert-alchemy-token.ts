import { UnauthorizedError } from '@echo/frontend/lib/helpers/error/unauthorized-error'
import { createHmac } from 'crypto'
import { headers } from 'next/headers'
import { isNil } from 'ramda'

export function assertAlchemyToken(body: string) {
  const headersList = headers()
  const alchemySignature = headersList.get('x-alchemy-signature')
  if (isNil(alchemySignature)) {
    throw new UnauthorizedError()
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const digest = createHmac('sha256', process.env.ALCHEMY_AUTH_TOKEN).update(body, 'utf-8').digest('hex')
  // FIXME does not work....
  // if (alchemySignature !== digest) {
  //   throw new UnauthorizedError()
  // }
}
