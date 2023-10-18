import { ForbiddenError } from '@server/helpers/error/forbidden-error'
import { type SiweMessage, type SiweResponse } from 'siwe'

export async function verifySiweMessage(signature: string, siweMessage: SiweMessage): Promise<SiweResponse> {
  try {
    return await siweMessage.verify({
      signature,
      domain: siweMessage.domain,
      nonce: siweMessage.nonce
    })
  } catch (e) {
    throw new ForbiddenError(`cannot verify siwe message ${JSON.stringify(siweMessage)} with signature ${signature}`, e)
  }
}
