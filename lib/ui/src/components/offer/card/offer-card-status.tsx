import type { OfferState } from '@echo/model/constants/offer-state'
import { CardStatus } from '@echo/ui/components/base/card/card-status'
import { getOfferBackgroundColor } from '@echo/ui/helpers/offer/get-offer-background-color'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  state: OfferState
}

export const OfferCardStatus: FunctionComponent<Props> = ({ state }) => {
  const t = useTranslations('offer.state')
  return <CardStatus label={t(state)} color={getOfferBackgroundColor(state)} />
}
