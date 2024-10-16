import type { Listing } from '@echo/model/types/listing/listing'
import { CardStatus } from '@echo/ui/components/base/card/card-status'
import { getListingStatusColor } from '@echo/ui/helpers/listing/get-listing-status-color'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  listing: Listing
}

export const ListingCardStatus: FunctionComponent<Props> = ({ listing }) => {
  const t = useTranslations('listing.state')
  return <CardStatus label={t(listing.state)} color={getListingStatusColor(listing)} />
}
