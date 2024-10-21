'use client'
import type { Collection } from '@echo/model/types/collection/collection'
import { CollectionSelectorInfo } from '@echo/ui/components/trade/collection-selector/collection-selector-info'
import { CollectionSelectorInput } from '@echo/ui/components/trade/collection-selector/collection-selector-input'
import { TokenSelectorLayout } from '@echo/ui/components/trade/token-selector/token-selector-layout'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { gt, isNil } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  collection: Collection
  onAddQuantity?: (quantity: number) => unknown
}

export const CollectionSelector: FunctionComponent<Props> = ({ collection, onAddQuantity }) => {
  const t = useTranslations('trade.collectionSelector')
  const [quantity, setQuantity] = useState<number>()

  return (
    <TokenSelectorLayout>
      <CollectionSelectorInfo collection={collection} />
      <CollectionSelectorInput value={quantity} onChange={setQuantity} />
      <button
        className={clsx('btn-primary-reverse', 'group', 'w-full', 'py-2.5')}
        disabled={isNil(quantity) || quantity <= 0}
        onClick={() => {
          if (!isNil(quantity) && gt(quantity, 0)) {
            onAddQuantity?.(quantity)
          }
        }}
      >
        <span className={clsx('btn-label-primary-reverse', 'prose-label-md-semi')}>{t('btn')}</span>
      </button>
    </TokenSelectorLayout>
  )
}
