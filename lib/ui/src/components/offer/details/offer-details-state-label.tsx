import { OfferState } from '@echo/model/constants/offer-state'
import { StateLabel } from '@echo/ui/components/base/state-label'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  state: OfferState
}

export const OfferDetailsStateLabel: FunctionComponent<Props> = ({ state }) => {
  const t = useTranslations('offer.state')
  const expired = state === OfferState.Expired

  if (expired) {
    return null
  }
  return <StateLabel subtitle={t(state)} />
}
