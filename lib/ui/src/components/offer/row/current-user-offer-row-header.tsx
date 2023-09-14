import { OfferStatePill } from '@echo/ui/components/offer/row/offer-state-pill'
import { UserDiscordTag } from '@echo/ui/components/shared/user-discord-tag'
import type { OfferState } from '@echo/ui/types/model/offer-state'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  state: OfferState
  expired: boolean
  discordUsername: string
}

export const CurrentUserOfferRowHeader: FunctionComponent<Props> = ({ state, expired, discordUsername }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-4', 'grow', 'w-full')}>
      <OfferStatePill expired={expired} state={state} />
      <UserDiscordTag discordUsername={discordUsername} />
    </div>
  )
}
