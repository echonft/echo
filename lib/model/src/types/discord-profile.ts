import type { WithId } from '@echo/model/types/with-id'
import type { WithUsername } from '@echo/model/types/with-username'
import type { Nullable } from '@echo/utils/types/nullable'

export interface DiscordProfile extends WithId, WithUsername {
  avatarUrl: string
  avatarDecorationUrl?: Nullable<string>
  bannerColor?: Nullable<string>
  bannerUrl?: Nullable<string>
}
