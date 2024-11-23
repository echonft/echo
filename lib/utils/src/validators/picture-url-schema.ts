import { ipfsSchema } from '@echo/utils/validators/ipfs-schema'
import { string } from 'zod'

export const pictureUrlSchema = string()
  .url()
  .transform((url) => url.replace(/\?.*$/, ''))
  .or(ipfsSchema)
  .or(
    string()
      .min(1)
      .transform((path) => `ipfs://${path}`)
  )
