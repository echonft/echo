import { ForbiddenError } from '../error/forbidden-error'
import { SiweMessage } from 'siwe'

export async function verifySiweMessage(signature: string, siweMessage: SiweMessage) {
  try {
    return await siweMessage.verify({
      signature,
      domain: siweMessage.domain,
      nonce: siweMessage.nonce
    })
  } catch (e) {
    throw new ForbiddenError()
  }
}
