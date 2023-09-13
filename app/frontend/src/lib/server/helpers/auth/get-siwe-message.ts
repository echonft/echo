import { BadRequestError } from '@server/helpers/error/bad-request-error'
import { SiweMessage } from 'siwe'

type SiweMessageType = {
  domain: string
  address: string
  statement?: string
  uri: string
  version: string
  chainId: number
  nonce: string
  issuedAt?: string
  expirationTime?: string
  notBefore?: string
  requestId?: string
  resources?: Array<string>
}
export function getSiweMessage(message: SiweMessageType) {
  try {
    return new SiweMessage(message)
  } catch (e) {
    throw new BadRequestError(`cannot get siwe message ${JSON.stringify(message)}`, e)
  }
}
