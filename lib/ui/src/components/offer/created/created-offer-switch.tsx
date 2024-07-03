import {
  OFFER_STATE_ACCEPTED,
  OFFER_STATE_CANCELLED,
  OFFER_STATE_COMPLETED,
  OFFER_STATE_EXPIRED,
  OFFER_STATE_OPEN,
  OFFER_STATE_REJECTED
} from '@echo/model/constants/offer-states'
import { CreatedOfferAccepted } from '@echo/ui/components/offer/created/created-offer-accepted'
import { CreatedOfferCancelled } from '@echo/ui/components/offer/created/created-offer-cancelled'
import { CreatedOfferCreated } from '@echo/ui/components/offer/created/created-offer-created'
import { CreatedOfferExecuted } from '@echo/ui/components/offer/created/created-offer-executed'
import { CreatedOfferExpired } from '@echo/ui/components/offer/created/created-offer-expired'
import { CreatedOfferRedeemed } from '@echo/ui/components/offer/created/created-offer-redeemed'
import { CreatedOfferRejected } from '@echo/ui/components/offer/created/created-offer-rejected'
import { PAGE_LAYOUT_BG_SUCCESS } from '@echo/ui/constants/page-layout-background'
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
      offer.state === OFFER_STATE_EXPIRED ||
      offer.state === OFFER_STATE_REJECTED ||
      offer.state === OFFER_STATE_CANCELLED
    ) {
      onPageBackgroundUpdate?.(undefined)
    } else {
      onPageBackgroundUpdate?.(PAGE_LAYOUT_BG_SUCCESS)
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
    case OFFER_STATE_OPEN:
      return <CreatedOfferCreated count={offer.senderItems.length} slug={offer.slug} />
    case OFFER_STATE_ACCEPTED:
      return <CreatedOfferAccepted count={offer.receiverItems.length} />
    case OFFER_STATE_EXPIRED:
      return (
        <CreatedOfferExpired
          count={isOfferRoleReceiver(offer) ? offer.receiverItems.length : offer.senderItems.length}
        />
      )
    case OFFER_STATE_REJECTED:
      return <CreatedOfferRejected />
    case OFFER_STATE_COMPLETED:
      // We display the opposite items here since they're swapped
      return (
        <CreatedOfferExecuted
          count={isOfferRoleReceiver(offer) ? offer.senderItems.length : offer.receiverItems.length}
        />
      )
    case OFFER_STATE_CANCELLED:
      return <CreatedOfferCancelled count={offer.senderItems.length} />
  }
}
