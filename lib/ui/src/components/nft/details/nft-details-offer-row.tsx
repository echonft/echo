import { Routes } from '../../../dependencies/link-provider'
import { InternalLink } from '../../utils/internal-link'
import { clsx } from 'clsx'
import { useFormatter, useNow, useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export interface NftDetailsOfferRowProps {
  id: string
  sender: string
  expiresAt: Date
}

export const NftDetailsOfferRow: FunctionComponent<NftDetailsOfferRowProps> = ({ id, sender, expiresAt }) => {
  const t = useTranslations('nft.details.offers')
  const now = useNow({
    updateInterval: 10000
  })
  const format = useFormatter()
  return (
    <InternalLink route={Routes.OFFER} params={{ id }}>
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
          {t('expiresIn', { time: format.relativeTime(expiresAt, now) })}
        </span>
      </div>
    </InternalLink>
  )
}
