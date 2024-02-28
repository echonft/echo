import type { DiscordProfile } from '@echo/model/types/discord-profile'
import type { WithUsername } from '@echo/model/types/with-username'

export interface AuthUser extends WithUsername {
  discord: DiscordProfile
}
