'use client'
import { OFFER_ROLE_RECEIVER, OFFER_ROLE_SENDER } from '@echo/model/constants/offer-role'
import { OFFER_STATE_EXPIRED } from '@echo/model/constants/offer-states'
import { ItemsSeparator } from '@echo/ui/components/base/items-separator'
import { NftCards } from '@echo/ui/components/nft/card/nft-cards'
import { OfferDetailsButtons } from '@echo/ui/components/offer/details/action/offer-details-buttons'
import { OfferDetailsItemsButtonsLayout } from '@echo/ui/components/offer/details/layout/offer-details-items-buttons-layout'
import { TradeDetailsInfoLayout } from '@echo/ui/components/trade/layout/trade-details-info-layout'
import { TradeDetailsLayout } from '@echo/ui/components/trade/layout/trade-details-layout'
import { TradeDetailsUserInfoLayout } from '@echo/ui/components/trade/layout/trade-details-user-info-layout'
import { TradeDetailsState } from '@echo/ui/components/trade/trade-details-state'
import { UserDetails } from '@echo/ui/components/user/details/user-details'
import { ALIGNMENT_LEFT } from '@echo/ui/constants/alignments'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
  onUpdate?: (offer: OfferWithRole) => unknown
}

export const OfferDetails: FunctionComponent<Props> = ({ offer, onUpdate }) => {
  const { sender, receiver, senderItems, receiverItems, state, readOnly, expiresAt } = offer
  const { discord } = receiver
  const { avatarUrl } = discord
  return (
    <TradeDetailsLayout backgroundPictureUrl={avatarUrl}>
      <TradeDetailsState
        isOffer={true}
        state={state}
        expired={state === OFFER_STATE_EXPIRED}
        expiresAt={expiresAt}
        readOnly={readOnly}
      />
      <TradeDetailsInfoLayout>
        <TradeDetailsUserInfoLayout>
          <UserDetails user={sender} isAuthUser={offer.role === OFFER_ROLE_SENDER} />
          <NftCards nfts={senderItems} alignment={ALIGNMENT_LEFT} />
        </TradeDetailsUserInfoLayout>
        <ItemsSeparator />
        <TradeDetailsUserInfoLayout>
          <UserDetails user={receiver} isAuthUser={offer.role === OFFER_ROLE_RECEIVER} />
          <NftCards nfts={receiverItems} alignment={ALIGNMENT_LEFT} />
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
