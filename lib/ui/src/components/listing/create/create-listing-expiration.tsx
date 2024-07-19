import { ONE_DAY } from '@echo/model/constants/expiration'
import type { Expiration } from '@echo/model/types/expiration'
import type { Nft } from '@echo/model/types/nft'
import { ExpirationButtonsLayout } from '@echo/ui/components/base/expiration/expiration-buttons-layout'
import { ExpirationImage } from '@echo/ui/components/base/expiration/expiration-image'
import { ExpirationLayout } from '@echo/ui/components/base/expiration/expiration-layout'
import { ExpirationSelector } from '@echo/ui/components/base/expiration/expiration-selector'
import { ExpirationSelectorLayout } from '@echo/ui/components/base/expiration/expiration-selector-layout'
import { ExpirationSublayout } from '@echo/ui/components/base/expiration/expiration-sublayout'
import { ExpirationSubtitle } from '@echo/ui/components/base/expiration/expiration-subtitle'
import { ExpirationTitle } from '@echo/ui/components/base/expiration/expiration-title'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { head, type NonEmptyArray } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  items: Nft[]
  onCancel?: VoidFunction
  onComplete?: (expiration: Expiration) => void
  loading?: boolean
}

export const CreateListingExpiration: FunctionComponent<Props> = ({ items, onComplete, onCancel, loading }) => {
  const t = useTranslations('listing.create.expiration')
  const [expiration, setExpiration] = useState<Expiration>(ONE_DAY)
  const firstNft = head(items as NonEmptyArray<Nft>)
  return (
    <ExpirationLayout>
      <ExpirationImage alt={firstNft.tokenId.toString()} src={firstNft.pictureUrl} />
      <ExpirationSublayout>
        <ExpirationTitle>
          {t.rich('title', {
            yellow: (text) => <span className={clsx('text-yellow-500')}>{text}</span>
          })}
        </ExpirationTitle>
        <ExpirationSelectorLayout>
          <ExpirationSubtitle>{t('subtitle')}</ExpirationSubtitle>
          <ExpirationSelector selectedExpiration={expiration} onSelect={setExpiration} loading={loading} />
          <ExpirationButtonsLayout>
            <button
              className={clsx('btn-action', 'h-max', 'w-full', 'py-2.5', 'group', loading && 'animate-pulse')}
              disabled={loading}
              onClick={onCancel}
            >
              <span className={clsx('prose-label-lg', 'btn-label-action')}>{t('editBtn')}</span>
            </button>
            <button
              className={clsx('btn-gradient', 'h-max', 'w-full', 'py-2.5', 'group', loading && 'animate-pulse')}
              disabled={loading}
              onClick={() => {
                onComplete?.(expiration)
              }}
            >
              <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('finalizeBtn')}</span>
            </button>
          </ExpirationButtonsLayout>
        </ExpirationSelectorLayout>
      </ExpirationSublayout>
    </ExpirationLayout>
  )
}
