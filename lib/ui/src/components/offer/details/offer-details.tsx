'use client'
import { NftCardsContainer } from '@echo/ui/components/nft/card/layout/nft-cards-container'
import { OfferDetailsButtons } from '@echo/ui/components/offer/details/action/offer-details-buttons'
import { OfferDetailsInfoLayout } from '@echo/ui/components/offer/details/layout/offer-details-info-layout'
import { OfferDetailsItemsButtonsLayout } from '@echo/ui/components/offer/details/layout/offer-details-items-buttons-layout'
import { OfferDetailsLayout } from '@echo/ui/components/offer/details/layout/offer-details-layout'
import { OfferDetailsItemsSeparator } from '@echo/ui/components/offer/details/offer-details-items-separator'
import { OfferDetailsState } from '@echo/ui/components/offer/details/offer-details-state'
import { UserDetails } from '@echo/ui/components/user/details/user-details'
import { ALIGNMENT_CENTER } from '@echo/ui/constants/alignments'
import { isOfferRoleSender } from '@echo/ui/helpers/offer/is-offer-role-sender'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { dissoc, map, prop } from 'ramda'
import { type FunctionComponent } from 'react'
import { mutate } from 'swr'

interface Props {
  offer: OfferWithRole
}

export const OfferDetails: FunctionComponent<Props> = ({ offer }) => {
  // const [updatedOffer, setUpdatedOffer] = useState(offer)
  // useEffect(() => {
  //   setUpdatedOffer(offer)
  // }, [offer])
  const { sender, receiver, senderItems, receiverItems } = offer

  return (
    <OfferDetailsLayout>
      <OfferDetailsInfoLayout>
        <UserDetails user={isOfferRoleSender(offer) ? receiver : sender} />
        <OfferDetailsState offer={offer} />
      </OfferDetailsInfoLayout>
      <OfferDetailsItemsButtonsLayout>
        <NftCardsContainer
          nfts={map(prop('nft'), isOfferRoleSender(offer) ? receiverItems : senderItems)}
          alignment={ALIGNMENT_CENTER}
        />
        <OfferDetailsItemsSeparator />
        <NftCardsContainer
          nfts={map(prop('nft'), isOfferRoleSender(offer) ? senderItems : receiverItems)}
          alignment={ALIGNMENT_CENTER}
        />
        <OfferDetailsButtons
          offer={offer}
          onSuccess={(offer) => {
            const updatedOffer = dissoc('role', offer)
            void mutate(SWRKeys.offer.get(offer), updatedOffer, { optimisticData: updatedOffer })
          }}
        />
      </OfferDetailsItemsButtonsLayout>
    </OfferDetailsLayout>
  )
}
