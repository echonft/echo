'use client'
import { OFFER_STATE_REJECTED } from '@echo/model/constants/offer-states'
import { ItemsSeparator } from '@echo/ui/components/base/items-separator'
import { NftCards } from '@echo/ui/components/nft/card/nft-cards'
import { CreatedOfferSwitch } from '@echo/ui/components/offer/created/created-offer-switch'
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
import { isNil } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  offer: OfferWithRole
}

export const OfferDetails: FunctionComponent<Props> = ({ offer }) => {
  const [updatedOffer, setUpdatedOffer] = useState<OfferWithRole>()
  const currentOffer = updatedOffer ?? offer
  const { sender, receiver, senderItems, receiverItems } = currentOffer

  // When offer was updated, an action was triggered, we display the success/error screen
  if (isNil(updatedOffer)) {
    return (
      <OfferDetailsLayout>
        <OfferDetailsInfoLayout>
          <UserDetails user={isOfferRoleSender(currentOffer) ? receiver : sender} />
          <OfferDetailsState offer={currentOffer} />
        </OfferDetailsInfoLayout>
        <OfferDetailsItemsButtonsLayout>
          <NftCards nfts={isOfferRoleSender(currentOffer) ? receiverItems : senderItems} alignment={ALIGNMENT_CENTER} />
          <div className={clsx('pb-4')}>
            <ItemsSeparator />
          </div>
          <NftCards nfts={isOfferRoleSender(currentOffer) ? senderItems : receiverItems} alignment={ALIGNMENT_CENTER} />
          <OfferDetailsButtons offer={currentOffer} onSuccess={setUpdatedOffer} />
        </OfferDetailsItemsButtonsLayout>
      </OfferDetailsLayout>
    )
  }
  // FIXME Not the cleanest, but this flow has to change so works for now
  return <CreatedOfferSwitch offer={updatedOffer} redeemed={offer.state === OFFER_STATE_REJECTED} />
}
