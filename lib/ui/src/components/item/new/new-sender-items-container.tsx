import { InternalLink } from '@echo/ui/components/base/link/internal-link'
import { HideIfNilOrEmpty } from '@echo/ui/components/base/utils/hide-if-nil-or-empty'
import { ShowIfNilOrEmpty } from '@echo/ui/components/base/utils/show-if-nil-or-empty'
import { NewSenderItemsEmptyContainer } from '@echo/ui/components/item/empty/new-sender-items-empty-container'
import { NewItemsAddMoreDisclosureButton } from '@echo/ui/components/item/new/new-items-add-more-disclosure-button'
import { ItemThumbnail } from '@echo/ui/components/item/thumbnail/item-thumbnail'
import { SwapDirectionHeader } from '@echo/ui/components/shared/swap-direction-header'
import { links } from '@echo/ui/constants/links'
import { SizeMD } from '@echo/ui/constants/size'
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
  const t = useTranslations('items.new')
  const tShared = useTranslations('shared.assets')
  return (
    <div className={clsx('flex', 'flex-col', 'gap-11')}>
      <SwapDirectionHeader direction={DirectionOut} title={tShared('out')} />
      <div className={clsx('flex', 'flex-row', 'gap-4')}>
        <HideIfNilOrEmpty
          checks={items}
          render={(items) => (
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
              <InternalLink className={clsx('min-h-full')} path={links.profile.items}>
                <NewItemsAddMoreDisclosureButton title={t('addMoreBtn')} />
              </InternalLink>
            </>
          )}
        />
        <ShowIfNilOrEmpty checks={items}>
          <NewSenderItemsEmptyContainer />
        </ShowIfNilOrEmpty>
      </div>
    </div>
  )
}
