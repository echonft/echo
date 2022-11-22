import { SiweMessage } from 'siwe'

export const verifySignature = (message: string, signature: string): Promise<SiweMessage> => {
  const siweMessage = new SiweMessage(message)
  return siweMessage.validate(signature)
}
