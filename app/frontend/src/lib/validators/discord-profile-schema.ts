import { removeUndefined } from '@echo/utils/fp/remove-undefined'
import { z } from 'zod'

export const discordProfileSchema = z.object({
  accent_color: z
    .number()
    .optional()
    .nullable()
    .transform<number | null>(removeUndefined<number>),
  avatar: z
    .string()
    .optional()
    .nullable()
    .transform<string | null>(removeUndefined<string>),
  avatar_decoration: z
    .string()
    .optional()
    .nullable()
    .transform<string | null>(removeUndefined<string>),
  banner_color: z
    .string()
    .optional()
    .nullable()
    .transform<string | null>(removeUndefined<string>),
  banner: z
    .string()
    .optional()
    .nullable()
    .transform<string | null>(removeUndefined<string>),
  discriminator: z.string().min(1),
  global_name: z
    .string()
    .optional()
    .nullable()
    .transform<string | null>(removeUndefined<string>),
  id: z.string().min(1),
  username: z.string().min(1)
})
