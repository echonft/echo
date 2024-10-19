import { ListingState } from '@echo/model/constants/listing-state'
import type { Listing } from '@echo/model/types/listing/listing'
import { StateLabel } from '@echo/ui/components/base/state-label'
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
  const expired = listing.state === ListingState.Expired
  const expiration = dayjs.unix(listing.expiresAt)

  if (expired || !listing.locked) {
    return (
      <StateLabel
        subtitle={expired ? expiration.fromNow(false) : expiration.toNow(true)}
        title={t(expired ? 'expiredAt' : 'expiresAt')}
      />
    )
  }
  return null
}
