import { OfferState } from '@echo/model/constants/offer-state'
import { CreatedOfferAccepted } from '@echo/ui/components/offer/created/created-offer-accepted'
import { CreatedOfferCancelled } from '@echo/ui/components/offer/created/created-offer-cancelled'
import { CreatedOfferCreated } from '@echo/ui/components/offer/created/created-offer-created'
import { CreatedOfferExecuted } from '@echo/ui/components/offer/created/created-offer-executed'
import { CreatedOfferExpired } from '@echo/ui/components/offer/created/created-offer-expired'
import { CreatedOfferRedeemed } from '@echo/ui/components/offer/created/created-offer-redeemed'
import { CreatedOfferRejected } from '@echo/ui/components/offer/created/created-offer-rejected'
import { Background } from '@echo/ui/constants/background'
import { isOfferRoleReceiver } from '@echo/ui/helpers/offer/is-offer-role-receiver'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { PageLayoutBackgroundPickerProps } from '@echo/ui/types/props/page-layout-background-picker-props'
import { type FunctionComponent, useEffect } from 'react'

interface Props extends PageLayoutBackgroundPickerProps {
  offer: OfferWithRole
  redeemed?: boolean
}

export const CreatedOfferSwitch: FunctionComponent<Props> = ({ offer, redeemed, onPageBackgroundUpdate }) => {
  // set the right background according to redeemed and offer state
  useEffect(() => {
    if (
      Boolean(redeemed) ||
      offer.state === OfferState.Expired ||
      offer.state === OfferState.Rejected ||
      offer.state === OfferState.Cancelled
    ) {
      onPageBackgroundUpdate?.(undefined)
    } else {
      onPageBackgroundUpdate?.(Background.Success)
    }
  }, [onPageBackgroundUpdate, offer, redeemed])

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
    case OfferState.Completed:
      // We display the opposite items here since they're swapped
      return (
        <CreatedOfferExecuted
          count={isOfferRoleReceiver(offer) ? offer.senderItems.length : offer.receiverItems.length}
        />
      )
    case OfferState.Cancelled:
      return <CreatedOfferCancelled count={offer.senderItems.length} />
  }
}
