import { Expiration } from '@echo/model/constants/expiration'
import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import type { User } from '@echo/model/types/user/user'
import { ExpirationLayout } from '@echo/ui/components/trade/expiration-selector/expiration-layout'
import { ExpirationSelectorLayout } from '@echo/ui/components/trade/expiration-selector/expiration-selector-layout'
import { ExpirationTitle } from '@echo/ui/components/trade/expiration-selector/expiration-title'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { map, pipe, values, type NonEmptyArray } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  selectedExpiration: Expiration
  onSelect?: (selected: Expiration) => void
  loading?: boolean
  sender: User
  senderNftsSelection: NonEmptyArray<OwnedNft>
  receiver: User
  receiverNftsSelection: NonEmptyArray<OwnedNft>
}

export const ExpirationSelector: FunctionComponent<Props> = ({ selectedExpiration, onSelect, loading }) => {
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
              onClick={() => onSelect?.(expiration)}
              key={expiration}
            >
              <span className={clsx('prose-label-md', 'text-white')}>{t(expiration)}</span>
            </button>
          ))
        )(Expiration)}
      </ExpirationSelectorLayout>
    </ExpirationLayout>
  )
}
