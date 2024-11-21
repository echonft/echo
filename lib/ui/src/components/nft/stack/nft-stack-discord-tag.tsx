import type { User } from '@echo/model/types/user'
import { CardDiscordTag } from '@echo/ui/components/base/card/card-discord-tag'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  owner: User
  hideOwner?: boolean
}

export const NftStackDiscordTag: FunctionComponent<Props> = ({ owner, hideOwner }) => {
  if (hideOwner) {
    return null
  }
  return (
    <div className={clsx('absolute', 'bottom-2', 'left-2', 'h-max', 'w-max')}>
      <CardDiscordTag owner={owner} asLink={true} />
    </div>
  )
}
