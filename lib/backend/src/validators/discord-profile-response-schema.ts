import { convertUndefinedToNull } from '@echo/utils/fp/convert-undefined-to-null'
import { number, object, string } from 'zod'

export const discordProfileResponseSchema = object({
  accent_color: number()
    .optional()
    .nullable()
    .transform<number | null>(convertUndefinedToNull<number>)
    .readonly(),
  avatar: string()
    .optional()
    .nullable()
    .transform<string | null>(convertUndefinedToNull<string>)
    .readonly(),
  avatar_decoration: string()
    .optional()
    .nullable()
    .transform<string | null>(convertUndefinedToNull<string>)
    .readonly(),
  banner_color: string()
    .optional()
    .nullable()
    .transform<string | null>(convertUndefinedToNull<string>)
    .readonly(),
  banner: string()
    .optional()
    .nullable()
    .transform<string | null>(convertUndefinedToNull<string>)
    .readonly(),
  discriminator: string().min(1),
  global_name: string()
    .optional()
    .nullable()
    .transform<string | null>(convertUndefinedToNull<string>)
    .readonly(),
  id: string().min(1).readonly(),
  username: string().min(1).readonly()
}).readonly()
