import { UnauthorizedError } from '@echo/frontend/lib/helpers/error/unauthorized-error'
import { headers } from 'next/headers'
import { isNil } from 'ramda'

export function assertAlchemyToken(_body: string) {
  const headersList = headers()
  const alchemySignature = headersList.get('x-alchemy-signature')
  if (isNil(alchemySignature)) {
    throw new UnauthorizedError()
  }
  // FIXME does not work....
  // const digest = createHmac('sha256', process.env.ALCHEMY_AUTH_TOKEN).update(body, 'utf-8').digest('hex')
  // if (alchemySignature !== digest) {
  //   throw new UnauthorizedError()
  // }
}
