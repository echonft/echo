import type { WithId } from '@echo/model/types/with-id'
import type { WithUsername } from '@echo/model/types/with-username'
import type { Nullable } from '@echo/utils/types/nullable'

export interface UserDiscordProfile extends WithId, WithUsername {
  accentColor?: Nullable<number>
  avatar?: Nullable<string>
  avatarDecorationUrl?: Nullable<string>
  avatarUrl: string
  bannerColor?: Nullable<string>
  bannerUrl?: Nullable<string>
  discriminator: string
  globalName?: Nullable<string>
}
