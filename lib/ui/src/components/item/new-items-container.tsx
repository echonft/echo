import { AddMoreDisclosureButton } from '../base/add-more-disclosure-button'
import { SwapDirectionHeader } from '../shared/swap-direction-header'
import { ItemThumbnail } from './item-thumbnail'
import { DirectionIn, DirectionOut, ListingItem, OfferItem, SizeMD } from '@echo/ui-model'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isEmpty } from 'ramda'
import { FunctionComponent, ReactNode } from 'react'

interface Props {
  isReceiver: boolean
  items: OfferItem[]
  onAddMore?: () => unknown
  onRemove?: (item: OfferItem | ListingItem) => unknown
  renderEmpty?: () => ReactNode
}

export const NewItemsContainer: FunctionComponent<Props> = ({
  isReceiver,
  items = [],
  onAddMore,
  onRemove,
  renderEmpty
}) => {
  const t = useTranslations('items.new')
  const tShared = useTranslations('shared.assets')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-11')}>
      <SwapDirectionHeader
        direction={isReceiver ? DirectionIn : DirectionOut}
        title={tShared(isReceiver ? 'in' : 'out')}
      />
      <div className={clsx('flex', 'flex-row', 'gap-4')}>
        {isEmpty(items) ? (
          renderEmpty?.()
        ) : (
          <>
            {items.map((item) => (
              <ItemThumbnail
                item={item}
                key={item.nft.id}
                size={SizeMD}
                onRemove={(itemToRemove) => {
                  onRemove?.(itemToRemove)
                }}
              />
            ))}
            <AddMoreDisclosureButton title={t('addMoreBtn')} onClick={onAddMore} />
          </>
        )}
      </div>
    </div>
  )
}
