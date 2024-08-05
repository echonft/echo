'use client'
import { OFFER_ROLE_RECEIVER, OFFER_ROLE_SENDER } from '@echo/model/constants/offer-role'
import { ItemsSeparator } from '@echo/ui/components/base/items-separator'
import { NftCards } from '@echo/ui/components/nft/card/nft-cards'
import { OfferDetailsButtons } from '@echo/ui/components/offer/details/action/offer-details-buttons'
import { OfferDetailsInfoLayout } from '@echo/ui/components/offer/details/layout/offer-details-info-layout'
import { OfferDetailsItemsButtonsLayout } from '@echo/ui/components/offer/details/layout/offer-details-items-buttons-layout'
import { OfferDetailsLayout } from '@echo/ui/components/offer/details/layout/offer-details-layout'
import { OfferDetailsUserInfoLayout } from '@echo/ui/components/offer/details/layout/offer-details-user-info-layout'
import { OfferDetailsState } from '@echo/ui/components/offer/details/offer-details-state'
import { UserDetails } from '@echo/ui/components/user/details/user-details'
import { ALIGNMENT_LEFT } from '@echo/ui/constants/alignments'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
  onUpdate?: (offer: OfferWithRole) => unknown
}

export const OfferDetails: FunctionComponent<Props> = ({ offer, onUpdate }) => {
  const { sender, receiver, senderItems, receiverItems } = offer
  return (
    <OfferDetailsLayout>
      <OfferDetailsState offer={offer} />
      <OfferDetailsInfoLayout>
        <OfferDetailsUserInfoLayout>
          <UserDetails user={sender} isAuthUser={offer.role === OFFER_ROLE_SENDER} />
          <NftCards nfts={senderItems} alignment={ALIGNMENT_LEFT} />
        </OfferDetailsUserInfoLayout>
        <ItemsSeparator />
        <OfferDetailsUserInfoLayout>
          <UserDetails user={receiver} isAuthUser={offer.role === OFFER_ROLE_RECEIVER} />
          <NftCards nfts={receiverItems} alignment={ALIGNMENT_LEFT} />
        </OfferDetailsUserInfoLayout>
      </OfferDetailsInfoLayout>
      <OfferDetailsItemsButtonsLayout>
        <OfferDetailsButtons offer={offer} onSuccess={onUpdate} />
      </OfferDetailsItemsButtonsLayout>
    </OfferDetailsLayout>
  )
  // FIXME Not the cleanest, but this flow has to change so works for now
  // return <CreatedOfferSwitch offer={updatedOffer} redeemed={offer.state === OFFER_STATE_REJECTED} />
}
