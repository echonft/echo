import { AddMoreDisclosureButton } from '../../base/add-more-disclosure-button'
import { OfferItemThumbnail } from '../../offer-item/offer-item-thumbnail'
import { SwapDirectionHeader } from '../../shared/swap-direction-header'
import { NewOfferAddMoreButton } from './new-offer-add-more-button'
import { NewOfferEmptyItems } from './new-offer-empty-items'
import { DirectionIn, DirectionOut, OfferItem, SizeMD } from '@echo/ui-model'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isEmpty } from 'ramda'
import { FunctionComponent, ReactNode } from 'react'

interface Props {
  isReceiving: boolean

  items: OfferItem[]
  onAddMore?: () => unknown
  onRemove?: (item: OfferItem | ListingItem) => unknown
  renderEmpty?: () => ReactNode
}

export const NewItemsContainer: FunctionComponent<Props> = ({
  isReceiving,
  items = [],
  onAddMore,
  onRemove,
  renderEmpty
}) => {
  const t = useTranslations('items.new')

  return (
    <div className={clsx('flex', 'flex-col', 'gap-11')}>
      <SwapDirectionHeader
        direction={isReceiver ? DirectionIn : DirectionOut}
        title={t(isReceiver ? 'assetsInTitle' : 'assetsOutTitle')}
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
                  onRemove?.(itemToRemove as OfferItem)
                }}
              />
            ))}
            <NewOfferAddMoreButton onClick={onAddMore} />
          </>
        )}
      </div>
    </div>
  )
}
