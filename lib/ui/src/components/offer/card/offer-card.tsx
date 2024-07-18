import { pathProvider } from '@echo/api/routing/path-provider'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { OfferCardSwitch } from '@echo/ui/components/offer/card/offer-card-switch'
import { type OfferWithRole } from '@echo/ui/types/offer-with-role'
import { type FunctionComponent } from 'react'

export interface OfferCardProps {
  offer: OfferWithRole
  options?: {
    asLink?: boolean
    scaleDisabled?: boolean
  }
}

export const OfferCard: FunctionComponent<OfferCardProps> = (props) => {
  const { offer, options } = props
  if (options?.asLink) {
    return (
      <InternalLink
        path={pathProvider.user.offer.get({ username: offer.sender.username, idContract: offer.idContract })}
        className={'group'}
      >
        <OfferCardSwitch {...props} />
      </InternalLink>
    )
  }
  return <OfferCardSwitch {...props} />
}
