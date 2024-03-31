import { DiscordIconSvg } from '@echo/ui/components/base/svg/discord-icon-svg'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  username: string
}

export const DiscordUsernameTag: FunctionComponent<Props> = ({ username }) => (
  <div className={clsx('flex', 'flex-row', 'gap-2.5', 'items-center')}>
    <span className={clsx('text-yellow-500')}>
      <DiscordIconSvg />
    </span>
    <span className={clsx('prose-other-bold', 'text-white', '!font-medium')}>{username}</span>
  </div>
)
