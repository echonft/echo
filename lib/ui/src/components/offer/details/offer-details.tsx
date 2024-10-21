'use client'
import { OfferRole } from '@echo/model/constants/offer-role'
import { OfferState } from '@echo/model/constants/offer-state'
import { ItemsSeparator } from '@echo/ui/components/base/items-separator'
import { NftCards } from '@echo/ui/components/nft/card/nft-cards'
import { OfferDetailsButtons } from '@echo/ui/components/offer/details/action/offer-details-buttons'
import { OfferDetailsItemsButtonsLayout } from '@echo/ui/components/offer/details/layout/offer-details-items-buttons-layout'
import { TradeDetailsInfoLayout } from '@echo/ui/components/trade/layout/trade-details-info-layout'
import { TradeDetailsLayout } from '@echo/ui/components/trade/layout/trade-details-layout'
import { TradeDetailsUserInfoLayout } from '@echo/ui/components/trade/layout/trade-details-user-info-layout'
import { TradeDetailsState } from '@echo/ui/components/trade/trade-details-state'
import { UserDetails } from '@echo/ui/components/user/details/user-details'
import { Alignment } from '@echo/ui/constants/alignments'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
  onUpdate?: (offer: OfferWithRole) => unknown
}

export const OfferDetails: FunctionComponent<Props> = ({ offer, onUpdate }) => {
  const { sender, receiver, senderItems, receiverItems, state, locked, expiresAt } = offer
  const { discord } = receiver
  const { avatarUrl } = discord
  return (
    <TradeDetailsLayout backgroundPictureUrl={avatarUrl}>
      <TradeDetailsState
        isOffer={true}
        state={state}
        expired={state === OfferState.Expired}
        expiresAt={expiresAt}
        locked={locked}
      />
      <TradeDetailsInfoLayout>
        <TradeDetailsUserInfoLayout>
          <UserDetails user={sender} isAuthUser={offer.role === OfferRole.Sender} />
          <NftCards nfts={senderItems} alignment={Alignment.Left} />
        </TradeDetailsUserInfoLayout>
        <ItemsSeparator />
        <TradeDetailsUserInfoLayout>
          <UserDetails user={receiver} isAuthUser={offer.role === OfferRole.Receiver} />
          <NftCards nfts={receiverItems} alignment={Alignment.Left} />
        </TradeDetailsUserInfoLayout>
      </TradeDetailsInfoLayout>
      <OfferDetailsItemsButtonsLayout>
        <OfferDetailsButtons offer={offer} onSuccess={onUpdate} />
      </OfferDetailsItemsButtonsLayout>
    </TradeDetailsLayout>
  )
  // FIXME Not the cleanest, but this flow has to change so works for now
  // return <CreatedOfferSwitch offer={updatedOffer} redeemed={offer.state === OFFER_STATE_REJECTED} />
}
