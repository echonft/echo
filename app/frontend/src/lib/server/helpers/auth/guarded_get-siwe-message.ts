import { BadRequestError } from '@echo/frontend/lib/server/helpers/error/bad-request-error'
import { SiweMessage } from 'siwe'

export function guarded_getSiweMessage(message: string) {
  try {
    return new SiweMessage(message)
  } catch (e) {
    throw new BadRequestError(`cannot get siwe message ${JSON.stringify(message)}`, e)
  }
}
