import { OfferState } from '@echo/model/constants/offer-state'
import { StateLabel } from '@echo/ui/components/base/state-label'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  state: OfferState
}

export const OfferDetailsOfferStateLabel: FunctionComponent<Props> = ({ state }) => {
  const expired = state === OfferState.Expired
  const t = useTranslations('offer.state')
  if (expired) {
    return null
  }
  return <StateLabel subtitle={t(state)} />
}
