import { StateTextContainer } from '@echo/ui/components/base/state-text-container'
import { clsx } from 'clsx'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

dayjs.extend(relativeTime)

interface Props {
  expired: boolean
  readOnly: boolean
  expiresAt: number
}

export const ListingDetailsState: FunctionComponent<Props> = ({ expired, readOnly, expiresAt }) => {
  const t = useTranslations('listing.details')

  if (expired || !readOnly) {
    return (
      <div className={clsx('pb-9', 'px-5', 'pt-4.5')}>
        <StateTextContainer
          subtitle={expired ? dayjs.unix(expiresAt).fromNow(false) : dayjs.unix(expiresAt).toNow(true)}
          title={expired ? t('expiredAt') : t('expiresAt')}
        />
      </div>
    )
  }
  return null
}
