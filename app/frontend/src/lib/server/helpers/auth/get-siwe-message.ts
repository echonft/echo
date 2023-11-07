import { SiweMessage } from 'siwe'

export function getSiweMessage(message: string) {
  return new SiweMessage(message)
}
