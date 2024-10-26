import { number, object, string } from 'zod'

export const discordProfileResponseSchema = object({
  accent_color: number().optional().nullable(),
  avatar: string().optional().nullable(),
  avatar_decoration: string().optional().nullable(),
  banner_color: string().optional().nullable(),
  banner: string().optional().nullable(),
  discriminator: string().min(1),
  global_name: string().optional().nullable(),
  id: string().min(1),
  username: string().min(1)
})
