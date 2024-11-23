import { string } from 'zod'

export const ipfsSchema = string().refine((val) => {
  const ipfsRegex = /^ipfs:\/\/[a-zA-Z0-9]+/
  return ipfsRegex.test(val)
}, 'Invalid IPFS URL')
