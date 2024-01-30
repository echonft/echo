import { LISTING_STATE_EXPIRED } from '@echo/model/constants/listing-states'
import type { Listing } from '@echo/model/types/listing'
import { StateTextContainer } from '@echo/ui/components/base/state-text-container'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

dayjs.extend(relativeTime)

interface Props {
  listing: Listing
}

export const ListingDetailsState: FunctionComponent<Props> = ({ listing }) => {
  const t = useTranslations('listing.details')
  const expired = listing.state === LISTING_STATE_EXPIRED
  const expiration = dayjs.unix(listing.expiresAt)

  if (expired || !listing.readOnly) {
    return (
      <StateTextContainer
        subtitle={expired ? expiration.fromNow(false) : expiration.toNow(true)}
        title={t(expired ? 'expiredAt' : 'expiresAt')}
      />
    )
  }
  return null
}
