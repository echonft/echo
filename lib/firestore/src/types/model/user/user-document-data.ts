import type { DiscordProfile } from '@echo/model/types/discord-profile'
import type { WithUsername } from '@echo/model/types/with-username'

export interface UserDocumentData extends WithUsername {
  createdAt: number
  discord: DiscordProfile
  updatedAt: number
}
