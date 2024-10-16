import { OFFER_STATE_EXPIRED } from '@echo/model/constants/offer-states'
import type { OfferState } from '@echo/model/types/offer/offer-state'
import { StateLabel } from '@echo/ui/components/base/state-label'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

dayjs.extend(relativeTime)

interface Props {
  expiresAt: number
  readOnly: boolean
  state: OfferState
}

export const StateExpiration: FunctionComponent<Props> = ({ expiresAt, readOnly, state }) => {
  const t = useTranslations('offer.details')
  const expired = state === OFFER_STATE_EXPIRED
  const expiration = dayjs.unix(expiresAt)

  if (expired || !readOnly) {
    return (
      <StateLabel
        title={t(expired ? 'expiredAt' : 'expiresAt')}
        subtitle={expired ? expiration.fromNow(false) : expiration.toNow(true)}
      />
    )
  }
  return null
}
