import { z } from 'zod'

export const updateUserSchema = z.object({
  discord: z.object({
    avatarUrl: z.string().min(1),
    avatarDecorationUrl: z.string().optional(),
    bannerColor: z.string().optional(),
    bannerUrl: z.string().optional(),
    id: z.string().min(1),
    username: z.string().min(1)
  })
})
