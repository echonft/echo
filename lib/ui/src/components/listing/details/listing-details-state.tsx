import { LISTING_STATE_CANCELLED, LISTING_STATE_FULFILLED } from '@echo/model/constants/listing-states'
import { type ListingState } from '@echo/model/types/listing-state'
import { StateTextContainer } from '@echo/ui/components/base/state-text-container'
import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { clsx } from 'clsx'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

dayjs.extend(relativeTime)

interface Props {
  state: ListingState
  expired: boolean
  expiresAt: number
}

export const ListingDetailsState: FunctionComponent<Props> = ({ state, expired, expiresAt }) => {
  const tState = useTranslations('listing.state')
  const tDetails = useTranslations('listing.details')
  const expirationShown = state !== LISTING_STATE_FULFILLED && state !== LISTING_STATE_CANCELLED
  const stateShown = !expirationShown || !expired
  const delimiterShown = expirationShown && stateShown

  return (
    <div className={clsx('flex', 'flex-row', 'gap-16', 'pr-4')}>
      <ShowIf condition={expirationShown}>
        <StateTextContainer
          subtitle={expired ? dayjs.unix(expiresAt).fromNow(false) : dayjs.unix(expiresAt).toNow(true)}
          title={expired ? tDetails('expiredAt') : tDetails('expiresAt')}
        />
      </ShowIf>
      <ShowIf condition={delimiterShown}>
        <div className={clsx('h-[5.3125rem]', 'w-0.5', 'bg-white')} />
      </ShowIf>
      <ShowIf condition={stateShown}>
        <StateTextContainer subtitle={tState(state)} />
      </ShowIf>
    </div>
  )
}
