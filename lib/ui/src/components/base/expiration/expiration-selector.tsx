import { Expiration } from '@echo/model/constants/expiration'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { map, pipe, values } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  selectedExpiration: Expiration
  onSelect?: (selected: Expiration) => void
  loading?: boolean
}

export const ExpirationSelector: FunctionComponent<Props> = ({ selectedExpiration, onSelect, loading }) => {
  const t = useTranslations('offer.create.expiration.selector')
  return (
    <div className={clsx('flex', 'flex-row', 'gap-2.5')}>
      {pipe(
        values,
        map((expiration) => (
          <button
            className={clsx(
              'flex',
              'px-6',
              'py-3',
              'rounded-lg',
              expiration === selectedExpiration && 'bg-white/5',
              expiration !== selectedExpiration && 'enabled:hover:bg-white/[0.02]'
            )}
            disabled={loading ?? expiration === selectedExpiration}
            onClick={() => onSelect?.(expiration)}
            key={expiration}
          >
            <span className={clsx('prose-label-md', 'text-white')}>{t(expiration)}</span>
          </button>
        ))
      )(Expiration)}
    </div>
  )
}
