import { number, object } from 'zod'

export const ipfsProxyQueryParamsSchema = object({
  width: number().int().positive()
})
