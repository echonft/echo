import { offerStateIsFinal } from '@echo/model/helpers/offer/offer-state-is-final'
import { type OfferState } from '@echo/model/types/offer-state'
import { OfferRowHeaderLayout } from '@echo/ui/components/offer/row/layout/offer-row-header-layout'
import { UserDiscordTag } from '@echo/ui/components/user/base/user-discord-tag'
import { OfferRowStatePill } from '@echo/ui/components/offer/card/offer-row-state-pill'
import { type FunctionComponent } from 'react'

interface Props {
  state: OfferState
  expired: boolean
  discordUsername: string
}

export const OfferRowHeader: FunctionComponent<Props> = ({ state, expired, discordUsername }) => {
  return (
    <OfferRowHeaderLayout>
      <OfferRowStatePill expired={!offerStateIsFinal(state) && expired} state={state} />
      <UserDiscordTag discordUsername={discordUsername} />
    </OfferRowHeaderLayout>
  )
}
