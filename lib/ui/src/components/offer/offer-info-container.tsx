import { UserDiscordTag } from '../user/user-discord-tag'
import { OfferStatePill } from './offer-state-pill'
import { OfferState } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface OfferInfoContainerProps {
  state: OfferState
  discordUsername: string
}

export const OfferInfoContainer: FunctionComponent<OfferInfoContainerProps> = ({ state, discordUsername }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-4')}>
      <OfferStatePill state={state} />
      <UserDiscordTag discordUsername={discordUsername} />
    </div>
  )
}
