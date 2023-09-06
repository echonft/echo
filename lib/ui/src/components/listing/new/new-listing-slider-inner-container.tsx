import { NewItemsContainer } from '../../item/new-items-container'
import { NewItemsEmptyContainer } from '../../item/new-items-empty-container'
import { NewListingSliderSearchBoxManager } from './new-listing-slider-search-box-manager'
import { NewListingSliderTargetsContainer } from './new-listing-slider-targets-container'
import { ListingItem, ListingTarget } from '@echo/ui-model'
import { Disclosure } from '@headlessui/react'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

interface Props {
  items: ListingItem[]
  targets: ListingTarget[]
  onAddMoreItem?: () => unknown
  onRemoveItem?: (item: ListingItem) => unknown
  onAddMoreTarget?: () => unknown
  onRemoveTarget?: (target: ListingTarget) => unknown
}

export const NewListingSliderInnerContainer: FunctionComponent<Props> = ({
  items,
  targets,
  onAddMoreItem,
  onRemoveItem,
  onAddMoreTarget,
  onRemoveTarget
}) => {
  const t = useTranslations('listing.new.bottomSlider')

  return (
    <div className={clsx('flex', 'flex-col', 'gap-6', 'py-3', 'pb-32')}>
      <NewListingSliderSearchBoxManager placeholder={t('searchPlaceholder')} />
      <NewListingSliderTargetsContainer targets={targets} onAddMore={onAddMoreTarget} onRemove={onRemoveTarget} />
      <NewItemsContainer
        items={items}
        onAddMore={onAddMoreItem}
        onRemove={onRemoveItem}
        isReceiving={false}
        renderEmpty={() => <NewItemsEmptyContainer onAddMore={onAddMoreItem} />}
      />
      <div className={clsx('flex', 'items-center', 'justify-center', 'py-6')}>
        <Disclosure.Button
          className={clsx('btn-gradient', 'group', 'rounded-lg', 'w-40', 'py-1.5', '!h-10')}
          // disabled={isNilOrEmpty(receiverItems) || isNilOrEmpty(senderItems)}
          // onClick={() => setModalState('TO CONFIRM')}
        >
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('finalizeBtn')}</span>
        </Disclosure.Button>
      </div>
    </div>
  )
}
