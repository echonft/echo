import { OFFER_STATE_ACCEPTED, OFFER_STATE_EXPIRED, OFFER_STATE_OPEN } from '@echo/model/constants/offer-states'
import { type OfferState } from '@echo/model/types/offer-state'
import { StateTextContainer } from '@echo/ui/components/base/state-text-container'
import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { clsx } from 'clsx'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

dayjs.extend(relativeTime)

interface Props {
  state: OfferState
  expiresAt: number
}

export const OfferDetailsState: FunctionComponent<Props> = ({ state, expiresAt }) => {
  const tState = useTranslations('offer.state')
  const tDetails = useTranslations('offer.details')
  const expired = state === OFFER_STATE_EXPIRED
  const expirationShown = state === OFFER_STATE_OPEN || state === OFFER_STATE_ACCEPTED
  const stateShown = !expirationShown || !expired
  const delimiterShown = expirationShown && stateShown

  return (
    <div className={clsx('flex', 'flex-row', 'gap-16', 'pr-4')}>
      <ShowIf condition={expirationShown}>
        <StateTextContainer
          title={expired ? tDetails('expiredAt') : tDetails('expiresAt')}
          subtitle={expired ? dayjs.unix(expiresAt).fromNow(false) : dayjs.unix(expiresAt).toNow(true)}
        />
      </ShowIf>
      <ShowIf condition={delimiterShown}>
        <div className={clsx('h-[5.3125rem]', 'w-0.5', 'bg-white')} />
      </ShowIf>
      <ShowIf condition={stateShown}>
        {/*FIXME this will change anyway*/}
        {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
        {/*@ts-ignore*/}
        <StateTextContainer subtitle={tState(state)} />
      </ShowIf>
    </div>
  )
}
