import { OFFER_STATE_EXPIRED } from '@echo/model/constants/offer-states'
import type { Offer } from '@echo/model/types/offer'
import { StateTextContainer } from '@echo/ui/components/base/state-text-container'
import { ShowIf } from '@echo/ui/components/base/utils/show-if'
import { classes } from '@echo/ui/helpers/classes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

dayjs.extend(relativeTime)

interface Props {
  offer: Offer
}

export const OfferDetailsState: FunctionComponent<Props> = ({ offer }) => {
  const tState = useTranslations('offer.state')
  const tDetails = useTranslations('offer.details')
  const expired = offer.state === OFFER_STATE_EXPIRED
  const expiration = dayjs.unix(offer.expiresAt)

  return (
    <div className={classes('flex', 'flex-row', 'gap-16', 'items-center', 'h-max', 'w-max')}>
      <ShowIf condition={expired || !offer.readOnly}>
        <StateTextContainer
          title={tDetails(expired ? 'expiredAt' : 'expiresAt')}
          subtitle={expired ? expiration.fromNow(false) : expiration.toNow(true)}
        />
      </ShowIf>
      <ShowIf condition={!offer.readOnly}>
        <div className={classes('h-[5.3125rem]', 'w-0.5', 'bg-white')} />
      </ShowIf>
      <ShowIf condition={!expired}>
        <StateTextContainer subtitle={tState(offer.state)} />
      </ShowIf>
    </div>
  )
}
