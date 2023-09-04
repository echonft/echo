import { AddMoreDisclosureButton } from '../../base/add-more-disclosure-button'
import { OfferItemThumbnail } from '../../offer-item/offer-item-thumbnail'
import { SwapDirectionHeader } from '../../shared/swap-direction-header'
import { NewOfferAddMoreButton } from './new-offer-add-more-button'
import { NewOfferEmptyItems } from './new-offer-empty-items'
import { DirectionIn, DirectionOut, OfferItem, SizeMD } from '@echo/ui-model'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isEmpty } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  isReceiver: boolean
  items: OfferItem[]
  onAddMore?: () => unknown
  onRemove?: (item: OfferItem) => unknown
}

export const NewOfferBottomSliderItemsContainer: FunctionComponent<Props> = ({
  isReceiver,
  items = [],
  onAddMore,
  onRemove
}) => {
  const t = useTranslations('offer.misc')

  return (
    <div className={clsx('flex', 'flex-col', 'gap-11')}>
      <SwapDirectionHeader
        direction={isReceiver ? DirectionIn : DirectionOut}
        title={t(isReceiver ? 'assetsInTitle' : 'assetsOutTitle')}
      />
      <div className={clsx('flex', 'flex-row', 'gap-4')}>
        {isEmpty(items) ? (
          <NewOfferEmptyItems onAddMore={onAddMore} />
        ) : (
          <>
            {items.map((item) => (
              <OfferItemThumbnail
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
