'use client'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
  onUpdate?: (offer: OfferWithRole) => unknown
}

// TODO ERC20 + ERC1155
export const OfferDetails: FunctionComponent<Props> = () => {
  // export const OfferDetails: FunctionComponent<Props> = ({ offer, onUpdate }) => {
  return null
  // const { sender, receiver, senderItems, receiverItems } = offer
  //   <OfferDetailsLayout>
  //     <OfferDetailsState offer={offer} />
  //     <OfferDetailsInfoLayout>
  //       <OfferDetailsUserInfoLayout>
  //         <UserDetails user={sender} isAuthUser={offer.role === OfferRole.Sender} />
  //         <NftCards nfts={senderItems} alignment={Alignment.Left} />
  //       </OfferDetailsUserInfoLayout>
  //       <ItemsSeparator />
  //       <OfferDetailsUserInfoLayout>
  //         <UserDetails user={receiver} isAuthUser={offer.role === OfferRole.Receiver} />
  //         <NftCards nfts={receiverItems} alignment={Alignment.Left} />
  //       </OfferDetailsUserInfoLayout>
  //     </OfferDetailsInfoLayout>
  //     <OfferDetailsItemsButtonsLayout>
  //       <OfferDetailsButtons offer={offer} onSuccess={onUpdate} />
  //     </OfferDetailsItemsButtonsLayout>
  //   </OfferDetailsLayout>
  // )
  // FIXME Not the cleanest, but this flow has to change so works for now
  // return <CreatedOfferSwitch offer={updatedOffer} redeemed={offer.state === OFFER_STATE_REJECTED} />
}
