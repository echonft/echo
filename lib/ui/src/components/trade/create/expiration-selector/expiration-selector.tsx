import { Expiration, type ExpirationValues } from '@echo/model/constants/expiration'
import { ExpirationLayout } from '@echo/ui/components/trade/create/expiration-selector/expiration-layout'
import { ExpirationSelectorLayout } from '@echo/ui/components/trade/create/expiration-selector/expiration-selector-layout'
import { ExpirationTitle } from '@echo/ui/components/trade/create/expiration-selector/expiration-title'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { map, pipe, values } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  selectedExpiration: Expiration
  onSelectExpiration?: (selected: Expiration) => void
  loading?: boolean
}

export const ExpirationSelector: FunctionComponent<Props> = ({ selectedExpiration, onSelectExpiration, loading }) => {
  const t = useTranslations('trade.expiration')
  return (
    <ExpirationLayout>
      <ExpirationTitle>{t('title')}</ExpirationTitle>
      <ExpirationSelectorLayout>
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
              onClick={() => onSelectExpiration?.(expiration)}
              key={expiration}
            >
              <span className={clsx('btn-label-primary')}>{t(`selector.${expiration as ExpirationValues}`)}</span>
            </button>
          ))
        )(Expiration)}
      </ExpirationSelectorLayout>
    </ExpirationLayout>
  )
}
