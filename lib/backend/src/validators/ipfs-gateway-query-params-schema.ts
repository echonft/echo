import { object, string } from 'zod'

export const ipfsGatewayQueryParamsSchema = object({
  width: string().min(1)
})
