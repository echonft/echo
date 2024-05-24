import { EXPIRATIONS } from '@echo/ui/constants/expiration'
import type { Expiration } from '@echo/ui/types/expiration'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  selectedExpiration: Expiration
  onSelect?: (selected: Expiration) => void
}

export const CreateOfferExpirationSelector: FunctionComponent<Props> = ({ selectedExpiration, onSelect }) => {
  const t = useTranslations('offer.create.expiration.selector')
  return (
    <div className={clsx('flex', 'flex-row', 'gap-2.5')}>
      {EXPIRATIONS.map((expiration) => (
        <button
          className={clsx(
            'flex',
            'px-6',
            'py-3',
            'rounded-lg',
            expiration === selectedExpiration && ['bg-white/5', 'disabled', 'cursor-auto'],
            expiration !== selectedExpiration && 'hover:bg-white/[0.02]'
          )}
          onClick={() => onSelect?.(expiration)}
          key={expiration}
        >
          <span className={clsx('prose-label-md', 'text-white')}>{t(expiration.toString() as never)}</span>
        </button>
      ))}
    </div>
  )
}
