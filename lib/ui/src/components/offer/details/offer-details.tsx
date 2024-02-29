'use client'
import { NftCards } from '@echo/ui/components/nft/card/layout/nft-cards'
import { OfferDetailsButtons } from '@echo/ui/components/offer/details/action/offer-details-buttons'
import { OfferDetailsInfoLayout } from '@echo/ui/components/offer/details/layout/offer-details-info-layout'
import { OfferDetailsItemsButtonsLayout } from '@echo/ui/components/offer/details/layout/offer-details-items-buttons-layout'
import { OfferDetailsLayout } from '@echo/ui/components/offer/details/layout/offer-details-layout'
import { OfferDetailsItemsSeparator } from '@echo/ui/components/offer/details/offer-details-items-separator'
import { OfferDetailsState } from '@echo/ui/components/offer/details/offer-details-state'
import { UserDetails } from '@echo/ui/components/user/details/user-details'
import { ALIGNMENT_CENTER } from '@echo/ui/constants/alignments'
import { isOfferRoleSender } from '@echo/ui/helpers/offer/is-offer-role-sender'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { map, prop } from 'ramda'
import { type FunctionComponent, useEffect, useState } from 'react'

interface Props {
  offer: OfferWithRole
}

export const OfferDetails: FunctionComponent<Props> = ({ offer }) => {
  const [updatedOffer, setUpdatedOffer] = useState(offer)
  useEffect(() => {
    setUpdatedOffer(offer)
  }, [offer])
  const { sender, receiver, senderItems, receiverItems } = updatedOffer

  return (
    <OfferDetailsLayout>
      <OfferDetailsInfoLayout>
        <UserDetails user={isOfferRoleSender(updatedOffer) ? receiver : sender} />
        <OfferDetailsState offer={updatedOffer} />
      </OfferDetailsInfoLayout>
      <OfferDetailsItemsButtonsLayout>
        <NftCards
          nfts={map(prop('nft'), isOfferRoleSender(updatedOffer) ? receiverItems : senderItems)}
          alignment={ALIGNMENT_CENTER}
        />
        <OfferDetailsItemsSeparator />
        <NftCards
          nfts={map(prop('nft'), isOfferRoleSender(updatedOffer) ? senderItems : receiverItems)}
          alignment={ALIGNMENT_CENTER}
        />
        <OfferDetailsButtons offer={updatedOffer} onSuccess={setUpdatedOffer} />
      </OfferDetailsItemsButtonsLayout>
    </OfferDetailsLayout>
  )
}
