import { number, string } from 'zod'

export const baseResponseAugmentation = {
  code: number().readonly(),
  msg: string().nullable().optional().readonly()
}
