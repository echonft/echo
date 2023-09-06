import { StateTextContainer } from '../../shared/state-text-container'
import { OfferState } from '@echo/ui-model'
import { clsx } from 'clsx'
import dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

dayjs.extend(RelativeTime)

interface Props {
  state: OfferState
  expired: boolean
  expiresAt: dayjs.Dayjs
}

export const OfferDetailsState: FunctionComponent<Props> = ({ state, expired, expiresAt }) => {
  const tState = useTranslations('offer.state')
  const tDetails = useTranslations('offer.details')
  return (
    <div className={clsx('flex', 'flex-row', 'gap-16', 'pr-4')}>
      <StateTextContainer
        subtitle={expired ? expiresAt.fromNow(false) : expiresAt.toNow(true)}
        title={expired ? tDetails('expiredAt') : tDetails('expiresAt')}
      />
      <div className={clsx('h-[5.3125rem]', 'w-0.5', 'bg-white')} />
      <StateTextContainer subtitle={tState(state)} />
    </div>
  )
}
