import { ListingState } from '@echo/model/constants/listing-state'
import { StateLabel } from '@echo/ui/components/base/state-label'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  state: ListingState
}

export const ListingDetailsStateLabel: FunctionComponent<Props> = ({ state }) => {
  const expired = state === ListingState.Expired
  const t = useTranslations('listing.state')
  if (expired) {
    return null
  }
  return <StateLabel subtitle={t(state)} />
}
