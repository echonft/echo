import { AddMoreDisclosureButton } from '../../base/add-more-disclosure-button'
import { NewOfferEmptyItems } from '../../offer/new/new-offer-empty-items'
import { OfferItemThumbnail } from '../../offer-item/offer-item-thumbnail'
import { NewOfferItemTitle } from './new-offer-item-title'
import { ListingItem, SizeMD } from '@echo/ui-model'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isEmpty } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  items: ListingItem[]
  onAddMore?: () => unknown
  onRemove?: (item: ListingItem) => unknown
}

export const NewListingSliderItemsContainer: FunctionComponent<Props> = ({ items = [], onAddMore, onRemove }) => {
  const t = useTranslations('listing.misc')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-11')}>
      <NewOfferItemTitle isReceiving={false} title={t('assetsOutTitle')} />
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
                  onRemove?.(itemToRemove)
                }}
              />
            ))}
            <AddMoreDisclosureButton onClick={onAddMore} title={t('add')} />
          </>
        )}
      </div>
    </div>
  )
}
