import { CardDiscordTag } from '@echo/ui/components/base/card/card-discord-tag'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  hideOwner?: boolean
  username: string
}

export const NftStackDiscordTag: FunctionComponent<Props> = ({ username, hideOwner }) => {
  if (hideOwner) {
    return null
  }
  return (
    <div className={clsx('absolute', 'bottom-2', 'left-2', 'h-max', 'w-max')}>
      <CardDiscordTag username={username} />
    </div>
  )
}
