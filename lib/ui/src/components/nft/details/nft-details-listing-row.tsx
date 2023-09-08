import { clsx } from 'clsx'
import dayjs, { Dayjs } from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

dayjs.extend(relativeTime)

interface Props {
  id: string
  sender: string
  expiresAt: Dayjs
}

export const NftDetailsListingRow: FunctionComponent<Props> = ({ sender, expiresAt }) => {
  const t = useTranslations('nft.details.listings')
  return (
    // TODO link to listing details if any? else collection listings
    // <InternalLink path={}>
    <div
      className={clsx(
        'flex',
        'flex-row',
        'gap-1',
        'pl-8',
        'items-center',
        'py-1',
        'bg-white/[0.09]',
        'rounded-lg',
        'w-[20rem]'
      )}
    >
      <span className={clsx('prose-label-xs', 'text-white/[0.55]')}>{t('by')}</span>
      <span className={clsx('prose-label-xs-semi', 'text-white')}>{sender}</span>
      <span className={clsx('prose-label-xs', 'text-white/[0.55]')}>
        {t('expiresIn', { time: expiresAt.toNow(true) })}
      </span>
    </div>
    // </InternalLink>
  )
}
