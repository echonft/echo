import { OfferState as OfferStateModel } from '../../types/offer-state'
import { UserDiscordTag } from '../user/user-discord-tag'
import { OfferState } from './offer-state'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface OfferInfoContainerProps {
  state: OfferStateModel
  discordUsername: string
}

export const OfferInfoContainer: FunctionComponent<OfferInfoContainerProps> = ({ state, discordUsername }) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-4')}>
      <OfferState state={state} />
      <UserDiscordTag discordUsername={discordUsername} />
    </div>
  )
}
