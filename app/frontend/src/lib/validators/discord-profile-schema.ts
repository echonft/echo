import { removeUndefined } from '@echo/utils/fp/remove-undefined'
import { number, object, string } from 'zod'

export const discordProfileSchema = object({
  accent_color: number()
    .optional()
    .nullable()
    .transform<number | null>(removeUndefined<number>),
  avatar: string()
    .optional()
    .nullable()
    .transform<string | null>(removeUndefined<string>),
  avatar_decoration: string()
    .optional()
    .nullable()
    .transform<string | null>(removeUndefined<string>),
  banner_color: string()
    .optional()
    .nullable()
    .transform<string | null>(removeUndefined<string>),
  banner: string()
    .optional()
    .nullable()
    .transform<string | null>(removeUndefined<string>),
  discriminator: string().min(1),
  global_name: string()
    .optional()
    .nullable()
    .transform<string | null>(removeUndefined<string>),
  id: string().min(1),
  username: string().min(1)
})
