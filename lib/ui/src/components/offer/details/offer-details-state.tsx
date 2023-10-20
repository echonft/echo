import { type OfferState } from '@echo/model/types/offer-state'
import { StateTextContainer } from '@echo/ui/components/shared/state-text-container'
import { clsx } from 'clsx'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

dayjs.extend(relativeTime)

interface Props {
  state: OfferState
  expired: boolean
  expiresAt: number
}

export const OfferDetailsState: FunctionComponent<Props> = ({ state, expired, expiresAt }) => {
  const tState = useTranslations('offer.state')
  const tDetails = useTranslations('offer.details')
  return (
    <div className={clsx('flex', 'flex-row', 'gap-16', 'pr-4')}>
      <StateTextContainer
        subtitle={expired ? dayjs.unix(expiresAt).fromNow(false) : dayjs.unix(expiresAt).toNow(true)}
        title={expired ? tDetails('expiredAt') : tDetails('expiresAt')}
      />
      <div className={clsx('h-[5.3125rem]', 'w-0.5', 'bg-white')} />
      <StateTextContainer subtitle={tState(state)} />
    </div>
  )
}
