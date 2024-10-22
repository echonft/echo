import { ListingState } from '@echo/model/constants/listing-state'
import { OfferState } from '@echo/model/constants/offer-state'
import type { Listing } from '@echo/model/types/listing/listing'
import type { Offer } from '@echo/model/types/offer/offer'
import { StateLabel } from '@echo/ui/components/base/state-label'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

dayjs.extend(relativeTime)

interface Props {
  trade: Offer | Listing
}

export const TradeStateExpiration: FunctionComponent<Props> = ({ trade }) => {
  const { locked, state, expiresAt } = trade
  const t = useTranslations('trade.details')
  const expired = state === OfferState.Expired || state === ListingState.Expired
  const expiration = dayjs.unix(expiresAt)

  if (expired || !locked) {
    return (
      <StateLabel
        title={t(expired ? 'expiredAt' : 'expiresAt')}
        subtitle={expired ? expiration.fromNow(false) : expiration.toNow(true)}
      />
    )
  }
  return null
}
