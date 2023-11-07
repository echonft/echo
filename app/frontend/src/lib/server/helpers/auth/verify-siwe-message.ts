import { type SiweMessage } from 'siwe'

export async function verifySiweMessage(signature: string, siweMessage: SiweMessage) {
  const { data, success } = await siweMessage.verify({
    signature,
    domain: siweMessage.domain,
    nonce: siweMessage.nonce
  })
  if (!success) {
    throw new Error(`could not validate siwe message ${JSON.stringify(siweMessage)} with signature ${signature}`)
  }
  return data
}
