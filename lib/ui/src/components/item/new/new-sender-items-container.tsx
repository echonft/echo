import { HideIfNilOrEmpty } from '@echo/ui/components/base/utils/hide-if-nil-or-empty'
import { ShowIfNilOrEmpty } from '@echo/ui/components/base/utils/show-if-nil-or-empty'
import { NewSenderItemsEmptyContainer } from '@echo/ui/components/item/empty/new-sender-items-empty-container'
import { ItemThumbnailsContainer } from '@echo/ui/components/item/thumbnail/layout/item-thumbnails-container'
import { SwapDirectionHeader } from '@echo/ui/components/shared/swap-direction-header'
import { DirectionOut } from '@echo/ui/constants/swap-direction'
import type { OfferItem } from '@echo/ui/types/model/offer-item'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

interface Props {
  items: OfferItem[]
  onRemove?: (itemNftId: string) => unknown
}

export const NewSenderItemsContainer: FunctionComponent<Props> = ({ items, onRemove }) => {
  const t = useTranslations('shared.assets')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-11')}>
      <SwapDirectionHeader direction={DirectionOut} title={t('out')} />
      <HideIfNilOrEmpty
        checks={items}
        render={(items) => <ItemThumbnailsContainer items={items} onRemove={onRemove} />}
      />
      <ShowIfNilOrEmpty checks={items}>
        <NewSenderItemsEmptyContainer />
      </ShowIfNilOrEmpty>
    </div>
  )
}
