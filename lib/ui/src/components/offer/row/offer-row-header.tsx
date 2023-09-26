import { OfferRowHeaderLayout } from '@echo/ui/components/offer/row/layout/offer-row-header-layout'
import { OfferRowStatePill } from '@echo/ui/components/offer/row/offer-row-state-pill'
import { UserDiscordTag } from '@echo/ui/components/shared/user-discord-tag'
import type { OfferState } from '@echo/ui/types/model/offer-state'
import type { FunctionComponent } from 'react'

interface Props {
  state: OfferState
  expired: boolean
  discordUsername: string
}

export const OfferRowHeader: FunctionComponent<Props> = ({ state, expired, discordUsername }) => {
  return (
    <OfferRowHeaderLayout>
      <OfferRowStatePill expired={expired} state={state} />
      <UserDiscordTag discordUsername={discordUsername} />
    </OfferRowHeaderLayout>
  )
}
