import { discordProfileResponseSchema } from '@echo/auth/validators/discord-profile-response-schema'
import { z } from 'zod'

export type DiscordProfileResponse = z.infer<typeof discordProfileResponseSchema>
