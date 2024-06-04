import { number, string } from 'zod'

export const baseResponseAugmentation = {
  code: number(),
  msg: string().nullable()
}
