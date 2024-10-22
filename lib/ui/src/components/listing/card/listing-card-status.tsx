import type { ListingState } from '@echo/model/constants/listing-state'
import { CardStatus } from '@echo/ui/components/base/card/card-status'
import { getListingBackgroundColor } from '@echo/ui/helpers/listing/get-listing-background-color'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  state: ListingState
}

export const ListingCardStatus: FunctionComponent<Props> = ({ state }) => {
  const t = useTranslations('listing.state')
  return <CardStatus label={t(state)} color={getListingBackgroundColor(state)} />
}
