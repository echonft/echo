import { always, isNil, when } from 'ramda'
import { z } from 'zod'

function removeUndefined<T>(value: T | undefined) {
  return when(isNil, always(null))(value) as T | null
}
export const discordProfileSchema = z.object({
  accent_color: z
    .number()
    .optional()
    .transform<number | null>(removeUndefined<number>),
  avatar: z
    .string()
    .optional()
    .transform<string | null>(removeUndefined<string>),
  avatar_decoration: z
    .string()
    .optional()
    .transform<string | null>(removeUndefined<string>),
  banner_color: z
    .string()
    .optional()
    .transform<string | null>(removeUndefined<string>),
  banner: z
    .string()
    .optional()
    .transform<string | null>(removeUndefined<string>),
  discriminator: z.string().min(1),
  global_name: z
    .string()
    .optional()
    .transform<string | null>(removeUndefined<string>),
  id: z.string().min(1),
  username: z.string().min(1)
})
