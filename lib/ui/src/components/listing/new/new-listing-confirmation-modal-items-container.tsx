import { ItemThumbnailsContainer } from '@echo/ui/components/item/thumbnail/layout/item-thumbnails-container'
import { ModalSubtitle } from '@echo/ui/components/layout/modal/modal-subtitle'
import { SwapDirectionHeader } from '@echo/ui/components/shared/swap-direction-header'
import { DirectionOut } from '@echo/ui/constants/swap-direction'
import { ListingItem } from '@echo/ui/types/model/listing-item'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  items: ListingItem[]
}

export const NewListingConfirmationModalItemsContainer: FunctionComponent<Props> = ({ items }) => {
  const t = useTranslations('listing.new.confirmationModal')
  const tShared = useTranslations('shared.assets')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <div className={clsx('flex', 'flex-row', 'gap-4', 'items-center')}>
        <ModalSubtitle>{t('itemsSubtitle', { count: items.length })}</ModalSubtitle>
        <SwapDirectionHeader direction={DirectionOut} title={tShared('out')} />
      </div>
      <ItemThumbnailsContainer items={items} centered={true} />
    </div>
  )
}
