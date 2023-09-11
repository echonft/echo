import { UserDiscordTag } from '../../shared/user-discord-tag'
import { OfferStatePill } from './offer-state-pill'
import { OfferState } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

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
