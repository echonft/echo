import { NewItemsAddMoreDisclosureButton } from '@echo/ui/components/item/new/new-items-add-more-disclosure-button'
import { ItemThumbnail } from '@echo/ui/components/item/thumbnail/item-thumbnail'
import { SwapDirectionHeader } from '@echo/ui/components/shared/swap-direction-header'
import { SizeMD } from '@echo/ui/constants/size'
import { DirectionIn, DirectionOut } from '@echo/ui/constants/swap-direction'
import type { OfferItem } from '@echo/ui/types/model/offer-item'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isEmpty } from 'ramda'
import type { FunctionComponent, ReactNode } from 'react'

interface Props {
  isReceiver: boolean
  items: OfferItem[]
  onAddMore?: () => unknown
  onRemove?: (itemNftId: string) => unknown
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
            <NewItemsAddMoreDisclosureButton title={t('addMoreBtn')} onClick={onAddMore} />
          </>
        )}
      </div>
    </div>
  )
}
