import { linkProvider } from '@echo/api/services/routing/link-provider'
import { InternalLink } from '@echo/ui/components/base/link/internal-link'
import { OfferCardSwitch } from '@echo/ui/components/offer/card/offer-card-switch'
import { type OfferWithRole } from '@echo/ui/types/offer-with-role'
import { type FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
  scaleDisabled?: boolean
}

export const OfferCard: FunctionComponent<Props> = ({ offer, scaleDisabled }) => {
  return (
    <InternalLink path={linkProvider.profile.offer.get({ offerId: offer.id })}>
      <OfferCardSwitch offer={offer} scaleDisabled={scaleDisabled} />
    </InternalLink>
  )
}
