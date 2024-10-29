import { toLower } from 'ramda'
import { string } from 'zod'

export const usernameSchema = string()
  .min(1)
  .transform(toLower<string>)
