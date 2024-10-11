import { convertUndefinedToNull } from '@echo/utils/fp/convert-undefined-to-null'
import { number, object, string } from 'zod'

export const discordProfileSchema = object({
  accent_color: number()
    .optional()
    .nullable()
    .transform<number | null>(convertUndefinedToNull<number>),
  avatar: string()
    .optional()
    .nullable()
    .transform<string | null>(convertUndefinedToNull<string>),
  avatar_decoration: string()
    .optional()
    .nullable()
    .transform<string | null>(convertUndefinedToNull<string>),
  banner_color: string()
    .optional()
    .nullable()
    .transform<string | null>(convertUndefinedToNull<string>),
  banner: string()
    .optional()
    .nullable()
    .transform<string | null>(convertUndefinedToNull<string>),
  discriminator: string().min(1),
  global_name: string()
    .optional()
    .nullable()
    .transform<string | null>(convertUndefinedToNull<string>),
  id: string().min(1),
  username: string().min(1)
})
