import type { Offer } from '@echo/model/types/offer'
import { CardStatus } from '@echo/ui/components/base/card/card-status'
import { getOfferCardStatusColor } from '@echo/ui/helpers/offer/get-offer-card-status-color'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  offer: Offer
}

export const OfferCardStatus: FunctionComponent<Props> = ({ offer }) => {
  const t = useTranslations('offer.state')
  return <CardStatus label={t(offer.state)} color={getOfferCardStatusColor(offer)} />
}
