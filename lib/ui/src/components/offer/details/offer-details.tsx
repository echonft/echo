'use client'
import { ItemsSeparator } from '@echo/ui/components/base/items-separator'
import { NftCards } from '@echo/ui/components/nft/card/nft-cards'
import { OfferDetailsButtons } from '@echo/ui/components/offer/details/action/offer-details-buttons'
import { OfferDetailsInfoLayout } from '@echo/ui/components/offer/details/layout/offer-details-info-layout'
import { OfferDetailsItemsButtonsLayout } from '@echo/ui/components/offer/details/layout/offer-details-items-buttons-layout'
import { OfferDetailsLayout } from '@echo/ui/components/offer/details/layout/offer-details-layout'
import { OfferDetailsState } from '@echo/ui/components/offer/details/offer-details-state'
import { UserDetails } from '@echo/ui/components/user/details/user-details'
import { ALIGNMENT_CENTER } from '@echo/ui/constants/alignments'
import { isOfferRoleSender } from '@echo/ui/helpers/offer/is-offer-role-sender'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
  onUpdate?: (offer: OfferWithRole) => unknown
}

export const OfferDetails: FunctionComponent<Props> = ({ offer, onUpdate }) => {
  const { sender, receiver, senderItems, receiverItems } = offer
  return (
    <OfferDetailsLayout>
      <OfferDetailsInfoLayout>
        <UserDetails user={isOfferRoleSender(offer) ? receiver : sender} />
        <OfferDetailsState offer={offer} />
      </OfferDetailsInfoLayout>
      <OfferDetailsItemsButtonsLayout>
        <NftCards nfts={isOfferRoleSender(offer) ? receiverItems : senderItems} alignment={ALIGNMENT_CENTER} />
        <div className={clsx('pb-4')}>
          <ItemsSeparator />
        </div>
        <NftCards nfts={isOfferRoleSender(offer) ? senderItems : receiverItems} alignment={ALIGNMENT_CENTER} />
        <OfferDetailsButtons offer={offer} onSuccess={onUpdate} />
      </OfferDetailsItemsButtonsLayout>
    </OfferDetailsLayout>
  )
  // FIXME Not the cleanest, but this flow has to change so works for now
  // return <CreatedOfferSwitch offer={updatedOffer} redeemed={offer.state === OFFER_STATE_REJECTED} />
}
