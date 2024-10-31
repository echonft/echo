import { discordProfileResponseSchema } from '@echo/backend/validators/discord-profile-response-schema'
import { z } from 'zod'

export type DiscordProfileResponse = z.infer<typeof discordProfileResponseSchema>
