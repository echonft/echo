import { toLower } from 'ramda'
import { object, string } from 'zod'

export const slugSchema = object({
  slug: string().min(1).transform<Lowercase<string>>(toLower)
})
