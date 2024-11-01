'use client'
import type { Collection } from '@echo/model/types/collection'
import { SearchBox } from '@echo/ui/components/base/search/search-box'
import { CollectionSelectorInfo } from '@echo/ui/components/trade/collection-selector/collection-selector-info'
import { CollectionSelectorInput } from '@echo/ui/components/trade/collection-selector/collection-selector-input'
import { TokenSelectorLayout } from '@echo/ui/components/trade/token-selector/token-selector-layout'
import { useDependencies } from '@echo/ui/hooks/use-dependencies'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { gt, isNil } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  collection: Nullable<Collection>
  onAddQuantity?: (quantity: number) => unknown
  onSelect?: (collection: Collection) => unknown
}

export const CollectionSelector: FunctionComponent<Props> = ({ collection, onAddQuantity }) => {
  const t = useTranslations('trade.collectionSelector')
  const [quantity, setQuantity] = useState<number>()
  const { searchCollections } = useDependencies()

  if (isNil(collection)) {
    return (
      <TokenSelectorLayout>
        <div className={clsx('h-max', 'w-full', 'max-w-[37.5rem]')}>
          <div className={clsx('flex', 'flex-col', 'gap-2.5')}>
            <span className={clsx('prose-paragraph-md', 'text-white')}>{t('search.title')}</span>
            <SearchBox
              resultsProvider={searchCollections}
              // TODO Implement the fetching of the collection from the slug
              // onSelect={(result: SearchResult<Lowercase<string>>) => {
              // }}
              style={{
                categories: {
                  show: false
                },
                placeHolder: t('search.placeHolder'),
                backgroundColor: 'bg-white/[0.08]'
              }}
            />
          </div>
        </div>
      </TokenSelectorLayout>
    )
  }

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
