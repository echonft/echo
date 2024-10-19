import { OfferState } from '@echo/model/constants/offer-state'
import { StateLabel } from '@echo/ui/components/base/state-label'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

dayjs.extend(relativeTime)

interface Props {
  expiresAt: number
  locked: boolean
  state: OfferState
}

export const StateExpiration: FunctionComponent<Props> = ({ expiresAt, locked, state }) => {
  const t = useTranslations('offer.details')
  const expired = state === OfferState.Expired
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
