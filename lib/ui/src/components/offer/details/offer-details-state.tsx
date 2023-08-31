import { OfferDetailsStateTextContainer } from './offer-details-state-text-container'
import { OfferState } from '@echo/ui-model'
import { clsx } from 'clsx'
import dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

// TODO Should be somewhere more global
dayjs.extend(RelativeTime)
interface Props {
  state: OfferState
  expiresAt: dayjs.Dayjs
}

export const OfferDetailsState: FunctionComponent<Props> = ({ state, expiresAt }) => {
  const tState = useTranslations('offer.state')
  const tDetails = useTranslations('offer.details')
  return (
    <div className={clsx('flex', 'flex-row', 'items-center', 'gap-16', 'pr-4')}>
      <OfferDetailsStateTextContainer
        subtitle={expiresAt.fromNow(false)}
        title={tDetails(dayjs().isAfter(expiresAt) ? 'expiredAt' : 'expiresAt')}
      />
      <div className={clsx('h-[5.3125rem]', 'w-0.5', 'bg-white')} />
      <OfferDetailsStateTextContainer subtitle={tState(state)} />
    </div>
  )
}
