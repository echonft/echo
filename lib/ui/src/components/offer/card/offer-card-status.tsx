import type { Offer } from '@echo/model/types/offer'
import { CardStatus } from '@echo/ui/components/base/card/card-status'
import { getOfferCardStatusColor } from '@echo/ui/helpers/offer/get-offer-card-status-color'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  offer: Offer
}

export const OfferCardStatus: FunctionComponent<Props> = ({ offer }) => {
  const t = useTranslations('offer.card.state')
  // TODO remove when we merge the expired state PR
  return <CardStatus label={offer.expired ? t('EXPIRED') : t(offer.state)} color={getOfferCardStatusColor(offer)} />
}
