import { DiscordIconSvg } from '@echo/ui/components/base/svg/discord-icon-svg'
import { classes } from '@echo/ui/helpers/classes'
import type { FunctionComponent } from 'react'

interface Props {
  username: string
}

export const DiscordUsernameTag: FunctionComponent<Props> = ({ username }) => (
  <div className={classes('flex', 'flex-row', 'gap-2.5', 'items-center')}>
    <span className={classes('text-yellow-500')}>
      <DiscordIconSvg />
    </span>
    <span className={classes('prose-display-sm-bold', 'text-white', '!font-medium')}>{username}</span>
  </div>
)
