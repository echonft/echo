import { OfferState } from '@echo/model/constants/offer-state'
import { CreatedOfferAccepted } from '@echo/ui/components/offer/created/created-offer-accepted'
import { CreatedOfferCancelled } from '@echo/ui/components/offer/created/created-offer-cancelled'
import { CreatedOfferCreated } from '@echo/ui/components/offer/created/created-offer-created'
import { CreatedOfferExpired } from '@echo/ui/components/offer/created/created-offer-expired'
import { CreatedOfferRedeemed } from '@echo/ui/components/offer/created/created-offer-redeemed'
import { CreatedOfferRejected } from '@echo/ui/components/offer/created/created-offer-rejected'
import { isOfferRoleReceiver } from '@echo/ui/helpers/offer/is-offer-role-receiver'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { type FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
  redeemed?: boolean
}

export const CreatedOfferSwitch: FunctionComponent<Props> = ({ offer, redeemed }) => {
  if (redeemed) {
    return (
      <CreatedOfferRedeemed
        count={isOfferRoleReceiver(offer) ? offer.receiverItems.length : offer.senderItems.length}
      />
    )
  }
  switch (offer.state) {
    case OfferState.Open:
      return <CreatedOfferCreated offer={offer} />
    case OfferState.Accepted:
      return <CreatedOfferAccepted count={offer.receiverItems.length} />
    case OfferState.Expired:
      return (
        <CreatedOfferExpired
          count={isOfferRoleReceiver(offer) ? offer.receiverItems.length : offer.senderItems.length}
        />
      )
    case OfferState.Rejected:
      return <CreatedOfferRejected />
    case OfferState.Cancelled:
      return <CreatedOfferCancelled count={offer.senderItems.length} />
  }
}
