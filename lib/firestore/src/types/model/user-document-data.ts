import type { UserDiscordProfile } from '@echo/model/types/user/user-discord-profile'
import type { WithUsername } from '@echo/model/types/with-username'

export interface UserDocumentData extends WithUsername {
  discord: UserDiscordProfile
}
