import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { SiweMessage } from 'siwe'

export function getSiweMessage(message: string) {
  try {
    return new SiweMessage(message)
  } catch (e) {
    throw new BadRequestError(`cannot get siwe message ${JSON.stringify(message)}`, e)
  }
}
