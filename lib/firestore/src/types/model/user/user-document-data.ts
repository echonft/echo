import type { DiscordProfile } from '@echo/model/types/discord-profile'
import type { WithId } from '@echo/model/types/with-id'
import type { WithUsername } from '@echo/model/types/with-username'

export interface UserDocumentData extends WithId, WithUsername {
  createdAt: number
  discord: DiscordProfile
  updatedAt: number
}
