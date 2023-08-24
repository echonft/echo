import { OfferItemThumbnail } from '../../offer-item/offer-item-thumbnail'
import { NewOfferAddMoreButton } from './new-offer-add-more-button'
import { NewOfferEmptyItems } from './new-offer-empty-items'
import { NewOfferItemTitle } from './new-offer-item-title'
import { OfferItem } from '@echo/ui-model'
import clsx from 'clsx'
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
      <NewOfferItemTitle isReceiving={isReceiver} title={t(isReceiver ? 'assetsInTitle' : 'assetsOutTitle')} />
      <div className={clsx('flex', 'flex-row', 'gap-4')}>
        {isEmpty(items) ? (
          <NewOfferEmptyItems onAddMore={onAddMore} />
        ) : (
          <>
            {items.map((item) => (
              <OfferItemThumbnail
                item={item}
                key={item.nft.id}
                onRemove={(itemToRemove) => {
                  onRemove?.(itemToRemove)
                }}
              />
            ))}
            <NewOfferAddMoreButton onClick={onAddMore} />)
          </>
        )}
      </div>
    </div>
  )
}
